import Peer from 'peerjs';
import Vue from 'vue';
import { sendJoinRoom, handlers, updateAvatar } from './socket';

function createEmptyAudioTrack() {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, { enabled: false });
}

const fakeStream = new MediaStream([createEmptyAudioTrack()]);

async function getMedia() {
    const md = navigator.mediaDevices
    try {
        return await md.getUserMedia({ audio: true, video: true });
    } catch (e) { /* */ }
    try {
        return await md.getUserMedia({ audio: true, video: false });
    } catch (e) { /* */ }
    return fakeStream;
}

// Make these observable so that the UI will automatically update when they
// change. Unfortunately we can't just make the arrays directly observable
// because of https://github.com/vuejs/vue/issues/9499
export const state = Vue.observable({
    roomId: null,
    streams: [],
    myId: null,
    myName: null,
    myPeer: null,
    myStream: null,
    myStreamIsOk: false,
});

let connections = {};

class Connection {
    constructor(call) {
        this.call = call;
        this.returnCall = null;
        this.stream = null;
    }

    setReturnCall(returnCall) {
        this.returnCall = returnCall;
        this.returnCall.on('stream', stream => {
            // This way we know who the stream represents, so we can assign it
            // to an avatar.
            stream.peer = returnCall.peer;
            this.stream = stream;
            state.streams.push(stream);
        });
        this.returnCall.on('close', () => {
            state.streams = state.streams.filter(x => x !== this.stream);
            this.stream = null;
        });
    }

    close() {
        this.call.close();
        if (this.returnCall) { this.returnCall.close(); }
    }
}

export function leaveRoom() {
    for (const oldConnection of Object.values(connections)) {
        oldConnection.close()
    }
    connections = {};
    state.streams = [];
}

export function switchRoom(roomId, name) {
    leaveRoom();
    state.roomId = roomId;
    state.myName = name;
    state.streams = [];
    let host = window.location.hostname;
    state.myPeer = new Peer(undefined, {
        host: host,
        port: {
            "http:": "8001",
            "https:": "4431",
        }[window.location.protocol]
    })
    const myStream = getMedia();
    myStream.then(stream => {
        stream.peer = state.myId
        state.myStream = stream
        state.myStreamIsOk = stream !== fakeStream
        state.streams.push(stream)
    });

    state.myPeer.on("open", userId => {
        state.myId = userId
        if (state.myStream) state.myStream.peer = state.myId
        sendJoinRoom(roomId, userId);
        updateAvatar({ name: name });
    })

    handlers.onUserConnected = async userId => {
        console.log('User connected', userId);
        /// Send an outgoing connection...
        const call = state.myPeer.call(userId, await myStream);
        connections[userId] = new Connection(call);
    };

    handlers.onUserDisconnected = user => {
        console.log(user, "disconnected")
        if (connections[user]) {
            connections[user].close();
        }
    };

    /// On incoming connection...
    state.myPeer.on("call", async call => {
        if (!(call.peer in connections)) {
            const outgoingCall = state.myPeer.call(call.peer, await myStream);
            connections[call.peer] = new Connection(outgoingCall);
        }
        connections[call.peer].setReturnCall(call);
        call.answer(fakeStream);
    });
}

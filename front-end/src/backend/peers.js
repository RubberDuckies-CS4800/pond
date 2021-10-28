import Peer from 'peerjs-client';
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
        this.stream = null;
        this.call.on('stream', stream => {
            this.stream = stream;
            state.streams.push(stream);
        });
        this.call.on('close', () => {
            state.streams = state.streams.filter(x => x !== this.stream);
            this.stream = null;
        });
    }

    close() {
        this.call.close();
    }
}

export function switchRoom(roomId, name) {
    for (const oldConnection of Object.values(connections)) {
        oldConnection.close()
    }
    connections = {};
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
        state.myStream = stream
        state.myStreamIsOk = stream !== fakeStream
        state.streams.push(stream)
    });

    state.myPeer.on("open", userId => {
        state.myId = userId
        sendJoinRoom(roomId, userId);
        updateAvatar({ name: name });
    })

    state.myPeer.on("close", event => console.log("Closed", event));
    state.myPeer.on("destroyed", event => console.log("Destroyed", event));
    window.me = state.myPeer;

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
        connections[call.peer] = new Connection(call);
        call.answer(await myStream);
    });
}

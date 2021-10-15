import Peer from 'peerjs-client';
import Vue from 'vue';
import { sendJoinRoom, handlers } from './socket';

async function getMedia() {
    const md = navigator.mediaDevices
    try {
        return await md.getUserMedia({ audio: true, video: true });
    } catch (e) { /* */ }
    try {
        return await md.getUserMedia({ audio: true, video: false });
    } catch (e) { /* */ }
    throw new Error('TODO: Inform user that they need at least audio');
}

// Make these observable so that the UI will automatically update when they
// change. Unfortunately we can't just make the arrays directly observable
// because of https://github.com/vuejs/vue/issues/9499
export const state = Vue.observable({
    roomId: null,
    streams: [],
    me: null,
    myName: null,
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
    state.me = new Peer(undefined, {
        host: "localhost",
        port: "8001",
    })
    const myStream = getMedia();
    myStream.then(stream => state.streams.push(stream));

    state.me.on("open", userId => {
        sendJoinRoom(roomId, userId)
    })

    handlers.onUserConnected = async userId => {
        console.log('User connected', userId);
        /// Send an outgoing connection...
        const call = state.me.call(userId, await myStream);
        connections[userId] = new Connection(call);
    };

    handlers.onUserDisconnected = user => {
        console.log(user, "disconnected")
        if (connections[user]) {
            connections[user].close();
        }
    };

    /// On incoming connection...
    state.me.on("call", async call => {
        connections[call.peer] = new Connection(call);
        call.answer(await myStream);
    });
}

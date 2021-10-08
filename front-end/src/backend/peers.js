import Peer from 'peerjs-client';
import Vue from 'vue';
import { joinRoom, onUserConnected, onUserDisconnected } from './socket';

// Make these observable so that the UI will automatically update when they
// change. Unfortunately we can't just make the arrays directly observable
// because of https://github.com/vuejs/vue/issues/9499
export const state = Vue.observable({
    peers: [],
    streams: [],
});


export let me = null;

export function createMe(roomId) {
    me = new Peer(undefined, {
        host: "localhost",
        port: "8001",
    })

    me.on("open", userId => {
        console.log("opened blah blah")
        joinRoom(roomId, userId)
    })

    navigator
        .mediaDevices
        .getUserMedia({
            audio: true,
            video: true
        })
        .then(stream => {
            state.streams.push(stream)

            console.log("Personal stream opened", state.streams)

            me.on("call", call => {
                call.answer(stream);
                call.on("stream", otherStream => {
                    state.streams.push(otherStream);
                })
            })

            onUserConnected(user => {
                callUser(user, stream);
            })
        })
}

onUserDisconnected(user => {
    console.log(user, "disconnected")
    if (state.peers[user]) {
        state.peers[user].close();
    }
})

function callUser(userId, meStream) {
    const call = me.call(userId, meStream);
    state.peers[userId] = call;
    let stream = null;

    call.on("stream", (userVideoStream) => {
        stream = userVideoStream;
        state.streams.push(stream);
    })

    call.on("close", () => {
        // Remove the stream
        state.streams = state.streams.filter(s => s !== stream);
    })
}

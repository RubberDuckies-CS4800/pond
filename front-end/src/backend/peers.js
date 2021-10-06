import Peer from 'peerjs-client';
import Vue from 'vue';

// Make these observable so that the UI will automatically update when they
// change.
export const peers = Vue.observable([])
export const streams = Vue.observable([])

export const me = new Peer('asdf', {
    host: "localhost",
    port: "8001",
})

navigator
    .mediaDevices
    .getUserMedia({ 
        audio: true, 
        video: false
    })
    .then(stream => {
        streams.push(stream)
    })

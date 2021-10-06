import Client from 'socket.io-client';

const socket = new Client('localhost:8000/');

export function joinRoom(roomId, selfId) {
    socket.emit('join-room', roomId, selfId)
}

export function onUserDisconnected(handler) {
    socket.on('user-disconnected', handler);
}

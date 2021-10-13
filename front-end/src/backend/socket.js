import Client from 'socket.io-client';

const socket = new Client('localhost:8000/');

export function joinRoom(roomId, selfId) {
    console.log("Joining room", roomId, "as", selfId)
    socket.emit('join-room', roomId, selfId)
}

export function onUserConnected(handler) {
    socket.on('user-connected', handler);
}

export function onUserDisconnected(handler) {
    socket.on('user-disconnected', handler);
}

export function sendWhiteboardFigure(figure) {
    socket.emit('whiteboard-figure', figure);
}

export function onWhiteboardFigure(handler) {
    socket.on('whiteboard-figure', handler);
}

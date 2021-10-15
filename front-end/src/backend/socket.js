import Client from 'socket.io-client';

let host = window.location.hostname + ":8000"
const socket = new Client(host);
export function sendJoinRoom(roomId, selfId) {
    console.log("Joining room", roomId, "as", selfId)
    socket.emit('join-room', roomId, selfId)
}

// This way we are guaranteed to only have one handler responding to each event,
// preventing duplicate handling if you join a second room.
export const handlers = {
    onUserConnected: () => null,
    onUserDisconnected: () => null,
}

socket.on('user-connected', (...args) => handlers.onUserConnected(...args));
socket.on('user-disconnected', (...args) => handlers.onUserDisconnected(...args));

export function sendWhiteboardFigure(figure) {
    socket.emit('whiteboard-figure', figure);
}

export function onWhiteboardFigure(handler) {
    socket.on('whiteboard-figure', handler);
}

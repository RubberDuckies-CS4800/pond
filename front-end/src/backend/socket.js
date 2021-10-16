import io from 'socket.io-client'

let host = `${window.location.protocol}//${window.location.hostname}:8000`
const socket = io(host)

socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`)
})

export function sendJoinRoom(roomId, selfId) {
  console.log('Joining room', roomId, 'as', selfId)
  socket.emit('join-room', roomId, selfId)
}

// This way we are guaranteed to only have one handler responding to each event,
// preventing duplicate handling if you join a second room.
export const handlers = {
  onUserConnected: () => null,
  onUserDisconnected: () => null,
}

socket.on('user-connected', (...args) => handlers.onUserConnected(...args))
socket.on('user-disconnected', (...args) =>
  handlers.onUserDisconnected(...args),
)

export function sendWhiteboardFigure(figure) {
  socket.emit('whiteboard-figure', figure)
}

export function onWhiteboardFigure(handler) {
  socket.on('whiteboard-figure', handler)
}


// Extra client-side socket connection events
// socket.on('connect', () => {
//   console.log(socket.connected) // true
// })

// socket.on('disconnect', () => {
//   console.log(socket.connected) // false
// })

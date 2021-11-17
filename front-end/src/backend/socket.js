import io from "socket.io-client"

let host = `${window.location.protocol}//${window.location.host.replace(
	"8080",
	"8000"
)}`
const socket = io(host)

socket.on("connect_error", (err) => {
	console.log(`connect_error due to ${err.message}`)
})

export function sendJoinRoom(roomId, selfId, isHost) {
	console.log("Joining room", roomId, "as", selfId)
	socket.emit("join-room", roomId, selfId, isHost)
}

export function sendLeaveRoom() {
	socket.emit("leave-room")
}

// This way we are guaranteed to only have one handler responding to each event,
// preventing duplicate handling if you join a second room.
export const handlers = {
	onUserConnected: () => null,
	onUserDisconnected: () => null,
	onWhiteboardFigure: () => null,
	onAvatar: () => null,
	onRemoveAvatar: () => null,
	onMuteAll: () => null,
}

socket.on("user-connected", (...args) => handlers.onUserConnected(...args))
socket.on("user-disconnected", (...args) =>
	handlers.onUserDisconnected(...args)
)
socket.on("whiteboard-figure", (...args) =>
	handlers.onWhiteboardFigure(...args)
)
socket.on("avatar", (...args) => handlers.onAvatar(...args))
socket.on("remove-avatar", (...args) => handlers.onAvatar(...args))
socket.on("mute-all", (...args) => handlers.onMuteAll(...args))

export function sendWhiteboardFigure(figure) {
	socket.emit("whiteboard-figure", figure)
}

export function updateAvatar(avatar) {
	socket.emit("avatar", avatar)
}

export function requestAvatars() {
	socket.emit("request-avatars")
}

export function setAudioEnabled(audioEnabled) {
	socket.emit("avatar", { audio: audioEnabled })
}

export function setVideoEnabled(videoEnabled) {
	socket.emit("avatar", { video: videoEnabled })
}

export function sendMuteAll(hostAvatar) {
	socket.emit("mute-all", hostAvatar)
}

// Extra client-side socket connection events
socket.on("connect", () => {
	console.log(`Socket Connected: ${socket.connected}`) // true
})

socket.on("disconnect", () => {
	console.log(`Socket Connected: ${socket.connected}`) // false
})

const _ = require("lodash")
const socketIo = require("socket.io")
const { getRoom } = require("./rooms")

function handleConnection(socket) {
	let currentRoom = null
	let userId = null

	function leaveRoom() {
		if (currentRoom) {
			const roomId = currentRoom.id
			socket.broadcast.to(roomId).emit("user-disconnected", userId)
			if (userId) {
				currentRoom.deleteAvatar(userId)
				socket.broadcast.to(roomId).emit("remove-avatar", userId)
			}

			if (_.isEmpty(currentRoom.avatars)) {
				currentRoom.figures = []
			}
		}
	}

	function sendAvatars() {
		if (currentRoom) {
			for (const avatar of Object.values(currentRoom.avatars)) {
				socket.emit("avatar", avatar)
			}
		}
	}

	socket.on("join-room", (roomId, theUserId, isHost) => {
		userId = theUserId
		currentRoom = getRoom(roomId)
		socket.join(roomId)

		console.log("Join Room")

		for (const fig of currentRoom.figures) {
			socket.emit("whiteboard-figure", fig)
		}
		currentRoom.avatars[userId] = {
			id: userId,
			name: "",
			top: 4.5,
			left: 8.0,
			audio: false,
			video: false,
			isHost: isHost,
		}

		sendAvatars()

		//socket.broadcast sends a message to everyone in the room
		socket.broadcast.to(roomId).emit("user-connected", userId)
		socket.broadcast.to(roomId).emit("avatar", currentRoom.avatars[userId])

		socket.on("disconnect", () => {
			console.log("Socket disconnected!")
			leaveRoom()
		})
	})

	socket.on("leave-room", () => {
		leaveRoom()
	})

	socket.on("whiteboard-figure", (fig) => {
		if (currentRoom) {
			currentRoom.figures.push(fig)
			socket.broadcast.to(currentRoom.id).emit("whiteboard-figure", fig)
		}
	})

	socket.on("delete-whiteboard-figure", (id) => {
		if (currentRoom) {
			currentRoom.figures = currentRoom.figures.filter((x) => x.id !== id)
			socket.broadcast
				.to(currentRoom.id)
				.emit("delete-whiteboard-figure", id)
		}
	})

	socket.on("avatar", (avatar) => {
		if (currentRoom) {
			const updated = currentRoom.updateAvatar({ id: userId, ...avatar })
			socket.broadcast.to(currentRoom.id).emit("avatar", updated)
			socket.emit("avatar", updated)
		}
	})

	socket.on("request-avatars", () => {
		sendAvatars()
	})

	socket.on("remove-avatar", (avatarId) => {
		if (currentRoom) {
			currentRoom.deleteAvatar(avatarId)
			socket.broadcast.to(currentRoom.id).emit("remove-avatar", avatarId)

			if (_.isEmpty(currentRoom.avatars)) {
				currentRoom.figures = []
			}
		}
	})

	socket.on("mute-all", (hostAvatar) => {
		for (const avatar of Object.values(currentRoom.avatars)) {
			if (avatar.id != hostAvatar.id) {
				const updated = currentRoom.updateAvatar({
					id: avatar.id,
					audio: false,
				})
				socket.broadcast.to(currentRoom.id).emit("avatar", updated)
				socket.emit("avatar", updated)
			}
		}
		socket.broadcast.to(currentRoom.id).emit("mute-all", hostAvatar)
	})

	socket.on("kick-user", (id) => {
		socket.broadcast.to(currentRoom.id).emit("kick-user", id)
	})
}

module.exports = (server) => {
	// Socketio server for real-time communication.
	const io = socketIo(server, { cors: { origin: "*" } })

	io.on("connection", handleConnection)
}

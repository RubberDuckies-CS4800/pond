// Ctrl + c to stop the app
// To run, use "nodemon app" in the terminal

const cors = require("cors")
const path = require("path")
const { v4: uuidV4 } = require("uuid")

const express = require("express")
const app = express()
const http = require("http")
const server = http.Server(app)
const socketIo = require("socket.io")
// Socketio server for real-time communication.
const io = socketIo(server, { cors: { origin: "*" } })

// // Setup CORS so that the frontend served on :8080 can access things on the
// // server at :8000.
// const corsOptions = {
//   origin: 'http://localhost:8080',
//   methods: ['GET', 'POST'],
// }
// const corsMiddleware = cors(corsOptions)
// app.use(corsMiddleware)
// app.options('*', corsMiddleware)

// // temporary solution to allow all CORS requests
// app.use(cors())

const whiteboards = {}

function getWhiteboard(id) {
	if (!(id in whiteboards)) {
		whiteboards[id] = { figures: [] }
	}
	return whiteboards[id]
}

// this may be necessary,
// since one person cannot be in more than one room
const rooms = {}

function addAvatar(avatar, roomId, top, left) {
	if (!(roomId in rooms)) {
		rooms[roomId] = {}
	}
	let room_avatars = rooms[roomId]
	// if (!(avatar in room_avatars)) {
	room_avatars[avatar] = {
		id: avatar,
		top: top,
		left: left,
	}
	// }
	console.log(Object.keys(room_avatars).length)
}

function deleteAvatar(avatar, roomId) {
	// might need adjusting
	getAvatars(roomId).delete(avatar)
	console.log("deleted")
}

function getAvatars(roomId) {
	if (Object.keys(rooms).length === 0) {
		return null
	}
	return rooms[roomId]
}

// eventually should remove the avatar if the user leaves

io.on("connection", (socket) => {
	let currentRoom = null
	console.log("connection!!!")
	socket.on("join-room", (roomId, userId) => {
		currentRoom = roomId

		socket.join(roomId)
		// console.log("avatars: " + JSON.stringify(getAvatars(currentRoom)))
		for (const fig of getWhiteboard(roomId).figures) {
			socket.emit("whiteboard-figure", fig)
		}

		for (let avatar in getAvatars(currentRoom)) {
			socket.emit("avatar", avatar)
		}

		socket.on("removeAvatar", (avatar) => {
			deleteAvatar(avatar.id, avatar.roomId)
			socket.broadcast.to(roomId).emit("removeAvatar", avatar)
		})

		//socket.broadcast sends a message to everyone in the room
		socket.broadcast.to(roomId).emit("user-connected", userId)

		socket.on("disconnect", () => {
			socket.broadcast.to(roomId).emit("user-disconnected", userId)
		})
	})

	socket.on("whiteboard-figure", (fig) => {
		getWhiteboard(currentRoom).figures.push(fig)
		socket.broadcast.to(currentRoom).emit("whiteboard-figure", fig)
	})

	socket.on("avatar", (avatar) => {
		addAvatar(avatar.id, avatar.roomId, avatar.top, avatar.left)
		socket.broadcast.to(currentRoom).emit("avatar", avatar) // may not be needed
	})
})

// Serve frontend files. This is the folder that `npm build` generates when run
// in the frontend.
app.use(express.static("../front-end/dist/"))

// Serve additional pages in the app by returning the compiled app. Vue compiles
// all pages to a single html file.
app.get("*", (req, res) => {
	res.sendFile(path.resolve("../front-end/dist/index.html"))
})

module.exports = server

const _ = require("lodash")
const socketIo = require("socket.io")
const { getRoom } = require("./rooms")

function handleConnection(socket) {
    let currentRoom = null
    let userId = null

    socket.on("join-room", (roomId, theUserId) => {
        userId = theUserId
        currentRoom = getRoom(roomId)
        socket.join(roomId)

        console.log("Join Room");

        for (const fig of currentRoom.figures) {
            socket.emit("whiteboard-figure", fig)
        }
        currentRoom.avatars[userId] = {
            id: userId,
            name: "",
            top: 4.5,
            left: 8.0,
        }
        for (const avatar of Object.values(currentRoom.avatars)) {
            socket.emit("avatar", avatar)
        }

        //socket.broadcast sends a message to everyone in the room
        socket.broadcast.to(roomId).emit("user-connected", userId)
        socket.broadcast.to(roomId).emit("avatar", currentRoom.avatars[userId])

        socket.on("disconnect", () => {
            socket.broadcast.to(roomId).emit("user-disconnected", userId)
            currentRoom.deleteAvatar(userId);

            if (_.isEmpty(currentRoom.avatars)) {
                currentRoom.figures = []
            }
        })
    })

    socket.on("whiteboard-figure", (fig) => {
        if (currentRoom) {
            currentRoom.figures.push(fig)
            socket.broadcast.to(currentRoom.id).emit("whiteboard-figure", fig)
        }
    })

    socket.on("avatar", (avatar) => {
        console.log("Avatar");
        if (currentRoom) {
            const updated = currentRoom.updateAvatar({ id: userId, ...avatar })
            socket.broadcast.to(currentRoom.id).emit("avatar", updated)
            socket.emit("avatar", updated)
        }
    })

    socket.on("removeAvatar", () => {
        if (currentRoom) {
            currentRoom.deleteAvatar(userId)
            console.log("removed")
            socket.broadcast.to(avatar.roomId).emit("removeAvatar", avatar)
        }
    })
}

module.exports = (server) => {
    // Socketio server for real-time communication.
    const io = socketIo(server, { cors: { origin: "*" } })

    io.on("connection", handleConnection)
}
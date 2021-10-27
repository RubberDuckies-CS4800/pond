const socketIo = require("socket.io")
const { getRoom } = require("./rooms")

function handleConnection(socket) {
    let currentRoom = null
    let userId = null

    socket.on("join-room", (roomId, theUserId) => {
        userId = theUserId
        currentRoom = getRoom(roomId)
        socket.join(roomId)

        for (const fig of currentRoom.figures) {
            socket.emit("whiteboard-figure", fig)
        }
        for (const avatar in currentRoom.avatars) {
            socket.emit("avatar", avatar)
        }

        //socket.broadcast sends a message to everyone in the room
        socket.broadcast.to(roomId).emit("user-connected", userId)

        socket.on("disconnect", () => {
            socket.broadcast.to(roomId).emit("user-disconnected", userId)
            currentRoom.deleteAvatar(userId);

            if (_.isEmpty(currentRoom.avatars)) {
                currentRoom.figures.clear()
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
        if (currentRoom) {
            currentRoom.updateAvatar(avatar)
            socket.broadcast.to(currentRoom.id).emit("avatar", avatar)
        }
    })

    socket.on("removeAvatar", (id) => {
        if (currentRoom) {
            currentRoom.deleteAvatar(id)
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
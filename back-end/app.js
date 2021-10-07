// set up server with express
const express = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const { v4: uuidV4 } = require("uuid");

// app.use(express.static("public"));

app.get("/get-room", (req, res) => {
  res.json({ roomId: uuidV4() });
});

// room path
app.get("/:room", (req, res) => {
  res.json({ roomId: req.params.room });
});

// runs anytime someone connects to our webpage
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);

    //socket.broadcast sends a message to everyone in the room
    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});

server.listen(3000);

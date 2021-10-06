// To run, use "nodemon app" in the terminal

const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const { v4: uuidV4 } = require("uuid");

const app = express();
const server = http.Server(app);
const io = socketIo(server);

// example layout for GET
// app.get('/path', (req, res) => {
// })

app.use(express.static('../front-end/dist/'));

// Serve additional pages in the app by returning the compiled app. Vue compiles
// all pages to a single html file.
app.get('*', (req, res) => {
  res.sendFile(path.resolve('../front-end/dist/index.html'))
})

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

// listen for requests
server.listen(8000);
console.log("Listening on port 8000");

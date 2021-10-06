// To run, use "nodemon app" in the terminal

const cors = require('cors');
const express = require("express");
const http = require("http");
const path = require("path");
const { PeerServer } = require("peer");
const socketIo = require("socket.io");
const { v4: uuidV4 } = require("uuid");

const app = express();
const server = http.Server(app);

// Setup CORS so that the frontend served on :8080 can access things on the
// server at :8000.
const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST"]
};

const io = socketIo(server, { cors: corsOptions });

const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);
app.options('*', corsMiddleware);

// example layout for GET
// app.get('/path', (req, res) => {
// })

// Start peerjs on port 8001 (trying to do it on 8000 conflicts with socketIo)
PeerServer(
  { port: 8001 },
  () => {
    console.log("Peer server listening on port 8001")
  }
)

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

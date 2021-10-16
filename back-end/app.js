// Ctrl + c to stop the app
// To run, use "nodemon app" in the terminal

const cors = require('cors')
const path = require('path')
const { v4: uuidV4 } = require('uuid')

const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const socketIo = require('socket.io')
// Socketio server for real-time communication.
const io = socketIo(server, { cors: { origin: '*' } })

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



const whiteboards = {};

function getWhiteboard(id) {
  if (!(id in whiteboards)) {
    whiteboards[id] = { figures: [] };
  }
  return whiteboards[id];
}

io.on("connection", (socket) => {
  let currentRoom = null;
  console.log("connection!!!")
  socket.on("join-room", (roomId, userId) => {
    currentRoom = roomId;
    socket.join(roomId);

    for (const fig of getWhiteboard(roomId).figures) {
      socket.emit('whiteboard-figure', fig)
    }

    //socket.broadcast sends a message to everyone in the room
    socket.broadcast.to(roomId).emit('user-connected', userId)

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });

  socket.on("whiteboard-figure", (fig) => {
    getWhiteboard(currentRoom).figures.push(fig);
    socket.broadcast.to(currentRoom).emit("whiteboard-figure", fig);
  })
});

// Serve frontend files. This is the folder that `npm build` generates when run
// in the frontend.
app.use(express.static('../front-end/dist/'))

// Serve additional pages in the app by returning the compiled app. Vue compiles
// all pages to a single html file.
app.get('*', (req, res) => {
  res.send('hello world')
  // res.sendFile(path.resolve('../front-end/dist/index.html'))
})

module.exports = server

// set up server with express
const express = require("express");
const app = express();

// create a server to be used with socket.io
const server = require("http").Server(app);
// pass the server into socket.io
const io = require("socket.io")(server);

// rename function v4() to uuidV4()
const { v4: uuidV4 } = require("uuid");

// set up how the view is rendered, middleware?
app.set("view engine", "ejs");
app.use(express.static("public"));

// for the home path, create a room
app.get("/", (req, res) => {
  // call uuidV4() to create a dynamic URL
  res.redirect(`/${uuidV4()}`);
});

// room path
app.get("/:room", (req, res) => {
  //:room is passed into res.render as roomId
  // render the view "room" in public (room.ejs)
  res.render("room", { roomId: req.params.room });
});

// runs anytime someone connects to our webpage
io.on("connection", (socket) => {
  // each is an event that is listened to

  // when a user joins a room
  socket.on("join-room", (roomId, userId) => {

    // join the room with the current user
    // when something happens on the room, it will be sent the socket (or user)
    socket.join(roomId);

    // send a message to everyone in the room
    // (except yourself) that this user has connected
    socket.broadcast.to(roomId).emit("user-connected", userId);

    // send a message to everyone in the room
    // that this user has disconnected
    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});

// start up the server on port 3000
server.listen(3000);

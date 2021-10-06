const socket = io("/");

const videoGrid = document.getElementById("video-grid");

// peer server allows us to connect users and gives an ID of a user
const myPeer = new Peer(undefined, {
  // set ID parameter undefined because the server generates it
  host: "/",
  port: "3001",
});

// get the user's video
const myVideo = document.createElement("video");
// mutes the user's own video so they don't hear themselves
myVideo.muted = true;

// keep track of which users have been contacted
const peers = {};

navigator.mediaDevices
  .getUserMedia({
    // get video and audio, send it to other users
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    // when another user tries to call the user
    myPeer.on("call", (call) => {

      // answer and send the user's video stream
      call.answer(stream);

      // add the other user's video
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    // listen for when another user connects
    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

// listen for when another user connects
socket.on("user-disconnected", (userId) => {
  if (peers[userId]) {
    peers[userId].close();
  }
});

// after connection to peer server and getting back id
myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

// send the user's userId and the video stream
function connectToNewUser(userId, stream) {
  // call a user with this ID and send the video stream
  const call = myPeer.call(userId, stream);

  // create a new video element on the page for another user
  const video = document.createElement("video");
  // when another user sends back a stream, add the video
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });

  // when another user leaves the video call, remove the video
  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;

  // once the stream is loaded to the page, play the video
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });

  // add the video to the page
  videoGrid.append(video);
}

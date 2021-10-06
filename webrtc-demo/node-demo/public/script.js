const socket = io("/");

const videoGrid = document.getElementById("video-grid");

const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

// get the user's video
const myVideo = document.createElement("video");
myVideo.muted = true;

// keep track of which users have been contacted
const peers = {};

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    /* 
      when another user tries to call the user:
        1. send the user's video stream
        2. add the other user's video
    */
    myPeer.on("call", (call) => {
      call.answer(stream);

      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

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
  const call = myPeer.call(userId, stream);

  const video = document.createElement("video");
  // when another user sends back a stream, add the video
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });

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

  videoGrid.append(video);
}

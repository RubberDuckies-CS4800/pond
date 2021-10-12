//server.js
const app = require('./app')
const { PeerServer } = require('peer')

// Start peerjs on port 8001 (trying to do it on 8000 conflicts with socketIo)
PeerServer({ port: 8001 }, () => {
  console.log('Peer server listening on port 8001')
})

// listen for requests
app.listen(8000, () => {
  console.log('Listening on port 8000')
})

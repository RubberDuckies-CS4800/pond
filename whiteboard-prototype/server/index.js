const express = require('express')

const app = express()
require('express-ws')(app)

let connectedClients = [];

app.ws('/api/whiteboard', (ws, req) => {
    connectedClients.push(ws)
    ws.on('close', () => {
        // Remove this client from the list of clients.
        connectedClients = connectedClients.filter(c => c !== ws)
    })
    ws.on('message', msg => {
        // Whenever we receive a message, forward it to all other clients.
        // This is a massive Denial Of Service vulnerability but only like 10
        // people are ever going to use it.
        for (const other of connectedClients) {
            if (other !== ws) {
                other.send(msg)
            }
        }
    })
})

app.use(express.static('../public'))

app.listen(8000)

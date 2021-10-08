
const serverConnection = new WebSocket('ws://localhost:8000/api/whiteboard')

serverConnection.addEventListener('message', msg => {
    addElement(JSON.parse(msg.data))
})

function addElementAndBroadcast(spec) {
    if (serverConnection.readyState === serverConnection.OPEN) {
        serverConnection.send(JSON.stringify(spec))
        addElement(spec)
    }
}


let drawingNow = false
let lastPoint = { x: 0, y: 0 }
let wipPath = ''

// Copies the text in the variable wipPath to HTML to be rendered.
function showWipPath() {
    document.getElementById('wipPath').setAttribute('d', wipPath)
}

function onMouseDown(event) {
    if (drawingNow) return; // This can happen if you leave the window while drawing
    drawingNow = true
    lastPoint = mouseToCanvasPosition(event);
    const { x, y } = lastPoint
    wipPath = `M ${x} ${y}`
    showWipPath()
}

function onMouseMove(event) {
    if (!drawingNow) return
    const mousePos = mouseToCanvasPosition(event);
    if (distance(lastPoint, mousePos) > 0.05) {
        lastPoint = mousePos
        const { x, y } = lastPoint
        wipPath += ` L ${x} ${y}`
    }
    showWipPath()
}

function onMouseUp(event) {
    drawingNow = false
    if (wipPath.indexOf('L') === -1) {
        // If the user just clicked, add a dot instead of a line.
        addElementAndBroadcast(dotElement('asdf', lastPoint))
    } else {
        // Otherwise, draw a final line segment to where they let go of the mouse.
        const { x, y } = mouseToCanvasPosition(event);
        wipPath += ` L ${x} ${y}`
        addPathAndBroadcast(dotElement('asdf', wipPath))
    }
    wipPath = ''
    showWipPath()
}

window.addEventListener('DOMContentLoaded', e => {
    whiteboard = document.getElementById('whiteboard');
    whiteboard.addEventListener('mousedown', onMouseDown);
    whiteboard.addEventListener('mousemove', onMouseMove);
    whiteboard.addEventListener('mouseup', onMouseUp);
    addElement(pathElement('wipPath', ''))
})

let whiteboard

// The SVG element's coordinate space is the largest centered 16:9 rectangle
// that can fit on the screen. This converts from mouse coordinates to SVG space
// coordinates.
function mouseToCanvasPosition(mouseEvent) {
    // These are defined on the svg element itself.
    const svgWidth = 16
    const svgHeight = 9
    const svgAspectRatio = svgWidth / svgHeight
    // Location of SVG's origin
    let xOrigin = 0
    let yOrigin = 0
    // How many pixels a single SVG unit corresponds to.
    let scale
    // These are the actual size of the SVG in pixels.
    const containerWidth = whiteboard.clientWidth
    const containerHeight = whiteboard.clientHeight
    const containerAspectRatio = containerWidth / containerHeight

    if (containerAspectRatio > svgAspectRatio) {
        const boxWidth = svgAspectRatio * containerHeight
        xOrigin = (containerWidth - boxWidth) / 2
        scale = containerHeight / svgHeight
    } else {
        const boxHeight = containerWidth / svgAspectRatio
        yOrigin = (containerHeight - boxHeight) / 2
        scale = containerWidth / svgWidth
    }

    return {
        x: (mouseEvent.clientX - xOrigin) / scale,
        y: (mouseEvent.clientY - yOrigin) / scale,
    }
}

// https://stackoverflow.com/questions/6701705/programmatically-creating-an-svg-image-element-with-javascript
function addSvgElement(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) {
        if (k == 'xlink:href') {
            el.setAttributeNS('http://www.w3.org/1999/xlink', 'href', attrs[k]);
        } else {
            el.setAttribute(k, attrs[k]);
        }
    }
    whiteboard.appendChild(el)
}

function addPath(id, data) {
    addSvgElement('path', {
        id,
        d: data,
        style: 'stroke-width:0.02; stroke:white; fill:transparent;'
    })
}

function addDot(id, pos) {
    addSvgElement('circle', {
        id,
        cx: pos.x,
        cy: pos.y,
        r: 0.02,
        style: 'fill:white;'
    })
}

function distance(p1, p2) {
    // Pythagorean theorem
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    return Math.sqrt(dx * dx + dy * dy)
}

let drawing = false
let lastPoint = { x: 0, y: 0 }
let wipPath = ''

// Copies the text in the variable wipPath to HTML to be rendered.
function showWipPath() {
    document.getElementById('wipPath').setAttribute('d', wipPath)
}

function onMouseDown(event) {
    drawing = true
    lastPoint = mouseToCanvasPosition(event);
    const { x, y } = lastPoint
    wipPath = `M ${x} ${y}`
    showWipPath()
}

function onMouseMove(event) {
    if (!drawing) return
    const mousePos = mouseToCanvasPosition(event);
    if (distance(lastPoint, mousePos) > 0.05) {
        lastPoint = mousePos
        const { x, y } = lastPoint
        wipPath += ` L ${x} ${y}`
    }
    showWipPath()
}

function onMouseUp(event) {
    drawing = false
    if (wipPath.indexOf('L') === -1) {
        // If the user just clicked, add a dot instead of a line.
        addDot('asdf', lastPoint)
    } else {
        // Otherwise, draw a final line segment to where they let go of the mouse.
        const { x, y } = mouseToCanvasPosition(event);
        wipPath += ` L ${x} ${y}`
        addPath('asdf', wipPath)
    }
    wipPath = ''
    showWipPath()
}

window.addEventListener('DOMContentLoaded', e => {
    whiteboard = document.getElementById('whiteboard');
    whiteboard.addEventListener('mousedown', onMouseDown);
    whiteboard.addEventListener('mousemove', onMouseMove);
    whiteboard.addEventListener('mouseup', onMouseUp);
    addPath('wipPath', '')
})

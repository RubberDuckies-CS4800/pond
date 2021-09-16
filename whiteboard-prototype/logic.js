
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
        if (k == "xlink:href") {
            el.setAttributeNS('http://www.w3.org/1999/xlink', 'href', attrs[k]);
        } else {
            el.setAttribute(k, attrs[k]);
        }
    }
    whiteboard.appendChild(el)
}

let drawing = false

function onMouseDown(event) {
    drawing = true
    let { x, y } = mouseToCanvasPosition(event);
    addSvgElement('circle', { cx: x, cy: y, r: '0.1', style: "fill:white" })
}

function onMouseMove(event) {
    if (!drawing) return
    let { x, y } = mouseToCanvasPosition(event);
    addSvgElement('circle', { cx: x, cy: y, r: '0.1', style: "fill:white" })
}

function onMouseUp(event) {
    drawing = false
}

window.addEventListener('DOMContentLoaded', e => {
    whiteboard = document.getElementById('whiteboard');
    whiteboard.addEventListener('mousedown', onMouseDown);
    whiteboard.addEventListener('mousemove', onMouseMove);
    whiteboard.addEventListener('mouseup', onMouseUp);
})

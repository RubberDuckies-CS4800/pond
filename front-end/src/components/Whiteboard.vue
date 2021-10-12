<template>
  <div>
    <svg 
        viewBox="0 0 16 9" 
        id="whiteboard" 
        ref="whiteboard"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
    >
      <!-- <rect width="16" height="9" style="stroke: red; stroke-width: 0.01" /> -->
      <path id="wipPath" />
    </svg>
  </div>
</template>

<script>
import { state } from "@/backend/peers";

export default {
  name: "Whiteboard",
  computed: {
    streams() {
      return state.streams;
    },
  },
  data() {
    return {
      drawingNow: false,
      lastPoint: { x: 0, y: 0 },
      wipPath: "",
    };
  },
  methods: {
    // The SVG element's coordinate space is the largest centered 16:9 rectangle
    // that can fit on the screen. This converts from mouse coordinates to SVG space
    // coordinates.
    mouseToCanvasPosition(mouseEvent) {
      // These are defined on the svg element itself.
      const svgWidth = 16;
      const svgHeight = 9;
      const svgAspectRatio = svgWidth / svgHeight;
      // Location of SVG's origin
      let xOrigin = 0;
      let yOrigin = 0;
      // How many pixels a single SVG unit corresponds to.
      let scale;
      // These are the actual size of the SVG in pixels.
      const containerWidth = this.$refs.whiteboard.clientWidth;
      const containerHeight = this.$refs.whiteboard.clientHeight;
      const containerAspectRatio = containerWidth / containerHeight;

      if (containerAspectRatio > svgAspectRatio) {
        const boxWidth = svgAspectRatio * containerHeight;
        xOrigin = (containerWidth - boxWidth) / 2;
        scale = containerHeight / svgHeight;
      } else {
        const boxHeight = containerWidth / svgAspectRatio;
        yOrigin = (containerHeight - boxHeight) / 2;
        scale = containerWidth / svgWidth;
      }

      return {
        x: (mouseEvent.clientX - xOrigin) / scale,
        y: (mouseEvent.clientY - yOrigin) / scale,
      };
    },

    // https://stackoverflow.com/questions/6701705/programmatically-creating-an-svg-image-element-with-javascript
    addSvgElement(tag, attrs) {
      const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
      for (const k in attrs) {
        if (k == "xlink:href") {
          el.setAttributeNS("http://www.w3.org/1999/xlink", "href", attrs[k]);
        } else {
          el.setAttribute(k, attrs[k]);
        }
      }
      this.$refs.whiteboard.appendChild(el);
    },

    addElement(spec) {
      this.addSvgElement(spec.tag, spec.attrs);
    },

    pathElement(id, data) {
      return {
        tag: "path",
        attrs: {
          id,
          d: data,
          style: "stroke-width:0.02; stroke:white; fill:transparent;",
        },
      };
    },

    dotElement(id, pos) {
      return {
        tag: "circle",
        attrs: {
          id,
          cx: pos.x,
          cy: pos.y,
          r: 0.02,
          style: "fill:white;",
        },
      };
    },

    distance(p1, p2) {
      // Pythagorean theorem
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    },

    // Copies the text in the variable wipPath to HTML to be rendered.
    showWipPath() {
      document.getElementById("wipPath").setAttribute("d", this.wipPath);
    },

    onMouseDown(event) {
      if (this.drawingNow) return; // This can happen if you leave the window while drawing
      this.drawingNow = true;
      this.lastPoint = this.mouseToCanvasPosition(event);
      const { x, y } = this.lastPoint;
      this.wipPath = `M ${x} ${y}`;
      this.showWipPath();
    },

    onMouseMove(event) {
      if (!this.drawingNow) return;
      const mousePos = this.mouseToCanvasPosition(event);
      if (this.distance(this.lastPoint, mousePos) > 0.05) {
        this.lastPoint = mousePos;
        const { x, y } = this.lastPoint;
        this.wipPath += ` L ${x} ${y}`;
      }
      this.showWipPath();
    },

    onMouseUp(event) {
      this.drawingNow = false;
      if (this.wipPath.indexOf("L") === -1) {
        // If the user just clicked, add a dot instead of a line.
        this.addElement(this.dotElement("asdf", this.lastPoint));
      } else {
        // Otherwise, draw a final line segment to where they let go of the mouse.
        const { x, y } = this.mouseToCanvasPosition(event);
        this.wipPath += ` L ${x} ${y}`;
        this.addElement(this.pathElement("asdf", this.wipPath));
      }
      this.wipPath = "";
      this.showWipPath();
    },
  },
};
</script>

<style>
#whiteboard {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>

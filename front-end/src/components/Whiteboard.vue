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
      <WhiteboardFigure
        type="path"
        :attributes="{ style: lineStyle, d: wipPath }"
      />
      <WhiteboardFigure
        v-for="figure in figures"
        :key="figure.id"
        :type="figure.type"
        :attributes="figure.attributes"
      />
    </svg>
  </div>
</template>

<script>
import { state } from "@/backend/peers";
import { sendWhiteboardFigure, onWhiteboardFigure } from "@/backend/socket";
import WhiteboardFigure from "./WhiteboardFigure.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  components: { WhiteboardFigure },
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
      figures: [],
      wipPath: "",
      lineStyle: "stroke-width:0.02; stroke:white; fill:transparent;",
      fillStyle: "fill:white;",
    };
  },
  mounted() {
    onWhiteboardFigure((fig) => this.figures.push(fig));
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

    addElement(spec) {
      const figure = {
        id: uuidv4(),
        type: spec.tag,
        attributes: spec.attrs,
      };
      this.figures.push(figure);
      sendWhiteboardFigure(figure);
    },

    pathElement(data) {
      return {
        tag: "path",
        attrs: {
          d: data,
          style: "stroke-width:0.02; stroke:white; fill:transparent;",
        },
      };
    },

    dotElement(pos) {
      return {
        tag: "circle",
        attrs: {
          cx: pos.x,
          cy: pos.y,
          r: 0.05,
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

    onMouseDown(event) {
      if (this.drawingNow) return; // This can happen if you leave the window while drawing
      this.drawingNow = true;
      this.lastPoint = this.mouseToCanvasPosition(event);
      const { x, y } = this.lastPoint;
      this.wipPath = `M ${x} ${y}`;
    },

    onMouseMove(event) {
      if (!this.drawingNow) return;
      const mousePos = this.mouseToCanvasPosition(event);
      if (this.distance(this.lastPoint, mousePos) > 0.05) {
        this.lastPoint = mousePos;
        const { x, y } = this.lastPoint;
        this.wipPath += ` L ${x} ${y}`;
      }
    },

    onMouseUp(event) {
      this.drawingNow = false;
      if (this.wipPath.indexOf("L") === -1) {
        // If the user just clicked, add a dot instead of a line.
        this.addElement(this.dotElement(this.lastPoint));
      } else {
        // Otherwise, draw a final line segment to where they let go of the mouse.
        const { x, y } = this.mouseToCanvasPosition(event);
        this.wipPath += ` L ${x} ${y}`;
        this.addElement(this.pathElement(this.wipPath));
      }
      this.wipPath = "";
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

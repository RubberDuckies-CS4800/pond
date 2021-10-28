<template>
  <v-avatar
    size="120"
    :id="userId"
    :style="`height: 90px; min-width: 90px; width: 90px; top: ${top}px; left:${left}px;`"
    @mousedown="onMouseDown($event)"
    >{{ initials }}
  </v-avatar>
</template>

<script>
// import VideoStream from "@/components/VideoStream";
import { state } from "@/backend/peers";
// import { switchRoom } from "../backend/peers";
import { updateAvatar } from "@/backend/socket";

export default {
  props: {
    userId: String,
    name: String,
    top: Number,
    left: Number,
    // cameraOn: Boolean,
    // roomId: String,
  },
  data() {
    return {
      dragOffsetX: 0.0,
      dragOffsetY: 0.0,
    };
  },
  computed: {
    initials() {
      return (
        this.name
          .split(" ")
          .map((x) => x.charAt(0))
          .slice(0, 2)
          .join(". ")
          .toUpperCase() + "."
      );
    },
    streams() {
      return state.streams;
    },
    draggable() {
      return state.myId === this.userId;
    },
  },
  methods: {
    // moveElem(document.getElementById(), this.id, this.roomId, this.initials);
    onMouseDown(e) {
      if (this.userId !== state.myId) return;
      e.preventDefault();
      document.onmouseup = () => this.onMouseUp();
      document.onmousemove = (e) => this.onMouseMove(e);
      this.dragOffsetX = e.clientX - this.left;
      this.dragOffsetY = e.clientY - this.top;
    },
    onMouseMove(e) {
      e.preventDefault();
      updateAvatar({
        left: e.clientX - this.dragOffsetX,
        top: e.clientY - this.dragOffsetY,
      });
    },

    onMouseUp() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
</script>

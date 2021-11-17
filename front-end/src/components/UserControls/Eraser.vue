<template>
  <v-btn :color="enabled ? '#00FF00' : '#FFFFFF'" x-large icon @click="toggle">
    <v-icon>mdi-eraser</v-icon>
  </v-btn>
</template>

<script>
import whiteboardState from "@/backend/whiteboardState";

export default {
  data() {
    return {
      drawingOn: true,
    };
  },
  computed: {
    enabled() {
      return whiteboardState.erasing;
    },
  },
  methods: {
    toggle() {
      whiteboardState.drawing = false;
      whiteboardState.erasing ^= true;
    },
  },
};
</script>

<style scoped>
</style>
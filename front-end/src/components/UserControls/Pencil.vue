<template>
  <v-btn :color="enabled ? '#00FF00' : '#FFFFFF'" x-large icon @click="toggle">
    <v-icon>mdi-pencil</v-icon>
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
      return whiteboardState.drawing;
    },
  },
  methods: {
    toggle() {
      whiteboardState.drawing ^= true;
      whiteboardState.erasing = false;
    },
  },
};
</script>

<style scoped>
</style>
<template>
  <v-container>
    <v-btn-toggle v-model="toggle_multiple" dense dark multiple>
      <v-btn :color="drawingOn ? '#00008b' : 'dark'" @click="toggleDraw">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <!-- Not muted -->
      <v-btn v-if="audioOn" @click="toggleMute">
        <v-icon>mdi-microphone</v-icon>
      </v-btn>
      <!-- Muted -->
      <v-btn v-else color="#8b0000" @click="toggleMute">
        <v-icon>mdi-microphone-off</v-icon>
      </v-btn>

      <!-- Camera off -->
      <v-btn v-if="cameraOn" @click="toggleCamera">
        <v-icon>mdi-camera</v-icon>
      </v-btn>

      <!-- Camera on -->
      <v-btn v-else color="#8b0000" @click="toggleCamera">
        <v-icon>mdi-camera-off</v-icon>
      </v-btn>

      <v-btn @click="exitRoom">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-container>
</template>

<script>
import { setAudioEnabled, setVideoEnabled } from "@/backend/socket";

export default {
  data() {
    return {
      audioOn: false,
      cameraOn: false,
      drawingOn: true,
      toggle_multiple: [],
    };
  },
  methods: {
    toggleMute() {
      this.audioOn = !this.audioOn;
      setAudioEnabled(this.audioOn);
    },
    toggleCamera() {
      this.cameraOn = !this.cameraOn;
      setVideoEnabled(this.cameraOn);
      this.$emit("toggle_cam", this.cameraOn);
    },
    toggleDraw() {
      this.drawingOn = !this.drawingOn;
      this.$emit("setWhiteboardActive", this.drawingOn)
    },
    exitRoom() {
      console.log("Trying to exit the current room.");
      // some other functionality goes here
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>
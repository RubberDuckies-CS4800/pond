<template>
  <v-card>
    <v-list-item-content class="justify-center">
      <div class="mx-auto text-center">
        <v-avatar color="brown">
          <span class="white--text text-h7">{{ initials }}</span>
        </v-avatar>
        <v-spacer></v-spacer>
        <h3>{{ name }}</h3>
        <v-divider class="my-3"></v-divider>
        <caption class="text-thing">
          Volume
        </caption>
        <v-slider
          v-model="audio"
          thumb-label
          :prepend-icon="audioIcon"
          @click:prepend="mute"
          @change="checkIfMute"
        ></v-slider>

        <caption align="left">
          Video
        </caption>

        <v-switch v-model="video" prepend-icon="mdi-video"></v-switch>
        <v-divider class="my-3"></v-divider>
        <v-btn depressed rounded text disabled>Kick User</v-btn>
      </div>
    </v-list-item-content>
  </v-card>
</template>

<script>
export default {
  props: {
    name: String,
    initials: String,
  },
  data: () => ({
    audio: 50,
    audioPrev: 0,
    audioIcon: "mdi-volume-high",
    video: true,
  }),
  methods: {
    mute() {
      if (this.audioPrev == 0) {
        this.audioPrev = this.audio;
        this.audio = 0;
        this.audioIcon = "mdi-volume-mute";
      } else {
        this.audio = this.audioPrev;
        this.audioPrev = 0;
        this.audioIcon = "mdi-volume-high";
      }
    },
    checkIfMute() {
      if (this.audio == 0) {
        this.audioIcon = "mdi-volume-mute";
      } else {
        this.audioIcon = "mdi-volume-high";
      }
    },
  },
};
</script>

<style>
</style>
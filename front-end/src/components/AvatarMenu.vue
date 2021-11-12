<template>
  <v-container>
    <v-list-item-content class="justify-center">
      <div class="mx-auto text-center">
        <v-avatar :color="`rgb(${color.r},${color.g},${color.b})`">
          <span class="white--text text-h7">{{ initials }}</span>
        </v-avatar>
        <v-spacer></v-spacer>
        <h3>{{ name }}</h3>
        <div v-if="!isMyAvatar">
          <v-divider class="my-3"></v-divider>
          <caption class="text-thing">
            Volume
          </caption>
          <!-- <v-container> -->
          <v-slider
            v-model="volume"
            thumb-label
            thumb-size="32"
            :prepend-icon="volumeIcon"
            @click:prepend="mute"
            @change="setVolume"
          ></v-slider>
          <!-- </v-container> -->
          <caption align="left">
            Video
          </caption>

          <v-switch v-model="enableVideo" prepend-icon="mdi-video" @click="setEnableVideo"></v-switch>

          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text :disabled="!hostPrivilege">Kick User</v-btn>
        </div>
      </div>
    </v-list-item-content>
  </v-container>
</template>

<script>
export default {
  props: {
    name: String,
    initials: String,
    color: Object,
    isMyAvatar: Boolean,
    hostPrivilege: Boolean,
  },
  data: () => ({
    volume: 50,
    volumePrev: 50,
    volumeIcon: "mdi-volume-high",
    enableVideo: true,
  }),
  methods: {
    mute() {
      if (this.volume == 0) {
        this.volume = this.volumePrev;
      } else {
        this.volumePrev = this.volume;
        this.volume = 0;
      }
      this.checkIfMute();
      this.$emit("changeVolume", this.volume);
    },
    setVolume() {
      this.checkIfMute();
      this.$emit("changeVolume", this.volume);
    },
    checkIfMute() {
      if (this.volume == 0) {
        this.volumeIcon = "mdi-volume-mute";
      } else {
        this.volumeIcon = "mdi-volume-high";
      }
    },
    setEnableVideo() {
      this.$emit("setEnableVideo", this.enableVideo);
    }
  },
};
</script>

<style>
</style>
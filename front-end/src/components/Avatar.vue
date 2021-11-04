<template>
  <v-container fluid style="height: 300px">
    <v-row justify="center">
      <!-- <h1>volume: {{ scaledVolume }}</h1> -->
      <v-menu bottom rounded offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-avatar
            size="120"
            :style="`height: 90px; min-width: 90px; width: 90px; top: ${avatar.top}px; left:${avatar.left}px; position: absolute;`"
            v-on="on"
            @mousedown="onMouseDown($event)"
          >
            <div v-if="!stream || !avatar.video || !enableVideo">
              {{ initials }}
            </div>
            <VideoStream
              :stream="stream"
              v-if="stream && avatar.video && (enableVideo || isMyAvatar)"
              :muted="isMyAvatar || volume == 0"
              :volume="scaledVolume"
            />
            <div style="display: none">
              <VideoStream
                :stream="stream"
                v-if="stream && !avatar.video && avatar.audio"
                :muted="isMyAvatar || volume == 0"
                :volume="scaledVolume"
              />
            </div>
          </v-avatar>
        </template>

        <v-card style="width: 200px; padding: 5px">
          <v-container>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <span class="white--text text-h7">{{ initials }}</span>
                </v-avatar>
                <v-spacer></v-spacer>
                <h3>{{ avatar.name }}</h3>
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
                    @change="checkIfMute"
                  ></v-slider>
                  <!-- </v-container> -->
                  <caption align="left">
                    Video
                  </caption>

                  <v-switch
                    v-model="enableVideo"
                    prepend-icon="mdi-video"
                  ></v-switch>

                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text disabled>Kick User</v-btn>
                </div>
              </div>
            </v-list-item-content>
          </v-container>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
import VideoStream from "@/components/VideoStream";
import { state } from "@/backend/peers";
import { updateAvatar, removeAvatar } from "@/backend/socket";
// import AvatarMenu from "./AvatarMenu.vue";

export default {
  components: {
    VideoStream,
    // AvatarMenu,
  },
  props: {
    avatar: Object,
  },
  data() {
    return {
      dragOffsetX: 0.0,
      dragOffsetY: 0.0,
      volume: 50,
      volumePrev: 50,
      volumeIcon: "mdi-volume-high",
      enableVideo: true,
      // avatarMenuOn: false,
    };
  },
  computed: {
    initials() {
      return (
        (this.avatar.name || "")
          .split(" ")
          .map((x) => x.charAt(0))
          .slice(0, 2)
          .join(". ")
          .toUpperCase() + "."
      );
    },
    stream() {
      for (const stream of state.streams) {
        if (stream.peer.indexOf(this.avatar.id) !== -1) {
          return stream;
        }
      }
      return null;
    },
    isMyAvatar() {
      return state.myId === this.avatar.id;
    },
    scaledVolume() {
      return this.volume / 100;
    },
  },
  mounted() {
    window.addEventListener(
      "contextmenu",
      (e) => {
        e.preventDefault();
      },
      false
    );
  },
  methods: {
    // moveElem(document.getElementById(), this.id, this.roomId, this.initials);
    onMouseDown(e) {
      if (!this.isMyAvatar) return;
      e.preventDefault();
      document.onmouseup = () => this.onMouseUp();
      document.onmousemove = (e) => this.onMouseMove(e);
      this.dragOffsetX = e.clientX - this.avatar.left;
      this.dragOffsetY = e.clientY - this.avatar.top;
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
    mute() {
      if (this.volume == 0) {
        this.volume = this.volumePrev;
        this.volumeIcon = "mdi-volume-high";
      } else {
        this.volumePrev = this.volume;
        this.volume = 0;
        this.volumeIcon = "mdi-volume-mute";
      }
    },
    checkIfMute() {
      if (this.volume == 0) {
        this.volumeIcon = "mdi-volume-mute";
      } else {
        this.volumeIcon = "mdi-volume-high";
      }
    },
  },
  beforeDestroy() {
    if (this.isMyAvatar) {
      removeAvatar(this.avatar.id);
    }
  },
};
</script>

<style scoped>
.v-avatar {
  background: rgb(17, 204, 157);
}
</style>

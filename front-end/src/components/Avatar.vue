<template>
  <div>
    <v-avatar
      size="120"
      :style="`height: 90px; min-width: 90px; width: 90px; top: ${avatar.top}px; left:${avatar.left}px; position: absolute;`"
      @mousedown="onMouseDown($event)"
      @click.right="toggleAvatarMenu"
    >
      <div v-if="!stream || !avatar.video">
        {{ initials }}
      </div>
      <VideoStream
        :stream="stream"
        v-if="stream && avatar.video"
        :muted="isMyAvatar"
      />
      <div style="display: none">
        <VideoStream
          :stream="stream"
          v-if="stream && !avatar.video && avatar.audio"
          :muted="isMyAvatar"
        />
      </div>
    </v-avatar>
    <AvatarMenu
      v-if="avatarMenuOn"
      :name="avatar.name"
      :initials="initials"
      :style="`height: 300px; width: 300px; top: ${avatar.top}px; left:${avatar.left}px; position: absolute;`"
    />
  </div>
</template>

<script>
import VideoStream from "@/components/VideoStream";
import { state } from "@/backend/peers";
import { updateAvatar, removeAvatar } from "@/backend/socket";
import AvatarMenu from "./AvatarMenu.vue";

export default {
  components: {
    VideoStream,
    AvatarMenu,
  },
  props: {
    avatar: Object,
  },
  data() {
    return {
      dragOffsetX: 0.0,
      dragOffsetY: 0.0,
      avatarMenuOn: false,
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
    toggleAvatarMenu() {
      this.avatarMenuOn = !this.avatarMenuOn;
    },
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

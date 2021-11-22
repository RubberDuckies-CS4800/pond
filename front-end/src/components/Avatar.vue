<template>
  <!-- <h1>volume: {{ scaledVolume }}</h1> -->
  <v-menu bottom rounded offset-y :close-on-content-click="false" z-index="50">
    <template v-slot:activator="{ on }">
      <v-avatar
        :class="{
          isMyAvatar: isMyAvatar,
          talking: talking && avatar.audio,
        }"
        size="120"
        :style="`height: 90px; min-width: 90px; width: 90px; top: ${avatar.top}px; left:${avatar.left}px; position:absolute;`"
        @contextmenu.prevent="on.click"
        @mousedown="onMouseDown($event)"
        :color="`rgb(${color.r},${color.g},${color.b})`"
      >
        <AvatarInside
          :avatar="avatar"
          :initials="initials"
          :volume="scaledVolume"
          :enableVideo="enableVideo"
          @talking="setTalking($event)"
        />
      </v-avatar>
    </template>

    <v-card class="avatar-card" style="width: 200px; padding: 5px">
      <AvatarMenu
        :name="avatar.name"
        :initials="initials"
        :color="color"
        :isMyAvatar="isMyAvatar"
        :hostPrivilege="isHost"
        @changeVolume="changeVolume"
        @setEnableVideo="setEnableVideo"
      />
    </v-card>
  </v-menu>
</template>

<script>
import AvatarInside from "@/components/AvatarInside";
import AvatarMenu from "@/components/AvatarMenu";
import { state } from "@/backend/peers";
import { updateAvatar } from "@/backend/socket";

export default {
  components: {
    AvatarInside,
    AvatarMenu,
  },
  props: {
    avatar: Object,
    isHost: Boolean,
  },
  data() {
    return {
      dragOffsetX: 0.0,
      dragOffsetY: 0.0,
      talking: false,
      volume: 50,
      enableVideo: true,
      color: { r: 93, g: 111, b: 199 },
    };
  },
  created() {
    this.color = this.getRandColor();
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
    isMyAvatar() {
      return state.myId === this.avatar.id;
    },
    scaledVolume() {
      return this.volume / 100;
    },
  },
  methods: {
    setTalking(to) {
      this.talking = to;
      // console.log(this.talking)
    },
    getRandColor() {
      const colors = [
        { r: 93, g: 111, b: 199 },
        { r: 164, g: 93, b: 199 },
        { r: 199, g: 93, b: 151 },
        { r: 199, g: 93, b: 93 },
        { r: 199, g: 153, b: 93 },
        { r: 178, g: 199, b: 93 },
        { r: 104, g: 199, b: 93 },
        { r: 93, g: 199, b: 164 },
        { r: 93, g: 180, b: 199 },
        { r: 93, g: 129, b: 199 },
      ];

      let colorIndex = Math.floor(Math.random() * colors.length);
      let randColor = colors[colorIndex];
      return randColor;
    },
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
    changeVolume(volume) {
      this.volume = volume;
    },
    setEnableVideo(value) {
      this.enableVideo = value;
    },
  },
  updated() {
    if (this.isMyAvatar) {
      this.volume = 0; // prevents you from hearing yourself (might take a second to complete)
    }
  },
};
</script>

<style>
.talking {
  border: 0.3rem solid lime;
  border-color: lime !important;
}
</style>

<style scoped>
.v-avatar {
  z-index: 10;
}
.isMyAvatar {
  z-index: 20;
  cursor: move;
  cursor: grab;
}
.isMyAvatar:active {
  cursor: grabbing;
}
.avatar-card {
  z-index: 30;
}
</style>

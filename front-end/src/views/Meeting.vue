<template>
  <div class="hello">
    <h1>Meeting Room</h1>
    <p>{{ streams.length }} users are connected</p>
    <p v-if="!myStreamIsOk">
      You have not given Pond permission to use your microphone or webcam
    </p>
    <Whiteboard />
    <!-- <VideoStream v-for="stream in streams" :key="stream.id" :stream="stream" /> -->
    <Avatars :name="myName" :roomId="roomId" :cameraOn="cameraOn" />
    <div id="user_controls">
      <UserControls @toggle_cam="toggleCam" />
    </div>
  </div>
</template>

<script>
import { state } from "@/backend/peers";
// import VideoStream from "@/components/VideoStream";
import Whiteboard from "../components/Whiteboard.vue";
import Avatars from "../components/Avatars.vue";
import UserControls from '../components/UserControls.vue';

export default {
  components: {
    // VideoStream,
    Whiteboard,
    Avatars,
    UserControls,
  },
  data() {
    return {
      cameraOn: true,
    };
  },
  name: "Meeting",
  props: {
    msg: String,
  },
  methods: {
    toggleCam(e) {
      this.cameraOn = e;
    },
  },
  computed: {
    streams() {
      return state.streams;
    },
    myName() {
      return state.myName;
    },
    roomId() {
      return state.roomId;
    },
    myStreamIsOk() {
      return state.myStreamIsOk;
    },
  },
  mounted() {
    if (state.roomId === null) {
      this.$router.push("/");
    }
  },
};
</script>
<style>
#user_controls {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>

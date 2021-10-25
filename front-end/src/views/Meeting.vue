<template>
  <div class="hello">
    <h1>Meeting Room</h1>
    <p>{{ streams.length }} users are connected</p>
    <p v-if="!myStreamIsOk">
      You have not given Pond permission to use your microphone or webcam
    </p>
    <Whiteboard />
    <VideoStream v-for="stream in streams" :key="stream.id" :stream="stream" />
    <Avatar :name="myName" />
    <UserControls />
  </div>
</template>

<script>
import { state } from "@/backend/peers";
import VideoStream from "@/components/VideoStream";
import Whiteboard from "../components/Whiteboard.vue";
import Avatar from "../components/Avatar.vue";
import UserControls from "../components/UserControls.vue";

export default {
  components: {
    VideoStream,
    Whiteboard,
    Avatar,
    UserControls,
  },
  name: "Meeting",
  props: {
    msg: String,
  },
  computed: {
    streams() {
      return state.streams;
    },
    myName() {
      return state.myName;
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

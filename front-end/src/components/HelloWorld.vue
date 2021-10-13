<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>There are {{ streams.length }} streams</p>
    <VideoStream v-for="stream in streams" :key="stream.id" :stream="stream" />
    <Whiteboard />
  </div>
</template>

<script>
import { state } from "@/backend/peers";
import VideoStream from "@/components/VideoStream";
import Whiteboard from "./Whiteboard.vue";

export default {
  components: {
    VideoStream,
    Whiteboard,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    streams() {
      return state.streams;
    },
  },
  mounted () {
    if (state.roomId === null) {
      this.$router.push('/')
    }
  }
};
</script>

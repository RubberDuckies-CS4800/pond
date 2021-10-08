<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>There are {{ streams.length }} streams</p>
    <VideoStream v-for="stream in streams" :key="stream.id" :stream="stream"/>
  </div>
</template>

<script>
import { state } from "@/backend/peers";
import VideoStream from "@/components/VideoStream";

export default {
  components:{
    VideoStream,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    streams() {
      console.log(state.streams);
      return state.streams;
    },
  },
};
</script>

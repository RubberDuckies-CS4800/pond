<template>
  <div class="hello">
    <h1>Meeting Room</h1>
    <p>There are {{ streams.length }} streams</p>
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
import Avatar from '../components/Avatar.vue';
import UserControls from '../components/UserControls.vue';

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
    }
  },
  mounted() {
    if (state.roomId === null) {
      this.$router.push("/");
    }
  },
};
</script>

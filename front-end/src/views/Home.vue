<template>
  <div class="wrapper">
    <HomeOptions class="center-widget" />
    <HomeGraphics class="graphics" />
    <div id="host_meeting_wrapper" flex align="center" justify="center">
      <v-btn id="host_meeting_btn" rounded @click="hostMeeting"> Host Meeting </v-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeOptions from "@/components/HomeOptions.vue";
import HomeGraphics from "@/components/HomeGraphics.vue";
export default {
  components: {
    HomeOptions,
    HomeGraphics
  },
  methods: {
    hostMeeting() {
        this.$router.push('/host');
    }
  }
};
</script>
<style scoped>

.graphics {
  position: fixed;
}

.center-widget {
  z-index: 10;
  /* position: relative;
  top: 50%; */
}

.wrapper {
  display: grid;
  text-align: center;
}

.submit {
  justify-content: center;
}
.meeting_input {
  display: inline-block;
  height: 40%;
}

#host_meeting_wrapper {
  width: 100%;
  align-items: center;
  justify-content: center;
  top: 80%;
  position: absolute;
}

#host_meeting_btn {
  background-color: #FAD423;
}
</style>

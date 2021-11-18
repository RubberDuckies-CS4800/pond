<template>
  <div class="home-options">
    <v-row justify="center">
      <h1 class="title-text">Pond</h1>
    </v-row>
    <v-container flex align="center" justify="center">
      <v-card flex class="meeting_input mx-auto px-auto" outlined>
        <v-text-field
          placeholder="Enter Meeting Code"
          v-model="code"
          solo
        ></v-text-field>
        <v-row justify="center">
          <v-btn class="btn-bottom" @click="joinRoom">ENTER</v-btn>
        </v-row>
        <v-row justify="center">
          <h4 class="btn-footer" @click="hostMeeting">Create a Room</h4>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { switchRoom } from "@/backend/peers";
export default {
  data() {
    return {
      code: null,
      name: null,
      reveal: false,
    };
  },
  methods: {
    submitCode() {
      this.reveal = true;
    },
    joinRoom() {
      this.$router.push("/meeting");
      switchRoom(this.code, this.name, false);
    },
    hostMeeting() {
      this.$router.push("/host");
    },
  },
};
</script >

<style scoped>
.home-options {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.btn-footer {
  cursor: pointer;
}
.meeting_input {
  display: inline-block;
}
</style>
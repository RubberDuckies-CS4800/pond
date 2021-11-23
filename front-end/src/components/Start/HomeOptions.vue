<template>
  <div class="home-options">
    <v-row justify="center">
      <h1 class="title-text">Pond</h1>
    </v-row>
    <v-container flex align="center" justify="center">
      <v-card v-if="name_card" id="user_input_details" flex class="meeting_input mx-auto px-auto" outlined>
        <v-text-field
          placeholder="Enter Name"
          v-model="name"
          solo
        ></v-text-field>
        <v-row justify="center">
          <v-btn class="btn-bottom" @click="submitName">ENTER</v-btn>
        </v-row>
      </v-card>
      <v-card v-else id="user_input_details" flex class="meeting_input mx-auto px-auto" outlined>
        <v-text-field
          placeholder="Enter Meeting Code"
          v-model="code"
          solo
        ></v-text-field>
        <v-row justify="center">
          <v-btn class="btn-bottom" @click="joinRoom">JOIN</v-btn>
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
      name_card: true,
      code: null,
      name: null,
      reveal: false,
    }
  },
  methods: {
    submitName() {
      this.name_card = false;
    },
    joinRoom() {
        this.$router.push('/meeting');
        console.log(this.code, this.name)
        switchRoom(this.code, this.name, false);
    }
  },
};
</script >

<style scoped>
#user_input_details {
  height: 120px;
}

h1 {
  color: white;
  font-size: 100px;
}
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
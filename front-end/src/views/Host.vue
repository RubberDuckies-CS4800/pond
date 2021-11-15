<template>
  <div class="host">
        <div class="meeting_code_vertical_wrapper">
            <h2>Meeting Code: </h2>
            <h1 id="copy_meeting"> {{ roomId }} </h1>
            <v-btn id="copy_meeting_id_btn" rounded @click='copyMeetingId'> Copy </v-btn>
        </div>
        <div id="host_join_wrapper" align="center" justify="center">
            <v-text-field v-model="hostName" id="host_name" placeholder="Name" solo @input='validateName'></v-text-field>
            <v-btn :disabled="checkName" id="join_meeting_host_btn" rounded @click="joinRoom"> Join Meeting As Host </v-btn>
        </div>
  </div>
  
</template>
<script>
import { switchRoom } from "@/backend/peers"
export default {
    data() {
        return {
        checkName: true,
        hostName: "",
        roomId: ""
        }
    },
    created() {
        this.roomId = this.generateRoomId()
    },
    methods: {
         generateRoomId() {
            var meetingCode = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 8; i++ ) {
                meetingCode += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return meetingCode;
        },
        copyMeetingId() {
            console.log("meeting code copied")
            var text = this.roomId;
            var elem = document.createElement("textarea");
            document.body.appendChild(elem);
            elem.value = text;
            elem.select();
            document.execCommand("copy");
            document.body.removeChild(elem);
        },
        joinRoom() {
            switchRoom(this.roomId, this.hostName, true);
            this.$router.push('/meeting');
        },
        validateName() {
            if(this.hostName.length > 0) {
                this.checkName = false
            } else {
                this.checkName = true
            }
        }
    }
}
</script>
<style scoped>
.meeting_code_vertical_wrapper {
    margin: 0;
    position: absolute;
    top: 40%;
    width: 100%;
}

#host_join_wrapper {
  width: 100%;
  align-items: center;
  justify-content: center;
  top: 60%;
  position: absolute;
}

#copy_meeting_id_btn {
    background-color: transparent;
}

h2 {
    font-size: xx-large;
}

h1 {
    font-size: xxx-large;
}

#host_name {
    width: 30%;
    align-items: center;
    justify-content: center;
    padding: 10%;
}

.v-input {
    width: 30%
}
</style>
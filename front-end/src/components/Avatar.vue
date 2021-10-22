<template>
  <div>
    <!-- vuetify's avatar component for nicer look and easier use -->
    <v-avatar id="current_user" size="90">
      <!-- using user's initial's from reigstration -->
      {{ initials }}
    </v-avatar>
    <!-- <v-avatar v-for="avatar in avatars" :key="avatar.id"></v-avatar> -->
    <!-- <h3>stuff</h3> -->
    <!-- <h3>{{ avatars }}</h3>
    <p></p> -->
    <h3 v-for="avatar in avatars" :key="avatar.id">
      <v-avatar
        :id="avatar.id"
        :style="`height: 90px; min-width: 90px; width: 90px; top: ${avatar.top}; left:${avatar.left};`"
      ></v-avatar>
      id: {{ avatar.id }}, top: {{ avatar.top }}, left: {{ avatar.left }}
    </h3>
  </div>
</template>

<script>
import {
  sendAvatar,
  onAvatar,
  removeAvatar,
  onRemoveAvatar,
} from "@/backend/socket";
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    name: String,
    roomId: String,
  },
  computed: {
    initials() {
      return (
        this.name
          .split(" ")
          .map((x) => x.charAt(0))
          .slice(0, 2)
          .join(". ")
          .toUpperCase() + "."
      );
    },
  },
  data() {
    return {
      avatars: {},
      id: null,
    };
  },
  mounted() {
    this.id = uuidv4();
    let current_user_avatar = {
      id: this.id,
      roomId: this.roomId,
      top: 0,
      left: 0,
    };
    sendAvatar(current_user_avatar);
    onAvatar((avatar) => {
      if (avatar.id) {
        if (this.id != avatar.id) {
          this.$set(this.avatars, avatar.id, {
            id: avatar.id,
            roomId: avatar.roomId,
            top: avatar.top,
            left: avatar.left,
          });
        }
      }
      // console.log(JSON.stringify(this.avatars));
    });
    onRemoveAvatar((avatar) => {
      console.log("remove avatar")
      this.$delete(this.avatars, avatar.id)
    });

    moveElem(document.getElementById("current_user"), this.id, this.roomId);
    function moveElem(draggableElem, avatarId, roomId) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(draggableElem.id + "header")) {
        document.getElementById(draggableElem.id + "header").onmousedown =
          dragMouseDown;
      } else {
        draggableElem.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeElem;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        draggableElem.style.top = draggableElem.offsetTop - pos2 + "px";
        draggableElem.style.left = draggableElem.offsetLeft - pos1 + "px";
        let current_user_avatar = {
          id: avatarId,
          roomId: roomId,
          top: draggableElem.style.top,
          left: draggableElem.style.left,
        };
        sendAvatar(current_user_avatar);
      }

      function closeElem() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  },
  beforeUnmount() {
    const current_user_avatar = {
      id: this.id,
      roomId: this.roomId,
    };
    removeAvatar(current_user_avatar);
  },
};
</script>

<style scoped>
.v-avatar {
  position: absolute;
  background: rgb(17, 204, 157);
}

#current_user {
  position: absolute;
  background: rgb(20, 145, 202);
  cursor: move;
  cursor: grab;
}

#current_user:active {
  cursor: grabbing;
}
</style>

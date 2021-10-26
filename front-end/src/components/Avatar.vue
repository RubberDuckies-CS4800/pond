<template>
  <div>
    <!-- vuetify's avatar component for nicer look and easier use -->
    <v-avatar id="current_user" size="90">
      <!-- using user's initial's from reigstration -->
      {{ initials }}
    </v-avatar>
    <v-avatar
      v-for="avatar in avatars"
      :key="avatar.id"
      :id="avatar.id"
      :style="`height: 90px; min-width: 90px; width: 90px; top: ${avatar.top}; left:${avatar.left};`"
      >{{ avatar.initials }}
    </v-avatar>
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
  created() {
    // when the user closes the window, remove their avatar
    // not working - does not seem to remove avatar
    // it also attempts to remove an avatar when the page loads
    // window.addEventListener("beforeunload", this.removeAvatarHandler())
  },
  mounted() {
    this.id = uuidv4();

    let current_user_avatar = {
      id: this.id,
      roomId: this.roomId,
      initials: this.initials,
      // both top and left need to be adjusted to match actual starting pos
      top: 257,
      left: 518,
    };
    sendAvatar(current_user_avatar);

    onAvatar((avatar) => {
      if (avatar.id) {
        if (this.id != avatar.id) {
          this.$set(this.avatars, avatar.id, {
            id: avatar.id,
            roomId: avatar.roomId,
            initials: avatar.initials,
            top: avatar.top,
            left: avatar.left,
          });
        }
      }
    });
    onRemoveAvatar((avatar) => {
      this.$delete(this.avatars, avatar.id);
    });

    moveElem(
      document.getElementById("current_user"),
      this.id,
      this.roomId,
      this.initials
    );
    function moveElem(draggableElem, avatarId, roomId, initials) {
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
          initials: initials,
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

  // when the user leaves the room by routing, remove the avatar
  beforeDestroy() {
    this.removeAvatarHandler();
  },
  methods: {
    removeAvatarHandler() {
      const current_user_avatar = {
        id: this.id,
        roomId: this.roomId,
      };
      removeAvatar(current_user_avatar);
    },
  },
};
</script>

<style scoped>
.v-avatar {
  position: absolute;
  background: rgb(17, 204, 157);
  z-index: 100;
}

#current_user {
  position: absolute;
  background: rgb(20, 145, 202);
  cursor: move;
  cursor: grab;
  z-index: 500;
}

#current_user:active {
  cursor: grabbing;
}
</style>

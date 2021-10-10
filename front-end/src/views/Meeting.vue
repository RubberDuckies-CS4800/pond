<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Meeting Room</h1>
        <!-- vuetify's avatar component for nicer look and easier use -->
        <v-avatar id="avatar" size="90">
          <!-- using user's initial's from reigstration -->
          MR
        </v-avatar>

        <UserControls />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import UserControls from "@/components/UserControls.vue";

export default {
  components: {
    UserControls,
  },
  mounted() {
    moveElem(document.getElementById("avatar"));

    function moveElem(draggableElem) {
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
      }

      function closeElem() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  },
};
</script>
<style scoped>
#avatar {
  position: absolute;
  background: yellow;
  cursor: move;
  cursor: grab;
}

#avatar:active {
  cursor: grabbing;
}

</style>


<template>
  <div>
    <!-- checking if the avatar is being added to the data -->
    <h4>{{ avatars }}</h4>
    
    <Avatar
      v-for="avatar of avatars"
      :key="avatar.id"
      :avatar="avatar"
    />
  </div>
</template>

<script>
import { state } from "@/backend/peers";
import { onAvatar, onRemoveAvatar } from "@/backend/socket";
import Avatar from "@/components/Avatar.vue";

export default {
  props: {
    name: String,
    cameraOn: Boolean,
    roomId: String,
  },
  components: {
    Avatar,
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
    streams() {
      return state.streams;
    },
    myName() {
      return state.myName;
    },
    myStream() {
      return state.myStream;
    },
  },
  data() {
    return {
      avatars: {},
      id: null,
    };
  },
  mounted() {
    onAvatar((avatar) => {
      this.$set(this.avatars, avatar.id, avatar);
    });
    onRemoveAvatar((id) => {
      this.$delete(this.avatars, id);
    });
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

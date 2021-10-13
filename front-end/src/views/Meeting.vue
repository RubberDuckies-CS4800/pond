<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Meeting Room</h1>
        <Avatar />
        <UserControls />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Avatar from "@/components/Avatar.vue";
import UserControls from "@/components/UserControls.vue";

export default {
  components: {
    Avatar,
    UserControls,
  },
};
</script>


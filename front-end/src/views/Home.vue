<template>
  <div class="wrapper">
    <HomeOptions class="center-widget" />
    <Graphics class="graphics" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeOptions from "@/components/Start/HomeOptions.vue";
import Graphics from "@/components/Start/Graphics.vue";
export default {
  components: {
    HomeOptions,
    Graphics
  },
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
</style>

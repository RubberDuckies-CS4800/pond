<template>
  <div class="wrapper">
    <HomeOptions class="center-widget" />

    <h4 class="footer">
      See the source code at github.com/RubberDuckies-CS4800/pond
    </h4>

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
    Graphics,
  },
};
</script>
<style scoped>
.footer {
  position: absolute; /* or position: fixed */
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>

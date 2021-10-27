<template>
  <video ref="video" />
</template>

<script>
export default {
  name: "VideoStream",
  props: {
    stream: MediaStream
  },
  mounted() {
    // console.log(this.$refs.video);
    const vid = this.$refs.video;
    vid.srcObject = this.stream;
    vid.addEventListener("loadedmetadata", () => {
      vid.play();
    });
  }
};
</script>
<style>
video {
  height: 100%;
  transform: rotateY(180deg);
}
</style>

<template>
  <div>
    <video ref="video" :muted="muted" :volume="volume" />
    <h1>volume: {{ volume }}</h1>
  </div>
</template>

<script>
export default {
  name: "VideoStream",
  props: {
    stream: MediaStream,
    muted: Boolean,
    volume: Number,
  },
  mounted() {
    // console.log(this.$refs.video);
    const vid = this.$refs.video;
    vid.srcObject = this.stream;
    vid.addEventListener("loadedmetadata", () => {
      vid.play();
    });
  },
};
</script>
<style>
video {
  height: 100%;
  transform: rotateY(180deg);
}
</style>

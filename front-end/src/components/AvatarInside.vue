<template>
  <div>
    <!-- show initials if there is: 
            1. no stream
                OR 
            2. no video
                OR 
            3. our user has disabled this person's video -->
    <div v-if="!stream || !avatar.video || !enableVideo">
      {{ initials }}
    </div>

    <!-- show the video if there is:
            1. a stream
                AND
            2. a video
                AND
            3. the video has not been disabled  -->
    <VideoStream
      :stream="stream"
      v-if="stream && avatar.video && enableVideo"
      :muted="volume == 0"
      :volume="scaledVolume"
    />

    <!-- play the audio only if there is:
            1. a stream
                AND
            2. no video
                AND
            3. an audio -->
    <div style="display: none">
      <VideoStream
        :stream="stream"
        v-if="stream && !avatar.video && avatar.audio"
        :muted="volume == 0"
        :volume="scaledVolume"
      />
    </div>
  </div>
</template>

<script>
import VideoStream from "@/components/VideoStream";
import { state } from "@/backend/peers";

export default {
  components: {
    VideoStream,
  },
  props: {
    avatar: Object,
    initials: String,
    volume: Number,
  },
  computed: {
    stream() {
      for (const stream of state.streams) {
        if (stream.peer.indexOf(this.avatar.id) !== -1) {
          return stream;
        }
      }
      return null;
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="microphone-recorder">
    <v-btn
      @mousedown="startRecording"
      @mouseup="stopRecording"
      class="mx-2"
      fab
      dark
      color="teal"
    >
      <v-icon dark>record_voice_over</v-icon>
    </v-btn>
  </div>
</template>

<script>
const constraints = {
  audio: true,
  video: false,
  channelCount: 1
};

const streamOptions = {
  audioBitsPerSecond: 16600,
  mimeType: "audio/wave"
};
let mediaRecorder;

export default {
  mounted() {
    if (navigator.mediaDevices) {
      console.log("getUserMedia supported.");

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          mediaRecorder = new MediaRecorder(stream, streamOptions);
          console.log(mediaRecorder.mimeType);
        })
        .catch(function(error) {
          console.log(error.message);
        });
    }
  },
  methods: {
    startRecording() {
      mediaRecorder.start();
    },
    stopRecording() {
      mediaRecorder.stop();
    }
  }
};
</script>

<style></style>

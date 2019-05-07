<template>
  <div class="on-off">
    <button
      class="on-off__toggle-btn"
      @click="toggleCameraStatus()"
      v-bind:class="{ 'start-camera': !isCameraOn, 'stop-camera': isCameraOn }"
    >{{isCameraOn ? 'Stop': 'Start'}}</button>
  </div>
</template>

<script>
import axios from "@/axios";


export default {
  data() {
    return {
      isCameraOn: false
    };
  },
  created() {

  },
  methods: {
    toggleCameraStatus() {
      this.isCameraOn = !this.isCameraOn;      
      axios
        .post('camera-status', {isCameraOn: this.isCameraOn})
        .then(response => this.isCameraOn = response.data.isCameraOn)
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
.on-off__toggle-btn {
  width: 60vw;
  max-width: 300px;
  height: 10vh;
  color: white;
  font-size: 2rem;

  border-radius: 4px;
  border: none;
  outline: none;
}

.start-camera {
  background-color: rgb(21, 134, 240);
}

.stop-camera {
  background-color: rgb(240, 21, 39);
}
</style>
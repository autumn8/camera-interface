<template>
  <v-card>
    <v-img :src="currentFrame || placeHolder" height="300px" aspect-ratio="0.25"></v-img>

    <v-card-actions>
      <span class="camera-name"> {{ camera.name }}</span>
      <v-spacer></v-spacer>
      <v-btn
        v-model="camera.isDetectionEnabled"
        icon
        @click="toggleIsDetectionEnabled"
      >
        <v-icon :color="detectionEnabledClass">portrait</v-icon>
      </v-btn>

      <!--<v-btn :disabled="!detectionEnabled" v-model="detectionZoneEnabled" icon @click="detectionZoneEnabled = !detectionZoneEnabled">
        <v-icon :color="detectionZoneEnabledClass">crop_free</v-icon>
      </v-btn>-->

      <v-btn icon :to="`/camera/${index}`">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: ["index"],
  computed: {
    detectionEnabledClass() {
      return this.camera.isDetectionEnabled ? "green" : "dark-grey";
    },
    detectionZoneEnabledClass() {
      return this.camera.isDetectionZoneEnabled ? "green" : "dark-grey";
    },
    camera() {
      return this.$store.state.cameras[this.index];
    }
  },
  methods: {
    toggleIsDetectionEnabled() {
      this.camera.isDetectionEnabled = !this.camera.isDetectionEnabled;
    }
  },
  data() {
    return {
      currentFrame: null,
      placeHolder: require("@/assets/image-placeholder.png")
    };
  }
};
</script>

<style>
.v-icon.green {
  color: green;
}

.v-icon.red {
  color: red;
}
</style>

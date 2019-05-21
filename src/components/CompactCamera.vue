<template>
  
      <v-card>
        <v-img :src="currentFrame || placeHolder" aspect-ratio="1.333"></v-img>
        <v-card-actions>
          <span class="camera-name">{{ camera.name }}</span>
          <v-spacer></v-spacer>

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
import eventBus from "@/eventBus";

export default {
  props: ["index"],
  computed: {
    camera() {
      return this.$store.state.cameras[this.index];
    }
  },
  data() {
    return {
      currentFrame: null,
      frameEvent: null,
      placeHolder: require("@/assets/image-placeholder.png")
    };
  },
  mounted() {
    this.frameEvent = `camera/frame/${this.camera.name}`;
    eventBus.$on(this.frameEvent, currentFrame => {
      this.currentFrame = currentFrame;
    });
  },
  beforeDestroy() {
    eventBus.$off(this.frameEvent);
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

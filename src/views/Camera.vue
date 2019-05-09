<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Camera {{ this.$route.params.id }}</h3>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-switch
            v-model="isDetectionEnabled"
            :label="`Detection: ${isDetectionEnabled ? 'enabled' : 'disabled'}`"
          ></v-switch>

          <v-switch
            v-if="isDetectionEnabled"
            v-model="isZonesEnabled"
            :label="`Zones: ${isZonesEnabled ? 'enabled' : 'disabled'}`"
          ></v-switch>
        </v-card-actions>

        <div>
          Camera page
          <div class="camera1">
            <canvas
              class="camera1__canvas"
              id="camera1__canvas"
              ref="camera1DetectionZone"
              width="300px"
              height="300px"
            ></canvas>
          </div>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      isDetectionEnabled: false,
      isZonesEnabled: false
    };
  },
  mounted() {
    const canvas = this.$refs.camera1DetectionZone;
    const context = this.$refs.camera1DetectionZone.getContext("2d");
    let startX = null;
    let startY = null;
    const onPointerDown = e => {
      const event = e.touches[0];
      startX = event.clientX - event.target.offsetLeft;
      startY = event.clientY - event.target.offsetTop;
    };

    const onPointerUp = e => {
      console.log("pointer up");
    };

    const onPointerMove = e => {
      context.clearRect(0, 0, 300, 300);
      context.globalAlpha = 0.5;
      if (startX < 10) startX = 0;
      if (startY < 10) startY = 0;
      const endX = e.touches[0].clientX - startX - event.target.offsetLeft;
      const endY = e.touches[0].clientY - startY - event.target.offsetTop;
      context.fillRect(startX, startY, endX, endY);
      context.globalAlpha = 1;
      return false;
    };

    canvas.addEventListener("touchstart", onPointerDown, false);
    canvas.addEventListener("touchend", onPointerUp, false);

    canvas.addEventListener("touchmove", onPointerMove, false);
  }
};
</script>

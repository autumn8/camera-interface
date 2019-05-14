<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex>
            <v-card>
              <div class="camera-container">
                <v-img :src="currentFrame || placeHolder" height="300px" aspect-ratio="0.25"></v-img>
                <canvas
                  class="camera__canvas"
                  id="camera__canvas"
                  ref="camera1DetectionZone"
                  width="300px"
                  height="300px"
                ></canvas>
              </div>

              <v-card-actions>
                <span class="camera-name">{{camera.name}}</span>
                <v-spacer></v-spacer>
              </v-card-actions>

              <v-container>
                <v-layout>
                  <v-switch
                    v-model="camera.isDetectionEnabled"
                    :label="
                      `Intruder detection is ${
                        camera.isDetectionEnabled ? 'on' : 'off'
                      }`
                    "
                  ></v-switch>
                  <div class="info-icon-container">
                    <v-btn icon @click="showDetectionZoneInfo">
                      <v-icon class="stuff" color="teal">info</v-icon>
                    </v-btn>
                  </div>
                </v-layout>

                <v-layout>
                  <v-switch
                    :disabled="!camera.isDetectionEnabled"
                    :class="{ 'half-opacity': !camera.isDetectionEnabled }"
                    v-model="camera.isZoneEnabled"
                    :label="`Zones are ${camera.isZoneEnabled ? 'on' : 'off'}`"
                  ></v-switch>
                  <v-btn icon @click="showDetectionZoneInfo">
                    <v-icon class="stuff" color="teal">info</v-icon>
                  </v-btn>

                  <v-flex xs12>
                    <v-slider v-model="slider" label="Label"></v-slider>
                  </v-flex>
                </v-layout>
                <!-- <div class="text-xs-center">
                <v-btn color="success" @click="saveSettings">Save</v-btn>
                </div>-->
              </v-container>
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
//$route.params.id
export default {
  data() {
    return {
      currentFrame: null,
      placeHolder: require("@/assets/image-placeholder.png")
    }
  },
  computed: {
    camera() {
      return this.$store.state.cameras[this.$route.params.index];
    }
  },
  methods: {
    showDetectionZoneInfo() {}
  },
  mounted() {}
};
</script>

<style>
.info-icon-container {
  margin-top: 8px;
}

.half-opacity {
  opacity: 0.5;
}

.camera-container {
  position: relative;
}

.camera__canvas {
  scroll: none;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

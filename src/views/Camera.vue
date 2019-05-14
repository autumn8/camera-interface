<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex>
            <v-card>
              <div class="camera-container">
                <v-img :src="currentFrame || placeHolder" height="300px" aspect-ratio="0.25"></v-img>

                <div v-if="camera.isZoneEnabled" class="zone-overlay" 
                  v-bind:style="{ 
                    width: zoneWidth + 'px', 
                    left: zoneLeft + 'px',
                    top: zoneTop + 'px', 
                    height: zoneHeight + 'px'}"></div>
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
                </v-layout>
                <v-layout v-if="camera.isZoneEnabled">
                  <v-flex xs12>
                    <v-flex>
                      <v-range-slider @input="calculateZone" v-model="zoneXCoords" label="Left - Right" :max="345" :min="0" :step="10"></v-range-slider>
                    </v-flex>
                    <v-flex>
                      <v-range-slider @input="calculateZone" v-model="zoneYCoords" label="Top - Bottom" :max="300" :min="0" :step="10"></v-range-slider>
                    </v-flex>                    
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
      zoneWidth:0,
      zoneHeight:0,
      zoneTop: 0,
      zoneLeft:0,
      zoneXCoords: [0, 200],
      zoneYCoords: [150, 250],      
      currentFrame: null,
      placeHolder: require("@/assets/image-placeholder.png")
    };
  },
  computed: {
    camera() {
      return this.$store.state.cameras[this.$route.params.index];
    }
  },
  methods: {
    calculateZone() {
      this.zoneLeft = this.zoneXCoords[0];
      this.zoneWidth  = this.zoneXCoords[1] - this.zoneXCoords[0]; 
      this.zoneTop = this.zoneYCoords[0];
      this.zoneHeight  = this.zoneYCoords[1] - this.zoneYCoords[0];                 
    },
    showDetectionZoneInfo() {}
  },
  mounted() {
    this.calculateZone();
  }
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

.zone-overlay {  
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: cyan;
  opacity: 0.5;
  top: 0;
  left: 0;
}
</style>

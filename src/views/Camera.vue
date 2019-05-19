<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex>
            <v-card>
              <div class="camera-container" ref="camcam">
                <v-img :src="currentFrame || placeHolder" aspect-ratio="1"></v-img>

                <vue-drag-resize
                  v-if="isZoneEditingEnabled"
                  class="zone-overlay"
                  :isActive="true"
                  :x="zoneLeft"
                  :y="zoneTop"
                  :w="zoneWidth"
                  :h="zoneHeight"
                  :parentLimitation="true"
                  v-on:resizing="resize"
                  v-on:dragging="resize"
                ></vue-drag-resize>
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
                </v-layout>

                <v-layout>
                  <v-switch
                    :disabled="!camera.isDetectionEnabled"
                    :class="{ 'half-opacity': !camera.isDetectionEnabled }"
                    v-model="isZoneEditingEnabled"
                    label="Edit zone"
                  ></v-switch>
                  <v-btn
                    v-if="camera.isDetectionEnabled && isZoneEditingEnabled && (zoneWidth < zoneParentWidth || zoneHeight < zoneParentHeight)"
                    icon
                    @click="maximizeZoneSize"
                  >
                    <v-icon class="stuff" color="teal">fullscreen</v-icon>
                  </v-btn>
                </v-layout>
                <div class="text-xs-center">
                  <v-btn color="success" @click="saveSettings">Save</v-btn>
                </div>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import eventBus from "@/eventBus";
import mqtt from "@/mqtt";
console.log(mqtt);

export default {
  components: {
    "vue-drag-resize": VueDragResize
  },
  data() {
    return {
      currentFrame: null,
      frameEvent: null,
      placeHolder: require("@/assets/image-placeholder.png"),
      zoneParentWidth: 0,
      zoneParentHeight: 0,
      zoneWidth: 100, //change to full width of parent
      zoneHeight: 100,
      zoneTop: 0,
      zoneLeft: 0,
      isZoneEditingEnabled: false
    };
  },
  computed: {
    camera() {
      return this.$store.state.cameras[this.$route.params.index];
    }
  },
  methods: {
    saveSettings() {
      mqtt.client.publish(
        `camera/settingsupdate/${this.camera.name}`,
        JSON.stringify(this.camera)
      );
    },
    resize(zoneRect) {
      this.camera.zoneWidth = zoneRect.width / this.zoneParentWidth;
      this.camera.zoneHeight = zoneRect.height / this.zoneParentHeight;
      this.camera.zoneX = zoneRect.left / this.zoneParentWidth;
      this.camera.zoneY = zoneRect.top / this.zoneParentHeight;
      this.zoneWidth = this.camera.zoneWidth / this.zoneParentWidth;
      this.zoneHeight = this.zoneParentHeight * this.camera.zoneHeight;
      this.zoneLeft = this.zoneParentWidth * this.camera.zoneX;
      this.zoneTop = this.zoneParentHeight * this.camera.zoneY;
    },
    maximizeZoneSize() {
      this.camera.zoneWidth = 1;
      this.camera.zoneHeight = 1;
      this.camera.zoneX = 0;
      this.camera.zoneY = 0;
      this.zoneWidth = this.zoneParentWidth * this.camera.zoneWidth;
      this.zoneHeight = this.zoneParentHeight * this.camera.zoneHeight;
      this.zoneLeft = this.zoneParentWidth * this.camera.zoneX;
      this.zoneTop = this.zoneParentHeight * this.camera.zoneY;
    }
  },
  mounted() {
    this.zoneParentWidth = this.$refs.camcam.offsetWidth;
    this.zoneParentHeight = this.$refs.camcam.offsetHeight;
    this.zoneWidth = this.zoneParentWidth * this.camera.zoneWidth;
    this.zoneHeight = this.zoneParentHeight * this.camera.zoneHeight;
    this.zoneLeft = this.zoneParentWidth * this.camera.zoneX;
    this.zoneTop = this.zoneParentHeight * this.camera.zoneY;
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
  opacity: 0.3;
  top: 0;
  left: 0;
}
</style>

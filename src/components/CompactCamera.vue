<template>
  <v-card>
    <v-img :src="frame" height="300px" aspect-ratio="0.25"></v-img>

    <v-card-actions>
      <span class="camera-name">CAMERA {{ index }}</span>
      <v-spacer></v-spacer>
      <v-btn v-model="detectionEnabled" icon @click="detectionEnabled = !detectionEnabled">
        <v-icon :color="detectionEnabledClass">portrait</v-icon>
      </v-btn>

      <!--<v-btn :disabled="!detectionEnabled" v-model="detectionZoneEnabled" icon @click="detectionZoneEnabled = !detectionZoneEnabled">
        <v-icon :color="detectionZoneEnabledClass">crop_free</v-icon>
      </v-btn>-->
      
      <v-btn icon :to="'/camera/' + index">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['index'],
  computed: {
    detectionEnabledClass() {
      return this.detectionEnabled ? 'green' : 'dark-grey'
    },
    detectionZoneEnabledClass() {
      return this.detectionZoneEnabled ? 'green' : 'dark-grey'
    }
  },
  data() {
    return {
      detectionEnabled : false,
      detectionZoneEnabled: false,
      frame: require('@/assets/image-placeholder.png')  
    }
  }
};
</script>

<style>
.v-icon.green {
  color:green;
}

.v-icon.red {
  color: red;
}
</style>

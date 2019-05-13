<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            v-for="(camera,index) in cameras"
            :key="index"            
          >
            <compact-camera :index="index"></compact-camera>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import CompactCamera from "@/components/CompactCamera";
import { mapState } from 'vuex';


export default {
  components: {
    "compact-camera": CompactCamera
  },
  computed: {
      cameras() {
          return this.$store.state.cameras
      }
  }
};
</script>

<style>
.camera-name {
  font-size: 1rem;
  font-weight: 700;
}
</style>

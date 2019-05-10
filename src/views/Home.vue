<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-for="(card, index) in cards"
              :key="card.title"
              v-bind="{ [`xs${card.flex}`]: true }"
            >
              <compact-camera :index="index"></compact-camera>
            </v-flex>
          </v-layout>
        </v-container>
      
    </v-flex>
  </v-layout>
</template>

<script>
import CompactCamera from '@/components/CompactCamera';

export default { 
    components : {
    'compact-camera': CompactCamera
  } ,     
  data() {
    return {            
      cards: [
        {
          title: "Pre-fab homes",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 12
        }
      ]
    };
  },
   mounted() {        
    },
};
</script>

<style>
.camera-name {
  font-size: 1rem;
  font-weight: 700;
}
</style>

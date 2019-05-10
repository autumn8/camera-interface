<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-card>
        <v-container fluid grid-list-md>            
          <v-layout row wrap>
            <v-flex
              v-for="(card, index) in cards"
              :key="card.title"
              v-bind="{ [`xs${card.flex}`]: true }"
            >
              <v-card>
                <v-img :src="frame" height="300px" aspect-ratio="0.25">
                </v-img>

                <v-card-actions>
                  <span class="camera-name">CAMERA {{ index }}</span>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>portrait</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>crop_free</v-icon>
                  </v-btn>
                  <v-btn icon :to="'/camera/' + index">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>


export default {      
  data() {
    return {
      frame: require('@/assets/image-placeholder.png'),        
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

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cameras: []
  },
  mutations: {
    addCamera(state, cameraName) {
      if (!state.cameras.includes(cameraName)) {
        state.cameras.push({
          name: cameraName,
          isDetectionEnabled: true,
          isZoneEnabled: false
        });
      }
    }
  }
});

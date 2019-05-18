import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cameras: []
  },
  mutations: {
    addCamera(state, cameraProps) {
      if (!state.cameras.find(camera => camera.name === cameraProps.name)) {
        state.cameras.push(cameraProps);
      }
    }
  }
});

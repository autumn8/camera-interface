import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cameras: []
    },
    mutations: {
        addCamera(state, camera) {
            if (!state.cameras.includes(camera)) {
                state.cameras.push({
                    name: camera,
                    isDetectionEnabled: true,
                    isZoneEnabled: false
                    
                });
                console.log(this.state.cameras)
            }

        }
    }
})
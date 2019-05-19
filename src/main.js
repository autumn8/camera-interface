import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Settings from "@/views/Settings";
import Home from "@/views/Home";
import Camera from "@/views/Camera";
import store from "@/store";

import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader

Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    { 
      path: "/settings",
      component: Settings
    },
    { 
      path: "/camera/:index",
      component: Camera,
      beforeEnter: (to, from, next) => {
        if (!store.state.cameras.length) next("/");
        next();
      }
    },
    { path: "/", component: Home }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

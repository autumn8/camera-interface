import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Settings from "@/views/Settings";
import Home from "@/views/Home";
import Camera from "@/views/Camera";
import Controls from "@/views/Controls";
import store from "@/store";

import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader

Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    {
      path: "/controls",
      component: Controls,
      beforeEnter: (to, from, next) => {
        const { mqttHostAddress, mqttHostPort } = window.localStorage;
        if (!mqttHostAddress || !mqttHostPort) next("/settings");        
        else next();
      }
    },
    {
      path: "/settings",
      component: Settings
    },
    {
      path: "/camera/:index",
      component: Camera,
      beforeEnter: (to, from, next) => {
        const { mqttHostAddress, mqttHostPort } = window.localStorage;
        if (!mqttHostAddress || !mqttHostPort) next("/settings");
        else if (!store.state.cameras.length) next("/");
        else next();
      }
    },
    {
      path: "/",
      component: Home,
      beforeEnter: (to, from, next) => {
        const { mqttHostAddress, mqttHostPort } = window.localStorage;
        if (!mqttHostAddress || !mqttHostPort) next("/settings");
        else next();
      }
    }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

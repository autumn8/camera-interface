<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="drawer" app :scroll-off-screen="true">
        <v-toolbar flat class="transparent">
          <v-list-tile-content>
            <v-list-tile-title>NIGHTWATCH</v-list-tile-title>
          </v-list-tile-content>
        </v-toolbar>

        <v-list>
          <v-divider></v-divider>

          <template v-for="item in items">
            <v-list-tile v-if="item.action" :key="item.title" :to="item.to">
              <v-list-tile-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="teal">
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
          class="menu"
        ></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-layout justify-center>
          <v-icon class="text-md-center" large>security</v-icon>
        </v-layout>
        <v-spacer></v-spacer>
        <Microphone-Recorder />
      </v-toolbar>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import MicrophoneRecorder from "@/components/MicrophoneRecorder";

export default {
  name: "app",
  components: { MicrophoneRecorder },
  data() {
    return {
      image: null,
      xpos: 0,
      drawer: false,
      items: [
        {
          action: "camera_alt",
          title: "Cameras",
          to: "/"
        },
        {
          action: "camera_alt",
          title: "Controls",
          to: "/controls"
        },
        {
          action: "settings",
          title: "Settings",
          to: "/settings"
        }
      ]
    };
  },
  mounted() {}
};
</script>

<style src="vuetify/dist/vuetify.min.css">
/* global styles */
</style>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
}

#app {
  background-color: grey;
}
.camera1__canvas {
  background-color: red;
}
.xpos {
  width: 50px;
  height: 40px;
  background-color: green;
  color: white;
}

.menu.v-btn--icon {
  position: absolute;
  top: 0;
}
</style>

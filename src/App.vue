<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
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
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="menu"></v-toolbar-side-icon>
        <v-layout justify-center>
          <v-icon class="text-md-center" large>security</v-icon>
        </v-layout>
      </v-toolbar>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import OnOff from "./components/OnOff.vue";
import mqtt from "mqtt";

export default {
  name: "app",
  components: {
    OnOff
  },
  data() {
    return {
      image: null,
      xpos: 0,
      drawer: null,
      items: [
        {
          action: "camera_alt",
          title: "Cameras",
          to: "/"
        },
        {
          action: "settings",
          title: "Settings",
          to: "/settings"
        }
      ]
    };
  },
  mounted() {
    const hostname = "mqtt://localhost:9001";
    const client = mqtt.connect(hostname);

    client.on("connect", function() {
      console.log("connected");
      client.subscribe("camera/image/inference");
    });

    client.on("message", (topic, message) => {
      const canvas = this.$refs.camera1DetectionZone;
      canvas.width = this.$refs.camera1Stream.width;
      canvas.height = this.$refs.camera1Stream.height;
      this.$refs.camera1Stream.src =
        "data:image/jpeg;base64," + message.toString("base64");
      var img = document.getElementById("camera_stream");
      context.drawImage(img, 10, 10, 50, 50);

      //context.drawImage(this.$refs.camera1Stream, 0, 0,300, 300);
    });
  }
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

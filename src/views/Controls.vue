<template>
  <div>
    <v-btn @click="lightsOnOff('on')">Lights On</v-btn>
    <v-btn @click="lightsOnOff('off')">Lights Off</v-btn>
    <v-btn @click="tvOnOff('standby')">TV Off</v-btn>
    <v-btn @click="tvOnOff('on')">TV On</v-btn>
    <v-btn @click="tvLightsOnOff('on')">TV & Lights On</v-btn>
    <v-btn @click="tvLightsOnOff('off')">TV & Lights Off</v-btn>
  </div>
</template>

<script>
import mqtt from "@/mqtt";
export default {
  methods: {
    lightsOnOff(state) {
      mqtt.client.publish("cmnd/living-room-lamp-tall/POWER", state);
      mqtt.client.publish("cmnd/living-room-lamp-small/POWER", state);
    },
    tvOnOff(state) {
      mqtt.client.publish("tv/POWER", state);
    },
    tvLightsOnOff(state) {
      this.lightsOnOff(state);
      state === "on" ? this.tvOnOff("on") : this.tvOnOff("standby");
    }
  }
};
</script>

<style></style>

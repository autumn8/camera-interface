<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-start justify-center class="settings">
        <v-flex xs11 sm8 md4 align-start>
          <h2>Settings</h2>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="mqttHostAddress"
              :rules="mqttHostAddressRules"
              label="MQTT Host"
              required
            ></v-text-field>

            <v-text-field
              v-model="mqttHostPort"
              :rules="mqttHostPortRules"
              label="MQTT Port"
              required
            ></v-text-field>

            <v-text-field
              v-model="username"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>

            <v-btn :disabled="!valid" color="success" @click="saveSettings"
              >Save</v-btn
            >
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      mqttHostAddress: "mqtt://localhost",
      mqttHostPort: "1883",
      username: "",
      password: "",
      valid: true,
      mqttHostAddressRules: [
        v => !!v ||
          "MQTT Host address is required" /* ,
        v => v.match(urlReg)|| 'Must be a valid url' */
      ],
      mqttHostPortRules: [
        v => !!v || "MQTT Port required",
        v => /^[0-9]+$/.test(v) || "Must be a number"
      ]
    };
  },
  mounted() {
    if (localStorage.mqttHostAddress) {
      this.mqttHostAddress = localStorage.mqttHostAddress;
    }
    if (localStorage.mqttHostPort) {
      this.mqttHostPort = localStorage.mqttHostPort;
    }
    if (localStorage.username) {
      this.username = localStorage.username;
    }
  },
  methods: {
    saveSettings() {
      localStorage.mqttHostAddress = this.mqttHostAddress;
      localStorage.mqttHostPort = this.mqttHostPort;
      localStorage.username = this.username;
      localStorage.password = this.password;
    }
  }
};
</script>
<style scoped>
h2 {
  margin: 4vh auto;
}
.settings {
  background-color: white;
}
</style>

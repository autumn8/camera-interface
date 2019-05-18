import mqtt from "mqtt";
import store from "@/store";
import eventBus from "@/eventBus";
let client;


function hasMQTTHostProps() {
  const {mqttHostAddress, mqttHostPort} = window.localStorage;
  return !!mqttHostAddress && mqttHostPort;
}

function init() {
  //todo consider promise to handle routing in app if mqtt settings aren't in localstorage;
  const { mqttHostAddress, mqttHostPort } = window.localStorage;
  const host = `${mqttHostAddress}:${mqttHostPort}`;
  client = mqtt.connect(host);
  client.on("connect", function() {
    console.log("connected");
    client.subscribe("camera/connected/#");
    client.subscribe("camera/initialized/#");
  });

  client.on("message", (topic, message) => {
    const payload = message.toString();
    console.log("topic", topic);
    if (topic.includes("camera/initialized")) {
      console.log("initialized message");
      console.log(JSON.parse(payload));
      store.commit("addCamera", JSON.parse(payload));
    }
    if (topic.includes("camera/connected")) {
      const routeSegments = topic.split("/");
      const cameraName = routeSegments[routeSegments.length - 1];
      if (payload == 1) {
        
        client.subscribe(`camera/frame/${cameraName}`);
        return;
      }
      if (payload == 0) eventBus.$emit(`camera/frame/${cameraName}`, null);
    }
    if (topic.includes("camera/frame")) {
      const routeSegments = topic.split("/");
      const cameraName = routeSegments[routeSegments.length - 1];
      const frame = `data:image/jpeg;base64, ${message.toString("base64")}`;
      /* It feels weird emitting an event with a second event mechanism when mqtt message is an event itself,
      however we don't have an easy way of sub/unsubbing from a unique message and we need that to prevent either killing
      all existing subsriptions for the client, or ending up with a memory leak so this is the solution for now.*/
      eventBus.$emit(`camera/frame/${cameraName}`, frame);
    }
  });
}

export default {
  init,
  client
};

import mqtt from "mqtt";
import store from "@/store";
import eventBus from "@/eventBus";
const { mqttHostAddress, mqttHostPort, username, password } = window.localStorage;
const host = `${mqttHostAddress}:${mqttHostPort}`;
const client = mqtt.connect(host, { username, password });
client.on("connect", function() {
  console.log("connected");
  client.subscribe("camera/connected/#");
});
client.on("message", (topic, message) => {
  const payload = message.toString();

  if (topic.includes("camera/connected")) {
    console.log("topic", topic);
    console.log(payload);
    const routeSegments = topic.split("/");
    const cameraName = routeSegments[routeSegments.length - 1];
    if (payload === "True") {
      client.subscribe(`camera/settingsupdate/${cameraName}`);
    } else {
      eventBus.$emit(`camera/frame/${cameraName}`, null);
    }
  }
  if (topic.includes("camera/settingsupdate")) {
    const cameraSettings = JSON.parse(payload);
    console.log(cameraSettings);
    const routeSegments = topic.split("/");
    const cameraName = routeSegments[routeSegments.length - 1];
    store.commit("addCamera", cameraSettings);
    client.subscribe(`camera/frame/${cameraName}`);
  }
  if (topic.includes("camera/frame")) {
    console.log('frame');
    const routeSegments = topic.split("/");
    const cameraName = routeSegments[routeSegments.length - 1];
    const frame = `data:image/jpeg;base64, ${message.toString("base64")}`;
    /* It feels weird emitting an event with a second event mechanism when mqtt message is an event itself,
    however we don't have an easy way of sub/unsubbing from a unique message and we need that to prevent either killing
    all existing subsriptions for the client, or ending up with a memory leak so this is the solution for now.*/
    eventBus.$emit(`camera/frame/${cameraName}`, frame);
  }
});
export default {
  client
};

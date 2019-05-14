import mqtt from "mqtt";
import store from "@/store";
import eventBus from "@/eventBus";

const hostname = "mqtt://192.168.8.103:9001";
const client = mqtt.connect(hostname);

function init() {
  client.on("connect", function () {
    console.log("connected");
    client.subscribe("camera/connected/#");
    //client.subscribe("camera/image/inference");
    client.subscribe("camera/frame/camera1");
  });

  client.on("message", (topic, message) => {
    //console.log("topic", topic);
    if (topic.includes("camera/connected")) {
      const routeSegments = topic.split("/");
      const cameraName = routeSegments[routeSegments.length - 1];
      const payload = message.toString();
      if (payload == 1) {
        store.commit("addCamera", cameraName);
        client.subscribe(`camera/frame/${cameraName}`);
        return;
      }
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

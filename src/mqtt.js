import mqtt from "mqtt";
import store from "@/store";

const hostname = "mqtt://localhost:9001";
const client = mqtt.connect(hostname);

function init() {
  client.on("connect", function () {
    console.log("connected");
    client.subscribe("camera/connected/#");
    //client.subscribe("camera/image/inference");
    client.subscribe("camera/frame/camera1");
  });

  client.on("message", (topic, message) => {
    console.log("topic", topic);
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
    }
  });
}

export default {
  init,
  client
};

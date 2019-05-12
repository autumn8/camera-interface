import mqtt from "mqtt";
import store from "@/store";

const hostname = "mqtt://localhost:9001";
const client = mqtt.connect(hostname);

function init() {
  client.on("connect", function() {
    console.log("connected");
    client.subscribe("camera/connected/#");    
    //client.subscribe("camera/image/inference");
    client.subscribe("camera/frame/camera1");
  });

  client.on("message", (topic, message) => {
    console.log("topic", topic);
    if (topic.includes("camera/connected")) {
      const routeSegments = topic.split("/");
      const camera = routeSegments[routeSegments.length - 1];
      const payload = message.toString();
      if (payload == 1) store.commit('addCamera', camera);       
      console.log(camera);
      console.log(message);
    }
  });
}

export default {
  init,
  client
};

import mqtt from "mqtt";

const hostname = "mqtt://localhost:9001";
const client = mqtt.connect(hostname);

function init() {
  client.on("connect", function() {
    console.log("connected");
    //client.subscribe("camera/image/inference");
    client.subscribe("camera/frame/camera1");
  });
}

export default {
  init,
  client
};

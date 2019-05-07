<template>
  <div id="app">
    <div class="camera1">      
      <canvas class="camera1__canvas" id="camera1__canvas" ref="camera1DetectionZone" width="300px" height="300px"></canvas>
    </div>
    <div class='xpos'>{{xpos}}</div>
    <h1>Settings</h1>
    <on-off></on-off>
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
      xpos: 0
    }
  },
  mounted() {
    const hostname = "mqtt://localhost:9001";
    const client = mqtt.connect(hostname); 
    const canvas =  this.$refs.camera1DetectionZone;  
    const context = this.$refs.camera1DetectionZone.getContext('2d');     
    let startX = null;
    let startY = null;
    const onPointerDown = (e) => {      
      const event = e.touches[0];      
      startX = event.clientX - event.target.offsetLeft;
      startY = event.clientY - event.target.offsetTop;
    }

    const onPointerUp = (e) => {
      console.log('pointer up');
    }

    const onPointerMove = (e) => {      
      context.clearRect(0,0, 300, 300);
      context.globalAlpha = 0.5;      
      if (startX < 10 ) startX  = 0;
      if (startY < 10) startY = 0;
      const endX = e.touches[0].clientX - startX - event.target.offsetLeft;
      const endY = e.touches[0].clientY - startY - event.target.offsetTop;
      context.fillRect(startX, startY, endX, endY);      
      context.globalAlpha = 1;     
      return false;      
    }

    canvas.addEventListener("touchstart", onPointerDown, false);
    canvas.addEventListener("touchend", onPointerUp, false);
    
    canvas.addEventListener("touchmove", onPointerMove, false);

    

    client.on("connect", function() {
      console.log('connected');
      client.subscribe("camera/image/inference");
    });

    client.on("message", (topic, message) =>{   
      const canvas = this.$refs.camera1DetectionZone;
      canvas.width = this.$refs.camera1Stream.width;
      canvas.height = this.$refs.camera1Stream.height;
      this.$refs.camera1Stream.src = 'data:image/jpeg;base64,'+ message.toString("base64");  
      var img = document.getElementById("camera_stream");
      context.drawImage(img, 10, 10, 50, 50);    
      
      //context.drawImage(this.$refs.camera1Stream, 0, 0,300, 300);  
       
    });
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-size: 16px;
}
.camera1__canvas{  
  background-color: red;
}
.xpos {
  width: 50px;
  height: 40px;
  background-color: green;
  color: white;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>

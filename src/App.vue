<template>
  <div class="root">
    <LMap v-bind="mapOptions">
      <LTileLayer v-bind="tileLayerOptions" />
      <LRoutingMachine
        v-bind="routingOptions"
        @routingstart="debugRoutingEvent"
        @routesfound="debugRoutingEvent"
        @routingerror="debugRoutingEvent"
      />
    </LMap>
  </div>
</template>

<script>
import { reactive } from "vue";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import LRoutingMachine from "./components/LRoutingMachine.vue";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LRoutingMachine,
  },
  setup() {
    const mapOptions = {
      center: [38.7436056, -2.2304153],
      zoom: 6,
    };
    const tileLayerOptions = {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      continuousWorld: false,
      noWrap: true,
    };
    const routingOptions = reactive({
      waypoints: [
        [38.7436056, -9.2304153],
        [38.7436056, -0.131281],
      ],
    });

    const debugRoutingEvent = (event) => {
      console.log(`${event.type} event: `, event);
    };

    return {
      mapOptions,
      tileLayerOptions,
      routingOptions,
      debugRoutingEvent,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.root {
  height: 100vh;
}
</style>

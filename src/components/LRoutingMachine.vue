<template>
  <div style="display: none"></div>
</template>

<script>
import { ref, markRaw, inject, nextTick, onMounted, onBeforeUnmount } from "vue";
import { routingControlProps, setupRoutingControl } from "@/functions/routingControl";
import { Utilities, InjectionKeys } from "@vue-leaflet/vue-leaflet";
import "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export default {
  name: "LRoutingMachine",
  props: {
    ...routingControlProps,
  },
  setup(props, context) {
    const { UseGlobalLeafletInjection, RegisterControlInjection } = InjectionKeys;
    const { WINDOW_OR_GLOBAL, assertInject, propsBinder, remapEvents } = Utilities;

    const useGlobalLeaflet = inject(UseGlobalLeafletInjection);
    const registerControl = assertInject(RegisterControlInjection);

    const leafletObject = ref(null);
    const { options, methods } = setupRoutingControl(props);

    onMounted(async () => {
      const { routing } = useGlobalLeaflet
        ? WINDOW_OR_GLOBAL.L
        : await import("leaflet/dist/leaflet-src.esm");
      const { listeners } = remapEvents(context.attrs);

      leafletObject.value = markRaw(routing.control(options));
      leafletObject.value.on(listeners);

      propsBinder(methods, leafletObject.value, props);
      registerControl({ leafletObject: leafletObject.value });
      nextTick(() => context.emit("ready", leafletObject.value));
    });

    onBeforeUnmount(() => {
      if (leafletObject.value) {
        leafletObject.value.setWaypoints([]);
        leafletObject.value.remove();
      }
    });
  },
};
</script>

import { Utilities } from "@vue-leaflet/vue-leaflet";

export const routingControlProps = {
  waypoints: {
    type: Array,
    default: () => [],
  },
  router: {
    type: Object,
    default: undefined,
  },
  plan: {
    type: Object,
    default: undefined,
  },
  fitSelectedRoutes: {
    type: [String, Boolean],
    default: "smart",
  },
  lineOptions: {
    type: Object,
    default: undefined,
  },
  routeLine: {
    type: Function,
    default: undefined,
  },
  autoRoute: {
    type: Boolean,
    default: true,
  },
  routeWhileDragging: {
    type: Boolean,
    default: false,
  },
  routeDragInterval: {
    type: Number,
    default: 500,
  },
  waypointMode: {
    type: String,
    default: "connect",
  },
  useZoomParameter: {
    type: Boolean,
    default: false,
  },
  showAlternatives: {
    type: Boolean,
    default: false,
  },
  altLineOptions: {
    type: Object,
    default: undefined,
  },
};

export const setupRoutingControl = (props) => {
  const options = Utilities.propsToLeafletOptions(props, routingControlProps);
  return { options, methods: {} };
};

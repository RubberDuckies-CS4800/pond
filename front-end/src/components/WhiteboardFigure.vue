<template>
  <path v-if="type == 'path'" v-bind="attributes" />
  <circle v-else-if="type == 'circle'" v-bind="attributes" />
</template>

<script>
export default {
  name: "WhiteboardFigure",
  props: {
    type: String,
    attributes: Object,
  },
};
</script>
<template>
  <div
    v-if="isVisible"
    :style="tooltipStyle"
    class="tooltip fixed p-2 bg-gray-700 text-white rounded shadow-md"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tooltipStyle() {
      return {
        top: `${this.y}px`,
        left: `${this.x}px`,
      }
    },
  },
}
</script>

<style scoped>
.tooltip {
  z-index: 1000;
}
</style>

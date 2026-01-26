<script setup lang="ts">
import type { RegionData } from "@/interface/Dashboard";

defineProps<{
  region: RegionData;
  x: number;
  y: number;
}>();
</script>

<template>
  <div
    class="region-tooltip"
    :style="{
      left: x + 12 + 'px',
      top: y + 12 + 'px'
    }"
  >
    <h4 class="tooltip-title">{{ region.name }}</h4>

    <div
      v-for="info in region.details"
      :key="info.label"
      class="tooltip-row"
    >
      <span class="dot" :style="{ backgroundColor: info.color }"></span>
      <span class="label">{{ info.label }}:</span>
      <span class="value" >{{ info.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.region-tooltip {
  position: fixed;
  width: 250px;
  border-radius: 12px;
  box-shadow: 0px 4px 26.7px 0px #00000040;
  z-index: 999;
  pointer-events: none;
}
.tooltip-title {
  font-weight: 500;
  /* background: #F5F5F5; */
  padding: 8px 0;
  font-size: 16px;
}
.tooltip-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  margin-top: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.label{
  color: #414651;
}

.value{
  font-weight: 700;
}
</style>

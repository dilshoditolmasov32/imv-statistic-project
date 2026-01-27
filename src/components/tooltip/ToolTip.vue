<script setup lang="ts">
import type { RegionData } from "@/interface/Dashboard";

defineProps<{
  region: RegionData;
  x: number;
  y: number;
}>();
</script>

<template>
  <Teleport to="body">
  <div
    class="region-tooltip"
    :style="{
      left: x  + 'px',
      top: y  + 'px'
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

  </Teleport>

</template>

<style scoped>
.region-tooltip {
  position: fixed;
  width: 240px;
  border-radius: 12px;
  box-shadow: 0px 4px 26.7px 0px #00000040;
  z-index: 999;
  pointer-events: none;
  background-color: #F5F5F5;
}

.tooltip-title {
  font-weight: 500;
  color: #000;
  background: #F5F5F5;
  border-bottom: 2px solid #E9EAEB;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 12px 12px 0 0;
}
.tooltip-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  margin-top: 8px;
  margin: 8px 16px;
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
  color:#000
}
</style>

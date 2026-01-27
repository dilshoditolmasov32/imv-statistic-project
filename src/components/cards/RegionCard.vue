<script setup lang="ts">
import type { RegionData } from "@/interface/Dashboard";
import ToolTip from "../tooltip/ToolTip.vue";
import { computed, ref } from "vue";
const props = defineProps<{
  regionData: RegionData[];
}>();

const activeId = ref<number | null>(null);
const tooltipPos = ref({ x: 0, y: 0 });

const updateRegion = (payload: { id: number | null; x: number; y: number }) => {
  activeId.value = payload.id;
  tooltipPos.value = {
    x: payload.x-120,
    y: payload.y-180,
  };


};

const activeRegion = computed(() => {
  return props.regionData.find((r) => r.id === activeId.value) || null;
});
</script>

<template>
  <div class="region-card">
    <h3 class="card-header">Hududlar bo'yicha</h3>

    <div class="card-content">
      <ToolTip
        v-if="activeRegion"
        :region="activeRegion"
        :x="tooltipPos.x"
        :y="tooltipPos.y"
      />

      <slot name="map" :currentId="activeId" :updateRegion="updateRegion" />
    </div>
  </div>
</template>

<style scoped>
.region-card {
  position: relative;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px 0px #0a0d1408;
  height: stretch;
}

.card-header {
  font-size: 20px;
  font-weight: 600;
  padding: 20px 24px;
  background-color: #fff;
}

.card-content {
  padding: 20px 24px;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

@media screen and (max-width:1500px) {
  .card-content{
    padding: 40px;
  }
}


</style>

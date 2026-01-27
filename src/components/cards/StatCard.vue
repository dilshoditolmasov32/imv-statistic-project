<script setup lang="ts">
import rightIcon from "../../assets/images/svg/arrow-up-right.svg";
interface Props {
  title: string;
  value: number;
  change: number;
  icon: any;
  color: string;
  bgColor: string;
}

defineProps<Props>();
</script>

<template>
  <div class="stat-card">
    <div class="card-icon" :style="{ backgroundColor: bgColor }">
      <img :src="icon" alt="ikonka" />
    </div>
    <div class="card-content">
      <p class="card-title">{{ title }}</p>
      <div class="card-bottom">
        <h3 class="card-value">{{ value }}</h3>
        <div v-if="change !== 0" class="card-change">
          <span class="change-label">O'tgan yilga nisbatan</span>
          <span :class="['change-value', change > 0 ? 'positive' : 'negative']">
            <template v-if="change > 0">
              <img :src="rightIcon" alt="next right icon" class="icon" />
            </template>
            <template v-else> </template>

            {{ Math.abs(change) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  display: flex;
  gap: 16px;
  background: white;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  border: 1px solid #e9eaeb;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
  border: 2px solid;
  border-image-source: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  padding: 10px;
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 1rem;
  line-height: 1.4;
  color: #535862;
  font-weight: 600;
   display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-value {
  font-size: 32px;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.card-change {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 12px;
}

.change-label {
  color: #535862;
}

.change-value {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
  border: 1px solid #f5f5f5;
  padding: 2px 8px;
  border-radius: 6px;
}

.change-value.positive {
  color: #10b981;
}

.change-value.negative {
  color: #ef4444;
}
</style>

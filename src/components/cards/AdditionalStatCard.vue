<template>
  <div class="additional-stat">
    <p class="stat-title">{{ title }}</p>
    <div class="stat-content">
      <h3 class="stat-value">{{ value }}</h3>
      <div class="stat-change">
        <span :class="['change-text', isPositive ? 'positive' : 'negative']">
          {{ change > 0 ? "▲" : "▼" }} {{ Math.abs(change) }}%
        </span>
        <span class="change-label">O'tgan yilga nisbatan</span>
      </div>
    </div>
    <div class="stat-progress">
      <div
        class="progress-bar"
        :style="{
          width: `${Math.min(100, (value / 500) * 100)}%`,
          backgroundColor: getProgressColor(),
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: number;
  change: number;
  isPositive: boolean;
}

const props = defineProps<Props>();

const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US").replace(/,/g, " ");
};

const getProgressColor = (): string => {
  if (props.value >= 1500) return "#F59E0B";
  if (props.value >= 500) return "#3B82F6";
  return "#8B5CF6";
};
</script>

<style scoped>
.stat-title {
  max-width: 240px;
  width: 100%;
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 12px 0;
  line-height: 1.4;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
  text-overflow: ellipsis; 
}
.stat-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}
.stat-change {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  margin: 24px 0;

}

.change-text {
  font-weight: 600;
}

.change-text.positive {
  color: #10b981;
}

.change-text.negative {
  color: #ef4444;
}

.change-label {
  color: #9ca3af;
}

.stat-progress {
  height: 6px;
  background: #f3f4f6;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}
</style>

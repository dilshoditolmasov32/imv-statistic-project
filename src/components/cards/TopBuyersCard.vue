<script setup lang="ts">
interface Props {
  title: string;
  value: number;
  change: number;
  label: string;
  detail: string;
}

defineProps<Props>();

const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US").replace(/,/g, " ");
};
</script>

<template>
  <div class="buyers-card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <button class="card-detail">{{ detail }}</button>
    </div>
    <div class="card-content">
      <div class="card-wrapper">
        <h2 class="card-value">{{ formatNumber(value) }}</h2>
        <div class="card-change">
          <span :class="['change-badge', change < 0 ? 'negative' : 'positive']">
            {{ change > 0 ? "▲" : "▼" }} {{ Math.abs(change) }}%
          </span>
          <span class="change-label">{{ label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.buyers-card {
  background: white;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0;
  flex: 1;
  color: #5c5c5c;
  line-height: 20px;
  letter-spacing: -0.6%;
}

.card-detail {
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0px 1px 2px 0px #0a0d1408;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.6%;
  vertical-align: middle;
}

.card-detail:hover {
  background: #f9fafb;
}

.card-content {
  margin-top: 12px;
}

.card-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.card-value {
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.card-change {
  display: flex;
  align-items: center;
  gap: 8px;
}

.change-badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.change-badge.negative {
  background: #fee2e2;
  color: #dc2626;
}

.change-badge.positive {
  background: #d1fae5;
  color: #059669;
}

.change-label {
  font-size: 12px;
  color: #9ca3af;
}
</style>

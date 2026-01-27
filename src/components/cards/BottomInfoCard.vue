<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

defineProps<Props>();
</script>

<template>
  <div class="info-card">
    <div class="info-card__icon" :style="{ backgroundColor: bgColor }">
      <img :src="icon" alt="ikonkalar" />
    </div>
    <div class="info-card__content">
      <h4 class="info-card__title">{{ title }}</h4>
      <p class="info-card__description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.info-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: start;
  border: 1px solid #e9eaeb;
  box-shadow: 0px 1px 2px 0px #0a0d120d;
}

.info-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
}

.info-card__content {
  flex: 1;
}

.info-card__title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.info-card__description {
  font-size: 13px;
  color: #10b981;
  margin: 0;
}

@media screen and (max-width:1500px) {
  .info-card{
    padding: 12px;
  }
}
</style>

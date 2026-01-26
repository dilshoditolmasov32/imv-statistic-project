<script setup>
import { onMounted, ref } from "vue";

const nowDate = ref(new Date());
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    nowDate.value = new Date();
  }, 1000);
});

const time = () => nowDate.value.toLocaleTimeString("uz-UZ");
const date = () =>
  nowDate.value.toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const formattedDate = () => {
  const day = String(nowDate.value.getDate()).padStart(2, "0");
  const month = String(nowDate.value.getMonth() + 1).padStart(2, "0");
  const year = nowDate.value.getFullYear();

  return `${day}.${month}.${year}`;
};
</script>

<template>
  <div class="time-date">
    <p>
      {{ formattedDate() }}
      <span>
        {{ time() }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.time-date {
    color: #000;
    font-size: 18px;
  font-weight: 600;
}
</style>

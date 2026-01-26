<script setup lang="ts">
import { ref } from "vue";
import Header from "./header/Header.vue";
import Sidebar from "./sidebar/Sidebar.vue";
const isSidebarOpen = ref(true);

const handleSidebarToggle = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div class="main-layout">
    <Sidebar :is-open="isSidebarOpen" @toggle="handleSidebarToggle" />
    <div class="content" :class="{ collapsed: !isSidebarOpen }">
      <Header />
      <main class="main-section">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  position: relative;
}

.content {
  width: 100%;
  margin-left: 296px;
  transition: margin-left 0.3s ease;
}

.content.collapsed {
  margin-left: 90px;
}

.main-section {
  padding: 32px;
  flex-grow: 1;
}
</style>

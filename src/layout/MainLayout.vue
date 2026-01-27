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
  <div
    class="main-layout"
    :class="{ collapsed: !isSidebarOpen }"
  >
    <aside class="sidebar">
      <Sidebar :isOpen="isSidebarOpen" />
    </aside>

    <div class="content">
      <Header @toggle="handleSidebarToggle" :isSidebarOpen="isSidebarOpen" />
      <main class="main-section">
        <router-view />
      </main>
    </div>
  </div>
</template>


<style scoped>
.main-layout {
  display: grid;
  grid-template-columns: 296px 1fr;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  transition: grid-template-columns 0.3s ease;
}

.main-layout.collapsed {
  grid-template-columns: 90px 1fr;
}

.sidebar {
  height: 100vh;
  overflow: hidden;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  min-width: 0; 
  height: 100vh;
}

.main-section {
  flex: 1;
  padding: 32px;
  overflow-x: auto;
}

</style>

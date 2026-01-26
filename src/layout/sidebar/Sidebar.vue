<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/auth";
import SidebarLogo from "@/assets/images/svg/grand-sidebar-logo.svg";

const router = useRouter();
const authStore = useAuthStore();

const emit = defineEmits(["toggle"]);
const toggleSidebar = () => {
  emit("toggle");
};

const props = defineProps({
  isOpen: Boolean,
});

const menuItems = computed(() => {
  const userRole = authStore.getUserRole;

  const mainRoute = router.options.routes.find((r) => r.path === "/");

  const sidebarRoutes = mainRoute && mainRoute.children ? mainRoute.children : [];

  return sidebarRoutes
    .filter((route) => {
      const isVisible = route.meta?.showInSidebar;
      const hasPermission = !route.meta?.roles || route.meta.roles.includes(userRole);

      return isVisible && hasPermission;
    })
    .map((route) => ({
      path: route.path.startsWith("/") ? route.path : `/${route.path}`,
      title: route.meta?.title,
      icon: route.meta?.icon,
      badge: route.meta?.badge ?? null,
    }));
});
</script>
<template>
  <div class="sidebar" :class="{ collapsed: !isOpen }">
    <div class="logo-section" @click="toggleSidebar">
      <img :src="SidebarLogo" alt="logo" class="sidebar-logo" />
      <span v-if="isOpen" class="logo-text">Grand</span>
    </div>

    <nav class="menu">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="menu-item"
        active-class="active-link"
      >
        <div class="item-content">
          <img :src="item.icon" class="icon" />
          <span v-if="isOpen" class="text">{{ item.title }}</span>
        </div>
        <span v-if="isOpen && item.badge" class="badge">
          {{ item.badge }}
        </span>
      </router-link>
    </nav>
  </div>
</template>
<style scoped>
.sidebar {
  height: 100vh;
  background-color: #0c0e12;
  color: #cecfd2;
  transition: width 0.3s ease;
  width: 296px;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9999;
}

.sidebar.collapsed {
  width: 90px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-left: 2em;
  margin-right: 0.75em;
  height: 75px;
}

.sidebar-logo {
  width: 2rem;
  height: 2rem;
}

.logo-text {
  font-weight: 900;
  color: #fff;
  font-size: 20px;
  letter-spacing: 2px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
}

.menu-item:hover {
  background-color: #22262f;
  color: #ececed;
}

.menu-item:active {
  background-color: #22262f;
  color: #ececed;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  width: 100%;
}

.badge {
  color: #cecfd2;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 8px;
  width: 24px;
  height: 24px;
  text-align: center;
  font-weight: 500;
  border: 1px solid #373a41;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.icon {
  text-align: center;
}

.text {
  white-space: nowrap;
  color: #cecfd2 !important;
  font-size: 14px;
  margin-left: 10px;
  display: inline-block !important;
}

.active-link {
  background-color: #22262f;
  color: #fff !important;
}

.active-link .text {
  color: #fff;
}
</style>

<script setup lang="ts">
import { computed, onMounted  } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth.pinia";
import SidebarLogo from "@/assets/images/svg/grand-sidebar-logo.svg";4
import { AVAILABLE_ROLES } from "@/utils/roles";

import HomeLogo from "@/assets/images/svg/home-icon.svg?component";
import CheckLogo from "@/assets/images/svg/check-icon.svg?component";
import OrganationLogo from "@/assets/images/svg/organazition-icon.svg?component";
import FinanceLogo from "@/assets/images/svg/financ-icon.svg?component";
import StudyingLogo from "@/assets/images/svg/studying-icon.svg?component";
import UniversityLogo from "@/assets/images/svg/university-icon.svg?component";
import UsersLogo from "@/assets/images/svg/users-icon.svg?component";
import { getUserData } from "@/services/user.service";

const props = defineProps({
  isOpen: Boolean,
});

const authStore = useAuthStore();
const router = useRouter();







const allMenuItems = [
  {
    path: "/main",
    title: "Asosiy",
    icon: HomeLogo,
    roles: [
      AVAILABLE_ROLES.DEVELOPER,
      AVAILABLE_ROLES.MINFIN_ADMIN,
      AVAILABLE_ROLES.ORGANIZATION_ADMIN,
      AVAILABLE_ROLES.SUPER_ADMIN,
    ],
  },
  {
    path: "/requests",
    title: "Arizalar",
    icon: CheckLogo,
    roles: [
      AVAILABLE_ROLES.DEVELOPER,
      AVAILABLE_ROLES.MINFIN_ADMIN,
      AVAILABLE_ROLES.ORGANIZATION_ADMIN,
      AVAILABLE_ROLES.SUPER_ADMIN,
    ],
  },
  {
    path: "/organizations",
    title: "Tashkilotlar",
    icon: OrganationLogo,
    roles: [
      AVAILABLE_ROLES.DEVELOPER,
      AVAILABLE_ROLES.MINFIN_ADMIN,
      AVAILABLE_ROLES.ORGANIZATION_ADMIN,
      AVAILABLE_ROLES.SUPER_ADMIN,
    ],
  },
  {
    path: "/economic-sectors",
    title: "Iqtisodiy tarmoqlar",
    icon: FinanceLogo,
    roles: [
      AVAILABLE_ROLES.DEVELOPER,
      AVAILABLE_ROLES.MINFIN_ADMIN,
      AVAILABLE_ROLES.ORGANIZATION_ADMIN,
      AVAILABLE_ROLES.SUPER_ADMIN,
    ],
    badge: 8,
  },
  {
    path: "/specialties",
    title: "Ta’lim yo‘nalishlari",
    icon: StudyingLogo,
    roles: [
      AVAILABLE_ROLES.DEVELOPER,
      AVAILABLE_ROLES.MINFIN_ADMIN,
      AVAILABLE_ROLES.ORGANIZATION_ADMIN,
      AVAILABLE_ROLES.SUPER_ADMIN,
    ],
  },
  {
    path: "/universities",
    title: "Universitetlar",
    icon: UniversityLogo,
    roles: [
      AVAILABLE_ROLES.DEVELOPER,
      AVAILABLE_ROLES.MINFIN_ADMIN,
      AVAILABLE_ROLES.ORGANIZATION_ADMIN,
      AVAILABLE_ROLES.SUPER_ADMIN,
    ],
  },
  {
    path: "/roles",
    title: "Rollar",
    icon: UsersLogo,
    roles: [
      AVAILABLE_ROLES.DEVELOPER,
      AVAILABLE_ROLES.MINFIN_ADMIN,
      AVAILABLE_ROLES.ORGANIZATION_ADMIN,
      AVAILABLE_ROLES.SUPER_ADMIN,
    ],
  },
];

const menuItems = computed(() => {
  return allMenuItems.filter((item) =>{
    const route=item?.roles?.includes(authStore.userRole)
return route  
 
  });
});


const toggleSidebar = () => {
  router.push("/");
};





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
          <component :is="item.icon" class="icon" />

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
  background-color: #0c0e12;
  color: #cecfd2;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
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
  transition: background 0.2s ease, color 0.2s ease;
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

.menu-item .icon {
  color: #94979c;
  transition: color 0.2s ease;
}

.menu-item:hover .icon {
  color: #cecfd2;
}

.active-link .icon {
  color: #cecfd2;
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

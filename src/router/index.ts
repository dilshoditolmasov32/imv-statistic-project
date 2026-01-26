import {
  Main,
  Organization,
  EconomicSectors,
  Request,
  Roles,
  Specialties,
  Universities,
  Login,
  CreateRequest,
  MyRequest,
} from "@/views";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import MainLayout from "@/layout/MainLayout.vue";

import HomeLogo from "../assets/images/svg/home-icon.svg";
import CheckLogo from "../assets/images/svg/check-icon.svg";
import OrganationLogo from "../assets/images/svg/organazition-icon.svg";
import FinanceLogo from "../assets/images/svg/financ-icon.svg";
import StudyingLogo from "../assets/images/svg/studying-icon.svg";
import UniversityLogo from "../assets/images/svg/university-icon.svg";
import UsersLogo from "../assets/images/svg/users-icon.svg";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { showInSidebar: false, guestOnly: true },
  },
  {
    path: "/",
    component: MainLayout,
    redirect: "/main",
    children: [
      {
        path: "main",
        name: "Main",
        component: Main,
        meta: {
          title: "Asosiy",
          icon: HomeLogo,
          requireAuth: true,
          showInSidebar: true,
          roles: ["admin", "user"],
        },
      },
      {
        path: "requests",
        name: "Requests",
        component: Request,

        meta: {
          title: "Arizalar",
          icon: CheckLogo,
          showInSidebar: true,
          requireAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "organizations",
        name: "Organizations",
        component: Organization,
        meta: {
          title: "Tashkilotlar",
          icon: OrganationLogo,
          showInSidebar: true,
          requireAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "economic-sectors",
        name: "EconomicSectors",
        component: EconomicSectors,
        meta: {
          title: "Iqtisodiy tarmoqlar",
          icon: FinanceLogo,
          showInSidebar: true,
          badge: 8,
          requireAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "specialties",
        name: "Specialties",
        component: Specialties,
        meta: {
          title: "Ta’lim yo‘nalishlari",
          icon: StudyingLogo,
          showInSidebar: true,
          requireAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "universities",
        name: "Universities",
        component: Universities,
        meta: {
          title: "Universitetlar",
          icon: UniversityLogo,
          showInSidebar: true,
          requireAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "roles",
        name: "Roles",
        component: Roles,
        meta: {
          title: "Rollar",
          icon: UsersLogo,
          showInSidebar: true,
          requireAuth: true,
          roles: ["admin"],
        },
      },

      {
        path: "my-request",
        name: "MyRequest",
        component: MyRequest,
        children: [
          {
            path: "create",
            name: "CreateRequest",
            component: CreateRequest,
            meta: {
              title: "Ariza yaratish",
              icon: CheckLogo,
              showInSidebar: true,
              requireAuth: true,
              roles: ["admin"],
            },
          },
        ],
        meta: {
          title: "Mening arizalarim",
          icon: CheckLogo,
          showInSidebar: true,
          requireAuth: true,
          roles: ["admin"],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const userRole = authStore.getUserRole;

  const isAuth = authStore.isAuthenticated;
  const menuItems = router.options.routes
    .find((r) => r.path === "/")
    ?.children?.filter((route) => {
      return route.meta?.showInSidebar && route.meta?.roles?.includes(userRole);
    });
  if (to.meta.requireAuth && !isAuth) {
    next({ name: "Login" });
  } else if (to.name === "Login" && isAuth) {
    next({ name: "Main" });
  } else {
    next();
  }
});

export default router;

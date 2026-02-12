import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth.pinia";
import { getUserData } from "@/services/user.service";
import { AVAILABLE_ROLES } from "@/utils/roles";


const routes = [
  {
    path: "/auth",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
    meta: { guestOnly: true },
  },

  {
    path: "/",
    component: () => import("@/layout/MainLayout.vue"),
    meta: { requireAuth: true },

    children: [
      {
        path: "main",
        name: "Main",
        component: () => import("@/views/main/Main.vue"),
        meta: {
          title: "Asosiy",
          icon: "home-icon",
          requireAuth: true,
          roles: [
            AVAILABLE_ROLES.DEVELOPER,
            AVAILABLE_ROLES.MINFIN_ADMIN,
            AVAILABLE_ROLES.ORGANIZATION_ADMIN,
            AVAILABLE_ROLES.SUPER_ADMIN,
          ],
        },
      },
      {
        path: "requests",
        name: "Requests",
        component: () => import("@/views/request/Request.vue"),

        meta: {
          title: "Arizalar",
          icon: "check-icon",
          requireAuth: true,
          roles: [
            AVAILABLE_ROLES.DEVELOPER,
            AVAILABLE_ROLES.MINFIN_ADMIN,
            AVAILABLE_ROLES.ORGANIZATION_ADMIN,
            AVAILABLE_ROLES.SUPER_ADMIN,
          ],
        },
      },
      {
        path: "organizations",
        name: "Organizations",
        component: () => import("@/views/organizations/Organizations.vue"),
        meta: {
          title: "Tashkilotlar",
          icon: "organization-icon",
          requireAuth: true,
          roles: [
            AVAILABLE_ROLES.DEVELOPER,
            AVAILABLE_ROLES.MINFIN_ADMIN,
            AVAILABLE_ROLES.ORGANIZATION_ADMIN,
            AVAILABLE_ROLES.SUPER_ADMIN,
          ],
        },
      },
      {
        path: "economic-sectors",
        name: "EconomicSectors",
        component: () => import("@/views/economic-sectors/EconomicSectors.vue"),
        meta: {
          title: "Iqtisodiy tarmoqlar",
          icon: "Finance-logo",
          badge: 8,
          requireAuth: true,
          roles: [
            AVAILABLE_ROLES.DEVELOPER,
            AVAILABLE_ROLES.MINFIN_ADMIN,
            AVAILABLE_ROLES.ORGANIZATION_ADMIN,
            AVAILABLE_ROLES.SUPER_ADMIN,
          ],
        },
      },
      {
        path: "specialties",
        name: "Specialties",
        component: () => import("@/views/specialties/Specialties.vue"),
        meta: {
          title: "Ta’lim yo‘nalishlari",
          icon: "Studying-icon",
          requireAuth: true,
          roles: [
            AVAILABLE_ROLES.DEVELOPER,
            AVAILABLE_ROLES.MINFIN_ADMIN,
            AVAILABLE_ROLES.ORGANIZATION_ADMIN,
            AVAILABLE_ROLES.SUPER_ADMIN,
          ],
        },
      },
      {
        path: "universities",
        name: "Universities",
        component: () => import("@/views/universities/Universities.vue"),
        meta: {
          title: "Universititlar",
          icon: "university-icon",
          requireAuth: true,
          roles: [
            AVAILABLE_ROLES.DEVELOPER,
            AVAILABLE_ROLES.MINFIN_ADMIN,
            AVAILABLE_ROLES.ORGANIZATION_ADMIN,
            AVAILABLE_ROLES.SUPER_ADMIN,
          ],
        },
      },
      {
        path: "roles",
        name: "Roles",
        component: () => import("@/views/roles/Roles.vue"),
        meta: {
          title: "Rollar",
          icon: "users-icon",
          requireAuth: true,
          roles: [
            AVAILABLE_ROLES.DEVELOPER,
            AVAILABLE_ROLES.MINFIN_ADMIN,
            AVAILABLE_ROLES.ORGANIZATION_ADMIN,
            AVAILABLE_ROLES.SUPER_ADMIN,
          ],
        },
      },

      {
        path: "my-request",
        name: "MyRequest",
        component: () => import("@/views/request/MyRequest.vue"),
        children: [
          {
            path: "create",
            name: "CreateRequest",
            component: () => import("@/views/request/CreateRequest.vue"),
            meta: {
              title: "Ariza yaratish",
              icon: "check-icon",
              requireAuth: true,
              roles: [
                AVAILABLE_ROLES.DEVELOPER,
                AVAILABLE_ROLES.MINFIN_ADMIN,
                AVAILABLE_ROLES.ORGANIZATION_ADMIN,
                AVAILABLE_ROLES.SUPER_ADMIN,
              ],
            },
          },
        ],
        meta: {
          title: "Mening arizalarim",
          icon: "check-icon",
          showInSidebar: true,
          requireAuth: true,
          roles: [
            AVAILABLE_ROLES.DEVELOPER,
            AVAILABLE_ROLES.MINFIN_ADMIN,
            AVAILABLE_ROLES.ORGANIZATION_ADMIN,
            AVAILABLE_ROLES.SUPER_ADMIN,
          ],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem("_token");

  if (to.meta.guestOnly) {
    if (token) {
      return next({ name: "Main", replace: true });
    }
    return next();
  }

  if (to.meta.requireAuth) {
    if (!token) {
      return next({ name: "Login", replace: true });
    }

    if (token && !authStore.userRole) {
      try {
        const response = await getUserData();
        authStore.userRole = response.data.role_name;
      } catch (error) {
        console.error("Ruxsat olishda xatolik:", error);
        localStorage.removeItem("_token");
        return next({ name: "Login", replace: true });
      }
    }

    const allowedRoles = to.meta.roles as string[];

    if (allowedRoles && allowedRoles.length > 0 && to.name !== "Main") {
      const userRole = authStore.userRole || "";

      if (!allowedRoles.includes(userRole)) {
        console.warn("Ruxsat yo'q!");
        return next({ name: "Main" });
      }
    }
  }

  next();
});

export default router;

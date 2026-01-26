import { defineStore } from "pinia";
import { User } from "@interface/User";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null") as User | null,
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserRole: (state): string => state.user?.role || "guest",
  },
});

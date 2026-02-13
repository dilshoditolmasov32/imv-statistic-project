import { nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { useCore } from "./core.pinia";
import { defineStore } from "pinia";
import api from "@/api/axios";
import { AuthPayload } from "@/interface/Aut";
import { getUserData } from "@/services/user.service";

export const useAuthStore = defineStore("auth", () => {
  const core = useCore();
  const router = useRouter();

  const userRole = ref<string>("")

  const auth = async (payload: AuthPayload) => {
    console.log("AUTH FUNCTION STARTED");
    try {
      core.setMainLoader(true);
      const response = await api.post("/api/user/login-with-sso", payload);
      const data = response.data;

      console.log("aut pinia 22 ", data)
      localStorage.setItem("_token", data.user_auth_token);
      localStorage.setItem("sso_token", data.sso_access_token);

      const userResponse = await getUserData();
      const userData = userResponse.data.data;
      console.log("user role 28 ", userData)

      userRole.value = userData.role_name;
      localStorage.setItem("user_info", JSON.stringify(userData));

      core.setToast({
        status: "success",
        message: "Muvaffaqiyatli",
      });

      await nextTick();
      router.replace({ name: "Main" });
    } catch (error: any) {
      console.error("Auth error:", error);
      core.setToast({
        status: "error",
        message: error.response?.data?.message || "Xatolik yuz berdi",
      });
      router.replace({ name: "Login" });
    } finally {
      localStorage.removeItem("verify");
      core.setMainLoader(false);
    }
  };


const initAuth = async () => {
  const token = localStorage.getItem("_token");
  if (!token) return;

  const response = await getUserData();
  const userData = response.data.data;

  userRole.value = userData.role_name;
  localStorage.setItem("user_info", JSON.stringify(userData));
};

  return { auth, userRole, initAuth };
});

import { ref } from "vue";
import { useRouter} from "vue-router";
import { useCore } from "./core.pinia";
import { defineStore } from "pinia";
import api from "@/api/axios";
import { AuthPayload } from "@/interface/Aut";
import { getUserData } from "@/services/user.service";

export const useAuthStore = defineStore("auth", () => {
  const core = useCore();
  const router = useRouter();

const savedUserInfo = localStorage.getItem("user_info");
  
  const getInitialRole = () => {
    if (savedUserInfo) {
      try {
        const parsed = JSON.parse(savedUserInfo);
        return parsed.data?.role_name || ""; 
      } catch (e) {
        return "";
      }
    }
    return "";
  };

  const userRole = ref<string>(getInitialRole());

  const auth = async (payload:AuthPayload) => {
    try {
      core.setMainLoader(true);
      const response = await api.post("/api/user/login-with-sso", payload)
      const data = response.data;
      

      localStorage.setItem("_token", data.user_auth_token);
      localStorage.setItem("sso_token", data.sso_access_token);
      localStorage.setItem("user_info", JSON.stringify(data.user));



    const userResponse = await getUserData();
      const userData = userResponse.data;

      localStorage.setItem("user_info", JSON.stringify(userData));
      
      userRole.value = userData.role_name;
      
      core.setToast({
        status: "success",
        message: "Muvaffaqiyatli",
      });

      router.replace("/main"); 
    } catch (error: any) {
      core.setToast({
        status: "error",
        message: error.response?.data?.message || "Xatolik yuz berdi",
      });
    } finally {
      core.setMainLoader(false);
    }
  };

  return { auth, userRole };
});
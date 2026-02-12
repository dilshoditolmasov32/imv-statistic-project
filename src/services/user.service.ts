import api from "@/api/axios";

export const getUserData = async () => {
  const response = await api.get("/api/user/get-me");
  return response;
};
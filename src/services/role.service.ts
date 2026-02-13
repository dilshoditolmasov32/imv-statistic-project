import api from "@/api/axios";
import { UserRoleResponse } from "@/interface/Role";

export const getUserRoleData = async (
  page: number,
  limit: number,
): Promise<UserRoleResponse> => {
  const response = await api.get(`/minfin/user?page=${page}&limit=${limit}`);
  return response.data;
};

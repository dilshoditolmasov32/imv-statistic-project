import api from "@/api/axios";

export const getRegionsData = async (name: string) => {
  const response = await api.get(`/api/reference/regions?page=${name}`);
  return response.data;
};

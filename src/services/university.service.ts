import api from "@/api/axios";
import { UniversityResponse } from "@/interface/Universities";

export const getUniversityData = async (
  page: number,
  limit: number,
): Promise<UniversityResponse> => {
  const response = await api.get(
    `/api/reference/universities?page=${page}&limit=${limit}`,
  );
  return response.data;
};

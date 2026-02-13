import api from "@/api/axios";
import { RequestResponse } from "@/interface/RequestTableType";

export const getRequestsData = async (
  page: number,
  limit: number,
): Promise<RequestResponse> => {
  const response = await api.get(
    `/minfin/app?page=${page}&limit=${limit}`,
  );
  return response.data;
};

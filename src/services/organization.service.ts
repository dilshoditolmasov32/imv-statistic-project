import api from "@/api/axios";
import { OrganizationResponse } from "@/interface/Organizations";

export const getOrganizationsData = async (
  page: number,
  limit: number,
): Promise<OrganizationResponse> => {
  const response = await api.get(
    `/minfin/organization?page=${page}&limit=${limit}`,
  );
  return response.data;
};

import { Component } from "vue";

export interface typeOrganization {
  id: number;
  name: string;
  address: string;
  date_of_registration: string | null;
  registration_date: string | null;
  region_id: number | null;
  region_name: string;
  authority: string | null;
  tin: string;
  phone: string | null;
  staff_unit_count: number | null;
  employee_count: number | null;
  vacant_position_count: number | null;
  type: number;
  status: number;
  sort_order: number;
  created_at: number;
  updated_at: number;

}

export interface OrganizationResponse {
  success: boolean;
  data: typeOrganization[];
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

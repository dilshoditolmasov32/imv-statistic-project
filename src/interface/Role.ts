export interface UserRole {
  id: number;
  username: string;
  pinfl: string;
  phone_number: string;
  full_name: string;
  status: number;
  role: number;
  created_at: number;      
  updated_at: number;     
  organization_id: number | null;
  role_name: string;
}

export interface UserRoleResponse {
  success: boolean;
  data: UserRole[];
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

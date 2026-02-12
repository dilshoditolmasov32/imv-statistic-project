export interface typeUniversities {
  id: number;
  description: string;
  webcite: string;
  name: string;
}
export interface UniversityResponse {
  data: typeUniversities[];
  per_page: number;
  total_count: number;
  current_page: number;
  total_pages: number;
}

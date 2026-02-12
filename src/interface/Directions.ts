export interface typeDirections {
  id: number;
  code: number;
  name: string;
}
export interface DirectionsResponse {
  data: typeDirections[];
  per_page: number;
  total_count: number;
  current_page: number;
  total_pages: number;
}

import { Component } from "vue";

export interface RequestTableType {
  id: number;
  organizationName: string;
  IDNumber: number;
  requirementCount: number;
  directionCount: number;
  actionState: {
    confirmed: boolean;
    cancelled: boolean;
  };
  updateDate: string;
  buttons:{
    deleteBtn:Component | string,
    editBtn:Component| string
  },
  webciteName:string
}


export interface RequestResponse {
  data: RequestTableType[];
  per_page: number;
  total_count: number;
  current_page: number;
  total_pages: number;
}


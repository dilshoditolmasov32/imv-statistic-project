import api from "@/api/axios";
import { DirectionsResponse } from "@/interface/Directions";

export const getDirectionsData=async(page:number, limit:number):Promise<DirectionsResponse>=>{
    const response= await api.get(`api/reference/directions?page=${page}&limit=${limit}`)
    return response.data
}
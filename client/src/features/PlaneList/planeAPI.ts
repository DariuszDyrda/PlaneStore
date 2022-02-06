import { IPlaneProps } from "./PlaneCard/PlaneCard";
import axios from 'axios';

export interface PlaneAPIResponse {
  results: IPlaneProps[];
  status: {
    offset: number;
    total: number;
  }
}

const API_URL = 'http://localhost:8000'

export async function getPlanes(skip: number, take: number, search?: string): Promise<PlaneAPIResponse> {
  const searchQuery = search ? `&search=${search}` : '';
  const response = await axios.get(API_URL + `/plane?skip=${skip}&take=${take}${searchQuery}`);
  return response.data;
}
  
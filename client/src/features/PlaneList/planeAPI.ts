import { IPlaneProps } from "./PlaneCard/PlaneCard";
import axios from 'axios';

export interface PlaneAPIResponse {
  results: IPlaneProps[];
  status: {
    offset: number;
    total: number;
  }
}

const API_URL = process.env.REACT_APP_API_URL;

export async function getPlanesAPI(skip: number, take: number, search?: string): Promise<PlaneAPIResponse> {
  const searchQuery = search ? `&search=${search}` : '';
  const response = await axios.get(API_URL + `/plane?skip=${skip}&take=${take}${searchQuery}`);
  return response.data;
}

export async function deletePlaneAPI(id: number, token: string): Promise<number> {
  await axios.delete(API_URL + `/plane/${id}`, { headers: { Authorization: `Bearer ${token}`}});
  return id;
}
  
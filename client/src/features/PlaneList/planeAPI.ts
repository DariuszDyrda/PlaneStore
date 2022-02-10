import { IPlaneProps } from "./PlaneCard/PlaneCard";
import axios from 'axios';

export interface PlaneAPIResponse {
  results: IPlaneProps[];
  status: {
    offset: number;
    total: number;
  }
}

export type PlaneCreateData = Omit<IPlaneProps, 'updatedAt' | 'createdAt' | 'id'>;
export type PlaneUpdateData = Partial<PlaneCreateData>;

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

export async function createPlaneAPI(data: PlaneCreateData, token: string): Promise<IPlaneProps> {
  const response = await axios.post(API_URL + `/plane`, data, { headers: { Authorization: `Bearer ${token}`}});
  return response.data;
}

export async function updatePlaneAPI(id: number, data: PlaneCreateData, token: string): Promise<IPlaneProps> {
  // await new Promise(r => setTimeout(r, 3000));
  const response = await axios.put(API_URL + `/plane/${id}`, data, { headers: { Authorization: `Bearer ${token}`}});
  return response.data;
}
  
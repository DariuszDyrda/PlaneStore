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

export async function getPlanes(skip: number, take: number): Promise<PlaneAPIResponse> {
  const response = await axios.get(API_URL + `/plane?skip=${skip}&take=${take}`);
  return response.data;
}
  
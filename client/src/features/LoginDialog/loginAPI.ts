import axios from 'axios';

export interface AdminDoc {
    id: number;
    email: string;
}

export interface AdminLoginAPIResponse {
    user: AdminDoc,
    accessToken: string;
}

export interface AdminCredentials {
    email: string;
    password: string;
}

const API_URL = process.env.REACT_APP_API_URL;

export async function loginAdminAPI(data: AdminCredentials): Promise<AdminLoginAPIResponse> {
  const response = await axios.post(API_URL + `/auth/login`, data);
//   await new Promise(r => setTimeout(r, 3000)); // use to simulate API waiting time
  return response.data;
}
  
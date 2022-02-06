import axios from 'axios';

export enum OrderStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
  }

export interface OrderAPIResponse {
    clientName: string;
    clientAddress: string;
    planeId: number;
    id: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}

export type PlaceOrderData = Pick<OrderAPIResponse, 'clientName' | 'clientAddress' | 'planeId'>;

const API_URL = process.env.REACT_APP_API_URL;

export async function postOrder(data: PlaceOrderData): Promise<OrderAPIResponse> {
  const response = await axios.post(API_URL + `/order`, data);
//   await new Promise(r => setTimeout(r, 3000)); // use to simulate API waiting time
  return response.data;
}
  
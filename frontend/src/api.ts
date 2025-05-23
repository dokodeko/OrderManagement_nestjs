// frontend/src/api.ts

import axios from 'axios';

export interface Order {
  id:       number;
  products: string;
  quantity: number;
  total:    number;
  date:     string;
  status:   string;
  userId:   number;
}

export interface CreateOrderDto extends Omit<Order,'id'> {}

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchOrders = (): Promise<Order[]> =>
  api.get('/orders').then(r => r.data);

export const createOrder = (
  order: CreateOrderDto,
): Promise<Order> =>
  api.post('/orders', order).then(r => r.data);

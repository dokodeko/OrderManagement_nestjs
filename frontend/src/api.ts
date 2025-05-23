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

export interface CreateOrderDto extends Omit<Order, 'id'> {}

// Partial DTO for updates: any subset of create fields
export type UpdateOrderDto = Partial<CreateOrderDto>;

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Fetch all orders
export const fetchOrders = (): Promise<Order[]> =>
  api.get('/orders').then(res => res.data);

// Create a new order
export const createOrder = (
  order: CreateOrderDto,
): Promise<Order> => {
  // ensure full ISO-8601 timestamp
  const payload = { ...order, date: new Date(order.date).toISOString() };
  return api.post('/orders', payload).then(res => res.data);
};

// Update an existing order
export const updateOrder = (
  id: number,
  data: UpdateOrderDto,
): Promise<Order> => {
  // transform date if present to full ISO-8601
  const payload: UpdateOrderDto = { ...data };
  if (payload.date) {
    payload.date = new Date(payload.date).toISOString();
  }
  return api.patch(`/orders/${id}`, payload).then(res => res.data);
};

// Delete an order by ID
export const deleteOrder = (
  id: number,
): Promise<{ deleted: boolean }> =>
  api.delete(`/orders/${id}`).then(res => res.data);

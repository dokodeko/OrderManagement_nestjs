import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * User returned by the API
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Payload to create a new user
 */
export interface CreateUserDto {
  name: string;
  email: string;
}

/**
 * Create a new user (registration)
 */
export const createUser = (data: CreateUserDto): Promise<User> =>
  api.post('/users', data).then((res) => res.data);

/**
 * Fetch a user by their numeric ID
 */
export const fetchUserById = (id: number): Promise<User> =>
  api.get(`/users/${id}`).then((res) => res.data);

/**
 * Fetch a user by email (used for login)
 */
export const fetchUserByEmail = (email: string): Promise<User> =>
  api
    .get(`/users/email/${encodeURIComponent(email)}`)
    .then((res) => res.data);


export interface Order {
  id:       number;
  products: string;
  quantity: number;
  price:    number;
  date:     string;
  status:   string;
  userId:   number;
}

export interface CreateOrderDto extends Omit<Order, 'id'> {}
export type UpdateOrderDto = Partial<CreateOrderDto>;

/**
 * Fetch all orders
 */
export const fetchOrders = (): Promise<Order[]> =>
  api.get('/orders').then((res) => res.data);

/**
 * Create a new order
 */
export const createOrder = (
  order: CreateOrderDto
): Promise<Order> => {
  const payload = { ...order, date: new Date(order.date).toISOString() };
  return api.post('/orders', payload).then((res) => res.data);
};

/**
 * Update an existing order
 */
export const updateOrder = (
  id: number,
  data: UpdateOrderDto
): Promise<Order> => {
  const payload: UpdateOrderDto = { ...data };
  if (payload.date) {
    payload.date = new Date(payload.date).toISOString();
  }
  return api.patch(`/orders/${id}`, payload).then((res) => res.data);
};

/**
 * Delete an order by ID
 */
export const deleteOrder = (
  id: number
): Promise<{ deleted: boolean }> =>
  api.delete(`/orders/${id}`).then((res) => res.data);

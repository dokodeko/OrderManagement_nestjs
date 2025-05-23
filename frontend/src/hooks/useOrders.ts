// src/hooks/useOrders.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  Order,
  CreateOrderDto,
  UpdateOrderDto,
} from '../api';

/**
 * Custom hook that wraps React Query for orders.
 * - fetches orders list
 * - creates new orders and invalidates cache on success
 * - updates existing orders and invalidates cache on success
 * - deletes orders and invalidates cache on success
 */
export function useOrders() {
  const qc = useQueryClient();

  // Query: get list of orders
  const query = useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  // Mutation: add a new order
  const addOrder = useMutation<Order, Error, CreateOrderDto>({
    mutationFn: createOrder,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });

  // Mutation: update an existing order
  const updateOrderMutation = useMutation<Order, Error, { id: number; data: UpdateOrderDto }>({
    mutationFn: ({ id, data }) => updateOrder(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });

  // Mutation: delete an order
  const deleteOrderMutation = useMutation<{ deleted: boolean }, Error, number>({
    mutationFn: (id) => deleteOrder(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });

  return {
    ...query,
    addOrder,
    updateOrder: updateOrderMutation,
    deleteOrder: deleteOrderMutation,
  };
}

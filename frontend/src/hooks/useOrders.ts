// src/hooks/useOrders.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOrders, createOrder, Order, CreateOrderDto } from '../api';

/**
 * Custom hook that wraps React Query for orders.
 * - fetches orders list
 * - creates new orders and invalidates cache on success
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

  return { ...query, addOrder };
}

// src/components/OrderList.jsx
import React from 'react';
import OrderItem from './OrderItem';
import { useOrders} from '../hooks/useOrders';

export default function OrderList() {
 const { data: orders = [], isLoading, isError } = useOrders();

  if (isLoading) return <p className="text-gray-500">Loading orders…</p>;
  if (isError)   return <p className="text-red-500">Error loading orders.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <OrderItem order={order} key={order.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
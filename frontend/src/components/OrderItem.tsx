// src/components/OrderItem.jsx
import React from 'react';
import StatusBadge from './StatusBadge';

export default function OrderItem({ order, onEdit, onDelete }) {
  const { id, products, quantity, total, date, status } = order;
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 text-sm text-gray-700 border-b">{id}</td>
      <td className="px-4 py-2 text-sm text-gray-700 border-b">{products}</td>
      <td className="px-4 py-2 text-sm text-gray-700 border-b">{quantity}</td>
      <td className="px-4 py-2 text-sm text-gray-700 border-b">${total.toFixed(2)}</td>
      <td className="px-4 py-2 text-sm text-gray-700 border-b">{new Date(date).toLocaleString()}</td>
      <td className="px-4 py-2 text-sm border-b">
        <StatusBadge status={status} />
      </td>
      <td className="px-4 py-2 text-sm border-b">
        <button
          onClick={() => onEdit(order)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        {' | '}
        <button
          onClick={() => onDelete(order.id)}
          className="text-red-600 hover:underline ml-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

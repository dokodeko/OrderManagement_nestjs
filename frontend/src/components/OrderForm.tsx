// src/components/OrderForm.jsx
import React, { useState, useEffect } from 'react';
import { useOrders } from '../hooks/useOrders';

const empty = { products: '', quantity: 1, total: 0, date: '', status: '', userId: 1 };

export default function OrderForm({ initialData, onDone }) {
  const { addOrder, updateOrder, isLoading: isAdding, isLoading: isUpdating } = useOrders();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        products: initialData.products,
        quantity: initialData.quantity,
        total: initialData.total,
        date: new Date(initialData.date).toISOString().slice(0,16),
        status: initialData.status,
        userId: initialData.userId,
      });
      setError(null);
    }
  }, [initialData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: ['quantity','total','userId'].includes(name) ? +value : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    if (initialData?.id) {
      updateOrder.mutate(
        { id: initialData.id, data: form },
        { onSuccess: () => onDone?.() }
      );
    } else {
      addOrder.mutate(
        form,
        { onError: () => setError('Failed to create order') }
      );
    }
    setForm(empty);
  };

  const loading = isAdding || isUpdating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-4 rounded-lg shadow">
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="products" value={form.products} onChange={handleChange} placeholder="Products" className="border border-gray-300 rounded p-2 w-full" />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="border border-gray-300 rounded p-2 w-full" />
        <input name="total" type="number" value={form.total} onChange={handleChange} placeholder="Total" className="border border-gray-300 rounded p-2 w-full" />
        <input name="date" type="datetime-local" value={form.date} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full" />
        <select name="status" value={form.status} onChange={handleChange} className="border border-gray-300 rounded p-2 w-full">
          <option value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input name="userId" type="number" value={form.userId} onChange={handleChange} placeholder="User ID" className="border border-gray-300 rounded p-2 w-full" />
      </div>
      <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
        {initialData ? (loading ? 'Updating…' : 'Update Order') : (loading ? 'Saving…' : 'Create Order')}
      </button>
    </form>
  );
}

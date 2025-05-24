import React, { useState, useEffect } from 'react';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../context/AuthContext';

const makeEmptyForm = (userId) => ({
  products: '',
  quantity: 1,
  price: 0,
  status: 'pending',
  userId,
});

export default function OrderForm({ initialData, onDone }) {
  const { user } = useAuth();
  const { addOrder, updateOrder, isLoading: isSubmitting } = useOrders();

  const [form, setForm] = useState(() => makeEmptyForm(user?.id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        products: initialData.products,
        quantity: initialData.quantity,
        price: initialData.price,
        status: initialData.status,
        userId: initialData.userId,
      });
      setError(null);
    } else {
      setForm(makeEmptyForm(user?.id));
    }
  }, [initialData, user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity' || name === 'price') {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      products: form.products,
      quantity: form.quantity,
      price: form.price,
      status: form.status,
      userId: form.userId,
      date: new Date().toISOString(),
    };

    if (initialData?.id) {
      updateOrder.mutate(
        { id: initialData.id, data: payload },
        {
          onSuccess: () => {
            onDone?.();
          },
          onError: () => setError('Failed to update order'),
        }
      );
    } else {
      addOrder.mutate(
        payload,
        {
          onSuccess: () => {
            // reset form to empty for next entry
            setForm(makeEmptyForm(user?.id));
            onDone?.();
          },
          onError: () => setError('Failed to create order'),
        }
      );
    }
  };

  return (
    <div className="flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-4 bg-white p-6 rounded-lg shadow-lg"
      >
        {error && <div className="text-red-600 font-medium">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="products"
            value={form.products}
            onChange={handleChange}
            placeholder="Products"
            className="border border-gray-300 rounded p-3 w-full focus:border-blue-500 focus:outline-none"
            required
          />
          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border border-gray-300 rounded p-3 w-full focus:border-blue-500 focus:outline-none"
            required
          />
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border border-gray-300 rounded p-3 w-full focus:border-blue-500 focus:outline-none"
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded p-3 w-full focus:border-blue-500 focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow"
        >
          {initialData
            ? isSubmitting
              ? 'Updating…'
              : 'Update Order'
            : isSubmitting
            ? 'Saving…'
            : 'Create Order'}
        </button>
      </form>
    </div>
  );
}

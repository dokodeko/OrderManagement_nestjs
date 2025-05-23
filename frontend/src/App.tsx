// src/App.jsx
import React, { useState } from 'react';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';

export default function App() {
  const [editing, setEditing] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>
        <OrderForm initialData={editing} onDone={() => setEditing(null)} />
        <OrderList onEdit={setEditing} />
      </div>
    </div>
  );
}
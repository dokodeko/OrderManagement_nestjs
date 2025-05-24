// src/App.tsx (or App.jsx)
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import { useAuth } from './context/AuthContext';
import LogoutButton from './components/LogoutButton';

function Dashboard() {
  const [editing, setEditing] = useState(null);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl">
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Orders Dashboard</h1>
        <OrderForm initialData={editing} onDone={() => setEditing(null)} />
        <OrderList onEdit={setEditing} />
      </div>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <LoginForm />
              </div>
            )
          }
        />
        <Route
          path="/"
          element={
            user ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

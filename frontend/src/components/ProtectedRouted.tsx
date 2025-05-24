import React, { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }
  return children;
}
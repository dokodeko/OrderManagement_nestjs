// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { createUser, fetchUserById, fetchUserByEmail, User } from '../api';
import { AxiosError } from 'axios';

interface AuthContextType {
  user: User | null;
  login: (opts: { email: string; name?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userId');
    if (stored) {
      fetchUserById(+stored)
        .then(setUser)
        .catch(() => localStorage.removeItem('userId'));
    }
  }, []);

  const login = async ({ email, name }: { email: string; name?: string }) => {
    if (!name) {
      try {
        const existing = await fetchUserByEmail(email);
        setUser(existing);
        localStorage.setItem('userId', existing.id.toString());
      } catch (err: any) {
        if ((err as AxiosError).response?.status === 404) {
          throw new Error('User not found');
        }
        throw err;
      }
      return;
    }
    const newUser = await createUser({ email, name });
    setUser(newUser);
    localStorage.setItem('userId', newUser.id.toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
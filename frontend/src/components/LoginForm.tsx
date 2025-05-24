import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<'email' | 'name'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Try logging in with email only
      await login({ email });
      navigate('/orders');

      // If successful, user is logged in
    } catch (err: any) {
      if (err.message === 'User not found') {
        // No account with this email, ask for name to register
        setStep('name');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Complete registration with email and name
      await login({ email, name });
      navigate('/orders');

      // If successful, account created and user logged in
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={step === 'email' ? handleEmailSubmit : handleNameSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">
          {step === 'email' ? 'Enter your email' : 'Welcome! What is your name?'}
        </h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        {step === 'email' ? (
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="border mb-4 p-2 w-full rounded"
          />
        ) : (
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            required
            className="border mb-4 p-2 w-full rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          {step === 'email' ? 'Next' : 'Get Started'}
        </button>

        {step === 'name' && (
          <button
            type="button"
            onClick={() => setStep('email')}
            className="mt-2 text-sm text-gray-500"
          >
            Back
          </button>
        )}
      </form>
    </div>
  );
}

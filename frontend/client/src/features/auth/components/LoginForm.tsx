"use client"
import React, { useState } from 'react';
import axios from 'axios'; // Ensure Axios is imported
import api from '@/services/api'; // Custom API instance

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null); // Clear any previous error
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', data.accessToken);
      alert('Login successful!'); // Placeholder for further handling
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Axios-specific error handling
        setError(err.response?.data?.message || 'An error occurred during login.');
      } else {
        // Generic error handling
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block border p-2 mb-4 w-full rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block border p-2 mb-4 w-full rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;

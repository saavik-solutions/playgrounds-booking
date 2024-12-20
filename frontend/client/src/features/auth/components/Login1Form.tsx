"use client"
import React, { useState } from 'react';
import { useLoginMutation } from '@/features/auth/services/authRTKApi';
import { useAppSelector } from '@/redux/hooks';

const Login1Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const userRole = useAppSelector((state) => state.auth.userRole);

  const handleLogin = async () => {
    try {
      await login({ email, password }).unwrap();
      console.log('Logged in successfully');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {isError && <p>Error: {error?.data?.message || 'Login failed'}</p>}
      {userRole && <p>Role: {userRole}</p>}
    </div>
  );
};

export default Login1Form;

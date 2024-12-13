"use client"
import React from 'react';
import { useLoginMutation } from '@/features/auth/services/authRTKApi';

const LoginForm = () => {
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      await login({ email: 'lambo@gmail.com', password: 'Ssiv@20024' }).unwrap();
      console.log('Login successful');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {isSuccess && <p>Login successful!</p>}
      {isError && <p>Error: {error?.data?.message || 'An error occurred'}</p>}
    </div>
  );
};

export default LoginForm;

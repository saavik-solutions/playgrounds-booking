'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/redux/store';
import { loginUser } from '../services/authThunks';
import { AUTH_STATUSES } from '@/constants/authConstants';
import { OAuthButtons } from '@/components/auth/oauth-buttons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/auth/password-input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, error, role } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Redirect based on role after successful login
  useEffect(() => {
    if (status === AUTH_STATUSES.SUCCEEDED && role) {
      if (role === 'admin') {
        router.push('/admin/dashboard'); // Admin Dashboard
      } else if (role === 'user') {
        router.push('/dashboard'); // User Dashboard
      }
    }
  }, [role, status, router]);

  return (
    <div className="  space-y-6">
      <div className="space-y-2 text-center ">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back
        </h1>
        <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
      </div>

      {/* OAuth Buttons */}
      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500 dark:text-gray-400">
            or sign in with email
          </span>
        </div>
      </div>

      {/* Error and loading indicators */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {status === AUTH_STATUSES.LOADING && <p className="text-center">Loading...</p>}

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email '
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          
          />
        </div>
        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          disabled={status === AUTH_STATUSES.LOADING}
        >
          {status === AUTH_STATUSES.LOADING ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/redux/store';
import { registerUser } from '../services/authThunks';
import { AUTH_STATUSES } from '@/constants/authConstants';
import { OAuthButtons } from '@/components/auth/oauth-buttons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/auth/password-input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, error, role } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  // Redirect based on role after successful registration
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
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Create an account
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Sign up to get started
        </p>
      </div>

      {/* OAuth Buttons */}
      {/* <OAuthButtons /> */}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500 dark:text-gray-400">
            or sign up with email
          </span>
        </div>
      </div>

      {/* Error and loading indicators */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {status === AUTH_STATUSES.LOADING && <p className="text-center">Loading...</p>}

      {/* Register Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          disabled={status === AUTH_STATUSES.LOADING}
        >
          {status === AUTH_STATUSES.LOADING ? 'Registering...' : 'Sign Up'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

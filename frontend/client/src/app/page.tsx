'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();
  const { accessToken, role } = useSelector((state: RootState) => state.auth);

  // Handle redirection based on the authentication state
  React.useEffect(() => {
    if (!accessToken) {
      router.push('/auth/login'); // Redirect to login if not authenticated
    } else if (role === 'admin') {
      router.push('/admin/dashboard'); // Redirect admin users
    } else if (role === 'user') {
      router.push('/user/dashboard'); // Redirect regular users
    }
  }, [accessToken, role, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Application</h1>
      <p className="mt-4 text-lg">
        Redirecting you to your dashboard...
      </p>
    </div>
  );
};

export default HomePage;

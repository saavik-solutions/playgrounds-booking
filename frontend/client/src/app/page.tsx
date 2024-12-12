'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';


export default function HomePage() {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else if (role === 'user') {
        router.push('/user/dashboard');
      }
    } else {
      router.push('/auth/login');
    }
  }, [isAuthenticated, role, router]);

  return <p>Loading...</p>;
}

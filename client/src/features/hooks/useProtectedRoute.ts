"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken, isTokenExpired,getRolesFromToken } from '../../utils/token';

export function useProtectedRoute(requiredRoles?: string[]) {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token || isTokenExpired(token)) {
      router.replace('/login');
      return;
    }

    if (requiredRoles) {
      const roles = getRolesFromToken(token);
      const hasAccess = requiredRoles.some((role) => roles.includes(role));
      if (!hasAccess) {
        router.replace('/403'); // Access Denied
      }
    }
  }, [router, requiredRoles]);

  return { isLoading: false }; // You can add isLoading logic if needed
}

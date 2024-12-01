"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken, isTokenExpired, getRolesFromToken } from '../../utils/token'; // Update path as needed
import { hasRole } from '../../utils/authorization';

export const useRoleGuard = (requiredRole: string) => {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token || isTokenExpired(token)) {
      router.replace('/login');
      return;
    }

    const roles = getRolesFromToken(token);
    if (!hasRole(roles, requiredRole)) {
      router.replace('/403'); // Redirect to "Access Denied" page
    }
  }, [router, requiredRole]);
};

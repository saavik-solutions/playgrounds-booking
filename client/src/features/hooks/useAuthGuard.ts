"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, isTokenExpired, getRolesFromToken } from "../../utils/token";


export function useAuthGuard(requiredRoles?: string | string[]) {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();

    // If no token or token is expired, redirect to login page
    if (!token || isTokenExpired(token)) {
      router.replace("/login");
      return;
    }

    // If specific roles are required, check if the user has any of them
    if (requiredRoles) {
      const roles = getRolesFromToken(token);
      const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

      const hasAccess = rolesArray.some((role) => roles.includes(role));
      if (!hasAccess) {
        router.replace("/403"); // Access Denied
      }
    }
  }, [router, requiredRoles]);

  return { isLoading: false }; // Optionally add isLoading logic if needed
}

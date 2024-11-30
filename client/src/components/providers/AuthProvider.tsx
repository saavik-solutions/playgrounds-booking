"use client";

import { AuthProvider as CustomAuthProvider } from "@/features/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <CustomAuthProvider>{children}</CustomAuthProvider>;
}
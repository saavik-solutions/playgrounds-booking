"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginService, registerService, logoutService, fetchUser } from "../features/auth/services/authService";
import { getAccessToken, setTokens, clearTokens } from "../features/auth/utils/token";
import type { LoginInput, RegisterInput, User } from "../features/auth/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const userData = await fetchUser();
      setUser(userData);
    } catch {
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginInput) => {
    const { user, tokens } = await loginService(credentials);
    setTokens(tokens.accessToken, tokens.refreshToken);
    setUser(user);
    router.push("/dashboard");
  };

  const register = async (data: RegisterInput) => {
    const { user, tokens } = await registerService(data);
    setTokens(tokens.accessToken, tokens.refreshToken);
    setUser(user);
    router.push("/dashboard");
  };

  const logout = async () => {
    await logoutService();
    clearTokens();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

"use client";

import { useState, useEffect, createContext, useContext,ReactNode  } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../services/api';
import { setTokens, clearTokens, getAccessToken } from '../utils/token';
import type { LoginInput, RegisterInput } from '../features/schemas/auth';
// Define the User and Context types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const { data } = await api.get('/api/auth/me');
      setUser(data.user);
    } catch (error) {
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginInput) => {
    try {
      const { data } = await api.post('/api/auth/login', credentials);
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      router.push('/dashboard');
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many attempts. Please try again later.');
      }
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  const register = async (userData: RegisterInput) => {
    try {
      const { data } = await api.post('/api/auth/register', userData);
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      router.push('/dashboard');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      clearTokens();
      setUser(null);
      router.push('/login');
    }
  };

  return (
    // <AuthContext.Provider
    //   value={{
    //     user,
    //     isLoading,
    //     isAuthenticated: !!user,
    //     login,
    //     register,
    //     logout,
    //   }}
    // >
    //   {children}
      // </AuthContext.Provider>
      <>
      
      </>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
import { User } from "./user";

export type UserRole = 'admin' | 'user' ;
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  role: string| null;
  loading: boolean;
  error: string | null;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface GoogleLoginData {
  token: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
  
}

export interface LoginResponse{
  role: string;
  accessToken: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}

// features/types.ts

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface TokenData {
  userId: string;
  exp: number;
  iat: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface AuthError {
  message: string;
  code: number;
}

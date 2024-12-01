import { api } from "../../../services/api";
import type { LoginInput, RegisterInput, User } from "../types/types";

interface AuthResponse {
  user: User;
  tokens: { accessToken: string; refreshToken: string };
}

// Login Service
export async function loginService(credentials: LoginInput): Promise<AuthResponse> {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
}

// Register Service
export async function registerService(userData: RegisterInput): Promise<AuthResponse> {
  const { data } = await api.post("/api/auth/register", userData);
  return data;
}

// Fetch Current User
export async function fetchUser(): Promise<User> {
  const { data } = await api.get("/api/auth/me");
  return data.user;
}

// Logout Service
export async function logoutService(): Promise<void> {
  await api.post("/api/auth/logout");
}

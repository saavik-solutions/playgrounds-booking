"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getAccessToken, getRolesFromToken } from "../utils/token"; // Adjust path as needed

// Define types for the context
interface AuthContextType {
  user: { roles: string[] } | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

// Create a default context value
const defaultContextValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};




// Create context
const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Create provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const roles = getRolesFromToken(accessToken);
      if (roles.length > 0) {
        setUser({ roles });
      }
    }
  }, []);

  const login = (accessToken: string) => {
    const roles = getRolesFromToken(accessToken);
    setUser({ roles });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = (): AuthContextType => useContext(AuthContext);
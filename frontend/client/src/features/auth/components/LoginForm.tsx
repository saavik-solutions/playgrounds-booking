"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/services/api"; // Custom API instance
import { useDispatch } from "react-redux";
import { setAuthState } from "@/redux/slices/authSlice";
import { getRoleFromToken } from "@/utils/token"; // Import utility function

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Send login request
      const { data } = await api.post("/auth/login", { email, password });

      // Extract role using utility function
      const role = getRoleFromToken(data.accessToken);
      if (!role) {
        throw new Error("Failed to retrieve role from token.");
      }
console.log('Access Token in Local Storage:', localStorage.getItem('accessToken'));

      // Save the token to local storage
      localStorage.setItem("accessToken", data.accessToken);

      // Update global state with Redux
      dispatch(
        setAuthState({
          accessToken: data.accessToken,
          role,
          user: data.user,
        })
      );
 console.log(role)
      // Redirect based on role
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "user") {
        router.push("/user/dashboard");
      } else {
        throw new Error("Invalid role. Contact support.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred during login.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block border p-2 mb-4 w-full rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block border p-2 mb-4 w-full rounded"
      />
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default LoginForm;

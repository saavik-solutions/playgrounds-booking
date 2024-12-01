"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { SocialLogin } from "./SocialLogin";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid email or password");
      } else {
        const data = await response.json();
        toast.success("Welcome back!");
        // Store token or handle session logic
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      }
    } catch (error) {
  toast.error(error instanceof Error ? error.message : "Something went wrong");
}
finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col items-center mb-8">
        <LogIn className="w-16 h-16 text-[#0053a7] mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Welcome back</h1>
        <p className="text-gray-600 text-center mt-2">Sign in to your account</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="name@example.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="w-5 h-5 text-[#0053a7] rounded" />
            <span className="ml-3 text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            href="/reset-password"
            className="text-sm text-[#0053a7] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-8">
        <SocialLogin />
      </div>

      <p className="mt-8 text-center text-base text-gray-600">
        Don&#39;t have an account?{" "}
        <Link href="/register" className="text-[#0053a7] font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

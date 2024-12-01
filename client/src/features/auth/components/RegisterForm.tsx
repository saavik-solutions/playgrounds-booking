"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { SocialLogin } from "./SocialLogin";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 text-center">
          Create an account
        </h1>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          placeholder="Enter your name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

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
          placeholder="Create a strong password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <label className="flex items-center text-xs sm:text-sm">
          <input type="checkbox" className="w-4 h-4 text-[#0053a7] rounded" required />
          <span className="ml-2 text-gray-600">
            I agree to the{' '}
            <Link href="/terms" className="text-[#0053a7] hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#0053a7] hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-6">
        <SocialLogin />
      </div>

      <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="auth/login" className="text-[#0053a7] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

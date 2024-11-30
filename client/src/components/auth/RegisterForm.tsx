"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
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
}
finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col items-center mb-8">
        <UserPlus className="w-16 h-16 text-[#0053a7] mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Create an account</h1>
        <p className="text-gray-600 text-center mt-2">Join us today</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
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

        <label className="flex items-center">
          <input type="checkbox" className="w-5 h-5 text-[#0053a7] rounded" required />
          <span className="ml-3 text-sm text-gray-600">
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

      <div className="mt-8">
        <SocialLogin />
      </div>

      <p className="mt-8 text-center text-base text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-[#0053a7] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

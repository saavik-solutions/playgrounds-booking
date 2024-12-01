"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real application, you would implement password reset logic here
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated delay
      toast.success("Check your email for reset instructions!");
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
        <KeyRound className="w-16 h-16 text-[#0053a7] mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Reset Password</h1>
        <p className="text-gray-600 text-center mt-4 max-w-sm">
          Enter your email address and we&#39;llsend you instructions to reset your password
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="name@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <p className="mt-8 text-center text-base text-gray-600">
        Remember your password?{' '}
        <Link href="/login" className="text-[#0053a7] font-medium hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
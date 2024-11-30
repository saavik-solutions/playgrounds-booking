import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Authentication System",
  description: "Login to your account",
};

export default function LoginPage() {
  return <LoginForm />;
}
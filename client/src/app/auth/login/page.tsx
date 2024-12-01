import { LoginForm } from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | React Sports Club",
  description: "Login to your account",
};

export default function LoginPage() {
  return <LoginForm />;
}
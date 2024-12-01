import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | React Sports Club",
  description: "Create a new account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
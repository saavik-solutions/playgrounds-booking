import { ResetPasswordForm } from "@/features/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | React Sports Club",
  description: "Reset your password",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
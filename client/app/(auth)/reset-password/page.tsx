"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { resetPasswordSchema } from "@/lib/validations/auth"
import type { ResetPasswordFormData, AuthResponse } from "@/lib/types/auth"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/auth/password-input"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  async function onSubmit(data: ResetPasswordFormData) {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      })

      const result: AuthResponse = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      toast({
        title: "Success",
        description: result.message,
      })
      
      // Redirect to login page after successful password reset
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Reset password</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your new password below</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <PasswordInput
            id="password"
            placeholder="New password"
            register={register("password")}
            error={errors.password?.message}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm new password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </div>
  )
}
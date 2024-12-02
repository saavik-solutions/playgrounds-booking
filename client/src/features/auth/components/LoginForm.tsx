"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { loginSchema } from "../../schemas/auth"
import { LoginPayload } from "../types/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/auth/password-input"
import { OAuthButtons } from "@/components/auth/oauth-buttons"
import { useToast } from "../../hooks/use-toast"
import { authService } from "../services/authService"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
  })

  // Function to handle email-password login
  async function onSubmit(data: LoginPayload) {
    try {
      setIsLoading(true)
      await authService.login(data) // Call authService for login

      // Assuming user role is saved in tokens or fetched after login
      const userRole = localStorage.getItem("userRole") // Example: Replace with your token parsing logic
      if (userRole === "admin") {
        window.location.href = "/admin/dashboard"
      } else {
        window.location.href = "/user/dashboard"
      }

      toast({
        title: "Success",
        description: "Logged in successfully!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle Google Sign-In
  async function handleGoogleSignIn() {
    try {
      setIsLoading(true)
      await authService.googleLogin()// Assuming you have this method implemented in your `authService`

      // Redirect based on role, similar to login
      const userRole = localStorage.getItem("userRole") // Example: Replace with your token parsing logic
      if (userRole === "admin") {
        window.location.href = "/admin/dashboard"
      } else {
        window.location.href = "/user/dashboard"
      }

      toast({
        title: "Success",
        description: "Signed in with Google!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back</h1>
        <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
      </div>
      <OAuthButtons onClick={handleGoogleSignIn} isLoading={isLoading} />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500 dark:text-gray-400">
            or sign in with email
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <PasswordInput
            id="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          register={register}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don&#39;t have an account?{" "}
        <Link href="/register" className="text-blue-600 dark:text-blue-400">
          Sign up
        </Link>
      </p>
    </div>
  )
}

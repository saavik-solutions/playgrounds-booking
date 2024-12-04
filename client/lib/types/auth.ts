export interface AuthResponse {
  success: boolean
  message: string
  data?: {
    token?: string
    user?: {
      id: string
      name: string
      email: string
    }
  }
}

export type LoginFormData = {
  email: string
  password: string
}

export type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export type ForgotPasswordFormData = {
  email: string
}

export type ResetPasswordFormData = {
  password: string
  confirmPassword: string
}
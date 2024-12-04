import { NextResponse } from "next/server"
import { resetPasswordSchema } from "@/lib/validations/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token, ...passwordData } = body
    const validatedData = resetPasswordSchema.parse(passwordData)

    if (!token) {
      throw new Error("Reset token is required")
    }

    // Here you would typically:
    // 1. Verify token is valid and not expired
    // 2. Hash new password
    // 3. Update password in database
    // 4. Invalidate reset token

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request data or token",
      },
      { status: 400 }
    )
  }
}
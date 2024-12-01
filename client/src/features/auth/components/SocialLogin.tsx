"use client";

import { Button } from "../../../components/ui/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SocialLogin() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      // Make a request to your custom Google login endpoint
      const response = await fetch("/api/auth/google", {
        method: "GET",
        credentials: "include", // Ensure cookies are handled if required
      });

      if (!response.ok) {
        throw new Error("Could not connect to Google");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Successfully signed in with Google!");
        router.push("/dashboard"); // Redirect to the dashboard
      } else {
        toast.error(data.message || "Could not connect to Google");
      }
    } catch (error) {
  toast.error(error instanceof Error ? error.message : "Something went wrong");
}

  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
      >
        <Image
  src="https://www.google.com/favicon.ico"
  alt="Google"
  width={20}  // Set the width of the image
  height={20} // Set the height of the image
  className="mr-3"
/>
        Sign in with Google
      </Button>
    </div>
  );
}

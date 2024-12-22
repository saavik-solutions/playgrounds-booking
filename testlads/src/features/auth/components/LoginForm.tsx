import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";


export default function LoginForm() {
  return (
    <div>
      <OAuthButtons/>
            <Button
        variant="default"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
      >
        Sign In
      </Button>
      </div>
  )
}

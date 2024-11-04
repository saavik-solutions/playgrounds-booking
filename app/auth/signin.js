import { signIn } from "next-auth/react";
import AuthForm from "../components/auth/authForm";


export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <AuthForm />
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}

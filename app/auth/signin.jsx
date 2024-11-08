import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      alert("Login failed. Please check your credentials.");
    } else {
      router.push("/"); // Redirect to homepage or another protected route
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign in</button>
      </form>

      <div>
        <p>Or sign in with:</p>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>

      <p>
        Didn`t have an account? <a href="/auth/signup">Sign up</a>
      </p>
    </div>
  );
}

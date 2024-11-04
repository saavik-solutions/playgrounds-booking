import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username, mobile }),
    });

    if (response.ok) {
      alert("Signup successful! You can now sign in.");
      router.push("/auth/signin"); // Redirect to sign-in page
    } else {
      const errorData = await response.json();
      if (errorData.message === "User already exists") {
        alert("User already exists! Redirecting to sign-in page.");
        router.push("/auth/signin");
      } else {
        alert(`Signup failed: ${errorData.message}`);
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
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
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
          required
        />
        <button type="submit">Sign up</button>
      </form>

      <div>
        <p>Or sign up with:</p>
        <button onClick={() => signIn("google")}>Sign up with Google</button>
      </div>

      <p>
        Already have an account? <a href="/auth/signin">Sign in</a>
      </p>
    </div>
  );
}

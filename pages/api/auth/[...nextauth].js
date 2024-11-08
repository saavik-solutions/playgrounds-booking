// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { dbConnect, clientPromise } from "../../../lib/utils/dbConnect";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await dbConnect();
        const db = client.db();
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Invalid email or password");
        }

        // Return the user object with the role included
        return { id: user._id, email: user.email, role: user.role };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise), // Use clientPromise directly here
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // Include role in the token if the user is present
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role; // Add role to token
      }
      return token;
    },
    async session({ session, token }) {
      // Set the user object in session, including the role
      session.user = { id: token.id, email: token.email, role: token.role };
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
});

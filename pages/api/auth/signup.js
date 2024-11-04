import { dbConnect, clientPromise } from "../../../lib/utils/dbConnect";
import bcrypt from "bcrypt";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).max(20),
  mobile: z.string().regex(/^\d{10}$/),
  role: z.enum(["user", "admin"]), // Restrict roles to "user" and "admin"
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Validate the request body with Zod
    const { email, password, username, mobile, role } = signUpSchema.parse(req.body);

    await dbConnect();
    const db = (await clientPromise).db();

    // Check if user with the same email already exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      // If the role doesn't match the existing user's role, return 403 Forbidden
      if (existingUser.role !== role) {
        return res.status(403).json({ message: "Role conflict for this email" });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      username,
      mobile,
      role,
    });

    res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation Error", details: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

import dbConnect from "@/lib/utils/dbConnect";
import bcrypt from "bcrypt";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, password } = signUpSchema.parse(req.body);
    await dbConnect();
    const db = (await clientPromise).db();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

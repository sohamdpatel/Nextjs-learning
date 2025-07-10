import { connectDB } from "../../../../lib/db";
import { User } from "../../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { username, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // ✅ Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

  // ✅ Create response and set cookie
  const response = NextResponse.json({
    message: "Registered successfully",
    user: {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    },
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return response;
}

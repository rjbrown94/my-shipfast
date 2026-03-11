import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const email = String(body?.email || "")
      .toLowerCase()
      .trim();
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      passwordHash,
    });

    return NextResponse.json(
      {
        ok: true,
        userId: user._id.toString(),
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}

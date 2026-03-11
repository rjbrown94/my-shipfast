import { NextResponse } from "next/server";
import { connectMongo } from "@/libs/mongo";
import User from "@/models/User";

export async function GET() {
  try {
    await connectMongo();

    const users = await User.find({ age: 32 }).lean();

    return NextResponse.json(users);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

import dbConnect from "@/libs/mongoose";
import Proof from "@/models/Proof";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { userId, title, imageUrl } = await req.json();

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newProof = await Proof.create({ userId, title, imageUrl });
    return NextResponse.json(newProof, { status: 201 });
  } catch (error) {
    console.error("Error creating proof:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

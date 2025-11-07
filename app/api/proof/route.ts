import dbConnect from "@/libs/mongoose";
import Proof from "@/models/Proof";
import { NextResponse } from "next/server";

// GET /api/proof -> list newest first
export async function GET() {
  await dbConnect();
  const proofs = await Proof.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(proofs);
}

// POST /api/proof -> expects JSON: { userId?, title, imageUrl }
export async function POST(req: Request) {
  await dbConnect();
  try {
    const { userId, title, imageUrl } = await req.json();

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const created = await Proof.create({ userId, title, imageUrl });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("Error creating proof:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

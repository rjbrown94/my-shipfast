import { NextResponse } from "next/server";
import dbConnect from "@/libs/mongoose";
import Proof from "@/models/Proof";

export async function GET() {
  await dbConnect();
  const proofs = await Proof.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(proofs);
}

export async function POST(req: Request) {
  await dbConnect();

  const form = await req.formData();
  const title = String(form.get("title") || "");
  const file = form.get("file") as File | null;

  if (!title || !file) {
    return NextResponse.json(
      { error: "Missing title or file" },
      { status: 400 }
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${bytes.toString("base64")}`;

  const doc = await (Proof as any).create({ title, imageUrl: base64 });
  return NextResponse.json(doc, { status: 201 });
}

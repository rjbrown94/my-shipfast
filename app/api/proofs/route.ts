import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Proof from "@/models/Proof";
import { auth } from "@/libs/next-auth";

export async function GET(req: Request) {
  try {
    await connectDB();

    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const disputeId = String(searchParams.get("disputeId") || "").trim();

    const filter: any = { userEmail };
    if (disputeId) filter.disputeId = disputeId;

    const items = await Proof.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ items });
  } catch (err: any) {
    console.error("GET /api/proofs error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to fetch proofs" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const disputeId = String(body?.disputeId || "").trim();
    if (!disputeId) {
      return NextResponse.json({ error: "Missing disputeId" }, { status: 400 });
    }

    const proofType = String(body?.proofType || "").trim();
    if (!proofType) {
      return NextResponse.json({ error: "Missing proofType" }, { status: 400 });
    }

    const url = String(body?.url || "").trim();
    const name = String(body?.name || "").trim();
    const type = String(body?.type || "").trim();
    const size = Number(body?.size || 0);

    if (!url || !name || !size) {
      return NextResponse.json(
        { error: "Missing url/name/size" },
        { status: 400 },
      );
    }

    const created = await Proof.create({
      userEmail,
      disputeId,
      proofType,
      note: String(body?.note || "").trim(),
      url,
      name,
      type,
      size,
    });

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/proofs error:", err);
    return NextResponse.json(
      { error: err?.message || "Could not upload proof." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = String(searchParams.get("id") || "").trim();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // Only delete user's proof
    const deleted = await Proof.findOneAndDelete({ _id: id, userEmail });
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE /api/proofs error:", err);
    return NextResponse.json(
      { error: err?.message || "Delete failed." },
      { status: 500 },
    );
  }
}

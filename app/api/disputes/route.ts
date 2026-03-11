import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Dispute from "@/models/Dispute";
import Proof from "@/models/Proof";
import { auth } from "@/libs/next-auth";

export async function GET() {
  try {
    await connectDB();

    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await Dispute.find({ userEmail })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ items });
  } catch (err: any) {
    console.error("GET /api/disputes error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to fetch disputes" },
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

    const title = String(body?.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const incidentRaw = String(body?.incidentDate || "").trim();
    let incidentDate: Date | null = null;

    if (incidentRaw) {
      const ok = /^\d{4}-\d{2}-\d{2}$/.test(incidentRaw);
      if (ok) {
        const d = new Date(`${incidentRaw}T00:00:00.000Z`);
        if (!Number.isNaN(d.getTime())) incidentDate = d;
      }
    }

    const created = await Dispute.create({
      userEmail,
      title,
      clientName: String(body?.clientName || "").trim(),
      notes: String(body?.notes || "").trim(),
      incidentDate,
    });

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/disputes error:", err);
    return NextResponse.json(
      { error: err?.message || "Could not create dispute." },
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
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // Only allow deleting YOUR disputes
    const dispute = await Dispute.findOne({ _id: id, userEmail }).lean();
    if (!dispute) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await Proof.deleteMany({ disputeId: id });
    await Dispute.findByIdAndDelete(id);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE /api/disputes error:", err);
    return NextResponse.json(
      { error: err?.message || "Delete failed." },
      { status: 500 },
    );
  }
}

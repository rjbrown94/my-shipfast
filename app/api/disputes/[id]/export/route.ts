import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Dispute from "@/models/Dispute";
import Proof from "@/models/Proof";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type DisputeLean = {
  _id: any;
  userEmail?: string;
  title?: string;
  clientName?: string;
  incidentDate?: Date | null;
  notes?: string;
};

function fitIntoBox(w: number, h: number, boxW: number, boxH: number) {
  const scale = Math.min(boxW / w, boxH / h);
  return { w: w * scale, h: h * scale };
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const dispute = (await Dispute.findById(
      params.id,
    ).lean()) as DisputeLean | null;

    if (!dispute) {
      return NextResponse.json({ error: "Dispute not found" }, { status: 404 });
    }

    const userEmail = String(dispute.userEmail || "").trim();

    // 1) Try linked proofs first
    let proofs = await Proof.find({ disputeId: params.id, userEmail })
      .sort({ createdAt: 1 })
      .lean();

    // 2) Fallback: if none linked, include ALL proofs for that user (so you still get images)
    // This is a safety net while you’re fixing linking.
    const linkedCount = proofs.length;
    if (proofs.length === 0) {
      proofs = await Proof.find({ userEmail }).sort({ createdAt: 1 }).lean();
    }

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // =============================
    // SUMMARY PAGE
    // =============================
    {
      const page = pdfDoc.addPage([612, 792]);
      const { height } = page.getSize();

      let y = height - 70;

      page.drawText("ProofPad Dispute Packet", {
        x: 50,
        y,
        size: 34,
        font: fontBold,
        color: rgb(0, 0, 0),
      });

      y -= 70;

      const lines = [
        `Dispute ID: ${params.id}`, // ✅ DEBUG
        `User Email: ${userEmail || "N/A"}`, // ✅ DEBUG
        `Title: ${dispute.title || "N/A"}`,
        `Client / Platform: ${dispute.clientName || "N/A"}`,
        `Incident Date: ${
          dispute.incidentDate
            ? new Date(dispute.incidentDate).toLocaleDateString()
            : "N/A"
        }`,
        `Notes: ${dispute.notes || "None"}`,
        "",
        `Proofs linked to this dispute: ${linkedCount}`, // ✅ DEBUG
        `Proofs included in PDF: ${proofs.length}`, // ✅ DEBUG
      ];

      for (const line of lines) {
        page.drawText(line, {
          x: 50,
          y,
          size: 18,
          font: fontBold,
        });
        y -= 30;
      }
    }

    // =============================
    // ADD PROOFS
    // =============================
    for (let i = 0; i < proofs.length; i++) {
      const p: any = proofs[i];

      const url = String(p.url || "").trim();
      if (!url) continue;

      const mime = String(p.type || "").toLowerCase();
      const name = String(p.name || `Proof ${i + 1}`);

      const res = await fetch(url);
      if (!res.ok) continue;

      const bytes = new Uint8Array(await res.arrayBuffer());

      // ---- PDF proof ----
      if (mime.includes("pdf")) {
        const src = await PDFDocument.load(bytes);
        const copied = await pdfDoc.copyPages(src, src.getPageIndices());
        copied.forEach((cp) => pdfDoc.addPage(cp));
        continue;
      }

      // ---- Image proof ----
      let image: any;
      try {
        if (mime.includes("png")) image = await pdfDoc.embedPng(bytes);
        else image = await pdfDoc.embedJpg(bytes);
      } catch {
        // fallback try both
        try {
          image = await pdfDoc.embedPng(bytes);
        } catch {
          try {
            image = await pdfDoc.embedJpg(bytes);
          } catch {
            continue;
          }
        }
      }

      const page = pdfDoc.addPage([612, 792]);
      const { width, height } = page.getSize();

      page.drawText(name, {
        x: 50,
        y: height - 50,
        size: 14,
        font: fontBold,
      });

      // show whether this proof is linked (helps you confirm)
      page.drawText(`disputeId: ${String(p.disputeId || "NONE")}`, {
        x: 50,
        y: height - 70,
        size: 10,
        font,
      });

      const margin = 50;
      const boxW = width - margin * 2;
      const boxH = height - 170;

      const dims = image.scale(1);
      const fitted = fitIntoBox(dims.width, dims.height, boxW, boxH);

      const x = margin + (boxW - fitted.w) / 2;
      const y = margin;

      page.drawImage(image, {
        x,
        y,
        width: fitted.w,
        height: fitted.h,
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="ProofPad-Dispute-${params.id}.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("EXPORT PDF error:", err);
    return NextResponse.json(
      { error: err?.message || "Export failed" },
      { status: 500 },
    );
  }
}

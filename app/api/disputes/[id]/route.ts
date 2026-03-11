import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import connectDB from "@/libs/mongoose";
import Dispute from "@/models/Dispute";
import Proof from "@/models/Proof";

function safeFileName(input: string) {
  return (
    String(input || "dispute")
      .replace(/[^a-z0-9-_]+/gi, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) || "dispute"
  );
}

async function fetchBytes(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch file (${res.status})`);
  return new Uint8Array(await res.arrayBuffer());
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await connectDB();

    const dispute: any = await Dispute.findById(id).lean();
    if (!dispute) {
      return NextResponse.json({ error: "Dispute not found" }, { status: 404 });
    }

    const proofs: any[] = await Proof.find({ disputeId: id })
      .sort({ createdAt: 1 })
      .lean();

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pageSize: [number, number] = [612, 792]; // Letter
    let page = pdfDoc.addPage(pageSize);
    let y = 760;

    const marginX = 50;

    const newPage = () => {
      page = pdfDoc.addPage(pageSize);
      y = 760;
    };

    const drawText = (text: string, size = 12, bold = false) => {
      if (y < 70) newPage();
      page.drawText(text, {
        x: marginX,
        y,
        size,
        font: bold ? fontBold : font,
        color: rgb(0, 0, 0),
      });
      y -= size + 8;
    };

    const title = dispute.title || "N/A";
    const client =
      dispute.clientPlatform ??
      dispute.clientName ??
      dispute.client ??
      dispute.platform ??
      "";
    const incident = dispute.incidentDate
      ? new Date(dispute.incidentDate).toLocaleDateString()
      : "";
    const notes = dispute.notes || "None";

    drawText("ProofPad Dispute Packet", 28, true);
    y -= 10;

    drawText(`Title: ${title}`, 18, true);
    drawText(`Client / Platform: ${client || "N/A"}`, 18, true);
    drawText(`Incident Date: ${incident || "N/A"}`, 18, true);
    drawText(`Notes: ${notes}`, 18, true);

    y -= 18;
    drawText("Proof (evidence):", 22, true);
    y -= 8;

    if (!proofs.length) {
      drawText("No proof uploaded yet.", 22, true);
    } else {
      for (let i = 0; i < proofs.length; i++) {
        const p = proofs[i];
        const when = p.createdAt ? new Date(p.createdAt).toLocaleString() : "";

        drawText(
          `${i + 1}. ${p.name || "file"}${p.proofType ? ` — ${p.proofType}` : ""}${when ? ` — ${when}` : ""}`,
          12,
          true,
        );

        const url = String(p.url || "");
        const mime = String(p.type || "").toLowerCase();

        const isJpg =
          mime.includes("jpeg") ||
          mime.includes("jpg") ||
          url.match(/\.jpe?g(\?|$)/i);
        const isPng = mime.includes("png") || url.match(/\.png(\?|$)/i);

        if (isPng || isJpg) {
          const bytes = await fetchBytes(url);

          const img = isPng
            ? await pdfDoc.embedPng(bytes)
            : await pdfDoc.embedJpg(bytes);

          const maxW = 500;
          const maxH = 360;

          const scale = Math.min(maxW / img.width, maxH / img.height, 1);
          const w = img.width * scale;
          const h = img.height * scale;

          if (y - h < 70) newPage();

          page.drawImage(img, {
            x: marginX,
            y: y - h,
            width: w,
            height: h,
          });

          y -= h + 18;
        } else {
          drawText(`File: ${url}`, 10, false);
          y -= 6;
        }
      }
    }

    const pdfBytes = await pdfDoc.save();

    const safeTitle = safeFileName(title);

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="proofpad-${safeTitle}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF Export Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate PDF" },
      { status: 500 },
    );
  }
}

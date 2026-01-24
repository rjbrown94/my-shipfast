"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { UploadButton } from "@/libs/uploadthing";

type ProofType =
  | "Receipt"
  | "Screenshot"
  | "Contract"
  | "Delivery link"
  | "Other";

type ProofItem = {
  url: string;
  name: string;
  type: string;
  size: number;
  proofType: ProofType;
  note: string;
  createdAt: string;
};

function formatBytes(bytes: number) {
  if (!bytes || bytes < 1) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let value = bytes;
  while (value >= 1024 && i < units.length - 1) {
    value = value / 1024;
    i++;
  }
  const rounded =
    value >= 10 || i === 0 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[i]}`;
}

function safeUploadthingUrl(file: any): string {
  return file?.url || file?.ufsUrl || file?.fileUrl || file?.file?.url || "";
}

function safeUploadthingName(file: any): string {
  return (
    file?.name ||
    file?.originalName ||
    file?.fileName ||
    file?.file?.name ||
    "Untitled"
  );
}

function safeUploadthingType(file: any): string {
  return file?.type || file?.mimeType || file?.file?.type || "";
}

function safeUploadthingSize(file: any): number {
  const s = file?.size ?? file?.fileSize ?? file?.file?.size ?? 0;
  return typeof s === "number" ? s : Number(s) || 0;
}

export default function DashboardPage() {
  const [proofType, setProofType] = useState<ProofType>("Receipt");
  const [note, setNote] = useState<string>("");
  const [proofs, setProofs] = useState<ProofItem[]>([]);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [toast, setToast] = useState<string>("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const proofTypeOptions = useMemo<ProofType[]>(
    () => ["Receipt", "Screenshot", "Contract", "Delivery link", "Other"],
    [],
  );

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2500);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const onUploadComplete = (res: any) => {
    const f = res?.[0];
    const url = safeUploadthingUrl(f);
    const name = safeUploadthingName(f);
    const type = safeUploadthingType(f);
    const size = safeUploadthingSize(f);

    if (!url) {
      setStatus("error");
      showToast("Upload finished but no file URL was returned.");
      return;
    }

    const item: ProofItem = {
      url,
      name,
      type,
      size,
      proofType,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    };

    setProofs((prev) => [item, ...prev]);
    setStatus("success");
    showToast("Uploaded successfully.");
    setNote("");
  };

  const onUploadError = (e: any) => {
    setStatus("error");
    showToast(e?.message || "Upload failed.");
  };

  const removeProof = (createdAt: string) => {
    setProofs((prev) => prev.filter((p) => p.createdAt !== createdAt));
    showToast("Removed.");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Your ProofPad Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
                Upload receipts, screenshots, contracts, and delivery links —
                then keep everything organized for disputes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  status === "idle" && "bg-white/10 text-slate-200",
                  status === "uploading" && "bg-blue-500/15 text-blue-200",
                  status === "success" && "bg-green-500/15 text-green-200",
                  status === "error" && "bg-red-500/15 text-red-200",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {status === "idle" && "Ready"}
                {status === "uploading" && "Uploading…"}
                {status === "success" && "Uploaded"}
                {status === "error" && "Error"}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h2 className="text-lg font-semibold">Upload proof</h2>
              <p className="mt-1 text-sm text-slate-300">Images and PDFs</p>

              <div className="mt-5 grid gap-3">
                <div className="grid gap-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Proof type
                  </label>
                  <select
                    value={proofType}
                    onChange={(e) => setProofType(e.target.value as ProofType)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 outline-none focus:border-white/20"
                  >
                    {proofTypeOptions.map((t) => (
                      <option key={t} value={t} className="bg-[#0b1220]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Note (optional)
                  </label>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Client said “you didn’t deliver”…"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20"
                    maxLength={140}
                  />
                </div>

                <div className="mt-2">
                  <UploadButton
                    endpoint="proofUploader"
                    onClientUploadComplete={(res) => {
                      setStatus("uploading");
                      onUploadComplete(res);
                    }}
                    onUploadBegin={() => setStatus("uploading")}
                    onUploadError={(e) => onUploadError(e)}
                    appearance={{
                      button:
                        "w-full rounded-xl bg-green-600 py-3 text-white font-semibold hover:bg-green-700 active:scale-[0.99] transition",
                      allowedContent: "text-xs text-slate-300 mt-2",
                    }}
                  />
                </div>

                <div className="text-xs text-slate-300">
                  MVP limit: 4MB per image, 8MB per PDF
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h2 className="text-lg font-semibold">Active disputes</h2>
              <p className="mt-1 text-sm text-slate-300">
                Coming next: tag proof to disputes by client + date.
              </p>

              <button
                className="mt-5 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-white/20"
                type="button"
                disabled
              >
                View disputes (soon)
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h2 className="text-lg font-semibold">Share proof</h2>
              <p className="mt-1 text-sm text-slate-300">
                Coming next: generate a secure link to share with platforms.
              </p>

              <button
                className="mt-5 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-white/20"
                type="button"
                disabled
              >
                Create link (soon)
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-base font-semibold">Your uploads</h3>
                <p className="mt-1 text-sm text-slate-300">
                  {proofs.length === 0
                    ? "No proof uploaded yet. Start by uploading your first receipt, screenshot, or contract."
                    : `${proofs.length} item${proofs.length === 1 ? "" : "s"} uploaded.`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-200">
                  Total:{" "}
                  <span className="font-semibold">
                    {formatBytes(
                      proofs.reduce((acc, p) => acc + (p.size || 0), 0),
                    )}
                  </span>
                </div>
              </div>
            </div>

            {proofs.length > 0 && (
              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {proofs.map((p) => (
                  <div
                    key={p.createdAt}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-100">
                          {p.name}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                            {p.proofType}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                            {formatBytes(p.size)}
                          </span>
                          {p.type ? (
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                              {p.type}
                            </span>
                          ) : null}
                        </div>
                        {p.note ? (
                          <div className="mt-2 text-sm text-slate-300">
                            {p.note}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <a
                          href={p.url}
                          target="_blank"
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-white/20"
                        >
                          Open
                        </a>
                        <button
                          type="button"
                          onClick={() => removeProof(p.createdAt)}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-white/20"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-400">
                      {new Date(p.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {toast ? (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-slate-100 backdrop-blur">
              {toast}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

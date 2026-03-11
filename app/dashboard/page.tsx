"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { UploadButton } from "@/libs/uploadthing";

type ProofType =
  | "Receipt"
  | "Screenshot"
  | "Contract"
  | "Delivery link"
  | "Other";

type Dispute = {
  _id: string;
  title: string;
  clientName?: string;
  incidentDate?: string | null;
  notes?: string;
  status?: string;
  createdAt?: string;
};

type ProofItem = {
  _id?: string;
  url: string;
  name: string;
  type: string;
  size: number;
  proofType: ProofType;
  note: string;
  createdAt: string;
  disputeId?: string | null;
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

function safeStr(v: any) {
  return typeof v === "string" ? v : v?.toString?.() || "";
}

function safeFileName(input: string) {
  const s = (input || "").trim();
  if (!s) return "dispute";
  return s
    .replace(/[^\w\-]+/g, "-")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "")
    .slice(0, 60);
}

export default function DashboardPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [selectedDisputeId, setSelectedDisputeId] = useState<string>("");

  const [newTitle, setNewTitle] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newIncidentDate, setNewIncidentDate] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const [proofType, setProofType] = useState<ProofType>("Receipt");
  const [note, setNote] = useState<string>("");

  const [allProofs, setAllProofs] = useState<ProofItem[]>([]);

  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const [toast, setToast] = useState<string>("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [exporting, setExporting] = useState(false);

  const proofTypeOptions = useMemo<ProofType[]>(
    () => ["Receipt", "Screenshot", "Contract", "Delivery link", "Other"],
    [],
  );

  const selectedDispute = useMemo(
    () => disputes.find((d) => d._id === selectedDisputeId) || null,
    [disputes, selectedDisputeId],
  );

  const proofInSelectedDispute = useMemo(() => {
    if (!selectedDisputeId) return [];
    return allProofs.filter((p) => (p.disputeId || "") === selectedDisputeId);
  }, [allProofs, selectedDisputeId]);

  const unassignedProofs = useMemo(() => {
    return allProofs.filter((p) => !p.disputeId);
  }, [allProofs]);

  const currentPlan = useMemo(() => {
    if (typeof window === "undefined") return "starter";
    return localStorage.getItem("proofpad_plan") || "starter";
  }, []);

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

  useEffect(() => {
    loadDisputes();
    loadAllProofs();
  }, []);

  async function loadDisputes() {
    try {
      const res = await fetch("/api/disputes", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setDisputes(Array.isArray(data?.items) ? data.items : []);
    } catch {
      // ignore
    }
  }

  async function loadAllProofs() {
    try {
      const res = await fetch("/api/proofs", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const items = Array.isArray(data?.items) ? data.items : [];

      setAllProofs(
        items.map((p: any) => ({
          _id: safeStr(p._id),
          url: p.url,
          name: p.name,
          type: p.type,
          size: Number(p.size || 0),
          proofType: p.proofType as ProofType,
          note: p.note || "",
          createdAt: new Date(p.createdAt).toISOString(),
          disputeId: p.disputeId ? safeStr(p.disputeId) : null,
        })),
      );
    } catch {
      // ignore
    }
  }

  async function createDispute() {
    if (!newTitle.trim()) {
      showToast("Title is required.");
      return;
    }

    const plan =
      typeof window !== "undefined"
        ? localStorage.getItem("proofpad_plan")
        : "starter";

    if (plan !== "pro" && disputes.length >= 1) {
      showToast(
        "Free plan allows only 1 dispute. Upgrade to Pro for unlimited disputes.",
      );
      return;
    }

    try {
      const res = await fetch("/api/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          clientName: newClientName.trim(),
          incidentDate: newIncidentDate.trim(),
          notes: newNotes.trim(),
        }),
      });

      if (!res.ok) {
        showToast("Could not create dispute.");
        return;
      }

      const data = await res.json();
      const created = data?.item;

      if (!created?._id) {
        showToast("Could not create dispute.");
        return;
      }

      setDisputes((prev) => [created, ...prev]);
      setSelectedDisputeId(String(created._id));
      setNewTitle("");
      setNewClientName("");
      setNewIncidentDate("");
      setNewNotes("");
      showToast("Dispute created.");
    } catch {
      showToast("Could not create dispute.");
    }
  }

  async function deleteDispute(id: string) {
    const ok = confirm("Delete this dispute folder AND its proofs?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/disputes?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        showToast("Delete failed.");
        return;
      }

      setDisputes((prev) => prev.filter((d) => d._id !== id));
      setAllProofs((prev) => prev.filter((p) => (p.disputeId || "") !== id));

      if (selectedDisputeId === id) {
        setSelectedDisputeId("");
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem("proofpad_pdf_exported");
      }

      showToast("Deleted.");
    } catch {
      showToast("Delete failed.");
    }
  }

  async function deleteProof(proofId: string) {
    const ok = confirm("Delete this proof?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/proofs?id=${encodeURIComponent(proofId)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        showToast("Could not delete proof.");
        return;
      }

      setAllProofs((prev) => prev.filter((p) => p._id !== proofId));
      showToast("Proof deleted.");
    } catch {
      showToast("Could not delete proof.");
    }
  }

  async function exportSelectedDisputePdf() {
    if (!selectedDisputeId) {
      showToast("Select a dispute first.");
      return;
    }

    const plan =
      typeof window !== "undefined"
        ? localStorage.getItem("proofpad_plan")
        : "starter";

    const exported =
      typeof window !== "undefined"
        ? localStorage.getItem("proofpad_pdf_exported")
        : null;

    if (plan !== "pro" && exported === "true") {
      showToast("Free plan allows only 1 PDF export. Upgrade to Pro.");
      return;
    }

    setExporting(true);
    try {
      const res = await fetch(`/api/disputes/${selectedDisputeId}/export`, {
        method: "GET",
      });

      if (!res.ok) {
        showToast("Export failed.");
        return;
      }

      const blob = await res.blob();
      if (!blob || blob.size < 1) {
        showToast("Export failed.");
        return;
      }

      const base = safeFileName(selectedDispute?.title || "dispute");
      const fileName = `${base}-packet.pdf`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      if (plan !== "pro") {
        localStorage.setItem("proofpad_pdf_exported", "true");
      }

      showToast("PDF exported.");
    } catch {
      showToast("Export failed.");
    } finally {
      setExporting(false);
    }
  }

  const onUploadComplete = async (res: any) => {
    const f = res?.[0];
    const url = f?.url || f?.ufsUrl || f?.fileUrl || f?.file?.url || "";
    const name =
      f?.name || f?.originalName || f?.fileName || f?.file?.name || "Untitled";
    const type = f?.type || f?.mimeType || f?.file?.type || "";
    const size = Number(f?.size ?? f?.fileSize ?? f?.file?.size ?? 0) || 0;

    if (!url) {
      setStatus("error");
      showToast("Upload finished but no file URL returned.");
      return;
    }

    if (!selectedDisputeId) {
      setStatus("error");
      showToast("Select a dispute first.");
      return;
    }

    try {
      const payload = {
        url,
        name,
        type,
        size,
        proofType,
        note: note.trim(),
        disputeId: selectedDisputeId,
        createdAt: new Date().toISOString(),
      };

      const save = await fetch("/api/proofs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!save.ok) {
        setStatus("error");
        showToast("Uploaded, but saving failed.");
        return;
      }

      const data = await save.json();
      const saved = data?.item;

      const savedItem: ProofItem = {
        _id: safeStr(saved?._id),
        url: saved?.url || url,
        name: saved?.name || name,
        type: saved?.type || type,
        size: Number(saved?.size ?? size) || 0,
        proofType: (saved?.proofType || proofType) as ProofType,
        note: saved?.note || note.trim(),
        createdAt: new Date(
          saved?.createdAt || payload.createdAt,
        ).toISOString(),
        disputeId: saved?.disputeId
          ? safeStr(saved.disputeId)
          : selectedDisputeId,
      };

      setAllProofs((prev) => [savedItem, ...prev]);
      setNote("");
      setStatus("success");
      showToast("Uploaded & saved.");
    } catch {
      setStatus("error");
      showToast("Uploaded, but saving failed.");
    }
  };

  const totalBytesSelected = useMemo(() => {
    return proofInSelectedDispute.reduce((acc, p) => acc + (p.size || 0), 0);
  }, [proofInSelectedDispute]);

  const freeDisputeUsage = disputes.length;
  const freePdfUsage =
    typeof window !== "undefined" &&
    localStorage.getItem("proofpad_pdf_exported") === "true"
      ? 1
      : 0;

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              ProofPad Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
              Create a dispute folder, then upload proof into that case.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200">
              <span className="font-semibold">
                {currentPlan === "pro" ? "Pro Protection" : "Starter Plan"}
              </span>
              {currentPlan !== "pro" ? (
                <span className="ml-2 text-slate-400">
                  • Disputes: {freeDisputeUsage}/1 • PDF exports: {freePdfUsage}
                  /1
                </span>
              ) : (
                <span className="ml-2 text-slate-400">• Unlimited access</span>
              )}
            </div>

            {currentPlan !== "pro" ? (
              <button
                type="button"
                onClick={() => (window.location.href = "/pricing")}
                className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Upgrade to Pro
              </button>
            ) : null}
          </div>

          <div className="mt-6 flex justify-end">
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
              {status === "success" && "Saved"}
              {status === "error" && "Error"}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h2 className="text-lg font-semibold">Disputes</h2>
              <p className="mt-1 text-sm text-slate-300">Your case folders.</p>

              <div className="mt-4 grid gap-2">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Dispute title (required)"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20"
                />
                <input
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Client / Platform (optional)"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20"
                />
                <input
                  value={newIncidentDate}
                  onChange={(e) => setNewIncidentDate(e.target.value)}
                  placeholder="Incident date (YYYY-MM-DD)"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20"
                />
                <input
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Notes (optional)"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20"
                />

                <button
                  type="button"
                  onClick={createDispute}
                  className="mt-1 w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/15"
                >
                  Create dispute
                </button>
              </div>

              <div className="mt-4 grid gap-2">
                {disputes.length === 0 ? (
                  <div className="text-sm text-slate-300">
                    No disputes yet. Create one above.
                  </div>
                ) : null}

                {disputes.map((d) => {
                  const active = d._id === selectedDisputeId;
                  return (
                    <div
                      key={d._id}
                      className={[
                        "rounded-2xl border p-3",
                        active
                          ? "border-white/20 bg-white/10"
                          : "border-white/10 bg-black/20 hover:border-white/20",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedDisputeId(d._id)}
                        className="w-full text-left"
                      >
                        <div className="text-sm font-semibold text-slate-100">
                          {d.title}
                        </div>
                        {d.clientName ? (
                          <div className="text-xs text-slate-300">
                            {d.clientName}
                          </div>
                        ) : null}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteDispute(d._id)}
                        className="mt-2 text-xs font-semibold text-red-300 hover:text-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h2 className="text-lg font-semibold">Upload proof</h2>
              <p className="mt-1 text-sm text-slate-300">
                Upload into:{" "}
                <span className="font-semibold text-slate-100">
                  {selectedDispute
                    ? selectedDispute.title
                    : "No dispute selected"}
                </span>
              </p>

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
                    placeholder='e.g. "Client says not delivered"...'
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
                    onUploadError={(e) => {
                      setStatus("error");
                      showToast(e?.message || "Upload failed.");
                    }}
                    appearance={{
                      button:
                        "w-full rounded-xl bg-green-600 py-3 text-white font-semibold hover:bg-green-700 active:scale-[0.99] transition",
                      allowedContent: "text-xs text-slate-300 mt-2",
                    }}
                  />
                </div>

                <div className="text-xs text-slate-300">
                  Tip: create/select a dispute first.
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Selected dispute</h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {selectedDispute
                      ? "Details"
                      : "Select a dispute on the left."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={exportSelectedDisputePdf}
                  disabled={!selectedDisputeId || exporting}
                  className={[
                    "rounded-xl border px-3 py-2 text-sm font-semibold",
                    !selectedDisputeId || exporting
                      ? "border-white/10 bg-white/5 text-slate-400 cursor-not-allowed"
                      : "border-white/10 bg-white/5 text-slate-100 hover:border-white/20",
                  ].join(" ")}
                  title={
                    !selectedDisputeId
                      ? "Select a dispute first"
                      : "Export dispute as PDF"
                  }
                >
                  {exporting ? "Exporting…" : "Export PDF"}
                </button>
              </div>

              {selectedDispute ? (
                <div className="mt-4 grid gap-2 text-sm text-slate-200">
                  <div className="text-base font-semibold text-slate-100">
                    {selectedDispute.title}
                  </div>

                  {selectedDispute.clientName ? (
                    <div>
                      <span className="text-slate-400">Client/platform:</span>{" "}
                      {selectedDispute.clientName}
                    </div>
                  ) : null}

                  {selectedDispute.notes ? (
                    <div>
                      <span className="text-slate-400">Notes:</span>{" "}
                      {selectedDispute.notes}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-base font-semibold">
                  Proof in this dispute
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  {selectedDisputeId
                    ? `Showing proof for: ${selectedDispute?.title || selectedDisputeId}`
                    : "Select a dispute to see proof."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportSelectedDisputePdf}
                  disabled={!selectedDisputeId || exporting}
                  className={[
                    "rounded-xl border px-3 py-2 text-sm font-semibold",
                    !selectedDisputeId || exporting
                      ? "border-white/10 bg-white/5 text-slate-400 cursor-not-allowed"
                      : "border-white/10 bg-white/5 text-slate-100 hover:border-white/20",
                  ].join(" ")}
                >
                  {exporting ? "Exporting…" : "Export PDF"}
                </button>

                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-200">
                  Total:{" "}
                  <span className="font-semibold">
                    {formatBytes(totalBytesSelected)}
                  </span>
                </div>
              </div>
            </div>

            {selectedDisputeId ? (
              proofInSelectedDispute.length === 0 ? (
                <div className="mt-4 text-sm text-slate-300">
                  No proof in this dispute yet.
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {proofInSelectedDispute.map((p) => (
                    <div
                      key={p._id || p.createdAt}
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
                            rel="noreferrer"
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-white/20"
                          >
                            Open
                          </a>
                          {p._id ? (
                            <button
                              type="button"
                              onClick={() => deleteProof(p._id!)}
                              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-red-200 hover:border-white/20"
                            >
                              Delete
                            </button>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-400">
                        {new Date(p.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : null}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
            <h3 className="text-base font-semibold">Unassigned uploads</h3>
            <p className="mt-1 text-sm text-slate-300">
              These are uploads that exist, but don’t belong to a dispute (older
              uploads).
            </p>

            {unassignedProofs.length === 0 ? (
              <div className="mt-4 text-sm text-slate-300">None.</div>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {unassignedProofs.map((p) => (
                  <div
                    key={p._id || p.createdAt}
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
                          rel="noreferrer"
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-white/20"
                        >
                          Open
                        </a>
                        {p._id ? (
                          <button
                            type="button"
                            onClick={() => deleteProof(p._id!)}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-red-200 hover:border-white/20"
                          >
                            Delete
                          </button>
                        ) : null}
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

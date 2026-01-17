"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [proofType, setProofType] = useState("Receipt");
  const [note, setNote] = useState("");

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold text-white">
          Your ProofPad Dashboard
        </h1>
        <p className="mt-2 text-slate-300">
          Upload receipts, screenshots, contracts, and delivery links — then
          keep everything organized for disputes.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Upload Proof */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-semibold text-white">Upload proof</h2>
          <p className="mt-1 text-sm text-slate-400">
            Receipts, contracts, screenshots, payment confirmations.
          </p>

          <div className="mt-4 space-y-3">
            <select
              value={proofType}
              onChange={(e) => setProofType(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            >
              <option>Receipt</option>
              <option>Screenshot</option>
              <option>Contract</option>
              <option>Delivery link</option>
            </select>

            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note (e.g. Client said 'you didn’t deliver')"
              className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-500"
            />

            <button
              className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
              disabled
            >
              Upload files (coming next)
            </button>

            <p className="text-xs text-slate-500">MVP limit: 4MB per file</p>
          </div>
        </div>

        {/* Active Disputes */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-semibold text-white">Active disputes</h2>
          <p className="mt-1 text-sm text-slate-400">
            Coming next: tag proof to disputes by client + date.
          </p>

          <button
            disabled
            className="mt-6 w-full rounded-md border border-white/10 bg-black/30 px-4 py-2 text-sm text-slate-400"
          >
            View disputes (soon)
          </button>
        </div>

        {/* Share Proof */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-semibold text-white">Share proof</h2>
          <p className="mt-1 text-sm text-slate-400">
            Coming next: generate a secure link to share with platforms.
          </p>

          <button
            disabled
            className="mt-6 w-full rounded-md border border-white/10 bg-black/30 px-4 py-2 text-sm text-slate-400"
          >
            Create link (soon)
          </button>
        </div>
      </div>

      {/* Uploads List */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">Your uploads</h2>
          <div className="flex gap-2">
            <input
              placeholder="Search proof..."
              className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-sm text-white"
            />
            <select className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-sm text-white">
              <option>All types</option>
              <option>Receipt</option>
              <option>Screenshot</option>
              <option>Contract</option>
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-400">No proof uploaded yet.</p>
        <p className="text-sm text-slate-500">
          Start by uploading your first receipt, screenshot, or contract.
        </p>
      </div>
    </div>
  );
}

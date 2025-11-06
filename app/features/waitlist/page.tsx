"use client";

import { useState } from "react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Bad response");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-2">Join the Waitlist</h1>
      <p className="mb-6 text-gray-600">We’ll email you when we launch.</p>

      <form onSubmit={onSubmit} className="flex gap-2 w-full max-w-md">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="your@email.com"
          className="flex-1 border rounded-lg p-3"
          required
        />
        <button
          type="submit"
          className="rounded-lg px-4 py-3 bg-black text-white disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Adding…" : "Join"}
        </button>
      </form>

      {status === "ok" && (
        <p className="mt-4 text-green-600">You’re on the list!</p>
      )}
      {status === "err" && (
        <p className="mt-4 text-red-600">Something went wrong. Try again.</p>
      )}
    </main>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Session = {
  email: string;
  createdAt: string;
};

const STORAGE_SESSION_KEY = "proofpad_session";
const STORAGE_PLAN_KEY = "proofpad_plan";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().includes("@") && password.trim().length >= 6;
  }, [email, password]);

  function saveSession(session: Session) {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  }

  function clearPlan() {
    // if they register again, start clean so pricing shows correctly
    localStorage.removeItem(STORAGE_PLAN_KEY);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);

    // Mock auth for now (replace with real auth later)
    const session: Session = {
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    saveSession(session);
    clearPlan();

    // Route: Register -> Pricing
    router.push("/pricing");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/60 backdrop-blur px-6 py-8 sm:px-10 sm:py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_40px_120px_rgba(0,0,0,0.6)]">
          <div className="mb-6">
            <div className="text-xs tracking-widest text-slate-400">
              PROOFPAD
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
              Create your account
            </h1>
            <p className="mt-2 text-slate-300">
              Start organizing proof so you can win disputes with facts — not
              back-and-forth.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/40"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/40"
                autoComplete="new-password"
              />
              <p className="mt-2 text-xs text-slate-400">
                Min 6 characters (mock auth for now).
              </p>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="w-full rounded-xl px-4 py-3 font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_60px_rgba(16,185,129,0.25)]"
            >
              {submitting ? "Creating..." : "Create account → Choose plan"}
            </button>

            <div className="flex items-center justify-between text-sm pt-2">
              <Link href="/" className="text-slate-300 hover:text-white">
                ← Back home
              </Link>
              <Link href="/login" className="text-slate-300 hover:text-white">
                I already have an account
              </Link>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Later we’ll connect this to real authentication. For now, this
          confirms routing works.
        </p>
      </div>
    </div>
  );
}

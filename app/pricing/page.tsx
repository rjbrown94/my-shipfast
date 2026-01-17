"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Session = {
  email: string;
  createdAt: string;
};

type PlanId = "trial" | "pro";

const STORAGE_SESSION_KEY = "proofpad_session";
const STORAGE_PLAN_KEY = "proofpad_plan";
const STORAGE_PLAN_STARTED_AT_KEY = "proofpad_plan_started_at";

export default function PricingPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [selected, setSelected] = useState<PlanId | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);

    // If user is not "signed in" (session missing), send them to register
    if (!raw) {
      router.replace("/register");
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Session;
      setSession(parsed);
    } catch {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      router.replace("/register");
    }
  }, [router]);

  const choosePlan = (plan: PlanId) => {
    setSelected(plan);
    localStorage.setItem(STORAGE_PLAN_KEY, plan);
    localStorage.setItem(STORAGE_PLAN_STARTED_AT_KEY, new Date().toISOString());

    // Go to dashboard after choosing plan
    router.replace("/dashboard");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-slate-300 hover:text-slate-100"
          >
            ← Back home
          </Link>

          <div className="text-sm text-slate-300">
            {session?.email ? `Signed in as ${session.email}` : ""}
          </div>
        </div>

        {/* Header */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/40 px-4 py-2 text-xs text-slate-300">
            Pricing built for real creator disputes
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Pick a plan that protects your income.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Choose a plan, then head to your dashboard to upload proof,
            receipts, links, and messages — all in one place.
          </p>
        </div>

        {/* Pricing cards (ONLY TWO) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Trial */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">7-Day Free Trial</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Try ProofPad free for 7 days.
                </p>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                Trial
              </span>
            </div>

            <div className="mt-6">
              <div className="text-5xl font-extrabold">$0</div>
              <div className="text-slate-300 text-sm">for 7 days</div>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-slate-200">
              <li>• Upload receipts, screenshots, and contracts</li>
              <li>• Organize proof in one place</li>
              <li>• Share proof cleanly (coming soon)</li>
            </ul>

            <button
              onClick={() => choosePlan("trial")}
              className="mt-8 w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Start free trial → Go to dashboard
            </button>

            <p className="mt-2 text-center text-xs text-slate-400">
              No credit card required.
            </p>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-7">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">Pro</h2>
                <p className="mt-1 text-sm text-slate-200">
                  Everything you need to stay protected.
                </p>
              </div>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">
                Most popular
              </span>
            </div>

            <div className="mt-6">
              <div className="text-5xl font-extrabold">$10</div>
              <div className="text-slate-200 text-sm">per month</div>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-slate-100">
              <li>• Unlimited proof uploads</li>
              <li>• Proof folders by client</li>
              <li>• Smart tags (Paid / Delivered / Disputed)</li>
              <li>• Priority support</li>
            </ul>

            <button
              onClick={() => choosePlan("pro")}
              className="mt-8 w-full rounded-xl bg-slate-50 px-4 py-3 font-semibold text-slate-950 hover:bg-white"
            >
              Start Pro → Go to dashboard
            </button>

            <p className="mt-2 text-center text-xs text-slate-300">
              Cancel anytime.
            </p>
          </div>
        </div>

        {/* Small footer note */}
        <div className="mt-10 text-center text-xs text-slate-500">
          Choosing a plan saves it in your browser for now (localStorage).
          Stripe checkout comes next.
        </div>
      </div>
    </main>
  );
}

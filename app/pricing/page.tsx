"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

type PlanId = "starter" | "pro";

const STORAGE_PLAN_KEY = "proofpad_plan";
const STORAGE_PLAN_STARTED_AT_KEY = "proofpad_plan_started_at";

export default function PricingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      router.replace("/register");
    }
  }, [session, status, router]);

  const choosePlan = (plan: PlanId) => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(STORAGE_PLAN_KEY, plan);
    window.localStorage.setItem(
      STORAGE_PLAN_STARTED_AT_KEY,
      new Date().toISOString(),
    );

    router.replace("/dashboard");
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
          <div className="text-sm text-slate-300">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-slate-300 transition hover:text-slate-100"
          >
            ← Back home
          </Link>

          <div className="text-sm text-slate-300">
            {session?.user?.email ? `Signed in as ${session.user.email}` : ""}
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/40 px-4 py-2 text-xs text-slate-300">
            Built for creators, freelancers, and small businesses
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            Protect your payments. Win disputes with proof.
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-slate-300">
            Upload receipts, screenshots, contracts, delivery links, and
            messages. When a dispute happens, export everything as a clean
            dispute-ready PDF packet.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400">
            Stop digging through emails and screenshots when a client disputes a
            payment. ProofPad keeps your evidence organized so you&apos;re ready
            when it matters.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7 shadow-lg shadow-black/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Starter</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Try ProofPad with your first dispute case.
                </p>
              </div>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                Free
              </span>
            </div>

            <div className="mt-6">
              <div className="text-5xl font-extrabold">$0</div>
              <div className="mt-1 text-sm text-slate-300">to get started</div>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-slate-200">
              <li>• Create 1 dispute case</li>
              <li>• Upload receipts, screenshots, and contracts</li>
              <li>• Add delivery links and messages</li>
              <li>• Organize proof inside your dispute folder</li>
              <li>• Export 1 dispute-ready PDF packet</li>
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Limit
              </p>
              <p className="mt-2 text-sm text-slate-300">
                After exporting your first dispute PDF, upgrade to Pro to unlock
                unlimited disputes and exports.
              </p>
            </div>

            <button
              type="button"
              onClick={() => choosePlan("starter")}
              className="mt-8 w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Start free → Go to dashboard
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              No credit card required.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-7 shadow-xl shadow-emerald-950/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Pro Protection</h2>
                <p className="mt-2 text-sm text-slate-200">
                  Everything you need to handle disputes professionally.
                </p>
              </div>

              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">
                Most popular
              </span>
            </div>

            <div className="mt-6">
              <div className="text-5xl font-extrabold">$15</div>
              <div className="mt-1 text-sm text-slate-200">per month</div>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-slate-100">
              <li>• Unlimited dispute cases</li>
              <li>• Unlimited dispute PDF exports</li>
              <li>• Unlimited proof uploads</li>
              <li>• Organize disputes by client</li>
              <li>• Smart tags (Paid • Delivered • Disputed)</li>
              <li>• Priority support</li>
            </ul>

            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
                Best for
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Creators, freelancers, and small businesses who want to protect
                income and stay ready for chargebacks or payment disputes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => choosePlan("pro")}
              className="mt-8 w-full rounded-xl bg-slate-50 px-4 py-3 font-semibold text-slate-950 transition hover:bg-white"
            >
              Upgrade to Pro → Go to dashboard
            </button>

            <p className="mt-3 text-center text-xs text-slate-300">
              Cancel anytime.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
          <h3 className="text-xl font-semibold">Why creators use ProofPad</h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-300">
            Creators and freelancers lose thousands of dollars every year to
            chargebacks and payment disputes. ProofPad keeps all your evidence
            organized so when a dispute happens, your proof is ready.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-400">
            Your exported PDF packet is designed to help you send clean evidence
            to banks, Stripe, PayPal, and other platforms.
          </p>
        </div>

        <div className="mt-10 text-center text-xs text-slate-500">
          Plan selection is saved in your browser for now. Stripe checkout comes
          next.
        </div>
      </div>
    </main>
  );
}

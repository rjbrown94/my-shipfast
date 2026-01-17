"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Session = {
  email: string;
  createdAt: string;
};

const STORAGE_SESSION_KEY = "proofpad_session";
const STORAGE_PLAN_KEY = "proofpad_plan";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [session, setSession] = useState<Session | null>(null);
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const rawSession = localStorage.getItem(STORAGE_SESSION_KEY);
    const rawPlan = localStorage.getItem(STORAGE_PLAN_KEY);

    if (!rawSession) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(rawSession);
      setSession(parsed);
    } catch {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      router.replace("/login");
      return;
    }

    if (!rawPlan) {
      // If they somehow hit dashboard without picking plan, push them to pricing
      router.replace("/pricing");
      return;
    }

    try {
      const parsedPlan = JSON.parse(rawPlan);
      setPlan(parsedPlan?.id ?? "pro");
    } catch {
      setPlan("pro");
    }
  }, [router]);

  const displayName = useMemo(() => {
    if (!session?.email) return "";
    return session.email.split("@")[0];
  }, [session]);

  function logout() {
    localStorage.removeItem(STORAGE_SESSION_KEY);
    localStorage.removeItem(STORAGE_PLAN_KEY);
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold">
              PP
            </div>
            <div className="leading-tight">
              <div className="font-semibold">ProofPad Dashboard</div>
              <div className="text-xs text-slate-400">
                {plan ? `Plan: ${plan}` : ""}{" "}
                {session ? `• ${session.email}` : ""}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex rounded-full border border-slate-800 bg-slate-900/40 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
            >
              Back home
            </Link>

            <div className="hidden md:flex items-center rounded-full border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm text-slate-200">
              Welcome,{" "}
              <span className="ml-2 text-white font-semibold">
                {displayName}
              </span>
            </div>

            <button
              onClick={logout}
              className="rounded-full border border-slate-800 bg-slate-900/40 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}

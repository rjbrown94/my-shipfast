// components/Hero.tsx
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-700 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-600 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 md:flex-row md:items-center md:py-28 lg:px-8">
        {/* Left side – text */}
        <div className="flex-1 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 shadow-sm backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span>Protect yourself in money disputes</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Never argue about payments again.
          </h1>

          <p className="max-w-xl text-sm text-slate-300 sm:text-base">
            ProofPad keeps all your receipts, screenshots, and payment
            confirmations in one secure place. When someone says{" "}
            <span className="font-semibold text-white">
              &quot;you never paid&quot;
            </span>
            , you just send a link.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-4 text-xs text-slate-300 sm:text-sm">
            <div className="flex -space-x-2">
              {/* fake avatars / circles */}
              <div className="h-8 w-8 rounded-full border border-slate-900 bg-slate-600" />
              <div className="h-8 w-8 rounded-full border border-slate-900 bg-slate-500" />
              <div className="h-8 w-8 rounded-full border border-slate-900 bg-slate-400" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-300">★★★★★</span>
                <span className="font-semibold">4.9</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Everyday people using ProofPad to win payment disputes.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/register"
              className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400"
            >
              Get started – it&apos;s free
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-white/10"
            >
              Login to your proofs
            </Link>
            <p className="w-full text-xs text-slate-400 sm:w-auto">
              No credit card needed. Just log in and upload your proof.
            </p>
          </div>
        </div>

        {/* Right side – mockup card */}
        <div className="flex-1">
          <div className="relative mx-auto max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-4 shadow-2xl shadow-black/60">
            {/* Top bar */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[11px] text-slate-400">
                proofpad.com/p/july-rent
              </span>
            </div>

            {/* Fake proof content */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  Proof of payment
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                  VERIFIED
                </span>
              </div>

              <h2 className="text-lg font-semibold text-white">July Rent</h2>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="space-y-1">
                  <p className="text-slate-400">Paid to</p>
                  <p className="font-medium text-slate-100">
                    Landlord • Cash App
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400">Amount</p>
                  <p className="font-semibold text-emerald-300">$1,200.00</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400">Date</p>
                  <p>July 1, 2025 • 2:14 PM</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400">Status</p>
                  <p>Payment received</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-300">
                <p className="mb-1 text-slate-400">Attached screenshot</p>
                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/60">
                  <span className="text-[11px] text-slate-500">
                    cashapp_receipt_july-rent.png
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                <p>Share this page instead of arguing in texts.</p>
                <button className="rounded-full border border-slate-600 px-3 py-1 font-medium text-slate-200 hover:border-slate-400">
                  Copy link
                </button>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-[11px] text-slate-500">
            Example preview of what your ProofPad links can look like.
          </p>
        </div>
      </div>
    </section>
  );
}

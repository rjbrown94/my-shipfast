// components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-25%] left-[-15%] h-[44rem] w-[44rem] rounded-full bg-emerald-600/25 blur-3xl" />
        <div className="absolute bottom-[-25%] right-[-15%] h-[44rem] w-[44rem] rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute left-1/2 top-[-35%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-32 text-center lg:px-10 lg:py-40">
        {/* Badge */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-medium text-slate-200 backdrop-blur-xl shadow-lg">
          Built for content creators & influencers
        </div>

        {/* Headline */}
        <h1 className="mx-auto mt-10 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Stop arguing.
          <br className="hidden sm:block" />
          <span className="text-slate-200">
            Win disputes with proof that speaks for itself.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-8 max-w-3xl text-base text-slate-300 sm:text-lg">
          ProofPad helps creators protect their income when brands or clients
          say <span className="font-semibold text-white">“we never paid”</span>,{" "}
          <span className="font-semibold text-white">“you didn’t deliver”</span>
          , or{" "}
          <span className="font-semibold text-white">
            “that wasn’t the deal.”
          </span>
          <br className="hidden sm:block" />
          Upload receipts, contracts, messages, and delivery proof — then send
          one clean, secure link that shows the full story.
        </p>

        {/* Emotional reinforcement */}
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400">
          No more digging through texts. No more scattered screenshots. No more
          back-and-forth. Just proof — ready when it matters.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/register"
            className="w-full rounded-full bg-white px-12 py-3.5 text-sm font-semibold text-slate-900 shadow-2xl shadow-white/25 transition hover:bg-slate-200 sm:w-auto"
          >
            Start protecting my payments
          </Link>

          <a
            href="#how-it-works"
            className="w-full rounded-full border border-white/15 bg-white/5 px-12 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10 sm:w-auto"
          >
            See how it works
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-4 text-xs text-slate-400">
          Free to start • No credit card required • Built for real disputes
        </p>
      </div>
    </section>
  );
}

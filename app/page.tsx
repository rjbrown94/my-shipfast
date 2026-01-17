import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-25%] left-[-15%] h-[44rem] w-[44rem] rounded-full bg-emerald-600/25 blur-3xl" />
          <div className="absolute bottom-[-25%] right-[-15%] h-[44rem] w-[44rem] rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute left-1/2 top-[-35%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-32 text-center lg:px-10 lg:py-40">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-medium text-slate-200 backdrop-blur-xl shadow-lg">
            Built for content creators & influencers
          </div>

          <h1 className="mx-auto mt-10 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Stop arguing.
            <br className="hidden sm:block" />
            <span className="text-slate-200">
              Win disputes with proof that speaks for itself.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-base text-slate-300 sm:text-lg">
            ProofPad helps creators protect their income when brands or clients
            say{" "}
            <span className="font-semibold text-white">“we never paid”</span>,{" "}
            <span className="font-semibold text-white">
              “you didn’t deliver”
            </span>
            , or{" "}
            <span className="font-semibold text-white">
              “that wasn’t the deal.”
            </span>
            <br className="hidden sm:block" />
            Upload receipts, contracts, messages, delivery links, and payment
            confirmations — then send one clean, secure link that tells the
            whole story.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400">
            No more digging through texts. No more scattered screenshots. No
            more back-and-forth. Just proof — ready when it matters.
          </p>

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

          <p className="mt-4 text-xs text-slate-400">
            Free to start • No credit card required • Built for real disputes
          </p>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-6 py-20 lg:px-10"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            How ProofPad works
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            Three simple steps to protect yourself in money situations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Upload your proof",
              desc: "Add receipts, Cash App screenshots, invoices, contracts, and messages.",
            },
            {
              step: "2",
              title: "Stay organized",
              desc: "Group proofs by person, brand, or deal so nothing gets lost.",
            },
            {
              step: "3",
              title: "Share a secure link",
              desc: "When someone disputes payment, send one ProofPad link instead of arguing.",
            },
          ].map((x) => (
            <div
              key={x.step}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-300">
                {x.step}
              </div>
              <p className="text-sm font-semibold text-white">{x.title}</p>
              <p className="mt-2 text-sm text-slate-400">{x.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= COMMON DISPUTES ================= */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            The disputes creators deal with every day
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            ProofPad is built for real situations — not hypotheticals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">
              “You didn’t deliver what we agreed on.”
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Show delivery links, files, timelines, and confirmations together.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">
              “We already paid you.”
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Store receipts, payout screenshots, and transaction confirmations.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-sm font-semibold text-white">
              “That wasn’t the deal.”
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Keep contracts, DMs, and emails aligned so the facts are clear.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-400">
          People don’t win disputes by explaining themselves.
          <br />
          They win with proof that’s easy to verify.
        </p>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="border-t border-slate-900 bg-slate-950/70">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Start protecting yourself today.
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            Create your free ProofPad account in under a minute. Upload your
            first proof and you’re done.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/register"
              className="rounded-full bg-emerald-500 px-10 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400"
            >
              Get started free
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-slate-600 px-10 py-3.5 text-sm font-medium text-slate-100 hover:border-slate-400"
            >
              I already have an account
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            No contracts. No credit card. Just proof when you need it.
          </p>
        </div>
      </section>
    </main>
  );
}

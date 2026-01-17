"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "/proofpad", label: "Open app" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/80 bg-slate-950/85 backdrop-blur">
      {/* MAIN BAR */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4 lg:px-10">
        {/* Logo + name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold text-slate-50 shadow-sm shadow-black/40">
            PP
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-50">
            ProofPad
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/login"
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-sm font-medium text-slate-50 shadow-sm hover:border-slate-400"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/40 hover:bg-emerald-400"
          >
            Get started
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-200 md:hidden"
          onClick={() => setOpen((x) => !x)}
          aria-label="Toggle menu"
        >
          <span className="h-0.5 w-4 rounded-full bg-slate-200" />
          <span className="mt-1 h-0.5 w-4 rounded-full bg-slate-200" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-950/95 px-6 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-center text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-slate-950"
              onClick={() => setOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

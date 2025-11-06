"use client";

import Link from "next/link";
import ButtonLead from "@/components/ButtonLead";

export default function Hero() {
  return (
    <section className="bg-base-100 min-h-screen flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-4xl">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Stop losing disputes.
          <br />
          Show proof in seconds.
        </h1>
        <p className="text-lg text-base-content/80 mb-8">
          ProofPad tracks views and downloads of your digital files and
          generates a usage receipt you can share in refunds and chargebacks.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link href="/library" className="btn btn-primary">
            Open App
          </Link>
          <Link href="#features" className="btn btn-outline">
            See Features
          </Link>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          <ButtonLead />
        </div>

        <div className="mt-12">
          <img
            src="/proofpadhero.png"
            alt="ProofPad dashboard preview"
            className="rounded-xl shadow-lg w-full max-w-3xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

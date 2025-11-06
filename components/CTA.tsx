import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full py-16 md:py-24 bg-primary text-primary-content">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Protect your revenue today
        </h2>
        <p className="opacity-90 mt-3">
          Track usage and generate receipts before the next dispute hits.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/library" className="btn">
            Open App
          </Link>
          <a href="#features" className="btn btn-outline">
            See Features
          </a>
        </div>
      </div>
    </section>
  );
}

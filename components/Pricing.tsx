"use client";

import ButtonSignin from "./ButtonSignin";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Try ProofPad with basic features.",
    badge: "Start free",
  },
  {
    name: "Creator",
    price: "$9/mo",
    description:
      "Perfect for creators who send receipts, screenshots, or files to clients.",
    badge: "Most popular",
  },
  {
    name: "Business",
    price: "$29/mo",
    description:
      "For teams who need advanced proof tracking for disputes and clients.",
    badge: "Best value",
  },
];

export default function Pricing() {
  return (
    <main className="min-h-screen px-6 py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose your plan</h1>
        <p className="text-gray-600">
          Select a plan. If you're not logged in, you'll be asked to log in
          first.
        </p>
      </div>

      <section className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
          >
            {plan.badge && (
              <span className="text-xs uppercase tracking-wide mb-3 bg-black text-white px-3 py-1 rounded-full">
                {plan.badge}
              </span>
            )}

            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>

            <p className="text-3xl font-bold mb-4">{plan.price}</p>

            <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

            <div className="mt-auto w-full">
              <ButtonSignin callbackUrl="/proofpad" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

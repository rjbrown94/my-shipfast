export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-16 md:py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold">Simple pricing</h2>
        <p className="opacity-80 mt-2">
          Start free. Upgrade when you need more assets and receipts.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <div className="text-sm font-semibold opacity-70">Free</div>
            <div className="mt-2 text-4xl font-extrabold">$0</div>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              <li>Up to 5 assets</li>
              <li>Usage receipts</li>
              <li>Basic logging</li>
            </ul>
            <a className="btn btn-primary mt-6 w-full" href="/library">
              Start Free
            </a>
          </div>
          <div className="rounded-2xl border p-6 ring-2 ring-primary">
            <div className="text-sm font-semibold opacity-70">Pro</div>
            <div className="mt-2 text-4xl font-extrabold">
              $10<span className="text-base font-medium opacity-70">/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              <li>Unlimited assets</li>
              <li>Advanced logs</li>
              <li>Export receipts</li>
            </ul>
            <a className="btn btn-primary mt-6 w-full" href="/library">
              Upgrade
            </a>
          </div>
          <div className="rounded-2xl border p-6">
            <div className="text-sm font-semibold opacity-70">Teams</div>
            <div className="mt-2 text-4xl font-extrabold">
              $49<span className="text-base font-medium opacity-70">/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              <li>Team seats</li>
              <li>Custom branding</li>
              <li>Priority support</li>
            </ul>
            <a className="btn btn-primary mt-6 w-full" href="/library">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

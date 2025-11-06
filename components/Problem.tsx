export default function Problem() {
  return (
    <section className="w-full py-16 md:py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Creators lose money because they can’t prove delivery
        </h2>
        <p className="mt-4 opacity-80 max-w-3xl">
          When a buyer disputes a charge, the burden is on you. If you can’t
          show clear evidence that files were viewed or downloaded, banks
          default to refunds and fees. Screenshots and scattered logs aren’t
          reliable or fast enough.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border p-5">
            <div className="text-2xl">1</div>
            <div className="mt-2 font-semibold">No clean proof</div>
            <div className="opacity-70 text-sm">
              Access isn’t tracked in one place.
            </div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-2xl">2</div>
            <div className="mt-2 font-semibold">Time drain</div>
            <div className="opacity-70 text-sm">
              Manual digging for logs and emails.
            </div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-2xl">3</div>
            <div className="mt-2 font-semibold">Lost disputes</div>
            <div className="opacity-70 text-sm">
              Banks side with buyers by default.
            </div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-2xl">4</div>
            <div className="mt-2 font-semibold">Revenue leaks</div>
            <div className="opacity-70 text-sm">
              Refunds, chargeback fees, and stress.
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-base-100 p-6 border">
          <h3 className="text-xl font-bold">How ProofPad fixes it</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
              <div className="font-semibold">Track access</div>
              <div className="opacity-70 text-sm">
                Every view and download is time-stamped with IP and device.
              </div>
            </div>
            <div className="rounded-xl border p-5">
              <div className="font-semibold">One-click receipt</div>
              <div className="opacity-70 text-sm">
                Generate a clean usage receipt you can print or share in a
                dispute thread.
              </div>
            </div>
            <div className="rounded-xl border p-5">
              <div className="font-semibold">Protect revenue</div>
              <div className="opacity-70 text-sm">
                Respond faster with evidence and keep more of what you earn.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FAQ() {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold">FAQ</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <div className="font-semibold">
              How does ProofPad help with disputes?
            </div>
            <div className="opacity-80 text-sm mt-2">
              It shows a time-stamped log of file views and downloads tied to an
              asset, which many platforms accept as proof of delivery or use.
            </div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="font-semibold">
              Do I need to change my storefront?
            </div>
            <div className="opacity-80 text-sm mt-2">
              No. Add your file links here and share them from your library or
              continue using your existing store.
            </div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="font-semibold">Can I export a receipt?</div>
            <div className="opacity-80 text-sm mt-2">
              Yes. The receipt page is printable and can be saved as a PDF.
            </div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="font-semibold">Is this private?</div>
            <div className="opacity-80 text-sm mt-2">
              Only you can see your library and logs. Public links show just the
              receipt details you choose to share.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

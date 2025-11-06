export default function FeaturesAccordion() {
  return (
    <section id="features" className="w-full py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Everything you need to prove delivery
        </h2>
        <div className="mt-8 join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="features" defaultChecked />
            <div className="collapse-title text-lg font-semibold">
              Auto-track views and downloads
            </div>
            <div className="collapse-content opacity-80">
              Every open and download is logged with time, IP, and user agent.
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="features" />
            <div className="collapse-title text-lg font-semibold">
              One-click usage receipt
            </div>
            <div className="collapse-content opacity-80">
              Generate a clean receipt page you can print or send to a dispute
              thread.
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="features" />
            <div className="collapse-title text-lg font-semibold">
              Private library
            </div>
            <div className="collapse-content opacity-80">
              Add file links and covers to a simple library for quick access.
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="features" />
            <div className="collapse-title text-lg font-semibold">
              Ready to extend
            </div>
            <div className="collapse-content opacity-80">
              Connect Stripe and email later without changing the core flow.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

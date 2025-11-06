export default function Footer() {
  return (
    <footer className="py-10 text-center opacity-70">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} ProofPad. All rights reserved.</p>
      </div>
    </footer>
  );
}

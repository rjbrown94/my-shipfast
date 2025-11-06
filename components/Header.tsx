import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="navbar bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="ProofPad" width={28} height={28} />
            <span className="font-bold text-lg">ProofPad</span>
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <Link className="btn btn-ghost btn-sm" href="#features">
            Features
          </Link>
          <Link className="btn btn-ghost btn-sm" href="#pricing">
            Pricing
          </Link>
          <Link className="btn btn-primary btn-sm" href="/library">
            Open App
          </Link>
        </nav>
      </div>
    </header>
  );
}

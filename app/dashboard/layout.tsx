import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">
              ProofPad Dashboard
            </div>
            <div className="text-xs text-white/60">
              Upload and organize proof
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Back home
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

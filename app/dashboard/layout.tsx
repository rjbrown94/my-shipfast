import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/libs/next-auth";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-white">
              PP
            </div>
            <span className="font-semibold">ProofPad</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-300 hover:text-white">
              Home
            </Link>

            {session?.user?.email && (
              <span className="text-xs text-slate-400">
                {session.user.email}
              </span>
            )}

            <LogoutButton />
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

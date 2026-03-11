"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-sm font-medium text-slate-50 shadow-sm hover:border-slate-400"
    >
      Log out
    </button>
  );
}

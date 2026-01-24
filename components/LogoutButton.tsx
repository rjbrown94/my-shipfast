"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.href = "/";
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
    >
      Log out
    </button>
  );
}

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofPad",
  description:
    "Usage receipts for digital downloads. Win refunds and disputes with proof.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}

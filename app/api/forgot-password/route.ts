import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/libs/mongoose";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const email = String(body?.email || "")
      .toLowerCase()
      .trim();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          ok: true,
          message: "If that email exists, a reset link has been sent.",
        },
        { status: 200 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";

    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Reset your ProofPad password",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Reset your ProofPad password</h2>
          <p>Click the button below to reset your password.</p>
          <p>
            <a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#10b981;color:#0f172a;text-decoration:none;border-radius:8px;font-weight:600;">
              Reset password
            </a>
          </p>
          <p>If the button does not work, copy and paste this link into your browser:</p>
          <p>${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "If that email exists, a reset link has been sent.",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 },
    );
  }
}

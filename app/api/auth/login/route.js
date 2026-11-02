import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { signToken, COOKIE } from "@/lib/auth";

export async function POST(req) {
  try {
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Server is missing JWT_SECRET." }, { status: 500 });
    }
    const { email = "", password = "" } = await req.json();
    await connectDB();
    const admin = await Admin.findOne({ email: String(email).toLowerCase().trim() });
    const ok = admin && (await bcrypt.compare(String(password), admin.passwordHash));
    if (!ok) return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });

    const token = await signToken({ id: String(admin._id), email: admin.email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    console.error("login:", err);
    return NextResponse.json({ error: "Could not sign in. Check the server logs." }, { status: 500 });
  }
}

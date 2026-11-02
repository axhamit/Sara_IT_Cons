import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";

// Very small in-memory rate limit (per server instance). Use Redis/Upstash for multi-instance deployments.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v, max) => String(v ?? "").trim().slice(0, max);

export async function POST(req) {
  try {
    const body = await req.json();

    // Honeypot: real users never fill the hidden "website" field.
    if (body.website) return NextResponse.json({ ok: true });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
    }

    const data = {
      name: str(body.name, 120),
      email: str(body.email, 160),
      phone: str(body.phone, 40),
      company: str(body.company, 160),
      type: body.type === "employer" ? "employer" : "general",
      roles: str(body.roles, 400),
      headcount: str(body.headcount, 40),
      interest: str(body.interest, 160),
      message: str(body.message, 4000),
    };

    if (data.name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!emailRe.test(data.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (data.message.length < 10) return NextResponse.json({ error: "Please tell us a little more (at least 10 characters)." }, { status: 400 });

    await connectDB();
    await Lead.create(data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("contact:", err);
    return NextResponse.json({ error: "Something went wrong on our side. Please try again or email us." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import Job from "@/models/Job";

const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const resumeRe = /^data:(application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document);base64,/;
const str = (v, max) => String(v ?? "").trim().slice(0, max);

export async function POST(req) {
  try {
    const body = await req.json();
    if (body.website) return NextResponse.json({ ok: true });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(ip)) return NextResponse.json({ error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });

    const data = {
      name: str(body.name, 120),
      email: str(body.email, 160),
      phone: str(body.phone, 40),
      experience: str(body.experience, 40),
      currentCompany: str(body.currentCompany, 160),
      noticePeriod: str(body.noticePeriod, 60),
      message: str(body.message, 3000),
      resumeUrl: str(body.resumeUrl, 500),
    };
    if (data.name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!emailRe.test(data.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (data.phone.length < 7) return NextResponse.json({ error: "Please enter a phone number we can reach you on." }, { status: 400 });

    const resume = typeof body.resume === "string" ? body.resume : "";
    if (resume) {
      if (!resumeRe.test(resume)) return NextResponse.json({ error: "Resume must be a PDF or Word file." }, { status: 400 });
      if (resume.length > 1400000) return NextResponse.json({ error: "Resume is larger than 1 MB. Compress it or share a link instead." }, { status: 400 });
      data.resume = resume;
      data.resumeName = str(body.resumeName, 200) || "resume";
      data.hasResume = true;
    }
    if (!data.hasResume && !data.resumeUrl) {
      return NextResponse.json({ error: "Please upload your resume or paste a link to it." }, { status: 400 });
    }

    await connectDB();
    if (body.jobId && mongoose.isValidObjectId(body.jobId)) {
      const job = await Job.findById(body.jobId).select("title").lean();
      if (job) { data.job = job._id; data.jobTitle = job.title; }
    }
    await Application.create(data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("apply:", err);
    return NextResponse.json({ error: "Something went wrong on our side. Please try again." }, { status: 500 });
  }
}

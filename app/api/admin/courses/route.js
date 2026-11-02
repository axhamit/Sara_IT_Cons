import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdmin } from "@/lib/auth";
import { refreshSite } from "@/lib/resource";
import { courses } from "@/lib/courses";
import CourseOverride from "@/models/CourseOverride";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    if (!courses.some((c) => c.slug === body.slug)) {
      return NextResponse.json({ error: "Unknown course." }, { status: 400 });
    }
    const { price = "", nextBatch = "", duration = "", mode = "", enrolment = "Open" } = body;
    await connectDB();
    const item = await CourseOverride.findOneAndUpdate(
      { slug: body.slug },
      { price, nextBatch, duration, mode, enrolment },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();
    refreshSite();
    return NextResponse.json({ item });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Could not save." }, { status: 400 });
  }
}

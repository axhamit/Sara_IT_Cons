import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { getAdmin } from "@/lib/auth";
import Application from "@/models/Application";

export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!mongoose.isValidObjectId(params.id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await connectDB();
  const a = await Application.findById(params.id).select("resume resumeName").lean();
  const m = a?.resume?.match(/^data:([^;]+);base64,(.*)$/s);
  if (!m) return NextResponse.json({ error: "No resume file" }, { status: 404 });
  const filename = (a.resumeName || "resume").replace(/[^\w.\- ]/g, "_");
  return new NextResponse(Buffer.from(m[2], "base64"), {
    headers: { "Content-Type": m[1], "Content-Disposition": `attachment; filename="${filename}"` },
  });
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdmin } from "@/lib/auth";
import { MODELS, cleanBody, refreshSite } from "@/lib/resource";

export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const Model = MODELS[params.resource];
  if (!Model) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await connectDB();
  const items = await Model.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req, { params }) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const Model = MODELS[params.resource];
  if (!Model || ["leads", "applications"].includes(params.resource)) return NextResponse.json({ error: "Not allowed" }, { status: 405 });
  try {
    await connectDB();
    const item = await Model.create(cleanBody(params.resource, await req.json()));
    refreshSite();
    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Could not save." }, { status: 400 });
  }
}

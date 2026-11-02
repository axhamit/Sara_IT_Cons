import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { getAdmin } from "@/lib/auth";
import { MODELS, cleanBody, refreshSite } from "@/lib/resource";

export const dynamic = "force-dynamic";

async function guard(params) {
  if (!(await getAdmin())) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const Model = MODELS[params.resource];
  if (!Model || !mongoose.isValidObjectId(params.id)) {
    return { error: NextResponse.json({ error: "Not found" }, { status: 404 }) };
  }
  return { Model };
}

export async function PUT(req, { params }) {
  const g = await guard(params);
  if (g.error) return g.error;
  try {
    await connectDB();
    const item = await g.Model.findByIdAndUpdate(params.id, cleanBody(params.resource, await req.json()), {
      new: true,
      runValidators: true,
    }).select("-resume").lean();
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    refreshSite();
    return NextResponse.json({ item });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Could not update." }, { status: 400 });
  }
}

export async function DELETE(_req, { params }) {
  const g = await guard(params);
  if (g.error) return g.error;
  await connectDB();
  await g.Model.findByIdAndDelete(params.id);
  refreshSite();
  return NextResponse.json({ ok: true });
}

import { connectDB } from "@/lib/db";
import Client from "@/models/Client";
import Testimonial from "@/models/Testimonial";
import Job from "@/models/Job";
import mongoose from "mongoose";
import CourseOverride from "@/models/CourseOverride";
import { courses as baseCourses } from "@/lib/courses";

const plain = (d) => JSON.parse(JSON.stringify(d));

// Public pages never crash if the database is down: they just hide DB-driven sections.
export async function getClients() {
  try {
    await connectDB();
    return plain(await Client.find({ visible: true }).sort({ order: 1, createdAt: -1 }).lean());
  } catch (e) {
    console.error("getClients:", e.message);
    return [];
  }
}

export async function getTestimonials() {
  try {
    await connectDB();
    return plain(await Testimonial.find({ visible: true }).sort({ createdAt: -1 }).lean());
  } catch (e) {
    console.error("getTestimonials:", e.message);
    return [];
  }
}

export async function getOverrides() {
  try {
    await connectDB();
    return plain(await CourseOverride.find().lean());
  } catch (e) {
    return [];
  }
}

export async function getCourses() {
  const overrides = await getOverrides();
  return baseCourses.map((c) => {
    const o = overrides.find((x) => x.slug === c.slug) || {};
    return {
      ...c,
      price: o.price || c.price,
      nextBatch: o.nextBatch || c.nextBatch,
      duration: o.duration || c.duration,
      mode: o.mode || c.mode,
      enrolment: o.enrolment || "Open",
    };
  });
}

export async function getJobs(limit = 100) {
  try {
    await connectDB();
    return plain(await Job.find({ visible: true }).sort({ createdAt: -1 }).limit(limit).lean());
  } catch (e) {
    console.error("getJobs:", e.message);
    return [];
  }
}

export async function getJob(id) {
  try {
    if (!mongoose.isValidObjectId(id)) return null;
    await connectDB();
    const job = await Job.findOne({ _id: id, visible: true }).lean();
    return job ? plain(job) : null;
  } catch (e) {
    return null;
  }
}

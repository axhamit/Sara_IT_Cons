import { revalidatePath } from "next/cache";
import Client from "@/models/Client";
import Testimonial from "@/models/Testimonial";
import Lead from "@/models/Lead";
import Job from "@/models/Job";
import Application from "@/models/Application";

export const MODELS = { clients: Client, testimonials: Testimonial, leads: Lead, jobs: Job, applications: Application };

// Only allow safe fields through from the browser.
export function cleanBody(resource, body = {}) {
  const { _id, __v, createdAt, updatedAt, ...rest } = body;
  if (resource === "leads" || resource === "applications") {
    const out = {};
    if (rest.status !== undefined) out.status = rest.status;
    if (rest.notes !== undefined) out.notes = rest.notes;
    return out;
  }
  return rest;
}

export function refreshSite() {
  revalidatePath("/", "layout");
}

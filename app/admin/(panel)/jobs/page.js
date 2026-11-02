import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import JobsManager from "@/components/admin/JobsManager";

export const dynamic = "force-dynamic";

export default async function JobsAdmin() {
  await connectDB();
  const items = JSON.parse(JSON.stringify(await Job.find().sort({ createdAt: -1 }).lean()));
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold">Jobs</h1>
      <p className="mt-1 text-ink-soft">Openings shown on the Find jobs page. Untick &ldquo;Open and visible&rdquo; to close a job without deleting it.</p>
      <JobsManager initial={items} />
    </div>
  );
}

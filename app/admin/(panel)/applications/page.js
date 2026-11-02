import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import ApplicationsTable from "@/components/admin/ApplicationsTable";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  await connectDB();
  // The resume file itself is excluded from the list; it is downloaded on demand.
  const items = JSON.parse(JSON.stringify(await Application.find().select("-resume").sort({ createdAt: -1 }).lean()));
  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold">Applications</h1>
      <p className="mt-1 text-ink-soft">Candidates who applied to a job or shared their resume. Download resumes and track each candidate&apos;s status.</p>
      <ApplicationsTable initial={items} />
    </div>
  );
}

import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import LeadsTable from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  await connectDB();
  const leads = JSON.parse(JSON.stringify(await Lead.find().sort({ createdAt: -1 }).lean()));
  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold">Enquiries</h1>
      <p className="mt-1 text-ink-soft">Everyone who filled in the contact form. Update the status as you follow up.</p>
      <LeadsTable initial={leads} />
    </div>
  );
}

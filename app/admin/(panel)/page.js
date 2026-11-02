import Link from "next/link";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import Client from "@/models/Client";
import Job from "@/models/Job";
import Application from "@/models/Application";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  await connectDB();
  const [newApps, openJobs, newLeads, clients, recentApps, recentLeads] = await Promise.all([
    Application.countDocuments({ status: "new" }),
    Job.countDocuments({ visible: true }),
    Lead.countDocuments({ status: "new" }),
    Client.countDocuments(),
    Application.find().select("-resume").sort({ createdAt: -1 }).limit(5).lean(),
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);
  const stats = [
    ["New applications", newApps, "/admin/applications"],
    ["New enquiries", newLeads, "/admin/leads"],
    ["Open jobs", openJobs, "/admin/jobs"],
    ["Clients on website", clients, "/admin/clients"],
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value, href]) => (
          <Link key={label} href={href} className="rounded-2xl border border-line bg-white p-5 transition hover:border-cobalt">
            <p className="text-sm text-ink-soft">{label}</p>
            <p className="mt-1 font-display text-4xl font-bold">{value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Latest applications</h2>
          {recentApps.length === 0 ? (
            <p className="mt-3 rounded-2xl border border-dashed border-line bg-white p-8 text-center text-ink-soft">No applications yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white">
              {recentApps.map((a) => (
                <li key={String(a._id)} className="p-4">
                  <p className="font-semibold">{a.name}</p>
                  <p className="truncate text-sm text-ink-soft">{a.jobTitle}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">Latest enquiries</h2>
          {recentLeads.length === 0 ? (
            <p className="mt-3 rounded-2xl border border-dashed border-line bg-white p-8 text-center text-ink-soft">No enquiries yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white">
              {recentLeads.map((l) => (
                <li key={String(l._id)} className="p-4">
                  <p className="font-semibold">{l.name} <span className="font-normal text-ink-soft">{l.company && `from ${l.company}`}</span></p>
                  <p className="truncate text-sm text-ink-soft">{l.type === "employer" ? "Hiring request" : l.interest || "General enquiry"}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

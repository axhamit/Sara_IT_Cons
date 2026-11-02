import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, Clock } from "lucide-react";
import ApplyForm from "@/components/ApplyForm";
import { getJob } from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const job = await getJob(params.id);
  return job ? { title: job.title, description: job.description.slice(0, 150) } : {};
}

export default async function JobPage({ params }) {
  const job = await getJob(params.id);
  if (!job) notFound();

  return (
    <div className="wrap py-10 sm:py-16">
      <Link href="/jobs" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-cobalt shadow-sm transition hover:border-cobalt/30">← All jobs</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-9">
          <p className="eyebrow">Open position</p>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">{job.title}</h1>
          <p className="mt-2 text-lg text-ink-soft">{job.client}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <li className="rounded-full bg-white px-3 py-1 font-medium text-ink">{job.type}</li>
            {job.location && <li className="flex items-center gap-1.5"><MapPin size={15} /> {job.location}</li>}
            {job.experience && <li className="flex items-center gap-1.5"><Briefcase size={15} /> {job.experience}</li>}
            {job.salary && <li className="flex items-center gap-1.5"><Clock size={15} /> {job.salary}</li>}
          </ul>
          {job.skills && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {job.skills.split(",").map((s) => <li key={s} className="rounded-full border border-line bg-white px-3 py-1 text-sm">{s.trim()}</li>)}
            </ul>
          )}
          <h2 className="mt-10 text-xl font-semibold">About the role</h2>
          <div className="mt-3 whitespace-pre-line leading-relaxed text-ink-soft">{job.description}</div>
        </div>
        <ApplyForm jobId={job._id} jobTitle={job.title} />
      </div>
    </div>
  );
}

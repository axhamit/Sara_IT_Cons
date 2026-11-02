import Link from "next/link";
import { MapPin, Briefcase, Clock, ArrowUpRight } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`} className="group block rounded-2xl border border-line/80 bg-white p-6 shadow-sm shadow-ink/[0.03] transition duration-200 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-xl hover:shadow-ink/[0.08] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold transition group-hover:text-cobalt">{job.title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{job.client}</p>
        </div>
        <span className="rounded-full bg-cobalt/[0.07] px-3 py-1 text-xs font-semibold text-cobalt">{job.type}</span>
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
        {job.location && <li className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</li>}
        {job.experience && <li className="flex items-center gap-1.5"><Briefcase size={14} /> {job.experience}</li>}
        {job.salary && <li className="flex items-center gap-1.5"><Clock size={14} /> {job.salary}</li>}
      </ul>
      {job.skills && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {job.skills.split(",").slice(0, 6).map((s) => <li key={s} className="rounded-full border border-line bg-paper/60 px-2.5 py-1 text-xs text-ink-soft">{s.trim()}</li>)}
        </ul>
      )}
      <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-4 text-sm font-semibold text-cobalt">
        <span>View role</span><ArrowUpRight size={17} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

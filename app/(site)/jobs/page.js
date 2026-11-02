import JobCard from "@/components/JobCard";
import ApplyForm from "@/components/ApplyForm";
import { getJobs } from "@/lib/data";

export const revalidate = 60;
export const metadata = { title: "Find IT jobs", description: "Open IT roles with our hiring partners. Apply online or share your resume." };

export default async function Jobs() {
  const jobs = await getJobs();
  return (
    <>
      <section className="page-hero">
        <div className="wrap py-16 sm:py-24">
          <p className="eyebrow">Your next move</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-6xl">Open IT roles with our hiring partners</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">Apply directly, or share your resume below and we will match you when a suitable role opens. Candidates are never charged.</p>
        </div>
      </section>

      <section className="wrap py-10">
        {jobs.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-line bg-white p-10 text-center leading-relaxed text-ink-soft shadow-sm">
            No openings are listed right now. Submit your resume below and we will contact you when a role matches.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">{jobs.map((j) => <JobCard key={j._id} job={j} />)}</div>
        )}
      </section>

      <section className="section bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Stay on our radar</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Don&apos;t see the right role?</h2>
            <p className="mt-4 text-ink-soft">Many of our openings are never advertised. Share your resume and tell us what you want next.</p>
          </div>
          <ApplyForm />
        </div>
      </section>
    </>
  );
}

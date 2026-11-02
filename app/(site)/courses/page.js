import Link from "next/link";
import { Clock, MonitorPlay, Gauge } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import { getCourses } from "@/lib/data";

export const revalidate = 60;
export const metadata = { title: "Courses", description: "Advanced Generative AI and Agentic AI, and the Applied AI Engineering Master's Certification." };

export default async function Courses() {
  const courses = await getCourses();
  return (
    <>
      <section className="page-hero">
        <div className="wrap py-16 sm:py-24">
          <p className="eyebrow">Practical, mentor-led programs</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-6xl">Learn the skills IT employers are hiring for</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">Two live programs with real projects, mentor feedback, a certificate and career guidance from our recruitment team.</p>
        </div>
      </section>

      <section className="wrap space-y-8 py-10">
        {courses.map((c) => (
          <article key={c.slug} className="grid gap-8 rounded-3xl border border-line bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl sm:p-9 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="eyebrow">{c.duration} · {c.mode}</p>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{c.title}</h2>
              <p className="mt-3 text-ink-soft">{c.tagline}</p>
              <p className="mt-4 leading-relaxed">{c.short}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
                <li className="flex items-center gap-2"><Clock size={16} /> {c.duration}</li>
                <li className="flex items-center gap-2"><MonitorPlay size={16} /> {c.mode}</li>
                <li className="flex items-center gap-2"><Gauge size={16} /> {c.level}</li>
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-paper/80 p-6 ring-1 ring-line/70">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">Next batch</dt><dd className="font-semibold">{c.nextBatch}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">Fee</dt><dd className="font-semibold">{c.price}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">Enrolment</dt><dd className="font-semibold">{c.enrolment}</dd></div>
              </dl>
              <Link href={`/courses/${c.slug}`} className="btn btn-primary">View program</Link>
            </div>
          </article>
        ))}
      </section>
      <CtaBand title="Not sure which program fits you?" text="Tell us your background and goals. We will recommend the right path." cta="Get advice" />
    </>
  );
}

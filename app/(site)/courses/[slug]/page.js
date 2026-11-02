import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getCourses } from "@/lib/data";
import { courses as staticCourses } from "@/lib/courses";

export const revalidate = 60;

export function generateStaticParams() {
  return staticCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const c = staticCourses.find((x) => x.slug === params.slug);
  return c ? { title: c.title, description: c.short } : {};
}

export default async function CoursePage({ params }) {
  const courses = await getCourses();
  const c = courses.find((x) => x.slug === params.slug);
  if (!c) notFound();

  const closed = c.enrolment === "Closed";
  const enquire = `/contact?interest=${encodeURIComponent(c.interest)}`;

  return (
    <>
      <section className="home-hero text-white">
        <div className="wrap py-16 sm:py-24">
          <p className="eyebrow border-white/15 bg-white/[0.08] text-amber">{c.duration} · {c.mode}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-6xl">{c.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{c.tagline}</p>
          <Link href={enquire} className="btn mt-8 bg-white text-ink hover:-translate-y-0.5 hover:bg-amber">{closed ? "Join the waitlist" : "Apply or ask a question"}</Link>
        </div>
      </section>

      <div className="wrap grid gap-12 py-14 lg:grid-cols-[1.5fr_0.5fr] lg:items-start">
        <div className="space-y-14">
          <section>
            <h2 className="text-2xl font-bold">What you will be able to do</h2>
            <ul className="mt-5 space-y-3">
              {c.outcomes.map((o) => <li key={o} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-teal" /> {o}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Curriculum</h2>
            <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white shadow-sm">
              {c.modules.map((m, i) => (
                <details key={m.title} className="group p-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                    <span>Module {i + 1}: {m.title}</span>
                    <span className="text-ink-soft transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <ul className="mt-3 list-disc space-y-1.5 pl-6 text-ink-soft">
                    {m.topics.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          <section className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Who it is for</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">{c.audience.map((a) => <li key={a}>{a}</li>)}</ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Tools you will use</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.tools.map((t) => <li key={t} className="rounded-full border border-line bg-white px-3 py-1 text-sm">{t}</li>)}
              </ul>
            </div>
          </section>
        </div>

        <aside className="rounded-2xl border border-line bg-white p-6 shadow-lg shadow-ink/[0.05] lg:sticky lg:top-28">
          <dl className="space-y-4 text-sm">
            {[["Duration", c.duration], ["Format", c.mode], ["Level", c.level], ["Next batch", c.nextBatch], ["Fee", c.price], ["Enrolment", c.enrolment]].map(([k, v]) => (
              <div key={k}><dt className="text-ink-soft">{k}</dt><dd className="font-semibold">{v}</dd></div>
            ))}
          </dl>
          <Link href={enquire} className="btn btn-primary mt-6 w-full">{closed ? "Join the waitlist" : "Enquire now"}</Link>
        </aside>
      </div>
    </>
  );
}

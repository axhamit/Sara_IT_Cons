import Link from "next/link";
import { Check } from "lucide-react";
import HiringPipeline from "@/components/HiringPipeline";
import ClientMarquee from "@/components/ClientMarquee";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";
import JobCard from "@/components/JobCard";
import { getClients, getTestimonials, getCourses, getJobs } from "@/lib/data";
import { services, howWeWork, site } from "@/lib/site";
import { ArrowRight, Sparkles } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const [clients, testimonials, courses, jobs] = await Promise.all([getClients(), getTestimonials(), getCourses(), getJobs(4)]);

  return (
    <>
      <section className="home-hero">
        <div className="wrap grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative z-10">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white/90">
              <Sparkles size={16} className="text-amber" /> Talent, training &amp; technology
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.04] sm:text-6xl">
              Great teams start with <span className="text-amber">the right people.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {site.name} places engineers, analysts and tech leaders with growing IT companies. We also train job-ready
              professionals in Generative AI, Agentic AI and Applied AI Engineering.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/employers#request" className="btn bg-amber text-ink shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-amber/90">Hire talent <ArrowRight size={16} /></Link>
              <Link href="/jobs" className="btn border border-white/20 bg-white/[0.07] text-white hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10">Explore open roles</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
              {["Pre-screened candidates", "Shortlist in 72 hours", "Replacement guarantee"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check size={16} className="text-teal" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-cobalt/20 blur-2xl" aria-hidden="true" />
            <div className="relative">
              <HiringPipeline />
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-white/[0.09] px-5 py-3 text-white shadow-xl backdrop-blur sm:block">
                <p className="text-xs font-medium text-white/60">Your next shortlist</p>
                <p className="mt-0.5 font-display text-lg font-bold">In as little as 72 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientMarquee clients={clients} />

      <section className="section">
        <div className="wrap grid gap-6 md:grid-cols-2">
          <div className="group rounded-3xl bg-ink p-8 text-white shadow-xl shadow-ink/10 transition hover:-translate-y-1 sm:p-10">
            <p className="eyebrow border-white/15 bg-white/[0.08] text-amber">For companies</p>
            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Build your team with confidence</h2>
            <p className="mt-3 text-white/70">Tell us the role. We bring you screened candidates who fit the skills, budget and joining timeline.</p>
            <Link href="/employers#request" className="btn mt-6 bg-white text-ink hover:bg-amber">Request talent <ArrowRight size={16} /></Link>
          </div>
          <div className="group rounded-3xl border border-line bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-xl hover:shadow-ink/5 sm:p-10">
            <p className="eyebrow">For candidates</p>
            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Find a role that moves you forward</h2>
            <p className="mt-3 text-ink-soft">Apply to open roles or share your resume once. Our recruiters match you with companies that are hiring.</p>
            <Link href="/jobs" className="btn btn-primary mt-6">Find jobs <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">Hiring services built around your team</h2>
          <div className="mt-12 border-t border-line">
            {services.map((s) => (
              <div key={s.title} className="grid gap-3 border-b border-line py-7 transition-colors hover:bg-white/70 md:grid-cols-[1fr_1.4fr] md:gap-10 md:px-4">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-ink-soft">{s.short}</p>
              </div>
            ))}
          </div>
          <Link href="/employers" className="btn btn-ghost mt-8">See how we hire</Link>
        </div>
      </section>

      {jobs.length > 0 && (
        <section className="section bg-white">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Latest openings</h2>
              <Link href="/jobs" className="btn btn-ghost">View all jobs</Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {jobs.map((j) => <JobCard key={j._id} job={j} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Learn in-demand skills</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">Upskill into the roles companies are hiring for</h2>
          <p className="mt-4 max-w-2xl text-ink-soft">Two live programs taught by practising engineers, with projects, mentor reviews and career support.</p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {courses.map((c, i) => (
              <article key={c.slug} className={`flex flex-col rounded-3xl p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-9 ${i === 0 ? "bg-ink text-white shadow-ink/10" : "border border-line bg-white hover:border-cobalt/25"}`}>
                <p className={`text-sm font-medium ${i === 0 ? "text-amber" : "text-cobalt"}`}>{c.duration}, {c.mode}</p>
                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{c.title}</h3>
                <p className={`mt-3 ${i === 0 ? "text-white/70" : "text-ink-soft"}`}>{c.short}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {c.outcomes.slice(0, 3).map((o) => (
                    <li key={o} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> {o}</li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center justify-between gap-4 pt-2">
                  <span className={`text-sm ${i === 0 ? "text-white/70" : "text-ink-soft"}`}>Next batch: {c.nextBatch}</span>
                  <Link href={`/courses/${c.slug}`} className={`btn ${i === 0 ? "bg-white text-ink hover:bg-amber" : "btn-primary"}`}>View program</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <p className="eyebrow">A clear process</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">How a hiring request works</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {howWeWork.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink pt-5">
                <span className="font-display text-sm font-semibold text-cobalt">Step {i + 1}</span>
                <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials items={testimonials} />
      <CtaBand />
    </>
  );
}

import { Check } from "lucide-react";
import EmployerForm from "@/components/EmployerForm";
import { services, howWeWork } from "@/lib/site";

export const metadata = { title: "Hire IT talent", description: "Permanent, contract and bulk IT hiring with pre-screened candidates." };

export default function Employers() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap py-16 sm:py-24">
          <p className="eyebrow">For growing teams</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-6xl">IT hiring that saves your engineers&apos; interview time</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">We screen for skills, communication and intent before a profile reaches you, so every interview you take is worth taking.</p>
        </div>
      </section>

      <section className="wrap py-10">
        <div className="space-y-6">
          {services.map((s) => (
            <article key={s.title} className="grid gap-8 rounded-3xl border border-line bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-9 md:grid-cols-2">
              <div>
                <span className="mb-4 block h-1 w-10 rounded-full bg-cobalt" />
                <h2 className="text-2xl font-bold">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.detail}</p>
              </div>
              <ul className="space-y-2.5 text-sm">
                {s.deliverables.map((d) => <li key={d} className="flex gap-2.5"><Check size={17} className="mt-0.5 shrink-0 text-teal" /> {d}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Simple from start to shortlist</p>
          <h2 className="mt-4 text-3xl font-bold">How it works</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {howWeWork.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cobalt/[0.08] font-display text-sm font-bold text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="request" className="section scroll-mt-20 bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Tell us who you need</h2>
            <p className="mt-4 text-ink-soft">Share the roles and timeline. A recruiter will call you within one business day. There is no fee to submit a request.</p>
          </div>
          <EmployerForm />
        </div>
      </section>
    </>
  );
}

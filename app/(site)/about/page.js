import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata = { title: "About", description: "Who we are and how we work." };

const principles = [
  { t: "Screen before we send", d: "Every profile is checked for skills, communication and genuine interest before it reaches a client." },
  { t: "Honest with candidates", d: "We share real role details, never charge candidates, and give feedback after interviews." },
  { t: "Train for the market", d: "Our courses teach the skills our hiring clients ask for, taught by working engineers." },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap py-16 sm:py-24">
          <p className="eyebrow">About {site.name}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-6xl">A recruitment team that also trains</h1>
          <div className="mt-7 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
            {/* TODO: replace with your real company story */}
            <p>{site.name} was founded to fix two problems: IT companies lose weeks interviewing candidates who were never a fit, and good engineers miss roles because nobody explains the opportunity honestly.</p>
            <p>We recruit for permanent and contract roles, and we run training programs in Generative AI, Agentic AI and Applied AI Engineering so more people are ready for the roles that are hardest to fill.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-8 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.t} className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-7">
              <span className="mb-5 block h-1 w-10 rounded-full bg-cobalt" />
              <h2 className="text-xl font-semibold">{p.t}</h2>
              <p className="mt-2 text-ink-soft">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Want to work with us?" text="Hiring or job-hunting, share a few details and we will get back with next steps." />
    </>
  );
}

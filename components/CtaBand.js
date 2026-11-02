import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBand({ title = "Need to hire IT talent, or ready for your next role?", text = "Tell us what you are looking for. A recruiter will get back to you within one business day.", cta = "Talk to us" }) {
  return (
    <section className="section pt-0">
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-3xl bg-ink px-8 py-14 text-white shadow-2xl shadow-ink/15 sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute -right-20 -top-32 -z-10 h-96 w-96 rounded-full bg-cobalt/40 blur-3xl" aria-hidden="true" />
          <p className="eyebrow border-white/15 bg-white/[0.08] text-amber">Let&apos;s make it happen</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-white/70">{text}</p>
          <Link href="/contact" className="btn mt-8 bg-white text-ink hover:-translate-y-0.5 hover:bg-amber">{cta}<ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

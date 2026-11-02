import { Quote } from "lucide-react";

export default function Testimonials({ items }) {
  if (!items?.length) return null;
  return (
    <section className="section bg-white">
      <div className="wrap">
        <p className="eyebrow">Good work, good words</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">What clients and learners say</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.slice(0, 6).map((t) => (
            <figure key={t._id} className="flex flex-col rounded-2xl border border-line/80 bg-paper/50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-ink/[0.05] sm:p-7">
              <Quote size={22} className="mb-4 text-cobalt/70" aria-hidden="true" />
              <blockquote className="flex-1 leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                <span className="font-bold">{t.name}</span>
                <span className="mt-0.5 block text-ink-soft">{[t.role, t.company].filter(Boolean).join(", ")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

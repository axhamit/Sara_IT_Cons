// A static "open requirement" panel. It plays one staggered reveal on page load.
const stages = [
  { name: "Profiles sourced", n: 120, w: "100%" },
  { name: "Screened", n: 34, w: "52%" },
  { name: "Interviewed", n: 9, w: "28%" },
  { name: "Offers", n: 2, w: "12%" },
];

export default function HiringPipeline() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_28px_80px_-28px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
      <div className="flex items-center justify-between bg-ink px-6 py-4 text-white">
        <span className="font-display text-sm font-semibold">Senior Java Developer, 5+ yrs</span>
        <span className="rounded-full bg-teal/20 px-2.5 py-0.5 text-xs font-medium text-teal">Open</span>
      </div>
      <ul className="space-y-5 px-6 py-6 text-ink">
        {stages.map((s, i) => (
          <li key={s.name} className="animate-step" style={{ animationDelay: `${0.3 + i * 0.5}s` }}>
            <div className="flex justify-between text-sm">
              <span className="font-medium">{s.name}</span>
              <span className="font-display font-semibold">{s.n}</span>
            </div>
            <div className="mt-1.5 h-2.5 rounded-full bg-paper">
              <div className={`h-2.5 rounded-full ${i === 3 ? "bg-amber" : "bg-cobalt"}`} style={{ width: s.w }} />
            </div>
          </li>
        ))}
      </ul>
      <dl className="grid animate-step grid-cols-3 border-t border-line bg-paper/80 text-center text-ink" style={{ animationDelay: "2.5s" }}>
        {[["First shortlist", "72 hours"], ["Notice period", "30 days"], ["Replacement", "90 days"]].map(([k, v]) => (
          <div key={k} className="px-3 py-3">
            <dt className="text-xs text-ink-soft">{k}</dt>
            <dd className="font-display text-base font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

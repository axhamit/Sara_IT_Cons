function Item({ c }) {
  const inner = c.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={c.logo} alt={c.name} className="h-9 w-auto max-w-[140px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" loading="lazy" />
  ) : (
    <span className="font-display text-lg font-semibold text-ink-soft">{c.name}</span>
  );
  return c.website ? (
    <a href={c.website} target="_blank" rel="noopener noreferrer" aria-label={c.name}>{inner}</a>
  ) : (
    <span>{inner}</span>
  );
}

export default function ClientMarquee({ clients }) {
  if (!clients?.length) return null;
  // Repeat so the loop is seamless even with few clients.
  const base = clients.length < 6 ? [...clients, ...clients, ...clients] : clients;
  const row = [...base, ...base];
  return (
    <section className="border-y border-line/80 bg-white py-9 sm:py-11" aria-label="Our clients">
      <p className="wrap mb-7 text-center text-xs font-bold uppercase tracking-[0.16em] text-ink-soft/80">Companies we hire for</p>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 pr-16 hover:[animation-play-state:paused]">
          {row.map((c, i) => <Item key={`${c._id}-${i}`} c={c} />)}
        </div>
      </div>
    </section>
  );
}

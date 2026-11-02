import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { site, nav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-10 py-16 md:grid-cols-4 md:py-20">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 font-display text-xl font-bold">
            <Logo /> {site.name}
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{site.description}</p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber transition hover:text-white">
            Let&apos;s work together <ArrowUpRight size={16} />
          </Link>
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {nav.map((n) => (
              <li key={n.href}><Link className="transition hover:text-amber" href={n.href}>{n.label}</Link></li>
            ))}
            <li><Link className="transition hover:text-amber" href="/privacy">Privacy policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li className="flex items-start gap-2"><Mail className="mt-0.5 shrink-0 text-teal" size={15} /> <a className="transition hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 shrink-0 text-teal" size={15} /> {site.phone}</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0 text-teal" size={15} /> {site.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}

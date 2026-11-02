"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { site, nav } from "@/lib/site";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href) => path === href || path.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 shadow-sm shadow-ink/[0.03] backdrop-blur-xl">
      <div className="wrap flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-xl font-bold tracking-tight" onClick={() => setOpen(false)}>
          <Logo /> {site.name}
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-line/70 bg-paper/75 p-1 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition ${active(n.href) ? "bg-white text-cobalt shadow-sm" : "text-ink-soft hover:text-ink"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/employers#request" className="btn btn-primary whitespace-nowrap !px-4 !py-2.5">Request talent</Link>
        </div>

        <button className="rounded-xl border border-line bg-white p-2.5 transition hover:border-cobalt hover:text-cobalt md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="wrap flex flex-col gap-1 py-4" aria-label="Mobile">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} onClick={() => setOpen(false)} className={`rounded-xl px-4 py-3 text-base font-semibold transition ${active(n.href) ? "bg-cobalt/[0.07] text-cobalt" : "text-ink-soft hover:bg-paper hover:text-ink"}`}>
                {n.label}
              </Link>
            ))}
            <Link href="/employers#request" onClick={() => setOpen(false)} className="btn btn-primary mt-2">Request talent</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

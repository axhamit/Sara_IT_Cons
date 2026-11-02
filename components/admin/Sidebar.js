"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Inbox, Building2, Quote, GraduationCap, LogOut, ExternalLink, Briefcase, FileText } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/leads", label: "Enquiries", icon: Inbox },
  { href: "/admin/clients", label: "Clients", icon: Building2 },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/courses", label: "Courses", icon: GraduationCap },
];

export default function Sidebar({ email }) {
  const path = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="border-b border-line bg-white md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2.5 px-5 py-4 font-display text-lg font-bold"><Logo size={24} /> Admin</div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0" aria-label="Admin">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? path === href : path.startsWith(href);
          return (
            <Link key={href} href={href} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-cobalt text-white" : "text-ink-soft hover:bg-paper"}`}>
              <Icon size={18} /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="hidden border-t border-line p-4 text-sm md:absolute md:bottom-0 md:block md:w-full">
        <a href="/" target="_blank" className="mb-3 flex items-center gap-2 text-ink-soft hover:text-cobalt"><ExternalLink size={15} /> View website</a>
        <p className="truncate text-xs text-ink-soft">{email}</p>
        <button onClick={logout} className="mt-2 flex items-center gap-2 font-medium text-red-600 hover:underline"><LogOut size={15} /> Sign out</button>
      </div>
      <button onClick={logout} className="m-3 flex items-center gap-2 text-sm font-medium text-red-600 md:hidden"><LogOut size={15} /> Sign out</button>
    </aside>
  );
}

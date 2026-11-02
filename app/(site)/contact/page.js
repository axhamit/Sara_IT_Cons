import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata = { title: "Contact", description: "Book a consultation or ask about our courses." };

export default function Contact({ searchParams }) {
  const interest = typeof searchParams?.interest === "string" ? searchParams.interest : "";
  return (
    <section className="wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <div className="lg:sticky lg:top-28">
        <p className="eyebrow">We&apos;re here to help</p>
        <h1 className="mt-5 text-4xl font-extrabold sm:text-6xl">Let&apos;s talk about your goals</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">Whether you are hiring, job-hunting or asking about a course, send us a note. We reply within one business day.</p>
        <ul className="mt-8 space-y-3">
          <li className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm"><Mail className="mt-0.5 text-cobalt" size={20} /><a href={`mailto:${site.email}`} className="font-medium transition hover:text-cobalt">{site.email}</a></li>
          <li className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm"><Phone className="mt-0.5 text-cobalt" size={20} /><span className="font-medium">{site.phone}</span></li>
          <li className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm"><MapPin className="mt-0.5 text-cobalt" size={20} /><span className="font-medium">{site.location}</span></li>
        </ul>
      </div>
      <ContactForm defaultInterest={interest} />
    </section>
  );
}

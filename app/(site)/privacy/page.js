import { site } from "@/lib/site";

export const metadata = { title: "Privacy policy" };

export default function Privacy() {
  return (
    <section className="page-hero">
      <div className="wrap max-w-3xl py-16 sm:py-24">
        <p className="eyebrow">Your information matters</p>
        <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">Privacy policy</h1>
        {/* IMPORTANT: this is placeholder text. Have a lawyer review it before launch. */}
        <div className="mt-8 space-y-5 rounded-3xl border border-line bg-white p-6 leading-relaxed text-ink-soft shadow-sm sm:p-9">
          <p>When you submit a form on this site (contact, hiring request or job application) we store your name, email, phone, company, resume and message so we can respond to you and match you with opportunities. Candidate details may be shared with hiring companies only with your consent.</p>
          <p>We do not sell your data. We share it only with service providers that help us run this website and respond to enquiries, and when the law requires it.</p>
          <p>You can ask us to access or delete your data at any time by emailing {site.email}.</p>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { interests } from "@/lib/site";

export default function ContactForm({ defaultInterest = "" }) {
  const [state, setState] = useState({ status: "idle", error: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ status: "loading", error: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not send your message.");
      form.reset();
      setState({ status: "done", error: "" });
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  }

  if (state.status === "done") {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-lg shadow-ink/[0.05]" role="status">
        <CheckCircle2 className="mx-auto text-teal" size={44} />
        <h3 className="mt-4 text-2xl font-bold">Thanks, we have your message.</h3>
        <p className="mt-2 text-ink-soft">A member of our team will reply within one business day.</p>
        <button className="btn btn-ghost mt-6" onClick={() => setState({ status: "idle", error: "" })}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-lg shadow-ink/[0.05] sm:p-9" noValidate>
      <div className="mb-2 border-b border-line pb-5">
        <h2 className="font-display text-xl font-bold">Send us a message</h2>
        <p className="mt-1 text-sm text-ink-soft">We&apos;ll get back to you within one business day.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Full name *</label>
          <input id="name" name="name" required minLength={2} className="field" autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="email">Work email *</label>
          <input id="email" name="email" type="email" required className="field" autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" />
        </div>
        <div>
          <label className="label" htmlFor="company">Company</label>
          <input id="company" name="company" className="field" autoComplete="organization" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="interest">I am interested in</label>
        <select id="interest" name="interest" className="field" defaultValue={defaultInterest}>
          <option value="">Choose one</option>
          {interests.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="message">How can we help? *</label>
        <textarea id="message" name="message" rows={5} required minLength={10} className="field" placeholder="Tell us about your goal, team size or timeline." />
      </div>

      {/* Honeypot field for bots. Hidden from people. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {state.status === "error" && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{state.error}</p>}

      <button className="btn btn-primary w-full" disabled={state.status === "loading"}>
        {state.status === "loading" ? <><Loader2 className="animate-spin" size={16} /> Sending</> : "Send message"}
      </button>
      <p className="text-center text-xs text-ink-soft">We only use your details to reply to this enquiry.</p>
    </form>
  );
}

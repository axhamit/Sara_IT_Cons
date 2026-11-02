"use client";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function EmployerForm() {
  const [state, setState] = useState({ status: "idle", error: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), type: "employer", interest: "Hire IT talent for my company" };
    setState({ status: "loading", error: "" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not send your request.");
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
        <h3 className="mt-4 text-2xl font-bold">Request received.</h3>
        <p className="mt-2 text-ink-soft">A recruiter will call or email you within one business day to understand the roles.</p>
        <button className="btn btn-ghost mt-6" onClick={() => setState({ status: "idle", error: "" })}>Submit another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-lg shadow-ink/[0.05] sm:p-9" noValidate>
      <div className="mb-2 border-b border-line pb-5">
        <h3 className="font-display text-xl font-bold">Request a hiring consultation</h3>
        <p className="mt-1 text-sm text-ink-soft">Tell us a little about your team and hiring needs.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className="label" htmlFor="e-name">Your name *</label><input id="e-name" name="name" required minLength={2} className="field" autoComplete="name" /></div>
        <div><label className="label" htmlFor="e-email">Work email *</label><input id="e-email" name="email" type="email" required className="field" autoComplete="email" /></div>
        <div><label className="label" htmlFor="e-phone">Phone</label><input id="e-phone" name="phone" type="tel" className="field" autoComplete="tel" /></div>
        <div><label className="label" htmlFor="e-company">Company *</label><input id="e-company" name="company" required className="field" autoComplete="organization" /></div>
        <div><label className="label" htmlFor="e-roles">Roles you need</label><input id="e-roles" name="roles" className="field" placeholder="Java developer, DevOps engineer" /></div>
        <div><label className="label" htmlFor="e-count">Number of hires</label><input id="e-count" name="headcount" className="field" placeholder="5" /></div>
      </div>
      <div>
        <label className="label" htmlFor="e-msg">Requirements *</label>
        <textarea id="e-msg" name="message" rows={4} required minLength={10} className="field" placeholder="Skills, experience, location, budget and when you need them to join." />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {state.status === "error" && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{state.error}</p>}
      <button className="btn btn-primary w-full" disabled={state.status === "loading"}>
        {state.status === "loading" ? <><Loader2 className="animate-spin" size={16} /> Sending</> : "Request talent"}
      </button>
    </form>
  );
}

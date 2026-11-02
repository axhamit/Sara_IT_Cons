"use client";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const MAX_BYTES = 1024 * 1024;

export default function ApplyForm({ jobId = "", jobTitle = "" }) {
  const [state, setState] = useState({ status: "idle", error: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd);
    const file = fd.get("resumeFile");
    delete data.resumeFile;
    setState({ status: "loading", error: "" });
    try {
      if (file && file.size > 0) {
        if (file.size > MAX_BYTES) throw new Error("Resume is larger than 1 MB. Compress it or paste a link instead.");
        data.resume = await new Promise((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result);
          r.onerror = () => reject(new Error("Could not read the resume file."));
          r.readAsDataURL(file);
        });
        data.resumeName = file.name;
      }
      const res = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, jobId }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not submit your application.");
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
        <h3 className="mt-4 text-2xl font-bold">Application received.</h3>
        <p className="mt-2 text-ink-soft">If your profile matches, a recruiter will contact you within a few days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-lg shadow-ink/[0.05] sm:p-9" noValidate>
      <div className="border-b border-line pb-5">
        <h3 className="text-xl font-bold">{jobTitle ? `Apply for ${jobTitle}` : "Submit your resume"}</h3>
        <p className="mt-1 text-sm text-ink-soft">Share your details and our recruitment team will be in touch.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className="label" htmlFor="a-name">Full name *</label><input id="a-name" name="name" required className="field" autoComplete="name" /></div>
        <div><label className="label" htmlFor="a-email">Email *</label><input id="a-email" name="email" type="email" required className="field" autoComplete="email" /></div>
        <div><label className="label" htmlFor="a-phone">Phone *</label><input id="a-phone" name="phone" type="tel" required className="field" autoComplete="tel" /></div>
        <div><label className="label" htmlFor="a-exp">Total experience</label><input id="a-exp" name="experience" className="field" placeholder="4 years" /></div>
        <div><label className="label" htmlFor="a-co">Current company</label><input id="a-co" name="currentCompany" className="field" autoComplete="organization" /></div>
        <div><label className="label" htmlFor="a-notice">Notice period</label><input id="a-notice" name="noticePeriod" className="field" placeholder="30 days" /></div>
      </div>
      <div>
        <label className="label" htmlFor="a-file">Resume (PDF or Word, up to 1 MB) *</label>
        <input id="a-file" name="resumeFile" type="file" accept=".pdf,.doc,.docx" className="w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-cobalt/[0.08] file:px-4 file:py-2.5 file:font-semibold file:text-cobalt hover:file:bg-cobalt/[0.13]" />
        <input name="resumeUrl" className="field mt-2" placeholder="Or paste a link (Google Drive, LinkedIn)" aria-label="Resume link" />
      </div>
      <div><label className="label" htmlFor="a-msg">Anything else we should know?</label><textarea id="a-msg" name="message" rows={3} className="field" /></div>
      <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {state.status === "error" && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{state.error}</p>}
      <button className="btn btn-primary w-full" disabled={state.status === "loading"}>
        {state.status === "loading" ? <><Loader2 className="animate-spin" size={16} /> Submitting</> : "Submit application"}
      </button>
      <p className="text-center text-xs text-ink-soft">We use your details only for recruitment and will not share them without your consent.</p>
    </form>
  );
}

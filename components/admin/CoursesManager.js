"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const statuses = ["Open", "Few seats left", "Waitlist", "Closed"];

function CourseForm({ course }) {
  const [form, setForm] = useState({
    price: course.price, nextBatch: course.nextBatch, duration: course.duration, mode: course.mode, enrolment: course.enrolment || "Open",
  });
  const [state, setState] = useState({ busy: false, msg: "", err: false });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  async function save(e) {
    e.preventDefault();
    setState({ busy: true, msg: "", err: false });
    const res = await fetch("/api/admin/courses", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: course.slug, ...form }) });
    const json = await res.json().catch(() => ({}));
    setState({ busy: false, msg: res.ok ? "Saved. The website updates within a minute." : json.error || "Could not save.", err: !res.ok });
  }

  return (
    <form onSubmit={save} className="rounded-2xl border border-line bg-white p-6">
      <h2 className="text-xl font-semibold">{course.title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[["price", "Fee (e.g. Rs. 1,25,000 + GST)"], ["nextBatch", "Next batch (e.g. 15 Dec 2026)"], ["duration", "Duration"], ["mode", "Format"]].map(([k, label]) => (
          <div key={k}>
            <label className="label" htmlFor={`${course.slug}-${k}`}>{label}</label>
            <input id={`${course.slug}-${k}`} className="field" value={form[k]} onChange={(e) => set(k, e.target.value)} />
          </div>
        ))}
        <div>
          <label className="label" htmlFor={`${course.slug}-en`}>Enrolment status</label>
          <select id={`${course.slug}-en`} className="field" value={form.enrolment} onChange={(e) => set("enrolment", e.target.value)}>
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button className="btn btn-primary" disabled={state.busy}>{state.busy ? <Loader2 className="animate-spin" size={16} /> : "Save changes"}</button>
        {state.msg && <p className={`text-sm ${state.err ? "text-red-600" : "text-teal"}`} role="status">{state.msg}</p>}
      </div>
    </form>
  );
}

export default function CoursesManager({ courses }) {
  return <div className="mt-6 space-y-6">{courses.map((c) => <CourseForm key={c.slug} course={c} />)}</div>;
}

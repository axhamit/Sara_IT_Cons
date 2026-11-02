"use client";
import { useMemo, useState } from "react";
import { Download, Search, Trash2 } from "lucide-react";

const statuses = ["new", "contacted", "qualified", "closed"];
const fmt = (d) => new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function LeadsTable({ initial }) {
  const [leads, setLeads] = useState(initial);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);

  const shown = useMemo(() => {
    const s = q.toLowerCase();
    return leads.filter((l) => (filter === "all" || l.status === filter) &&
      (!s || [l.name, l.email, l.company, l.interest, l.message].join(" ").toLowerCase().includes(s)));
  }, [leads, q, filter]);

  async function update(id, patch) {
    const res = await fetch(`/api/admin/leads/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    if (res.ok) {
      const { item } = await res.json();
      setLeads((p) => p.map((l) => (l._id === id ? JSON.parse(JSON.stringify(item)) : l)));
    } else alert("Could not update this enquiry.");
  }

  async function remove(id) {
    if (!confirm("Delete this enquiry permanently?")) return;
    const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    if (res.ok) setLeads((p) => p.filter((l) => l._id !== id));
  }

  function exportCsv() {
    const cols = ["createdAt", "name", "email", "phone", "company", "interest", "status", "message"];
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...shown.map((l) => cols.map((c) => esc(l[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "enquiries.csv";
    a.click();
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="absolute left-3 top-3 text-ink-soft" />
          <input className="field pl-9" placeholder="Search name, email, company or message" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search enquiries" />
        </div>
        <select className="field !w-auto" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
          <option value="all">All statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={exportCsv} className="btn btn-ghost !py-2.5"><Download size={16} /> Export CSV</button>
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-ink-soft">No enquiries match. New form submissions will appear here.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {shown.map((l) => (
            <li key={l._id} className="rounded-2xl border border-line bg-white">
              <div className="flex flex-wrap items-center gap-3 p-4">
                <button className="min-w-0 flex-1 text-left" onClick={() => setOpen(open === l._id ? null : l._id)} aria-expanded={open === l._id}>
                  <p className="font-semibold">{l.name} <span className="font-normal text-ink-soft">{l.company && `, ${l.company}`}</span></p>
                  <p className="truncate text-sm text-ink-soft">{l.type === "employer" ? "Hiring request" : l.interest || "General enquiry"}</p>
                  <p className="text-xs text-ink-soft" suppressHydrationWarning>{fmt(l.createdAt)}</p>
                </button>
                <select className="field !w-auto !py-1.5" value={l.status} onChange={(e) => update(l._id, { status: e.target.value })} aria-label={`Status for ${l.name}`}>
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => remove(l._id)} className="rounded-md p-2 text-red-600 hover:bg-red-50" aria-label={`Delete enquiry from ${l.name}`}><Trash2 size={17} /></button>
              </div>
              {open === l._id && (
                <div className="space-y-3 border-t border-line bg-paper p-4 text-sm">
                  {(l.roles || l.headcount) && <p className="text-ink-soft">Roles: <span className="text-ink">{l.roles || "n/a"}</span>, hires: <span className="text-ink">{l.headcount || "n/a"}</span></p>}
                  <p className="whitespace-pre-wrap">{l.message}</p>
                  <p className="text-ink-soft">
                    <a className="text-cobalt hover:underline" href={`mailto:${l.email}`}>{l.email}</a>
                    {l.phone && <> &nbsp;|&nbsp; <a className="text-cobalt hover:underline" href={`tel:${l.phone}`}>{l.phone}</a></>}
                  </p>
                  <label className="label" htmlFor={`n-${l._id}`}>Internal notes</label>
                  <textarea id={`n-${l._id}`} className="field" rows={2} defaultValue={l.notes} onBlur={(e) => e.target.value !== (l.notes || "") && update(l._id, { notes: e.target.value })} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

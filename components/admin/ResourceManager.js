"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

const MAX_IMAGE_BYTES = 300 * 1024;

export default function ResourceManager({ resource, singular, initial, fields, renderItem, emptyText }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, item = edit
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const defaults = Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? true : f.type === "number" ? 0 : f.type === "select" ? f.options[0] : ""]));
  const set = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  function openForm(item) {
    setForm({ ...defaults, ...(item || {}) });
    setEditing(item || {});
    setError("");
  }

  function onImage(name, file) {
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) return setError("Image is larger than 300 KB. Compress it or paste an image URL instead.");
    setError("");
    const r = new FileReader();
    r.onload = () => set(name, r.result);
    r.readAsDataURL(file);
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const isNew = !editing._id;
    const res = await fetch(isNew ? `/api/admin/${resource}` : `/api/admin/${resource}/${editing._id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(json.error || "Could not save.");
    const item = JSON.parse(JSON.stringify(json.item));
    setItems((p) => (isNew ? [item, ...p] : p.map((i) => (i._id === item._id ? item : i))));
    setEditing(null);
  }

  async function remove(item) {
    if (!confirm(`Delete this ${singular}? It will disappear from the website.`)) return;
    const res = await fetch(`/api/admin/${resource}/${item._id}`, { method: "DELETE" });
    if (res.ok) setItems((p) => p.filter((i) => i._id !== item._id));
    else alert("Could not delete.");
  }

  return (
    <div className="mt-6">
      {!editing && <button className="btn btn-primary" onClick={() => openForm(null)}><Plus size={16} /> Add {singular}</button>}

      {editing && (
        <form onSubmit={save} className="space-y-4 rounded-2xl border border-line bg-white p-6">
          <h2 className="text-xl font-semibold">{editing._id ? `Edit ${singular}` : `Add ${singular}`}</h2>
          {fields.map((f) => (
            <div key={f.name}>
              {f.type === "checkbox" ? (
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input type="checkbox" checked={!!form[f.name]} onChange={(e) => set(f.name, e.target.checked)} /> {f.label}
                </label>
              ) : (
                <>
                  <label className="label" htmlFor={`f-${f.name}`}>{f.label}{f.required && " *"}</label>
                  {f.type === "select" ? (
                    <select id={`f-${f.name}`} className="field" value={form[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea id={`f-${f.name}`} className="field" rows={4} required={f.required} value={form[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
                  ) : f.type === "image" ? (
                    <div className="space-y-2">
                      <input id={`f-${f.name}`} className="field" placeholder="Paste an image URL (https://...)" value={String(form[f.name] || "").startsWith("data:") ? "" : form[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
                      <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="text-sm" onChange={(e) => onImage(f.name, e.target.files?.[0])} aria-label="Upload logo file" />
                      {form[f.name] && (
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={form[f.name]} alt="Logo preview" className="h-12 max-w-[160px] rounded border border-line bg-white object-contain p-1" />
                          <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => set(f.name, "")}>Remove image</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input id={`f-${f.name}`} className="field" type={f.type || "text"} required={f.required} value={form[f.name] ?? ""} onChange={(e) => set(f.name, f.type === "number" ? Number(e.target.value) : e.target.value)} />
                  )}
                  {f.help && <p className="mt-1 text-xs text-ink-soft">{f.help}</p>}
                </>
              )}
            </div>
          ))}
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
          <div className="flex gap-3">
            <button className="btn btn-primary" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={16} /> : "Save changes"}</button>
            <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      {items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-ink-soft">{emptyText}</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li key={item._id} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
              <div className="min-w-0 flex-1">{renderItem(item)}</div>
              {!item.visible && <span className="rounded-full bg-paper px-2.5 py-0.5 text-xs text-ink-soft">Hidden</span>}
              <button onClick={() => openForm(item)} className="rounded-md p-2 hover:bg-paper" aria-label={`Edit ${singular}`}><Pencil size={17} /></button>
              <button onClick={() => remove(item)} className="rounded-md p-2 text-red-600 hover:bg-red-50" aria-label={`Delete ${singular}`}><Trash2 size={17} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

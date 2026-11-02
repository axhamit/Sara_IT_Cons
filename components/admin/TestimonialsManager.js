"use client";
import ResourceManager from "./ResourceManager";

const fields = [
  { name: "name", label: "Person's name", required: true },
  { name: "role", label: "Job title" },
  { name: "company", label: "Company" },
  { name: "quote", label: "Quote", type: "textarea", required: true, help: "Up to 800 characters. Use a real quote with permission." },
  { name: "visible", label: "Show on website", type: "checkbox" },
];

export default function TestimonialsManager({ initial }) {
  return (
    <ResourceManager
      resource="testimonials"
      singular="testimonial"
      initial={initial}
      fields={fields}
      emptyText="No testimonials yet. Add one and it will show on the home page."
      renderItem={(t) => (
        <div>
          <p className="font-semibold">{t.name} <span className="font-normal text-ink-soft">{[t.role, t.company].filter(Boolean).join(", ")}</span></p>
          <p className="line-clamp-2 text-sm text-ink-soft">{t.quote}</p>
        </div>
      )}
    />
  );
}

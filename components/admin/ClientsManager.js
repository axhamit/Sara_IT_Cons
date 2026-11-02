"use client";
import ResourceManager from "./ResourceManager";

const fields = [
  { name: "name", label: "Company name", required: true },
  { name: "logo", label: "Logo", type: "image", help: "Upload a PNG, SVG or WebP up to 300 KB (transparent background works best), or paste a URL. Without a logo the company name is shown as text." },
  { name: "website", label: "Website (optional)", type: "url" },
  { name: "order", label: "Display order", type: "number", help: "Lower numbers appear first." },
  { name: "visible", label: "Show on website", type: "checkbox" },
];

export default function ClientsManager({ initial }) {
  return (
    <ResourceManager
      resource="clients"
      singular="client"
      initial={initial}
      fields={fields}
      emptyText="No clients yet. Add your first client and it will appear in the scrolling strip on the home page."
      renderItem={(c) => (
        <div className="flex items-center gap-4">
          {c.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.logo} alt="" className="h-10 w-24 rounded border border-line object-contain p-1" />
          ) : (
            <div className="flex h-10 w-24 items-center justify-center rounded border border-dashed border-line text-xs text-ink-soft">No logo</div>
          )}
          <p className="truncate font-semibold">{c.name}</p>
        </div>
      )}
    />
  );
}

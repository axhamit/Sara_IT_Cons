"use client";
import ResourceManager from "./ResourceManager";

const fields = [
  { name: "title", label: "Job title", required: true },
  { name: "client", label: "Hiring company", help: "Use Confidential to hide the client name." },
  { name: "location", label: "Location", help: "For example Bengaluru (hybrid) or Remote." },
  { name: "type", label: "Job type", type: "select", options: ["Full-time", "Contract", "Contract-to-hire", "Internship"] },
  { name: "experience", label: "Experience", help: "For example 3-5 years." },
  { name: "skills", label: "Key skills", help: "Separate with commas: Java, Spring Boot, AWS." },
  { name: "salary", label: "Salary or rate (optional)" },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "visible", label: "Open and visible on website", type: "checkbox" },
];

export default function JobsManager({ initial }) {
  return (
    <ResourceManager
      resource="jobs"
      singular="job"
      initial={initial}
      fields={fields}
      emptyText="No jobs yet. Add your first opening and it will appear on the Find jobs page."
      renderItem={(j) => (
        <div>
          <p className="font-semibold">{j.title} <span className="font-normal text-ink-soft">{j.client}</span></p>
          <p className="text-sm text-ink-soft">{[j.type, j.location, j.experience].filter(Boolean).join(", ")}</p>
        </div>
      )}
    />
  );
}

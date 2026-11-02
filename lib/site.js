// One place to rebrand the whole website.
export const site = {
  name: "Sara IT Consultancy",
  tagline: "IT recruitment, staffing and tech training",
  description:
    "Sara IT Consultancy connects IT companies with pre-screened engineers and helps tech professionals find the right role. We also run job-ready programs in Generative AI, Agentic AI and Applied AI Engineering.",
  email: "hello@talentbridge.in",
  phone: "+91 00000 00000",
  location: "Bengaluru, India",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  social: { linkedin: "https://linkedin.com", youtube: "https://youtube.com", x: "https://x.com" },
};

export const nav = [
  { href: "/employers", label: "Hire talent" },
  { href: "/jobs", label: "Find jobs" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const jobTypes = ["Full-time", "Contract", "Contract-to-hire", "Internship"];

export const interests = [
  "Hire IT talent for my company",
  "Looking for a job",
  "Advanced GenAI & Agentic AI course",
  "Applied AI Engineering Master's Certification",
  "Corporate training for my team",
  "Something else",
];

export const services = [
  {
    title: "Permanent hiring",
    short: "Pre-screened engineers, leads and managers for your full-time roles.",
    detail:
      "Share the role and we shortlist candidates who match on skills, experience, notice period and budget. You interview only people who are already vetted.",
    deliverables: ["Role and skills calibration call", "Technical and communication screening", "Shortlist with interview feedback", "Offer negotiation and joining follow-up"],
  },
  {
    title: "Contract and contract-to-hire staffing",
    short: "Add skilled people for a project or a trial period, fast.",
    detail:
      "Scale your team for a release, migration or support contract. We handle sourcing, onboarding paperwork and payroll, and you can convert strong contractors to permanent staff.",
    deliverables: ["Quick-start bench of available engineers", "Payroll and compliance handled by us", "Flexible contract length", "Option to convert to permanent"],
  },
  {
    title: "Bulk and campus hiring",
    short: "Hire 10, 50 or 200 people with one managed process.",
    detail:
      "We run drives end to end: sourcing, assessments, interview scheduling and offer tracking, with a single point of contact for your HR team.",
    deliverables: ["Online assessments and coding tests", "Interview scheduling and panel support", "Daily progress dashboards", "Offer-to-join tracking"],
  },
  {
    title: "Leadership and niche hiring",
    short: "Architects, engineering managers and hard-to-find specialists.",
    detail:
      "Confidential searches for senior and specialist roles such as AI/ML, cloud security, data platform and SRE, using direct outreach rather than job-board posting.",
    deliverables: ["Confidential, targeted search", "Market and salary benchmarking", "Reference and background checks", "Structured interview process"],
  },
  {
    title: "Train-to-hire programs",
    short: "Build your own talent pipeline from our courses.",
    detail:
      "Fund or co-design a cohort in our GenAI, Agentic AI or Applied AI Engineering programs and interview graduates before they reach the open market.",
    deliverables: ["Custom curriculum for your stack", "Progress reports and assessments", "First access to top graduates", "Optional on-site or online delivery"],
  },
];

export const howWeWork = [
  { title: "Understand", text: "A 30-minute call to capture the role, must-have skills, budget and timeline." },
  { title: "Source and screen", text: "We search our database and network, then screen for skills, communication and intent." },
  { title: "Shortlist and interview", text: "You receive vetted profiles with notes and we schedule interviews quickly." },
  { title: "Offer and onboard", text: "We manage negotiation and joining follow-up, and stay in touch after day one." },
];

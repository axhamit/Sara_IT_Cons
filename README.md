# Sara IT Consultancy: IT Recruitment, Staffing and Training Website

Next.js 14 (App Router) + Tailwind CSS + MongoDB (Mongoose). A public website for an IT recruitment consultancy that also sells two courses, with a password-protected admin panel.

## What is inside

Public pages: Home, Hire talent (services plus a hiring-request form), Find jobs (live job board), Job detail with apply form, Courses and two course detail pages, About, Contact, Privacy, 404, sitemap and robots.

Admin panel (`/admin`):
- Dashboard: new applications, new enquiries, open jobs, clients
- Jobs: add / edit / close / delete openings shown on the website
- Applications: candidates who applied, resume download (PDF/Word up to 1 MB) or link, status tracking, notes, CSV export
- Enquiries: contact-form messages and company hiring requests (status, notes, CSV export)
- Clients: logos shown in the "Companies we hire for" strip
- Testimonials
- Courses: fee, next batch date, format, enrolment status

## Setup (10 minutes)

1. Install Node.js 18.17+ and MongoDB (local) or create a free MongoDB Atlas cluster.
2. `npm install`
3. `cp .env.example .env.local` and fill in `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
4. `npm run seed` (creates the admin; add `-- --demo` for sample clients and jobs).
5. `npm run dev`, then open http://localhost:3000 and http://localhost:3000/admin.

## Make it yours

| What | Where |
|---|---|
| Company name, contact details, hiring services, process steps | `lib/site.js` |
| Course content (curriculum, outcomes, tools) | `lib/courses.js` |
| Colours and fonts | `tailwind.config.js`, `app/layout.js` |
| About page story | `app/(site)/about/page.js` |
| Privacy policy (placeholder, get legal review) | `app/(site)/privacy/page.js` |

The numbers in the home-page panel (120 sourced, 72 hours, 90-day replacement) are illustrative. Change them in `components/HiringPipeline.js` to match your real terms.

## Deploy

Vercel is simplest: push to GitHub, import the repo, add the environment variables, deploy. Use MongoDB Atlas. Run `npm run seed` once locally against the Atlas URI to create the admin.

## Known limits

- Resumes and logos are stored in MongoDB (resume max 1 MB, logo max 300 KB). For high volume move files to S3 or Cloudinary.
- The form rate limit is in-memory per server instance.
- No email notifications or payments yet.

## Next steps

Email alerts for new applications and hiring requests (Resend / Nodemailer), candidate email templates, Razorpay or Stripe for course fees, blog and case studies, analytics, cookie banner, multiple admin users with roles, GDPR/DPDP consent and data-deletion workflow for candidate data.

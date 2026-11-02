import { site } from "@/lib/site";
import { courses } from "@/lib/courses";
export default function sitemap() {
  const pages = ["", "/employers", "/jobs", "/courses", "/about", "/contact", "/privacy"].map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
  const cs = courses.map((c) => ({ url: `${site.url}/courses/${c.slug}`, lastModified: new Date() }));
  return [...pages, ...cs];
}

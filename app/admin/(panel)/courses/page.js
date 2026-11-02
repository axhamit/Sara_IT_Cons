import { getCourses } from "@/lib/data";
import CoursesManager from "@/components/admin/CoursesManager";

export const dynamic = "force-dynamic";

export default async function CoursesAdmin() {
  const courses = await getCourses();
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold">Courses</h1>
      <p className="mt-1 text-ink-soft">Update fee, next batch date, format and enrolment status. To change the curriculum, edit <code>lib/courses.js</code>.</p>
      <CoursesManager courses={courses} />
    </div>
  );
}

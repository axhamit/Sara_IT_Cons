import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  await connectDB();
  const items = JSON.parse(JSON.stringify(await Testimonial.find().sort({ createdAt: -1 }).lean()));
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold">Testimonials</h1>
      <p className="mt-1 text-ink-soft">Quotes from clients and learners, shown on the home page.</p>
      <TestimonialsManager initial={items} />
    </div>
  );
}

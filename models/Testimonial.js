import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, trim: true, default: "", maxlength: 120 },
    company: { type: String, trim: true, default: "", maxlength: 120 },
    quote: { type: String, required: true, trim: true, maxlength: 800 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

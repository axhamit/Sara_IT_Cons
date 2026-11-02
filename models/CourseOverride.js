import mongoose from "mongoose";

// Lets admins change price / dates / status of the two courses without touching code.
const CourseOverrideSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    price: { type: String, trim: true, default: "" },
    nextBatch: { type: String, trim: true, default: "" },
    duration: { type: String, trim: true, default: "" },
    mode: { type: String, trim: true, default: "" },
    enrolment: { type: String, enum: ["Open", "Few seats left", "Waitlist", "Closed"], default: "Open" },
  },
  { timestamps: true }
);

export default mongoose.models.CourseOverride || mongoose.model("CourseOverride", CourseOverrideSchema);

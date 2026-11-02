import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    client: { type: String, trim: true, default: "Confidential", maxlength: 140 },
    location: { type: String, trim: true, default: "", maxlength: 140 },
    type: { type: String, enum: ["Full-time", "Contract", "Contract-to-hire", "Internship"], default: "Full-time" },
    experience: { type: String, trim: true, default: "", maxlength: 60 },
    skills: { type: String, trim: true, default: "", maxlength: 400 },
    salary: { type: String, trim: true, default: "", maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 6000 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);

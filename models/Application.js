import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null },
    jobTitle: { type: String, trim: true, default: "General application", maxlength: 140 },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, default: "", maxlength: 40 },
    experience: { type: String, trim: true, default: "", maxlength: 40 },
    currentCompany: { type: String, trim: true, default: "", maxlength: 160 },
    noticePeriod: { type: String, trim: true, default: "", maxlength: 60 },
    message: { type: String, trim: true, default: "", maxlength: 3000 },
    resume: { type: String, default: "", maxlength: 1500000 },
    resumeName: { type: String, default: "", maxlength: 200 },
    hasResume: { type: Boolean, default: false },
    resumeUrl: { type: String, trim: true, default: "", maxlength: 500 },
    status: { type: String, enum: ["new", "screening", "shortlisted", "placed", "rejected"], default: "new" },
    notes: { type: String, trim: true, default: "", maxlength: 4000 },
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);

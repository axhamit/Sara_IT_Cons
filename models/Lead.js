import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    company: { type: String, trim: true, maxlength: 160, default: "" },
    type: { type: String, enum: ["general", "employer"], default: "general" },
    roles: { type: String, trim: true, maxlength: 400, default: "" },
    headcount: { type: String, trim: true, maxlength: 40, default: "" },
    interest: { type: String, trim: true, maxlength: 160, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    status: { type: String, enum: ["new", "contacted", "qualified", "closed"], default: "new" },
    notes: { type: String, trim: true, maxlength: 4000, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

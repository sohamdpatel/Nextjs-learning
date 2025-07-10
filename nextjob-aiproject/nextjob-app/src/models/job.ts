// models/Job.ts
import mongoose, { Schema, Document } from "mongoose";

export interface JobDocument extends Document {
  title: string;
  company: string;
  location: string;
  type: string;
}

const JobSchema = new Schema<JobDocument>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
});

export const Job = mongoose.models.Job || mongoose.model<JobDocument>("Job", JobSchema);

// app/api/jobs/route.ts
import { connectDB } from "../../../lib/db";
import { Job } from "../../../models/job";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const jobs = await Job.find();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const job = await Job.create(body);
  return NextResponse.json(job);
}

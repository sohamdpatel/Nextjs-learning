// app/jobs/page.tsx
import { Job } from "../../models/job";
import { connectDB } from "../../lib/db";

export default async function JobsPage() {
  await connectDB();
  const jobs = await Job.find();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <strong>{job.title}</strong> at {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
}

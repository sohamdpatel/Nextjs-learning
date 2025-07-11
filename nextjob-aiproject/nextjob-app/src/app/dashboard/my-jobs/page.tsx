// app/dashboard/my-jobs/page.tsx
import MyJobsPageClient from './MyJobsPageClient'
import { connectDB } from '../../../lib/db'
import { Job } from '../../../models/job'

export default async function MyJobsPage() {
  await connectDB()
  const jobs = await Job.find().sort({ createdAt: -1 }).limit(10).lean()
  return <MyJobsPageClient  />
}

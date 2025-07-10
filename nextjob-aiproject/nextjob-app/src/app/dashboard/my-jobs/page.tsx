// app/dashboard/my-jobs/page.tsx

import MyJobsPageClient from './MyJobsPageClient'
import {Job} from '../../../models/job' // make sure Job.ts is defined
import {connectDB} from '../../../lib/db' // ensure connectDB is defined

export default async function MyJobsPage() {
  await connectDB()

  const jobs = await Job.find().sort({ createdAt: -1 }).lean()
  console.log('Fetched jobs from my-jobs:', jobs);
  

  return <MyJobsPageClient jobs={JSON.parse(JSON.stringify(jobs))} />
}

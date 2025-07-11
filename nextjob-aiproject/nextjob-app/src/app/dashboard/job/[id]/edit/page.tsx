import { notFound } from 'next/navigation'
import EditJobForm from '../../../../../components/EditJobForm'
import { connectDB } from '../../../../../lib/db'
import {Job} from '../../../../../models/job'
import { Types } from 'mongoose'

interface EditPageProps {
  params: { id: string }
}

// Define the expected job structure
interface JobType {
  _id: Types.ObjectId
  title: string
  company: string
  location: string
  type: string
}

export default async function EditJobPage({ params }:{ params: Promise<{ id: string }> }) {
    console.log('EditJobPage params:', params)
  await connectDB()
  const { id } = await params

console.log('EditJobPage id:', id)
  const job = (await Job.findById(id).lean()) as JobType | null
console.log('EditJobPage job:', job)
  if (!job) return notFound()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <EditJobForm job={{ ...job, _id: job._id.toString() }} />
    </div>
  )
}
    
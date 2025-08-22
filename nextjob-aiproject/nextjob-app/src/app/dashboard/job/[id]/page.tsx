import { notFound } from 'next/navigation'
import {Job} from '../../../../models/job'
import {connectDB} from '../../../../lib/db'
import ClientJobDetail from '../../../../components/ClientJobDetail'


export default async function JobDetailPage({ params }: { params: Promise<{id: string}> }) {
  await connectDB()
  const { id } = await params
  const job = await Job.findById(id).lean()

  if (!job) return notFound()

  return <ClientJobDetail job={JSON.parse(JSON.stringify(job))} />
  
}

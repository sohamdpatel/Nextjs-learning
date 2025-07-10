'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTransition } from 'react'

export default function ClientJobDetail({ job }: { job: any }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this job?')
    if (!confirmed) return

    const res = await fetch(`/api/jobs/${job._id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.push('/dashboard/my-jobs')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/dashboard/job/${job.id}/edit`}
            className="text-sm text-blue-600 underline"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 underline"
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm">
        {job.company} • {job.location}
      </p>

      <div className="mt-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
          {job.type}
        </span>
      </div>

      <div className="mt-6 text-gray-800">
        <p className="leading-relaxed">
          This is a placeholder job description.
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Job = {
  _id: string
  title: string
  company: string
  type: string
}

export default function MyJobsPageClient({ jobs }: { jobs: Job[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs)

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase()

    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowerSearch) ||
      job.company.toLowerCase().includes(lowerSearch) ||
      job.type.toLowerCase().includes(lowerSearch)
    )

    setFilteredJobs(results)
  }, [searchTerm, jobs])

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this job?')
    if (!confirmed) return

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        // Remove deleted job from local state
        setFilteredJobs((prev) => prev.filter((job) => job._id !== id))
      } else {
        console.error('Failed to delete job')
      }
    } catch (error) {
      console.error('Error deleting job:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Jobs</h1>

      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      />

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        <ul>
          {filteredJobs.map((job) => (
            <li key={job._id} className="border p-4 rounded mb-4">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600 text-sm">{job.company}</p>
              <div className="flex gap-4 mt-2">
                <Link
                  href={`/dashboard/job/${job._id}`}
                  className="text-blue-600 text-sm"
                >
                  View
                </Link>
                <Link
                  href={`/dashboard/job/${job._id}/edit`}
                  className="text-green-600 text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

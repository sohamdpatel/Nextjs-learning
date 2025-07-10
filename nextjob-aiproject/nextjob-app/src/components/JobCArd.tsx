import React from 'react'

type Job = {
  id: string
  title: string
  company: string
  location: string
  type: string
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="border rounded-2xl p-5 shadow-md hover:shadow-lg transition bg-white">
      <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
      <p className="text-gray-700">{job.company} • {job.location}</p>
      <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
        {job.type}
      </span>
    </div>
  )
}

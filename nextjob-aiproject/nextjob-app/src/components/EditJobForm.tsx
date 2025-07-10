'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditJobForm({ job }: { job: any }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting form with data:', formData)
    const res = await fetch(`/api/jobs/${job._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    console.log('Response:', res);
    

    if (res.ok) {
      router.push('/dashboard/my-jobs')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Job title"
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="border p-2 rounded w-full"
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Remote">Remote</option>
        <option value="Internship">Internship</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Job
      </button>
    </form>
  )
}

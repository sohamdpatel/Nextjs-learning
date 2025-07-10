'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PostJobPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('full-time')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !company || !location || !type) {
      alert("All fields are required.")
      return
    }

    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, company, location, type }),
    })

    const data = await res.json()
    console.log("Job posted:", data)
    router.push('/dashboard/my-jobs')
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job title"
          className="w-full p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company name"
          className="w-full p-2 border"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          value={type}
          className="w-full p-2 border"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  )
}

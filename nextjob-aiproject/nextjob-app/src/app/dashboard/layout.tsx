'use client'

import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = async () => {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
  })
  console.log('Logout response:', res);
  
  if (res.ok) {
    router.push('/')
  } else {
    console.error('Logout failed')
    // optionally show a toast or message here
  }
}


  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">NextJob</h2>
          <nav className="space-y-2">
            <Link href="/dashboard" className="block hover:text-blue-400">
              🏠 Dashboard
            </Link>
            <Link href="/dashboard/post-job" className="block hover:text-blue-400">
              📝 Post Job
            </Link>
            <Link href="/dashboard/my-jobs" className="block hover:text-blue-400">
              📁 My Jobs
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          🔓 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="p-8 bg-gray-100">{children}</main>
    </div>
  )
}

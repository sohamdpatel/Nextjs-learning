'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


interface AuthFormProps {
  type: 'login' | 'register'
}

export default function AuthForm({ type }: AuthFormProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload =
      type === 'register'
        ? { username, email, password }
        : { email, password }

    const res = await fetch(`/api/auth/${type}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || 'Something went wrong')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 space-y-4 border shadow rounded">
      <h1 className="text-2xl font-bold">{type === 'login' ? 'Login' : 'Register'}</h1>

      {type === 'register' && (
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {type === 'login' ? 'Login' : 'Register'}
      </button>

      <p className="text-sm text-center mt-2">
        {type === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </>
        )}
      </p>
    </form>
  )
}

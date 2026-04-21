'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        setError('Invalid credentials')
        return
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-[#FF3333]/10 border border-[#FF3333]/30 rounded-lg p-3 text-[#FF3333] text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#f0f0f0]">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
          placeholder="admin"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#f0f0f0]">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
          placeholder="••••••"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] disabled:opacity-50 transition-colors"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

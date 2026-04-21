'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        setError(errorData.error || 'Failed to subscribe')
        setLoading(false)
        return
      }

      setSuccess(true)
      setEmail('')
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-md mx-auto">
        <div className="relative">
          {/* Neon glow background effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          
          {/* Main card */}
          <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-amber-500/30 rounded-lg p-8 space-y-6">
            {/* Heading */}
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Follow the <span className="text-amber-400">$1M</span> Journey.
              </h2>
              <p className="text-sm text-zinc-400">
                Get weekly updates on the trading challenge. Join the 0.1%.
              </p>
            </div>

            {/* Success message */}
            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm font-medium">
                  ✓ Welcome aboard! Check your email to confirm.
                </p>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-amber-500/30 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all disabled:opacity-50"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </span>
                ) : (
                  'Join the 0.1%'
                )}
              </button>

              {/* Form footer */}
              <p className="text-xs text-zinc-500 text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>

              {/* Social proof */}
              <p className="text-xs text-zinc-600 text-center pt-2 border-t border-zinc-800">
                Join 5,000+ traders tracking the million-dollar move.
              </p>
            </form>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

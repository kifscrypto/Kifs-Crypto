'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { JourneyStats } from '@/lib/db'

interface Props {
  initialData: JourneyStats
}

export default function AdminJourneyStatsForm({ initialData }: Props) {
  const [formData, setFormData] = useState({
    starting_balance: initialData.starting_balance,
    current_balance: initialData.current_balance,
    target_balance: initialData.target_balance,
    current_exchange: initialData.current_exchange,
    week: initialData.week,
    percent_gain: initialData.percent_gain,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    console.log('[v0] Journey stats form submit started')

    try {
      console.log('[v0] Sending PUT request with data:', formData)

      const res = await fetch('/api/journey-stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      console.log('[v0] Response status:', res.status)

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error('[v0] Journey stats update failed:', res.status, errorData)
        setError(errorData.error || `Failed to update stats (${res.status})`)
        setLoading(false)
        return
      }

      const result = await res.json()
      console.log('[v0] Journey stats updated successfully:', result)

      setSuccess('Stats updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
      setLoading(false)
    } catch (err) {
      console.error('[v0] Journey stats update error:', err)
      setError(err instanceof Error ? err.message : 'Failed to update stats')
      setLoading(false)
    }
  }

  const percentageToTarget = ((formData.current_balance / formData.target_balance) * 100).toFixed(2)

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-8 space-y-6">
      {error && (
        <div className="bg-[#FF3333]/10 border border-[#FF3333]/30 rounded-lg p-3 text-[#FF3333] text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg p-3 text-[#10b981] text-sm">
          {success}
        </div>
      )}

      {/* Current Progress Indicator */}
      <div className="bg-[#1f2937] rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#9ca3af] text-sm">Progress to Goal</span>
          <span className="text-[#FFA500] font-semibold">{percentageToTarget}%</span>
        </div>
        <div className="w-full bg-[#080808] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#FFA500] h-full transition-all duration-300"
            style={{ width: `${Math.min(parseFloat(percentageToTarget), 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-[#6b7280] pt-2">
          <span>${formData.starting_balance.toLocaleString()}</span>
          <span>${formData.target_balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Starting Balance ($)
          </label>
          <input
            type="number"
            step="0.01"
            name="starting_balance"
            value={formData.starting_balance}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Current Balance ($) *
          </label>
          <input
            type="number"
            step="0.01"
            name="current_balance"
            value={formData.current_balance}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Target Balance ($)
          </label>
          <input
            type="number"
            step="0.01"
            name="target_balance"
            value={formData.target_balance}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Current Exchange
          </label>
          <input
            type="text"
            name="current_exchange"
            value={formData.current_exchange}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
            placeholder="BYDFi"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Week
          </label>
          <input
            type="number"
            name="week"
            value={formData.week}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Gain/Loss (%)
          </label>
          <input
            type="number"
            step="0.01"
            name="percent_gain"
            value={formData.percent_gain}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] disabled:opacity-50 transition-colors"
      >
        {loading ? 'Updating...' : 'Update Stats'}
      </button>
    </form>
  )
}

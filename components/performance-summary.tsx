'use client'

import { useEffect, useState } from 'react'

interface PerformanceData {
  subscribers: number
  paid_subscribers: number
  total_subscribers: number
}

export default function PerformanceSummary() {
  const [subscriptionData, setSubscriptionData] = useState<PerformanceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPerformance() {
      try {
        setLoading(true)
        const res = await fetch('/api/admin/performance-summary')

        if (res.ok) {
          const subData = await res.json()
          setSubscriptionData(subData)
        }
      } catch (err) {
        console.error('[v0] Error fetching performance:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPerformance()
    // Refresh every 5 minutes
    const interval = setInterval(fetchPerformance, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 bg-zinc-800 rounded-lg animate-pulse" />
      </div>
    )
  }

  if (!subscriptionData) {
    return (
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 text-xs">
        <p className="text-amber-400/80">
          Newsletter data unavailable
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Newsletter Growth</h3>
      
      {/* Total Subscribers Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-amber-500/50 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-zinc-400 text-sm font-medium">Total Subscribers</p>
            <p className="text-3xl font-bold text-amber-400 mt-1">
              {subscriptionData?.total_subscribers || 0}
            </p>
          </div>
          <div className="text-amber-500/40 text-4xl">📧</div>
        </div>
      </div>

      {/* Subscriber Breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-zinc-400 text-xs uppercase tracking-widest">Free</p>
          <p className="text-lg font-bold text-white mt-1">{subscriptionData?.subscribers || 0}</p>
        </div>
        {subscriptionData?.paid_subscribers > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-zinc-400 text-xs uppercase tracking-widest">Paid</p>
            <p className="text-lg font-bold text-green-400 mt-1">{subscriptionData.paid_subscribers}</p>
          </div>
        )}
      </div>

      {/* Insight */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 text-xs">
        <p className="text-amber-400/80">
          Track newsletter growth alongside Challenge Stats to see community engagement correlation.
        </p>
      </div>
    </div>
  )
}

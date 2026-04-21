'use client'

import { JourneyStats } from '@/lib/db'

interface JourneyTrackerProps {
  data: JourneyStats | {
    starting_balance: number
    current_balance: number
    target_balance: number
    current_exchange: string
    week: number
    percent_gain: number
  }
}

export default function JourneyTracker({ data }: JourneyTrackerProps) {
  // Ensure all required fields have safe defaults and correct types
  const safeData = {
    starting_balance: Number(data?.starting_balance) || 1000,
    current_balance: Number(data?.current_balance) || 1247.50,
    target_balance: Number(data?.target_balance) || 1000000,
    current_exchange: String(data?.current_exchange || 'BYDFi'),
    week: Number(data?.week) || 1,
    percent_gain: Number(data?.percent_gain) || 24.75,
  }

  const progressPercent = (safeData.current_balance / safeData.target_balance) * 100
  
  return (
    <div className="w-full bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-2">
          The Journey
        </h2>
        <p className="text-sm text-[#9ca3af]">
          Real money. Real updates. Every week documented.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {/* Starting Balance */}
        <div className="bg-[#080808] border border-[#1f2937] rounded p-4">
          <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-2">
            Starting Balance
          </p>
          <p className="text-lg sm:text-xl font-bold text-[#f0f0f0]">
            ${safeData.starting_balance.toLocaleString()}
          </p>
        </div>

        {/* Current Balance */}
        <div className="bg-[#080808] border border-[#FFA500]/20 rounded p-4">
          <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-2">
            Current Balance
          </p>
          <p className="text-lg sm:text-xl font-bold text-[#FFA500]">
            ${safeData.current_balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Current Exchange */}
        <div className="bg-[#080808] border border-[#1f2937] rounded p-4">
          <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-2">
            Exchange
          </p>
          <p className="text-lg sm:text-xl font-bold text-[#f0f0f0]">
            {safeData.current_exchange}
          </p>
        </div>

        {/* Week */}
        <div className="bg-[#080808] border border-[#1f2937] rounded p-4">
          <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-2">
            Week
          </p>
          <p className="text-lg sm:text-xl font-bold text-[#f0f0f0]">
            {safeData.week}
          </p>
        </div>
      </div>

      {/* Percentage Gain */}
      <div className="mb-8 bg-[#080808] border border-[#1f2937] rounded p-4">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-xs text-[#6b7280] uppercase tracking-wide">
            Total Gain
          </span>
          <span className={`text-2xl font-bold ${safeData.percent_gain >= 0 ? 'text-[#10b981]' : 'text-[#FF3333]'}`}>
            {safeData.percent_gain >= 0 ? '+' : ''}{safeData.percent_gain.toFixed(2)}%
          </span>
        </div>
        <p className="text-xs text-[#9ca3af]">
          From ${safeData.starting_balance.toLocaleString()} to ${safeData.current_balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      {/* Progress Bar to $1M */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-[#9ca3af]">
            Progress to $1,000,000
          </span>
          <span className="text-xs font-mono text-[#FFA500]">
            {progressPercent.toFixed(2)}%
          </span>
        </div>
        <div className="w-full h-2 bg-[#1f2937] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFA500] to-[#FF3333] rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#6b7280] font-mono">
          <span>$0</span>
          <span>$1,000,000</span>
        </div>
      </div>
    </div>
  )
}

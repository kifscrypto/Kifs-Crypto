'use client'

import { motion } from 'framer-motion'
import NewsletterSignup from './newsletter-signup'

interface PulseCalloutProps {
  currentBalance?: number
  targetBalance?: number
  percentComplete?: number
}

export default function PulseCallout({
  currentBalance = 1247.50,
  targetBalance = 1000000,
  percentComplete = 0.16,
}: PulseCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-12 rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 p-8 overflow-hidden relative"
    >
      {/* Animated background gradient */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(45deg, transparent 25%, rgba(255, 165, 0, 0.1) 25%, rgba(255, 165, 0, 0.1) 50%, transparent 50%, transparent 75%, rgba(255, 165, 0, 0.1) 75%, rgba(255, 165, 0, 0.1))',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-amber-500"
            />
            <h3 className="text-lg font-bold text-amber-400">Live Challenge Progress</h3>
          </div>
          <p className="text-sm text-zinc-400">
            Follow the real-time journey from $1,000 to $1,000,000
          </p>
        </div>

        {/* Progress display */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Current Balance</p>
              <p className="text-3xl font-bold font-mono text-emerald-400">
                ${currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Target</p>
              <p className="text-2xl font-bold font-mono text-zinc-400">
                ${targetBalance.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentComplete * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50"
              />
            </div>
            <p className="text-xs text-zinc-400">
              {(percentComplete * 100).toFixed(2)}% Complete
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-amber-500/20">
          <p className="text-xs text-zinc-500 mb-4">
            Get weekly updates on every trade, every win, and every lesson learned.
          </p>
          <div className="max-w-sm">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
    </motion.div>
  )
}

'use client'

import { useState } from 'react'

export default function RunMigrationButton() {
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [results, setResults] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  async function handleRun() {
    if (!window.confirm('Run the CMS database migration?\n\nSafe to run multiple times — uses IF NOT EXISTS.')) return
    setStatus('running')
    setResults([])
    setErrorMsg('')
    try {
      const res = await fetch('/api/admin/migrate', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setResults(data.results ?? [])
        setStatus('done')
      } else {
        setErrorMsg(data.error || 'Migration failed')
        setStatus('error')
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Migration failed')
      setStatus('error')
    }
  }

  return (
    <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[#f0f0f0]">Database Migration</h3>
          <p className="text-xs text-[#6b7280] mt-1">
            Adds <code className="text-[#FFA500]">published</code>, <code className="text-[#FFA500]">meta_title</code>, and <code className="text-[#FFA500]">meta_description</code> columns to the posts table. Safe to run multiple times.
          </p>
        </div>
        <button
          onClick={handleRun}
          disabled={status === 'running'}
          className="shrink-0 px-4 py-2 bg-[#1f2937] border border-[#374151] text-[#f0f0f0] text-sm font-medium rounded-lg hover:border-[#FFA500] hover:text-[#FFA500] transition-colors disabled:opacity-50"
        >
          {status === 'running' ? 'Running…' : 'Run Migration'}
        </button>
      </div>

      {status === 'done' && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 space-y-1">
          <p className="text-green-400 text-xs font-semibold">Migration complete</p>
          {results.map((r, i) => (
            <p key={i} className="text-green-400/80 text-xs font-mono">{r}</p>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-xs font-semibold">Error</p>
          <p className="text-red-400/80 text-xs font-mono mt-1">{errorMsg}</p>
        </div>
      )}
    </div>
  )
}

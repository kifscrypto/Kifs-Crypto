'use client'

import { useState } from 'react'

interface ReportItem { id: number; title: string; changes: string[] }

export default function CleanContentButton() {
  const [status, setStatus] = useState<'idle' | 'previewing' | 'running' | 'done' | 'error'>('idle')
  const [report, setReport] = useState<ReportItem[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  async function runClean(preview: boolean) {
    setStatus(preview ? 'previewing' : 'running')
    setReport([])
    setErrorMsg('')
    try {
      const res = await fetch('/api/admin/clean-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preview }),
      })
      const data = await res.json()
      if (res.ok) {
        setReport(data.report ?? [])
        setStatus('done')
      } else {
        setErrorMsg(data.error || 'Failed')
        setStatus('error')
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed')
      setStatus('error')
    }
  }

  return (
    <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[#f0f0f0]">Clean Article Content</h3>
          <p className="text-xs text-[#6b7280] mt-1">
            Strips embedded metadata lines (<code className="text-[#FFA500]">**Starting Balance:**…</code>) and duplicate H1 headings from all posts.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => runClean(true)}
            disabled={status === 'previewing' || status === 'running'}
            className="px-3 py-2 bg-[#1f2937] border border-[#374151] text-[#9ca3af] text-xs font-medium rounded-lg hover:border-[#FFA500] hover:text-[#FFA500] transition-colors disabled:opacity-50"
          >
            Preview
          </button>
          <button
            onClick={() => {
              if (window.confirm('Apply content cleanup to all posts? This will modify the database.')) {
                runClean(false)
              }
            }}
            disabled={status === 'previewing' || status === 'running'}
            className="px-3 py-2 bg-[#1f2937] border border-[#374151] text-[#f0f0f0] text-xs font-medium rounded-lg hover:border-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
          >
            {status === 'running' ? 'Cleaning…' : 'Apply'}
          </button>
        </div>
      </div>

      {(status === 'done' || status === 'previewing') && (
        <div className={`rounded-lg p-3 space-y-3 ${report.length > 0 ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-green-500/10 border border-green-500/20'}`}>
          {report.length === 0 ? (
            <p className="text-green-400 text-xs">No issues found — all posts are clean.</p>
          ) : (
            <>
              <p className="text-amber-400 text-xs font-semibold">
                {status === 'previewing' ? 'Preview: ' : 'Fixed: '}{report.length} post{report.length !== 1 ? 's' : ''} affected
              </p>
              {report.map(item => (
                <div key={item.id} className="space-y-1">
                  <p className="text-[#f0f0f0] text-xs font-medium truncate">{item.title}</p>
                  {item.changes.map((c, i) => (
                    <p key={i} className="text-amber-400/70 text-xs font-mono pl-2">• {c}</p>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-xs font-mono">{errorMsg}</p>
        </div>
      )}
    </div>
  )
}

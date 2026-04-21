'use client'

import { parseMarkdown } from '@/lib/markdown'

interface MarkdownPreviewProps {
  content: string
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const blocks = parseMarkdown(content)

  return (
    <div className="prose prose-invert max-w-none">
      <div className="text-[#f0f0f0] space-y-6 leading-relaxed">
        {blocks.map((block, idx) => {
          if (block.type === 'h1') {
            return (
              <h2 key={idx} className="text-3xl font-bold text-[#f0f0f0] mt-8 mb-4">
                {block.content}
              </h2>
            )
          }
          if (block.type === 'h2') {
            return (
              <h3 key={idx} className="text-2xl font-bold text-[#FFA500] mt-6 mb-3">
                {block.content}
              </h3>
            )
          }
          if (block.type === 'h3') {
            return (
              <h4 key={idx} className="text-xl font-semibold text-[#FFA500] mt-4 mb-2">
                {block.content}
              </h4>
            )
          }
          if (block.type === 'bold') {
            return (
              <p key={idx} className="text-lg font-semibold text-[#f0f0f0]">
                {block.content}
              </p>
            )
          }
          if (block.type === 'list') {
            return (
              <ul key={idx} className="space-y-2 pl-4">
                {block.content.map((item, i) => (
                  <li key={i} className="text-[#9ca3af]">
                    <span className="text-[#FFA500]">•</span> {item}
                  </li>
                ))}
              </ul>
            )
          }
          if (block.type === 'code') {
            return (
              <pre key={idx} className="bg-[#1f2937] text-[#9ca3af] p-4 rounded-lg overflow-x-auto">
                <code className="font-mono text-sm">{block.content}</code>
              </pre>
            )
          }
          return (
            <p key={idx} className="text-[#9ca3af]">
              {block.content}
            </p>
          )
        })}
        {blocks.length === 0 && (
          <p className="text-[#6b7280] italic">Start typing to see preview...</p>
        )}
      </div>
    </div>
  )
}

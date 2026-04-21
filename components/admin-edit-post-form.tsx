'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/db'
import MarkdownPreview from './markdown-preview'
import { MARKDOWN_HELPERS } from '@/lib/markdown'

interface AdminEditPostFormProps {
  post: BlogPost
}

export default function AdminEditPostForm({ post }: AdminEditPostFormProps) {
  // Handle created_at as either Date object or string
  const dateStr = typeof post.created_at === 'string' 
    ? post.created_at 
    : new Date(post.created_at).toISOString()
  const dateOnly = dateStr.split('T')[0]

  const [formData, setFormData] = useState({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    exchange: post.exchange,
    balance: post.balance.toString(),
    week: post.week.toString(),
    date: dateOnly,
    image_url: post.image_url || '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!res.ok) {
        setError('Failed to upload image')
        return
      }

      const { url } = await res.json()
      setFormData(prev => ({ ...prev, image_url: url }))
    } catch (err) {
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const requestBody = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        exchange: formData.exchange,
        balance: parseFloat(formData.balance),
        week: parseInt(formData.week),
        date: formData.date,
        image_url: formData.image_url || null,
      }

      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
        setError(errorData.error || 'Failed to update post')
        return
      }

      router.push('/admin/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-8 space-y-6">
      {error && (
        <div className="bg-[#FF3333]/10 border border-[#FF3333]/30 rounded-lg p-3 text-[#FF3333] text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
            placeholder="Week 2: Exchange Name — Description"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Exchange *
          </label>
          <input
            type="text"
            name="exchange"
            value={formData.exchange}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
            placeholder="BYDFi"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Balance ($) *
          </label>
          <input
            type="number"
            step="0.01"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
            placeholder="1247.50"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Week *
          </label>
          <input
            type="number"
            name="week"
            value={formData.week}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
            placeholder="1"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] focus:border-[#FFA500] focus:outline-none transition-colors disabled:opacity-50"
          />
          {uploading && <p className="text-xs text-[#FFA500]">Uploading...</p>}
          <p className="text-xs text-[#6b7280]">Or paste image URL directly:</p>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {formData.image_url && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Image Preview
          </label>
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[#1f2937] bg-[#080808]">
            <Image
              src={formData.image_url}
              alt="Featured image preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#f0f0f0]">
          Excerpt *
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors resize-none"
          placeholder="Brief summary of the week's activities"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#f0f0f0]">
          Content *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={12}
          className="w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors resize-none font-mono text-sm"
          placeholder="Markdown supported. Use # for headings, ## for subheadings, - for lists"
        />
        <div className="flex gap-2 flex-wrap mt-2">
          {MARKDOWN_HELPERS.map((helper) => (
            <button
              key={helper.label}
              type="button"
              onClick={() => {
                const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
                if (textarea) {
                  const start = textarea.selectionStart
                  const end = textarea.selectionEnd
                  const newText = formData.content.substring(0, start) + helper.syntax + formData.content.substring(end)
                  setFormData(prev => ({ ...prev, content: newText }))
                }
              }}
              className="text-xs px-2 py-1 bg-[#1f2937] text-[#f0f0f0] rounded hover:bg-[#FFA500]/20 hover:text-[#FFA500] transition-colors border border-[#1f2937] hover:border-[#FFA500]"
            >
              {helper.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="text-xs text-[#FFA500] hover:text-[#FFB800] transition-colors mt-2"
        >
          {showPreview ? 'Hide' : 'Show'} Preview
        </button>
      </div>

      {showPreview && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#f0f0f0]">
            Content Preview
          </label>
          <div className="bg-[#080808] border border-[#1f2937] rounded-lg p-6 max-h-96 overflow-y-auto">
            <MarkdownPreview content={formData.content} />
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading || uploading}
          className="flex-1 px-6 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <Link
          href="/admin/posts"
          className="px-6 py-3 border border-[#1f2937] text-[#f0f0f0] rounded-lg hover:bg-[#1f2937]/50 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MarkdownPreview from './markdown-preview'
import { MARKDOWN_HELPERS } from '@/lib/markdown'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const INPUT = 'w-full px-4 py-2 bg-[#080808] border border-[#1f2937] rounded-lg text-[#f0f0f0] placeholder-[#6b7280] focus:border-[#FFA500] focus:outline-none transition-colors'
const LABEL = 'block text-sm font-medium text-[#9ca3af] mb-1'
const SECTION = 'bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 space-y-4'

export default function AdminPostForm() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    exchange: '',
    balance: '',
    week: '',
    date: new Date().toISOString().split('T')[0],
    image_url: '',
    published: false,
    meta_title: '',
    meta_description: '',
  })
  const [slugEdited, setSlugEdited] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => {
      const next = { ...prev, [name]: value }
      if (name === 'title' && !slugEdited) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlugEdited(true)
    setFormData(prev => ({ ...prev, slug: slugify(e.target.value) }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { 
        method: 'POST', 
        body: fd,
        credentials: 'include'
      })
      if (!res.ok) { 
        const err = await res.json().catch(() => ({}))
        setError(err.error || 'Failed to upload image')
        return 
      }
      const { url } = await res.json()
      setFormData(prev => ({ ...prev, image_url: url }))
      setError('')
    } catch (err) { 
      setError(err instanceof Error ? err.message : 'Failed to upload image') 
    }
    finally { setUploading(false) }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const body = {
        slug: formData.slug || slugify(formData.title),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        exchange: formData.exchange || null,
        balance: formData.balance ? parseFloat(formData.balance) : null,
        week: formData.week ? parseInt(formData.week) : null,
        date: formData.date,
        image_url: formData.image_url || null,
        published: formData.published,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
      }
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setError(err.error || `Failed to create post (${res.status})`)
        return
      }
      router.push('/admin/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{error}</div>
      )}

      {/* Core fields */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[#FFA500] uppercase tracking-widest">Article</h2>

        <div className="space-y-1">
          <label className={LABEL}>Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required
            className={INPUT} placeholder="e.g. Trading365.org Review – Best Crypto Exchange Bonuses 2026" />
        </div>

        <div className="space-y-1">
          <label className={LABEL}>Slug (URL)</label>
          <div className="flex items-center gap-2">
            <span className="text-[#6b7280] text-sm">/blog/</span>
            <input type="text" value={formData.slug} onChange={handleSlugChange}
              className={INPUT + ' flex-1 text-sm font-mono'} placeholder="auto-generated-from-title" />
          </div>
        </div>

        <div className="space-y-1">
          <label className={LABEL}>Excerpt * <span className="text-[#6b7280] font-normal">(plain text summary, not a URL)</span></label>
          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required rows={2}
            className={INPUT + ' resize-none'}
            placeholder="A short plain-text description of the article — shown on blog cards and used as the default meta description." />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={LABEL}>Date *</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className={INPUT} />
          </div>

          <div className="space-y-1">
            <label className={LABEL}>Status</label>
            <div className="flex items-center gap-3 h-10">
              <button type="button" onClick={() => setFormData(p => ({ ...p, published: !p.published }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.published ? 'bg-[#FFA500]' : 'bg-[#1f2937]'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.published ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm font-medium ${formData.published ? 'text-[#FFA500]' : 'text-[#6b7280]'}`}>
                {formData.published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[#FFA500] uppercase tracking-widest">SEO</h2>
        <p className="text-xs text-[#6b7280]">Leave blank to use the article title and excerpt as defaults.</p>

        <div className="space-y-1">
          <label className={LABEL}>Meta Title <span className="text-[#6b7280] font-normal">(max 60 chars)</span></label>
          <input type="text" name="meta_title" value={formData.meta_title} onChange={handleChange} maxLength={60}
            className={INPUT} placeholder={formData.title || 'Defaults to article title'} />
          <p className="text-xs text-[#6b7280]">{formData.meta_title.length}/60</p>
        </div>

        <div className="space-y-1">
          <label className={LABEL}>Meta Description <span className="text-[#6b7280] font-normal">(max 160 chars)</span></label>
          <textarea name="meta_description" value={formData.meta_description} onChange={handleChange} maxLength={160} rows={2}
            className={INPUT + ' resize-none'}
            placeholder={formData.excerpt || 'Defaults to excerpt'} />
          <p className="text-xs text-[#6b7280]">{formData.meta_description.length}/160</p>
        </div>
      </div>

      {/* Journey fields (optional) */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[#FFA500] uppercase tracking-widest">Journey Data <span className="text-[#6b7280] font-normal normal-case">(optional — leave blank for regular articles)</span></h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className={LABEL}>Exchange</label>
            <input type="text" name="exchange" value={formData.exchange} onChange={handleChange}
              className={INPUT} placeholder="BYDFi" />
          </div>
          <div className="space-y-1">
            <label className={LABEL}>Week #</label>
            <input type="number" name="week" value={formData.week} onChange={handleChange}
              className={INPUT} placeholder="1" min="1" />
          </div>
          <div className="space-y-1">
            <label className={LABEL}>Balance ($)</label>
            <input type="number" step="0.01" name="balance" value={formData.balance} onChange={handleChange}
              className={INPUT} placeholder="1247.50" />
          </div>
        </div>

        <div className="space-y-1">
          <label className={LABEL}>Featured Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading}
            className={INPUT + ' disabled:opacity-50'} />
          {uploading && <p className="text-xs text-[#FFA500]">Uploading...</p>}
          <input type="url" name="image_url" placeholder="Or paste image URL directly"
            value={formData.image_url}
            onChange={e => setFormData(p => ({ ...p, image_url: e.target.value }))}
            className={INPUT + ' text-sm mt-1'} />
        </div>

        {formData.image_url && (
          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-[#1f2937]">
            <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[#FFA500] uppercase tracking-widest">Content</h2>

        <div className="space-y-1">
          <label className={LABEL}>Body * <span className="text-[#6b7280] font-normal">(Markdown supported)</span></label>
          <div className="flex gap-2 flex-wrap mb-2">
            {MARKDOWN_HELPERS.map(h => (
              <button key={h.label} type="button"
                onClick={() => {
                  const ta = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
                  if (ta) {
                    const s = ta.selectionStart, end = ta.selectionEnd
                    const next = formData.content.substring(0, s) + h.syntax + formData.content.substring(end)
                    setFormData(p => ({ ...p, content: next }))
                  }
                }}
                className="text-xs px-2 py-1 bg-[#1f2937] text-[#f0f0f0] rounded hover:bg-[#FFA500]/20 hover:text-[#FFA500] transition-colors border border-[#1f2937] hover:border-[#FFA500]">
                {h.label}
              </button>
            ))}
          </div>
          <textarea name="content" value={formData.content} onChange={handleChange} required rows={16}
            className={INPUT + ' resize-y font-mono text-sm'}
            placeholder="Write your article in Markdown…" />
        </div>

        <button type="button" onClick={() => setShowPreview(p => !p)}
          className="text-xs text-[#FFA500] hover:text-[#FFB800] transition-colors">
          {showPreview ? 'Hide' : 'Show'} Preview
        </button>

        {showPreview && (
          <div className="bg-[#080808] border border-[#1f2937] rounded-lg p-6 max-h-96 overflow-y-auto">
            <MarkdownPreview content={formData.content} />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading || uploading}
          className="flex-1 px-6 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors disabled:opacity-50">
          {loading ? 'Creating…' : formData.published ? 'Publish Article' : 'Save as Draft'}
        </button>
        <Link href="/admin/posts"
          className="px-6 py-3 border border-[#1f2937] text-[#f0f0f0] rounded-lg hover:bg-[#1f2937]/50 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  )
}

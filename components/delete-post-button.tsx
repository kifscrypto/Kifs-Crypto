'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props { id: number; title: string }

export default function DeletePostButton({ id, title }: Props) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!window.confirm(`Delete "${title}"?\n\nThis cannot be undone.`)) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete post')
      }
    } catch {
      alert('Failed to delete post')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-red-500 hover:text-red-400 font-medium transition-colors disabled:opacity-50"
    >
      {deleting ? 'Deleting…' : 'Delete'}
    </button>
  )
}

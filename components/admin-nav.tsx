'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1f2937] bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/admin/dashboard" className="text-lg font-bold text-[#FFA500]">
            KIFS Admin
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/admin/posts" className="text-[#9ca3af] hover:text-[#FFA500] transition-colors text-sm">
              Posts
            </Link>
            <Link href="/admin/journey-stats" className="text-[#9ca3af] hover:text-[#FFA500] transition-colors text-sm">
              Stats
            </Link>
            <Link href="/admin/exchanges" className="text-[#9ca3af] hover:text-[#FFA500] transition-colors text-sm">
              Bonuses
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#FF3333] text-white rounded-lg hover:bg-[#dc2626] transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`w-6 h-0.5 bg-[#FFA500] transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#FFA500] transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#FFA500] transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-[#1f2937] py-4 space-y-2">
            <Link
              href="/admin/posts"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-[#9ca3af] hover:text-[#FFA500] hover:bg-[#1f2937] rounded transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/admin/journey-stats"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-[#9ca3af] hover:text-[#FFA500] hover:bg-[#1f2937] rounded transition-colors"
            >
              Stats
            </Link>
            <Link
              href="/admin/exchanges"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-[#9ca3af] hover:text-[#FFA500] hover:bg-[#1f2937] rounded transition-colors"
            >
              Bonuses
            </Link>
            <button
              onClick={() => {
                setIsOpen(false)
                handleLogout()
              }}
              className="w-full text-left px-4 py-2 bg-[#FF3333] text-white rounded hover:bg-[#dc2626] transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

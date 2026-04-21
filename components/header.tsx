'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1f2937] bg-[#080808]/95 backdrop-blur supports-[backdrop-filter]:bg-[#080808]/60">
      <div className="flex h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl" onClick={closeMenu}>
          <Image 
            src="/images/kifs-logo.png" 
            alt="KIFS Crypto" 
            height={64}
            width={120}
            className="object-contain"
            priority
            style={{ height: '64px', width: 'auto' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm text-[#9ca3af] hover:text-[#FFA500] transition-colors"
          >
            The Journey
          </Link>
          <Link 
            href="/blog" 
            className="text-sm text-[#9ca3af] hover:text-[#FFA500] transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/exchanges"
            className="text-sm text-[#9ca3af] hover:text-[#FFA500] transition-colors"
          >
            Exchanges
          </Link>
          <Link 
            href="/about-us" 
            className="text-sm text-[#9ca3af] hover:text-[#FFA500] transition-colors"
          >
            About
          </Link>
          <a
            href="https://trading365.org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-[#FFA500] text-[#080808] text-sm font-medium hover:bg-[#FFB800] transition-colors flex items-center gap-1"
          >
            Trading365.org
            <span className="text-xs">↗</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-[#1f2937] rounded transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[#FFA500] transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#FFA500] transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#FFA500] transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#1f2937] bg-[#0d0d0d]">
          <nav className="flex flex-col p-4 gap-2 max-w-7xl mx-auto">
            <Link 
              href="/"
              onClick={closeMenu}
              className="px-4 py-2 text-[#9ca3af] hover:text-[#FFA500] hover:bg-[#1f2937] rounded transition-colors"
            >
              The Journey
            </Link>
            <Link 
              href="/blog"
              onClick={closeMenu}
              className="px-4 py-2 text-[#9ca3af] hover:text-[#FFA500] hover:bg-[#1f2937] rounded transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/exchanges"
              onClick={closeMenu}
              className="px-4 py-2 text-[#9ca3af] hover:text-[#FFA500] hover:bg-[#1f2937] rounded transition-colors"
            >
              Exchanges
            </Link>
            <Link 
              href="/about-us"
              onClick={closeMenu}
              className="px-4 py-2 text-[#9ca3af] hover:text-[#FFA500] hover:bg-[#1f2937] rounded transition-colors"
            >
              About
            </Link>
            <a
              href="https://trading365.org"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="px-4 py-2 bg-[#FFA500] text-[#080808] font-medium rounded hover:bg-[#FFB800] transition-colors flex items-center gap-1"
            >
              Trading365.org
              <span className="text-xs">↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

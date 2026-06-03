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
    <header className="sticky top-0 z-50 w-full border-b border-[#1f1f1f] bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/60">
      <div className="flex h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-sm sm:text-lg" onClick={closeMenu}>
          <span className="text-white">KIFS</span>
          <span className="text-[#ff3333]">SCAN</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm text-[#555555] hover:text-[#e8e8e8] transition-colors"
          >
            Scanner
          </Link>
          <Link 
            href="/blog" 
            className="text-sm text-[#555555] hover:text-[#e8e8e8] transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="/exchanges"
            className="text-sm text-[#555555] hover:text-[#e8e8e8] transition-colors"
          >
            BASE
          </Link>
          <Link
            href="/about-us"
            className="text-sm text-[#555555] hover:text-[#e8e8e8] transition-colors"
          >
            Solana
          </Link>
          <Link 
            href="/about-us" 
            className="text-sm text-[#555555] hover:text-[#e8e8e8] transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-[#1f1f1f] rounded-[3px] transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[#ff3333] transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#ff3333] transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#ff3333] transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#1f1f1f] bg-[#111111]">
          <nav className="flex flex-col p-4 gap-2 max-w-7xl mx-auto">
            <Link 
              href="/"
              onClick={closeMenu}
              className="px-4 py-2 text-[#555555] hover:text-[#e8e8e8] hover:bg-[#1f1f1f] rounded-[3px] transition-colors"
            >
              Scanner
            </Link>
            <Link 
              href="/blog"
              onClick={closeMenu}
              className="px-4 py-2 text-[#555555] hover:text-[#e8e8e8] hover:bg-[#1f1f1f] rounded-[3px] transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/exchanges"
              onClick={closeMenu}
              className="px-4 py-2 text-[#555555] hover:text-[#e8e8e8] hover:bg-[#1f1f1f] rounded-[3px] transition-colors"
            >
              BASE
            </Link>
            <Link
              href="/about-us"
              onClick={closeMenu}
              className="px-4 py-2 text-[#555555] hover:text-[#e8e8e8] hover:bg-[#1f1f1f] rounded-[3px] transition-colors"
            >
              Solana
            </Link>
            <Link 
              href="/about-us"
              onClick={closeMenu}
              className="px-4 py-2 text-[#555555] hover:text-[#e8e8e8] hover:bg-[#1f1f1f] rounded-[3px] transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

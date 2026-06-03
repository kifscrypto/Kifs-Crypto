'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1f1f1f] bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-white">KIFS</span>
              <span className="text-[#ff3333]">SCAN</span>
            </div>
            <p className="text-sm text-[#555555]">
              Scan it before you ape in.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#e8e8e8] text-sm">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-[#555555] hover:text-[#e8e8e8] transition-colors">
                  Scanner
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#555555] hover:text-[#e8e8e8] transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-[#555555] hover:text-[#e8e8e8] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a 
                  href="https://trading365.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#555555] hover:text-[#e8e8e8] transition-colors flex items-center gap-1"
                >
                  Trading365.org
                  <span className="text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#e8e8e8] text-sm">Disclaimer</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Not financial advice. DYOR. We just scan the bitch.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1f1f1f] pt-8">
          <p className="text-xs text-[#555555] text-center">
            © 2026 KIFS SCAN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

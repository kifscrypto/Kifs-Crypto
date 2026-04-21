'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1f2937] bg-[#0d0d0d] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold">
              <span className="text-[#f59e0b]">₿</span>
              <span>KIFS Crypto</span>
            </div>
            <p className="text-sm text-[#9ca3af]">
              $1,000 to $1,000,000 using only crypto exchange sign-up bonuses.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#f0f0f0] text-sm">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-[#9ca3af] hover:text-[#f59e0b] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#9ca3af] hover:text-[#f59e0b] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-[#9ca3af] hover:text-[#f59e0b] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#9ca3af] hover:text-[#f59e0b] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#f0f0f0] text-sm">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://trading365.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-[#f59e0b] transition-colors flex items-center gap-1"
                >
                  Trading365.org
                  <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <Link href="/the-best-deals-for-crypto" className="text-[#9ca3af] hover:text-[#f59e0b] transition-colors">
                  Exchange Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#f0f0f0] text-sm">Legal</h3>
            <p className="text-xs text-[#6b7280] leading-relaxed">
              This is not financial advice. All trading involves risk. Past performance does not guarantee future results.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1f2937] pt-8">
          <p className="text-xs text-[#6b7280] text-center">
            © 2026 KIFS Crypto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

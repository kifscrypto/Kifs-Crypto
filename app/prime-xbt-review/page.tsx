import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PrimeXBT Review - Crypto Trading Platform',
  description: 'PrimeXBT review and trading guide. Sign-up bonuses and current deals available.',
  canonical: 'https://kifscrypto.com/prime-xbt-review',
}

export default function PrimeXBTReviewPage() {
  return (
    <div className="w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">
            PrimeXBT Review
          </h1>
          <p className="text-[#9ca3af] mb-8">
            For current exchange bonuses and comprehensive reviews, visit:
          </p>
          <a
            href="https://trading365.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
          >
            Trading365.org — Current Bonuses & Reviews
          </a>
        </div>
      </section>
    </div>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Keystone Pro 3 Review - Hardware Wallet Guide',
  description: 'Keystone Pro 3 hardware wallet review and security guide.',
  canonical: 'https://kifscrypto.com/keystone-pro-3-review',
}

export default function KeystoneProReviewPage() {
  return (
    <div className="w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">
            Keystone Pro 3 Review
          </h1>
          <p className="text-[#9ca3af] mb-6">
            Hardware wallet security review and guide. For the latest crypto security recommendations and exchange bonuses:
          </p>
          <a
            href="https://trading365.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
          >
            Trading365.org
          </a>
        </div>
      </section>
    </div>
  )
}

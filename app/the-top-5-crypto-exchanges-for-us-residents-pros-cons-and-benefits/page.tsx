import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Top 5 Crypto Exchanges for US Residents - Pros, Cons & Benefits',
  description: 'Best crypto exchanges for US residents. Comprehensive comparison of fees, features, and sign-up bonuses.',
  canonical: 'https://kifscrypto.com/the-top-5-crypto-exchanges-for-us-residents-pros-cons-and-benefits',
}

export default function TopExchangesPage() {
  return (
    <div className="w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">
            Top 5 Crypto Exchanges for US Residents
          </h1>
          <p className="text-[#9ca3af] mb-6">
            For updated comparisons of the best exchanges for US traders with current bonuses and referral deals:
          </p>
          <a
            href="https://trading365.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
          >
            Trading365.org — Updated Exchange Reviews
          </a>
        </div>
      </section>
    </div>
  )
}

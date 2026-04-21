import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cryptocurrency 101 — A Beginner\'s Guide to Digital Money',
  description: 'Complete beginner guide to cryptocurrency. Learn the fundamentals of digital money and blockchain.',
  canonical: 'https://kifscrypto.com/cryptocurrency-101-a-beginners-guide-to-digital-money',
}

export default function Crypto101Page() {
  return (
    <div className="w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">
            Cryptocurrency 101 — A Beginner's Guide to Digital Money
          </h1>
          <p className="text-[#9ca3af] mb-6">
            Introduction to cryptocurrency fundamentals. Learn the basics of blockchain, trading, and digital assets. For practical trading experience with sign-up bonuses:
          </p>
          <a
            href="https://trading365.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
          >
            Trading365.org — Start with Exchange Bonuses
          </a>
        </div>
      </section>
    </div>
  )
}

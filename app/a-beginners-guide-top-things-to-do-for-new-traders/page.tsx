import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "A Beginner's Guide - Top Things to Do for New Traders",
  description: 'Beginner guide for new cryptocurrency traders. Essential tips and best practices.',
  canonical: 'https://kifscrypto.com/a-beginners-guide-top-things-to-do-for-new-traders',
}

export default function BeginnersGuidePage() {
  return (
    <div className="w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">
            A Beginner's Guide — Top Things to Do for New Traders
          </h1>
          <p className="text-[#9ca3af] mb-6">
            Essential beginner trading guide. Start your journey with these fundamentals. For current exchange bonuses:
          </p>
          <a
            href="https://trading365.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
          >
            Trading365.org — Current Bonuses for Beginners
          </a>
        </div>
      </section>
    </div>
  )
}

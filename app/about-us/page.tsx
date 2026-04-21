import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - KIFS Crypto',
  description: 'Who is KIFS? Why this challenge? The origin story behind the $1,000 to $1,000,000 crypto trading journey.',
  canonical: 'https://kifscrypto.com/about-us',
}

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mb-4">
            About the Challenge
          </h1>
          <p className="text-lg text-[#9ca3af]">
            The person, the journey, and why this experiment matters.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Who is KIFS */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#f0f0f0]">
              Who is KIFS?
            </h2>
            <p className="text-[#9ca3af] leading-relaxed">
              KIFS is a crypto trader and analyst with a background in risk management and quantitative analysis. After years of watching cryptocurrency markets and exchange incentive structures, the question became: what if you systematically exploited sign-up bonuses and referral programs rather than relying on luck or market timing?
            </p>
            <p className="text-[#9ca3af] leading-relaxed">
              The answer is this challenge. Real money. Real trades. Real transparency.
            </p>
          </div>

          {/* Why This Challenge */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#f0f0f0]">
              Why This Challenge?
            </h2>
            <p className="text-[#9ca3af] leading-relaxed">
              Most crypto content is either promotional hype or overly technical analysis. This challenge is neither. It&apos;s an experiment in:
            </p>
            <ul className="space-y-3 pl-4">
              <li className="text-[#9ca3af] flex gap-3">
                <span className="text-[#10b981] flex-shrink-0">✓</span>
                <span><strong className="text-[#f0f0f0]">Bonus optimization:</strong> Can exchange incentives be chained and compounded?</span>
              </li>
              <li className="text-[#9ca3af] flex gap-3">
                <span className="text-[#10b981] flex-shrink-0">✓</span>
                <span><strong className="text-[#f0f0f0]">Risk management:</strong> How to scale responsibly with limited capital?</span>
              </li>
              <li className="text-[#9ca3af] flex gap-3">
                <span className="text-[#10b981] flex-shrink-0">✓</span>
                <span><strong className="text-[#f0f0f0]">Transparency:</strong> Full documentation of every move, every win, every loss.</span>
              </li>
              <li className="text-[#9ca3af] flex gap-3">
                <span className="text-[#10b981] flex-shrink-0">✓</span>
                <span><strong className="text-[#f0f0f0]">Data over narrative:</strong> Let the numbers tell the story, not marketing.</span>
              </li>
            </ul>
          </div>

          {/* How to Follow */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#f0f0f0]">
              How to Follow Along
            </h2>
            <p className="text-[#9ca3af] leading-relaxed">
              Weekly updates documenting the current balance, exchanges used, strategies employed, and results. Every trade is logged. Every bonus claimed is recorded.
            </p>
            <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 mt-4">
              <Link href="/blog" className="inline-flex items-center gap-2 text-[#f59e0b] hover:text-[#d97706] font-semibold">
                Read Weekly Updates →
              </Link>
            </div>
          </div>

          {/* Exchange Research */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#f0f0f0]">
              Exchange Bonuses & Deals
            </h2>
            <p className="text-[#9ca3af] leading-relaxed">
              This challenge wouldn&apos;t work without current, accurate information about exchange sign-up bonuses and referral programs. We use and recommend:
            </p>
            <a
              href="https://trading365.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
            >
              Trading365.org — Updated Weekly Bonuses
            </a>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-[#ef4444]">
              Disclaimer
            </h3>
            <p className="text-sm text-[#9ca3af]">
              This challenge is for informational and educational purposes. All trading involves risk, including the potential loss of principal. Past performance does not guarantee future results. This is not financial advice. KIFS is not a registered financial advisor. Conduct your own research before making any investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold text-[#f0f0f0]">
            Ready to dive in?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="px-6 py-2 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
            >
              Read the Journey
            </Link>
            <a
              href="https://trading365.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-[#f59e0b] text-[#f59e0b] rounded-lg hover:bg-[#f59e0b]/10 transition-colors"
            >
              Find Exchange Deals
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

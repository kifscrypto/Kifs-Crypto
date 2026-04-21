import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trading Indicators - Technical Analysis Guide',
  description: 'Guide to using trading indicators for cryptocurrency technical analysis.',
  canonical: 'https://kifscrypto.com/indicator',
}

export default function IndicatorPage() {
  return (
    <div className="w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">
            Trading Indicators & Technical Analysis
          </h1>
          <p className="text-[#9ca3af] mb-6">
            Guide to trading indicators and technical analysis for crypto traders. For hands-on trading experience:
          </p>
          <a
            href="https://trading365.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
          >
            Trading365.org — Start Trading with Bonuses
          </a>
        </div>
      </section>
    </div>
  )
}

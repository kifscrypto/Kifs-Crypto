import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why I Just Bought PEPE Unchained (PEPU) — 10x 100x Incoming?',
  description: 'Trading analysis: PEPE Unchained token review and potential gains discussion.',
  canonical: 'https://kifscrypto.com/why-i-just-bought-pepe-unchained-pepu-10x-100x-incoming',
}

export default function PEPUPage() {
  return (
    <div className="w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">
            Why I Just Bought PEPE Unchained (PEPU) — 10x 100x Incoming?
          </h1>
          <p className="text-[#9ca3af] mb-6">
            Trading analysis and token review. This is not financial advice. For verified exchange bonuses and trading opportunities:
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

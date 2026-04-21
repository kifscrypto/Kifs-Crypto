import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketing Crypto Projects Correctly Using Social Media',
  description: 'Guide to marketing cryptocurrency projects on social media. Best practices and strategies.',
  canonical: 'https://kifscrypto.com/marketing-crypto-projects-correctly-using-social-media',
}

export default function MarketingCryptoPage() {
  return (
    <div className="w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">
            Marketing Crypto Projects Correctly Using Social Media
          </h1>
          <p className="text-[#9ca3af] mb-6">
            Content stub. For current crypto exchange bonuses and project information:
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

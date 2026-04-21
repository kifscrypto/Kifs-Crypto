import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Best Crypto Exchange Deals & Sign-Up Bonuses',
  description: 'Current exchange bonuses and referral deals — updated weekly. Track all active promotions for crypto trading.',
  canonical: 'https://kifscrypto.com/the-best-deals-for-crypto',
}

export default function BestDealsPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-[#1f2937]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0]">
            The Best Crypto Exchange Deals
          </h1>
          <p className="text-lg text-[#9ca3af]">
            We now track all current crypto exchange bonuses and referral deals at Trading365.org — updated weekly.
          </p>
          
          <div className="pt-4">
            <a
              href="https://trading365.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
            >
              View Current Deals at Trading365.org
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#f0f0f0] mb-3">
                Why Trading365.org?
              </h2>
              <p className="text-[#9ca3af] mb-4">
                Instead of maintaining this page with outdated information, we partner with Trading365.org — a dedicated platform that updates exchange bonuses and referral deals weekly. This ensures you always have the most current, verified bonus information.
              </p>
            </div>

            <div className="border-t border-[#1f2937] pt-6">
              <h3 className="text-lg font-semibold text-[#f59e0b] mb-3">
                What You'll Find There
              </h3>
              <ul className="space-y-2 text-[#9ca3af]">
                <li className="flex gap-2">
                  <span className="text-[#10b981]">✓</span>
                  <span>Current sign-up bonuses for major exchanges</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10b981]">✓</span>
                  <span>Referral codes and active promotions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10b981]">✓</span>
                  <span>Weekly updates on new and ending deals</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10b981]">✓</span>
                  <span>Verified bonus conditions and requirements</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10b981]">✓</span>
                  <span>Comparison tools and bonus tracking</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-[#1f2937] pt-6 text-center">
              <a
                href="https://trading365.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
              >
                Explore Trading365.org Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

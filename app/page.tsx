import { Metadata } from 'next'
import Link from 'next/link'
import JourneyTracker from '@/components/journey-tracker'
import BlogPostCard from '@/components/blog-post-card'
import NewsletterSignup from '@/components/newsletter-signup'
import { getLatestPosts, getJourneyStats } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'KIFS Crypto - $1,000 to $1,000,000 Using Sign-Up Bonuses',
  description: 'A real money crypto trading challenge. Starting with $1,000, reaching for $1,000,000 using only exchange sign-up bonuses and referral deals. Every move documented weekly.',
  openGraph: {
    title: 'KIFS Crypto - $1,000 to $1,000,000',
    description: 'A real money crypto trading challenge using only exchange sign-up bonuses.',
  },
  canonical: 'https://kifscrypto.com',
}

export default async function Home() {
  let latestPosts = []
  let journeyStats = null

  try {
    const [posts, stats] = await Promise.allSettled([
      getLatestPosts(3),
      getJourneyStats(),
    ])

    if (posts.status === 'fulfilled') {
      latestPosts = posts.value
    }
    if (stats.status === 'fulfilled') {
      journeyStats = stats.value
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    // Continue with empty data
  }

  const trackerData = journeyStats || {
    starting_balance: 1000,
    current_balance: 1247.50,
    target_balance: 1000000,
    current_exchange: 'BYDFi',
    week: 1,
    percent_gain: 24.75,
  }

  return (
    <div className="w-full">
      {/* JSON-LD Schema for Financial Challenge */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FinancialChallenge',
            name: 'KIFS Crypto - $1M Challenge',
            description:
              'A real money crypto trading challenge using only exchange sign-up bonuses, starting from $1,000 with a target of $1,000,000.',
            startingAmount: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              price: '1000',
            },
            targetAmount: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              price: '1000000',
            },
            url: 'https://kifscrypto.com',
            image: 'https://kifscrypto.com/images/kifs-logo.png',
            creator: {
              '@type': 'Organization',
              name: 'KIFS Crypto',
              url: 'https://kifscrypto.com',
              sameAs: [],
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#f0f0f0] mb-6">
            <span className="text-[#FFA500]">$1,000</span> <span className="text-[#9ca3af]">→</span> <span className="text-[#FFA500]">$1,000,000</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#9ca3af] mb-8">
            Using only crypto exchange sign-up bonuses. Every move documented.
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-[#FFA500] text-[#080808] font-bold rounded-lg hover:bg-[#FFB800] transition-colors"
          >
            Read Latest Update
          </Link>
        </div>
      </section>

      {/* Journey Tracker Widget */}
      <section id="tracker" className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <JourneyTracker data={trackerData} />
        </div>
      </section>

      {/* Latest Posts Preview */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-2">
              Latest Updates
            </h2>
            <p className="text-[#9ca3af]">
              Weekly journey logs from the challenge
            </p>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {latestPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#9ca3af]">No posts yet. Check back soon.</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block px-6 py-2 border border-[#FFA500] text-[#FFA500] rounded-lg hover:bg-[#FFA500]/10 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* About the Challenge Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-8">
            About the Challenge
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#FFA500] mb-3">
                The Rules
              </h3>
              <ul className="space-y-2 text-[#9ca3af] text-sm">
                <li className="flex gap-2">
                  <span className="text-[#FF3333]">✓</span>
                  <span>Starting capital: $1,000</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF3333]">✓</span>
                  <span>Only sign-up bonuses and referral rewards allowed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF3333]">✓</span>
                  <span>No additional deposits permitted</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF3333]">✓</span>
                  <span>All trades and moves documented weekly</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF3333]">✓</span>
                  <span>Target: $1,000,000</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#FFA500] mb-3">
                Why This Challenge?
              </h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                Crypto exchanges offer substantial bonuses to new traders. This challenge tests whether those incentives can compound into real wealth. It&apos;s a real money experiment documenting every move, every win, and every mistake. No hype. No fake accounts. Just raw data and honest updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section - Hidden for now */}
      {/* <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937]">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </section> */}

      {/* Recommended Resources */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-6">
            Recommended Resources
          </h2>
          <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#FFA500] uppercase tracking-widest font-medium mb-1">Exchange Reviews & Bonuses</p>
              <Link
                href="/blog/trading365-review-best-crypto-exchange-bonuses"
                className="text-[#f0f0f0] font-semibold text-lg hover:text-[#FFA500] transition-colors"
              >
                Best Crypto Exchange Bonuses 2026
              </Link>
              <p className="text-[#6b7280] text-sm mt-1">Reviews, fee comparisons, and the biggest verified sign-up bonuses.</p>
            </div>
            <Link
              href="/blog/trading365-review-best-crypto-exchange-bonuses"
              className="flex-shrink-0 px-5 py-2 border border-[#FFA500] text-[#FFA500] rounded-lg hover:bg-[#FFA500]/10 transition-colors text-sm font-medium"
            >
              Read →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937] bg-[#0d0d0d]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-2">
              Follow the Journey
            </h2>
            <p className="text-[#9ca3af]">
              New updates every week. Real money. Real results. No nonsense.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors"
          >
            Read All Updates
          </Link>
        </div>
      </section>
    </div>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'
import BlogPostCard from '@/components/blog-post-card'
import NewsletterSignup from '@/components/newsletter-signup'
import { getPosts } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Blog - KIFS Crypto',
  description: 'Weekly updates from the $1,000 to $1,000,000 crypto trading challenge. Real moves. Real results.',
  openGraph: {
    title: 'Blog - KIFS Crypto',
    description: 'Weekly updates from the $1,000 to $1,000,000 crypto trading challenge.',
  },
  canonical: 'https://kifscrypto.com/blog',
}

export default async function BlogPage() {
  let posts = []
  try {
    posts = await getPosts()
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mb-3">
            Journey Updates
          </h1>
          <p className="text-base sm:text-lg text-[#9ca3af]">
            Weekly documentation of the challenge. Strategy, trades, results, and lessons.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#9ca3af] text-lg">
                No published posts yet. Check back soon for the first update.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      {/* <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937]">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-2">
              Want to find the best exchange deals?
            </h2>
            <p className="text-[#9ca3af]">
              Updated weekly with current bonuses and referral offers.
            </p>
          </div>
          <a
            href="https://trading365.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors"
          >
            Explore Trading365.org
          </a>
        </div>
      </section>
    </div>
  )
}

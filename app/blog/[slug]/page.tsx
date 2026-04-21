import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getPublishedPosts } from '@/lib/db'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(
  { params }: BlogPostPageProps,
): Promise<Metadata> {
  const { slug } = await params
  let post = null
  try {
    post = await getPostBySlug(slug)
  } catch (error) {
    console.error('Error fetching post metadata:', error)
  }

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImage = post.balance != null
    ? `https://kifscrypto.com/api/og?title=${encodeURIComponent(post.title)}&balance=${encodeURIComponent(`$${parseFloat(String(post.balance)).toFixed(2)}`)}&week=${post.week ?? ''}`
    : `https://kifscrypto.com/api/og?title=${encodeURIComponent(post.title)}`

  return {
    title: `${post.meta_title || post.title} - KIFS Crypto`,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: `https://kifscrypto.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: 'article',
      url: `https://kifscrypto.com/blog/${post.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      authors: ['KIFS Crypto'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  let posts = []
  try {
    posts = await getPublishedPosts()
  } catch (error) {
    console.error('Error generating static params:', error)
  }
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Exchange URL mapping — bonus = direct referral link, review = Trading365 review
const EXCHANGE_URLS: Record<string, { bonus: string; review: string }> = {
  'BYDFi': {
    bonus: 'https://partner.bydfi.com/register?vipCode=KifsCrypto',
    review: 'https://www.trading365.org/reviews/bydfi-review',
  },
  'MEXC': {
    bonus: 'https://www.mexc.com/?shareCode=mexc-KIFSCrypto',
    review: 'https://trading365.org/reviews/mexc-review',
  },
  'WEEX': {
    bonus: 'https://trading365.org/reviews/weex-review',
    review: 'https://trading365.org/reviews/weex-review',
  },
  'BingX': {
    bonus: 'https://trading365.org/reviews/bingx-review',
    review: 'https://trading365.org/reviews/bingx-review',
  },
  'Bitunix': {
    bonus: 'https://trading365.org/no-kyc/bitunix-review',
    review: 'https://trading365.org/no-kyc/bitunix-review',
  },
  'BloFin': {
    bonus: 'https://trading365.org/no-kyc/blofin-review',
    review: 'https://trading365.org/no-kyc/blofin-review',
  },
  'CoinEx': {
    bonus: 'https://trading365.org/reviews/coinex-review',
    review: 'https://trading365.org/reviews/coinex-review',
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  let post = null
  let posts = []

  try {
    post = await getPostBySlug(slug)
    posts = await getPublishedPosts()
  } catch (error) {
    console.error('Error fetching post data:', error)
  }

  if (!post) {
    notFound()
  }

  // For challenge posts, navigate only between other challenge posts (week != null)
  // For regular articles, navigate between all published posts
  const navPosts = post.week != null ? posts.filter(p => p.week != null) : posts
  const postIndex = navPosts.findIndex((p) => p.slug === slug)
  const previousPost = postIndex < navPosts.length - 1 ? navPosts[postIndex + 1] : null
  const nextPost = postIndex > 0 ? navPosts[postIndex - 1] : null

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "author": { "@type": "Person", "name": "KIFS Crypto" },
        "publisher": { "@type": "Organization", "name": "KIFS Crypto", "url": "https://kifscrypto.com" },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://kifscrypto.com/blog/${post.slug}` }
      }) }} />
      {/* Header */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-b border-[#1f2937]">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/blog" className="text-sm text-[#FFA500] hover:text-[#FFB800] transition-colors">
              ← Back to Blog
            </Link>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.week > 0 && (
              <span className="inline-block px-3 py-1 text-xs font-mono bg-[#FFA500]/10 text-[#FFA500] rounded border border-[#FFA500]/30">
                Week {post.week}
              </span>
            )}
            {post.exchange && (
              <span className="inline-block px-3 py-1 text-xs font-mono bg-[#374151] text-[#9ca3af] rounded border border-[#1f2937]">
                {post.exchange}
              </span>
            )}
            <span className="text-xs text-[#6b7280]">{formattedDate}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] leading-tight mb-4">
            {post.title}
          </h1>

          {/* Balance display — only for journey posts */}
          {post.balance != null && (
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-[#9ca3af]">Current Balance:</span>
              <span className="text-2xl font-bold font-mono text-[#10b981]">
                ${parseFloat(post.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Featured Image */}
          {post.image_url && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden border border-[#1f2937] mb-8">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Stats Bar — only for journey posts */}
          {post.week > 0 && post.balance != null && (
            <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Week</p>
                  <p className="text-2xl font-bold text-[#FFA500]">{post.week}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Exchange</p>
                  <p className="text-lg font-semibold text-[#f0f0f0]">{post.exchange}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Starting</p>
                  <p className="text-lg font-mono font-semibold text-[#9ca3af]">$1,000.00</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1">Balance</p>
                  <p className="text-2xl font-mono font-bold text-[#10b981]">
                    ${parseFloat(post.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#1f2937]">
                <p className="text-sm text-[#9ca3af]">
                  Gain: <span className="font-semibold text-[#10b981]">+{((parseFloat(post.balance) - 1000) / 1000 * 100).toFixed(2)}%</span>
                </p>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-amber max-w-none 
            prose-headings:text-amber-400 prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4
            prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3
            prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2
            prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:my-4
            prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-em:text-zinc-300 prose-em:italic
            prose-code:bg-zinc-800 prose-code:text-amber-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono
            prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700 prose-pre:p-4 prose-pre:rounded-lg
            prose-table:w-full prose-table:border-collapse prose-table:my-4
            prose-td:border prose-td:border-zinc-700 prose-td:p-2 prose-td:text-zinc-300
            prose-th:border prose-th:border-zinc-700 prose-th:p-2 prose-th:bg-zinc-800 prose-th:text-white prose-th:font-bold
            prose-hr:border-zinc-700 prose-hr:my-6
            prose-li:text-zinc-300 prose-li:my-1
            prose-ul:my-4 prose-ol:my-4">
            {post.exchange && EXCHANGE_URLS[post.exchange] && (
              <div className="flex items-center justify-between gap-4 border border-amber-500/40 bg-amber-500/5 rounded-lg p-5 mb-8 hover:bg-amber-500/10 transition-colors">
                <div>
                  <p className="text-amber-400 text-xs font-medium uppercase tracking-widest mb-1">Currently using in the challenge</p>
                  <p className="text-white text-xl font-bold">{post.exchange}</p>
                  <p className="text-zinc-500 text-sm mt-1">Sign-up bonus · Full review · Referral link</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <a
                    href={EXCHANGE_URLS[post.exchange].bonus}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-lg text-sm whitespace-nowrap transition-colors"
                  >
                    Claim {post.exchange} Bonus ↗
                  </a>
                  <a
                    href={EXCHANGE_URLS[post.exchange].review}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-amber-500/50 hover:border-amber-500 text-amber-400 hover:text-amber-300 font-semibold px-6 py-3 rounded-lg text-sm whitespace-nowrap transition-colors"
                  >
                    Full Review →
                  </a>
                </div>
              </div>
            )}
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-white mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-amber-400 mt-6 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="text-zinc-300 leading-relaxed my-4" {...props} />,
              a: ({node, ...props}) => <a className="text-amber-400 no-underline hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
              em: ({node, ...props}) => <em className="italic text-zinc-300" {...props} />,
              code: ({node, inline, ...props}) => inline 
                ? <code className="bg-zinc-800 text-amber-300 px-2 py-1 rounded font-mono text-sm" {...props} />
                : <code className="bg-zinc-900 text-amber-300 px-2 py-1 rounded font-mono block" {...props} />,
              pre: ({node, ...props}) => <pre className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg overflow-x-auto my-4" {...props} />,
              table: ({node, ...props}) => <table className="w-full border-collapse my-4" {...props} />,
              thead: ({node, ...props}) => <thead className="bg-zinc-800" {...props} />,
              tbody: ({node, ...props}) => <tbody {...props} />,
              tr: ({node, ...props}) => <tr className="border-b border-zinc-700" {...props} />,
              td: ({node, ...props}) => <td className="border border-zinc-700 p-2 text-zinc-300" {...props} />,
              th: ({node, ...props}) => <th className="border border-zinc-700 p-2 bg-zinc-800 text-white font-bold text-left" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside my-4 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-zinc-300" {...props} />,
              hr: ({node, ...props}) => <hr className="border-t border-zinc-700 my-6" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-amber-500 pl-4 italic text-zinc-400 my-4" {...props} />,
            }}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Navigation */}
      {(previousPost || nextPost) && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 border-t border-[#1f2937]">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {previousPost ? (
                <Link href={`/blog/${previousPost.slug}`}>
                  <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 hover:border-[#FFA500] transition-colors cursor-pointer group">
                    <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-2">
                      ← Previous
                    </p>
                    <p className="text-sm font-semibold text-[#f0f0f0] group-hover:text-[#FFA500] transition-colors">
                      {previousPost.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`}>
                  <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 hover:border-[#FFA500] transition-colors cursor-pointer group">
                    <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-2 text-right">
                      Next →
                    </p>
                    <p className="text-sm font-semibold text-[#f0f0f0] group-hover:text-[#FFA500] transition-colors text-right">
                      {nextPost.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937] bg-[#0d0d0d]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#f0f0f0] mb-2">
              More insights and exchange deals
            </h2>
            <p className="text-[#9ca3af]">
              Updated weekly at Trading365.org
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="px-6 py-2 border border-[#FFA500] text-[#FFA500] rounded-lg hover:bg-[#FFA500]/10 transition-colors"
            >
              View All Posts
            </Link>
            <a
              href="https://trading365.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors"
            >
              Trading365.org
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

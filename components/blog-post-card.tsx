'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/db'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const isJourneyPost = post.week > 0 && post.balance != null
  const gainIsPositive = isJourneyPost && post.balance >= 1000

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="h-full block bg-[#0d0d0d] border border-[#1f2937] rounded-lg overflow-hidden hover:border-[#FFA500] transition-colors hover:shadow-lg hover:shadow-[#FFA500]/10 cursor-pointer group">
        {/* Featured Image */}
        {post.image_url && (
          <div className="relative w-full h-40 overflow-hidden bg-[#080808]">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Badges */}
          {isJourneyPost && (
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-1 text-xs font-mono bg-[#FFA500]/10 text-[#FFA500] rounded border border-[#FFA500]/30">
                Week {post.week}
              </span>
              {post.exchange && (
                <span className="inline-block px-2 py-1 text-xs font-mono bg-[#374151] text-[#9ca3af] rounded border border-[#1f2937]">
                  {post.exchange}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-[#f0f0f0] group-hover:text-[#FFA500] transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#9ca3af] line-clamp-3">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-end justify-between pt-4 border-t border-[#1f2937]">
            {isJourneyPost ? (
              <div>
                <p className="text-xs text-[#6b7280] mb-1">Balance</p>
                <p className={`text-lg font-bold font-mono ${gainIsPositive ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                  ${post.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            ) : (
              <span className="inline-block px-2 py-1 text-xs font-mono bg-[#374151] text-[#9ca3af] rounded border border-[#1f2937]">
                Resource
              </span>
            )}
            <p className="text-xs text-[#6b7280]">
              {formattedDate}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}



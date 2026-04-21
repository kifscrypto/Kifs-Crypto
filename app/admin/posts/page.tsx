import { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/db'
import DeletePostButton from '@/components/delete-post-button'

export const metadata: Metadata = {
  title: 'Manage Posts - KIFS Crypto Admin',
  robots: 'noindex, nofollow',
}

export default async function AdminPostsPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-[#f0f0f0]">Articles</h1>
            <p className="text-[#9ca3af] text-sm">{posts.length} total · {posts.filter(p => p.published).length} published · {posts.filter(p => !p.published).length} drafts</p>
          </div>
          <Link
            href="/admin/posts/create"
            className="px-6 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors"
          >
            New Article
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="overflow-x-auto bg-[#0d0d0d] border border-[#1f2937] rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f2937]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">Exchange</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#f0f0f0]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2937]">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#f0f0f0] max-w-xs truncate">{post.title}</p>
                      <p className="text-xs text-[#6b7280] font-mono mt-0.5 truncate max-w-xs">/blog/{post.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                          : 'bg-zinc-700/40 text-zinc-400 border border-zinc-600/30'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9ca3af] whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#9ca3af]">
                      {post.exchange ?? <span className="text-[#4b5563]">—</span>}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-[#6b7280] hover:text-[#f0f0f0] transition-colors text-xs"
                        >
                          View ↗
                        </Link>
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="text-[#FFA500] hover:text-[#FFB800] font-medium transition-colors"
                        >
                          Edit
                        </Link>
                        <DeletePostButton id={post.id} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-[#0d0d0d] border border-[#1f2937] rounded-lg">
            <p className="text-[#9ca3af] mb-4">No articles yet</p>
            <Link href="/admin/posts/create" className="text-[#FFA500] hover:text-[#FFB800] font-medium">
              Create your first article
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

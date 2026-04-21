import { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Manage Posts - KIFS Crypto Admin',
  robots: 'noindex, nofollow',
}

export default async function AdminPostsPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-[#f0f0f0]">
                Blog Posts
              </h1>
              <p className="text-[#9ca3af]">
                Manage your journey updates
              </p>
            </div>
            <Link
              href="/admin/posts/create"
              className="px-6 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors"
            >
              New Post
            </Link>
          </div>

          {/* Posts Table */}
          {posts.length > 0 ? (
            <div className="overflow-x-auto bg-[#0d0d0d] border border-[#1f2937] rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1f2937]">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                      Exchange
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                      Week
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#f0f0f0]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2937]">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-[#1f2937] transition-colors">
                      <td className="px-6 py-4 text-sm text-[#f0f0f0]">
                        {post.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#9ca3af]">
                        {post.exchange}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#9ca3af]">
                        {post.week}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#9ca3af]">
                        {new Date(post.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="text-[#FFA500] hover:text-[#FFB800] font-medium"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-[#0d0d0d] border border-[#1f2937] rounded-lg">
              <p className="text-[#9ca3af] mb-4">No posts yet</p>
              <Link
                href="/admin/posts/create"
                className="text-[#FFA500] hover:text-[#FFB800] font-medium"
              >
                Create your first post
              </Link>
            </div>
          )}
        </div>
    </div>
  )
}

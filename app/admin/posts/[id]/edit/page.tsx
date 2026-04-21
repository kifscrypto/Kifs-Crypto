import { Metadata } from 'next'
import AdminEditPostForm from '@/components/admin-edit-post-form'
import { getPostById } from '@/lib/db'
import { notFound } from 'next/navigation'

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: 'Edit Post - KIFS Crypto Admin',
  robots: 'noindex, nofollow',
}

export default async function AdminEditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const post = await getPostById(parseInt(id))

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#f0f0f0]">
            Edit Post
          </h1>
          <p className="text-[#9ca3af]">
            Update this week&apos;s journey entry
          </p>
        </div>

        <AdminEditPostForm post={post} />
      </div>
    </div>
  )
}

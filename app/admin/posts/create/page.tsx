import { Metadata } from 'next'
import AdminPostForm from '@/components/admin-post-form'

export const metadata: Metadata = {
  title: 'Create Post - KIFS Crypto Admin',
  robots: 'noindex, nofollow',
}

export default function AdminCreatePostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#f0f0f0]">
            Create New Post
          </h1>
          <p className="text-[#9ca3af]">
            Document this week&apos;s journey
          </p>
        </div>

        <AdminPostForm />
      </div>
    </div>
  )
}

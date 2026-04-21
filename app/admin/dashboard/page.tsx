import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin Dashboard - KIFS Crypto',
  robots: 'noindex, nofollow',
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f0f0]">
          Dashboard
        </h1>
        <p className="text-[#9ca3af]">
          Manage your KIFS Crypto challenge
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Manage Posts */}
        <Link href="/admin/posts" className="block group">
          <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 hover:border-[#FFA500] transition-colors">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-2">
              Blog Posts
            </h2>
            <p className="text-[#9ca3af] mb-4">
              Create, edit, and manage your weekly journey updates
            </p>
            <div className="text-[#FFA500] font-medium">
              Manage Posts →
            </div>
          </div>
        </Link>

        {/* Update Journey Stats */}
        <Link href="/admin/journey-stats" className="block group">
          <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 hover:border-[#FFA500] transition-colors">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-2">
              Journey Stats
            </h2>
            <p className="text-[#9ca3af] mb-4">
              Update your balance, week number, and progress metrics
            </p>
            <div className="text-[#FFA500] font-medium">
              Update Stats →
            </div>
          </div>
        </Link>
      </div>

      {/* Instructions */}
      <div className="bg-[#FFA500]/10 border border-[#FFA500]/30 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#FFA500]">
          Getting Started
        </h3>
        <ul className="space-y-2 text-[#9ca3af] text-sm">
          <li className="flex gap-2">
            <span className="text-[#FFA500]">1.</span>
            <span>Update your journey stats at the start of each week</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#FFA500]">2.</span>
            <span>Create a new blog post documenting your week&apos;s activities</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#FFA500]">3.</span>
            <span>The homepage will automatically refresh with your latest data</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import AdminJourneyStatsForm from '@/components/admin-journey-stats-form'
import { getJourneyStats } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Journey Stats - KIFS Crypto Admin',
  robots: 'noindex, nofollow',
}

export default async function AdminJourneyStatsPage() {
  const stats = await getJourneyStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#f0f0f0]">
            Journey Stats
          </h1>
          <p className="text-[#9ca3af]">
            Update your progress metrics
          </p>
        </div>

        {stats && <AdminJourneyStatsForm initialData={stats} />}
      </div>
    </div>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { getTopAffiliateClicks } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const days = parseInt(searchParams.get('days') || '30')

    const stats = await getTopAffiliateClicks(limit, days)

    console.log('[v0] Fetched affiliate stats:', {
      limit,
      days,
      count: stats.length,
    })

    return NextResponse.json({
      stats,
      period: `Last ${days} days`,
      total_clicks: stats.reduce((sum, s) => sum + (Number(s.total_clicks) || 0), 0),
    })
  } catch (error) {
    console.error('[v0] Error fetching affiliate stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch affiliate stats' },
      { status: 500 }
    )
  }
}

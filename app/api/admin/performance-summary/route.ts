import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const API_KEY = process.env.BEEHIIV_API_KEY
    const PUB_ID = process.env.BEEHIIV_PUBLICATION_ID

    if (!API_KEY || !PUB_ID) {
      console.error('[v0] Missing Beehiiv environment variables')
      return NextResponse.json(
        { error: 'Beehiiv not configured' },
        { status: 500 }
      )
    }

    // Fetch publication stats from Beehiiv
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    )

    if (!res.ok) {
      console.error('[v0] Beehiiv API error:', res.status)
      return NextResponse.json(
        { error: 'Failed to fetch Beehiiv data' },
        { status: 500 }
      )
    }

    const pubData = await res.json()

    return NextResponse.json({
      subscribers: pubData.data?.statistics?.free_subscribers || 0,
      paid_subscribers: pubData.data?.statistics?.paid_subscribers || 0,
      total_subscribers: (pubData.data?.statistics?.free_subscribers || 0) + (pubData.data?.statistics?.paid_subscribers || 0),
    })
  } catch (error) {
    console.error('[v0] Performance summary error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch performance data' },
      { status: 500 }
    )
  }
}

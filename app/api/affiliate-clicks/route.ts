import { NextRequest, NextResponse } from 'next/server'
import { trackAffiliateClick } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { exchange, referralUrl } = await req.json()

    if (!exchange || !referralUrl) {
      return NextResponse.json(
        { error: 'Missing exchange or referralUrl' },
        { status: 400 }
      )
    }

    // Track in database
    await trackAffiliateClick(exchange, referralUrl)

    // Also track in Vercel Web Analytics
    console.log('[v0] Affiliate click tracked:', { exchange, referralUrl })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error tracking affiliate click:', error)
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    )
  }
}

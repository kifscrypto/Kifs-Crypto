import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const API_KEY = process.env.BEEHIIV_API_KEY
    const PUB_ID = process.env.BEEHIIV_PUBLICATION_ID

    if (!API_KEY || !PUB_ID) {
      console.error('[v0] Missing Beehiiv environment variables')
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      )
    }

    // Call Beehiiv API v2 to subscribe
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'kifscrypto.com',
          utm_medium: 'organic',
          utm_campaign: '1m_challenge_signup',
        }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      console.error('[v0] Beehiiv API error:', data)
      
      // If email already exists, that's still a success
      if (res.status === 409) {
        return NextResponse.json({ success: true })
      }

      return NextResponse.json(
        { error: data.errors?.[0]?.message || 'Failed to subscribe' },
        { status: res.status }
      )
    }

    console.log('[v0] Newsletter subscription successful for:', email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title') || 'KIFS Crypto'
    const balance = searchParams.get('balance') || '$1,247.50'
    const week = searchParams.get('week') || '1'

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1200px',
            height: '630px',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative border */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #FFA500 0%, #FFB800 100%)',
            }}
          />

          {/* Top section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontSize: '48px',
                fontWeight: '700',
                color: '#f0f0f0',
                lineHeight: '1.2',
                maxWidth: '100%',
              }}
            >
              {title}
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '16px', color: '#9ca3af' }}>Current Balance</div>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#10b981',
                    fontFamily: 'monospace',
                  }}
                >
                  {balance}
                </div>
              </div>
              <div
                style={{
                  width: '2px',
                  height: '60px',
                  background: '#374151',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '16px', color: '#9ca3af' }}>Week</div>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#FFA500',
                    fontFamily: 'monospace',
                  }}
                >
                  {week}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: '1px solid #374151',
            }}
          >
            <div style={{ fontSize: '18px', color: '#FFA500', fontWeight: '600' }}>
              kifscrypto.com
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              $1M Challenge • Real Money Trading
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('[v0] OG image generation error:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}

import { useCallback } from 'react'

export function useTrackAffiliateClick() {
  const trackClick = useCallback(async (exchange: string, referralUrl: string) => {
    try {
      // Track in database
      await fetch('/api/affiliate-clicks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exchange, referralUrl }),
      })

      // Track in Vercel Web Analytics
      if (typeof window !== 'undefined' && window.va) {
        window.va?.('event', {
          name: 'Affiliate Click',
          data: {
            exchange,
            referralUrl,
          },
        })
      }

      console.log('[v0] Affiliate click tracked:', { exchange, referralUrl })
    } catch (error) {
      console.error('[v0] Error tracking affiliate click:', error)
    }
  }, [])

  return { trackClick }
}

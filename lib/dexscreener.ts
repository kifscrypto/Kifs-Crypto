/**
 * DEXScreener API wrapper for fetching meme coin data
 */

export interface DexPair {
  chainId: string
  dexId: string
  pairAddress: string
  baseToken: {
    address: string
    name: string
    symbol: string
  }
  quoteToken: {
    address: string
    name: string
    symbol: string
  }
  priceUsd: string
  liquidity?: {
    usd: number
    base: number
    quote: number
  }
  volume?: {
    h24: number
    h6: number
    h1: number
    m5: number
  }
  priceChange?: {
    h24: number
    h6: number
    h1: number
    m5: number
  }
  txns?: {
    h24?: { buys: number; sells: number }
    h6?: { buys: number; sells: number }
    h1?: { buys: number; sells: number }
    m5?: { buys: number; sells: number }
  }
  makers?: number
  fdv?: number
  marketCap?: number
  pairCreatedAt?: number
  info?: {
    imageUrl?: string
    websites?: Array<{ url: string }>
    socials?: Array<{ type: string; url: string }>
  }
}

export interface SearchPairsParams {
  q?: string
  chainId?: string
  limit?: number
  sort?: 'v24hChangePercent' | 'createdAt' | 'pairCreatedAt'
  order?: 'desc' | 'asc'
}

/**
 * Search for pairs on DEXScreener
 */
export async function searchPairs(params: SearchPairsParams): Promise<DexPair[]> {
  const queryParams = new URLSearchParams()

  if (params.q) queryParams.append('q', params.q)
  if (params.chainId) queryParams.append('chainId', params.chainId)
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.sort) queryParams.append('sort', params.sort)
  if (params.order) queryParams.append('order', params.order)

  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/search?${queryParams}`, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`[v0] DEXScreener API error: ${response.status}`)
      return []
    }

    const data = await response.json()
    return data.pairs || []
  } catch (error) {
    console.error('[v0] DEXScreener fetch error:', error)
    return []
  }
}

/**
 * Get latest pairs for a specific chain (uses boosts to find newly created pairs)
 */
export async function getLatestPairs(chainId: 'base' | 'solana', limit: number = 100): Promise<DexPair[]> {
  try {
    // DEXScreener returns boosted (hot) pairs at top - good for finding new launches
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${chainId}?limit=${limit}`,
      {
        headers: { 'Accept': 'application/json' },
      }
    )

    if (!response.ok) {
      console.error(`[v0] DEXScreener API error: ${response.status}`)
      return []
    }

    const data = await response.json()
    return data.pairs || []
  } catch (error) {
    console.error('[v0] DEXScreener fetch error:', error)
    return []
  }
}

/**
 * Get pair data for a specific pair address
 */
export async function getPairData(chainId: string, pairAddress: string): Promise<DexPair | null> {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/pair/${chainId}/${pairAddress}`,
      {
        headers: { 'Accept': 'application/json' },
      }
    )

    if (!response.ok) {
      console.error(`[v0] DEXScreener API error: ${response.status}`)
      return null
    }

    const data = await response.json()
    return data.pair || null
  } catch (error) {
    console.error('[v0] DEXScreener fetch error:', error)
    return null
  }
}

/**
 * Filter pairs based on KIFS Scan criteria
 * - Minimum liquidity: $5,000
 * - Minimum 24h transactions: 10 buys
 */
export function filterScanCriteria(pairs: DexPair[]): DexPair[] {
  return pairs.filter((pair) => {
    // Check liquidity
    const liquidityUsd = pair.liquidity?.usd || 0
    if (liquidityUsd < 5000) return false

    // Check transaction volume
    const h24Buys = pair.txns?.h24?.buys || 0
    if (h24Buys < 10) return false

    // Must have both tokens
    if (!pair.baseToken || !pair.quoteToken) return false

    return true
  })
}

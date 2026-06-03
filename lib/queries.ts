'use server'

import { sql } from '@vercel/postgres'

export interface CoinWithData {
  id: string
  pair_address: string
  base_token_symbol: string
  base_token_name: string
  chain: 'base' | 'solana'
  price_usd: string
  liquidity_usd: number
  market_cap: number | null
  status: string
  first_seen_at: string
  updated_at: string
  volume_24h: number
  price_change_24h: number
  txns_24h_buys: number
  txns_24h_sells: number
  verdict?: string | null
  verdict_score?: number | null
  review_title?: string | null
}

export interface CoinsResponse {
  coins: CoinWithData[]
  total: number
  page: number
  pageSize: number
}

/**
 * Get coins with their latest data and verdicts
 */
export async function getCoins(
  page: number = 1,
  pageSize: number = 50,
  chain?: 'base' | 'solana',
  verdict?: string,
  sortBy: 'liquidity' | 'age' | 'volume' = 'age'
): Promise<CoinsResponse> {
  try {
    // Build query
    let whereClause = 'WHERE c.status = $1'
    const params: (string | number)[] = ['active']
    let paramIndex = 2

    if (chain) {
      whereClause += ` AND c.chain = $${paramIndex}`
      params.push(chain)
      paramIndex++
    }

    if (verdict) {
      whereClause += ` AND r.verdict = $${paramIndex}`
      params.push(verdict)
      paramIndex++
    }

    // Determine sort order
    let orderClause = 'ORDER BY c.first_seen_at DESC'
    if (sortBy === 'liquidity') {
      orderClause = 'ORDER BY c.liquidity_usd DESC'
    } else if (sortBy === 'volume') {
      orderClause = 'ORDER BY cd.volume_24h DESC'
    }

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as count FROM coins c
      LEFT JOIN reviews r ON c.id = r.coin_id
      ${whereClause}
    `

    const countResult = await sql.query(countQuery, params)
    const total = parseInt(countResult.rows[0]?.count || '0')

    // Get paginated results with latest data and reviews
    const offset = (page - 1) * pageSize

    const dataQuery = `
      SELECT 
        c.id,
        c.pair_address,
        c.base_token_symbol,
        c.base_token_name,
        c.chain,
        c.price_usd,
        c.liquidity_usd,
        c.market_cap,
        c.status,
        c.first_seen_at,
        c.updated_at,
        cd.volume_24h,
        cd.price_change_24h,
        cd.txns_24h_buys,
        cd.txns_24h_sells,
        r.verdict,
        r.verdict_score,
        r.title as review_title
      FROM coins c
      LEFT JOIN LATERAL (
        SELECT * FROM coin_data 
        WHERE coin_id = c.id 
        ORDER BY recorded_at DESC 
        LIMIT 1
      ) cd ON true
      LEFT JOIN LATERAL (
        SELECT * FROM reviews 
        WHERE coin_id = c.id AND published = true
        ORDER BY published_at DESC 
        LIMIT 1
      ) r ON true
      ${whereClause}
      ${orderClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `

    const dataResult = await sql.query(dataQuery, [...params, pageSize, offset])

    return {
      coins: dataResult.rows as CoinWithData[],
      total,
      page,
      pageSize,
    }
  } catch (error) {
    console.error('[v0] Error fetching coins:', error)
    throw error
  }
}

/**
 * Get a single coin with all its data
 */
export async function getCoinBySlug(slug: string): Promise<CoinWithData | null> {
  try {
    const result = await sql`
      SELECT 
        c.id,
        c.pair_address,
        c.base_token_symbol,
        c.base_token_name,
        c.chain,
        c.price_usd,
        c.liquidity_usd,
        c.market_cap,
        c.status,
        c.first_seen_at,
        c.updated_at,
        cd.volume_24h,
        cd.price_change_24h,
        cd.txns_24h_buys,
        cd.txns_24h_sells,
        r.verdict,
        r.verdict_score,
        r.title as review_title
      FROM coins c
      LEFT JOIN LATERAL (
        SELECT * FROM coin_data 
        WHERE coin_id = c.id 
        ORDER BY recorded_at DESC 
        LIMIT 1
      ) cd ON true
      LEFT JOIN LATERAL (
        SELECT * FROM reviews 
        WHERE coin_id = c.id AND published = true
        ORDER BY published_at DESC 
        LIMIT 1
      ) r ON true
      WHERE c.pair_address = ${slug}
      LIMIT 1
    `

    return result.rows[0] as CoinWithData | undefined || null
  } catch (error) {
    console.error('[v0] Error fetching coin:', error)
    throw error
  }
}

/**
 * Get stats summary for the dashboard
 */
export async function getCoinsStats(): Promise<{
  total_launches_24h: number
  verdict_counts: Record<string, number>
  chain_counts: Record<string, number>
}> {
  try {
    // Get totals for today
    const statsResult = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE DATE(first_seen_at) = CURRENT_DATE) as total_24h,
        COUNT(*) FILTER (WHERE r.verdict = 'BUY_THE_BITCH') as buy_count,
        COUNT(*) FILTER (WHERE r.verdict = 'TREAD_CAREFULLY') as tread_count,
        COUNT(*) FILTER (WHERE r.verdict = 'SMELLS_LIKE_RUG') as rug_count,
        COUNT(*) FILTER (WHERE r.verdict = 'STAY_AWAY') as stay_away_count,
        COUNT(*) FILTER (WHERE c.chain = 'base') as base_count,
        COUNT(*) FILTER (WHERE c.chain = 'solana') as solana_count
      FROM coins c
      LEFT JOIN reviews r ON c.id = r.coin_id AND r.published = true
      WHERE c.status = 'active'
    `

    const row = statsResult.rows[0]

    return {
      total_launches_24h: parseInt(row?.total_24h || '0'),
      verdict_counts: {
        BUY_THE_BITCH: parseInt(row?.buy_count || '0'),
        TREAD_CAREFULLY: parseInt(row?.tread_count || '0'),
        SMELLS_LIKE_RUG: parseInt(row?.rug_count || '0'),
        STAY_AWAY: parseInt(row?.stay_away_count || '0'),
      },
      chain_counts: {
        base: parseInt(row?.base_count || '0'),
        solana: parseInt(row?.solana_count || '0'),
      },
    }
  } catch (error) {
    console.error('[v0] Error fetching stats:', error)
    return {
      total_launches_24h: 0,
      verdict_counts: {
        BUY_THE_BITCH: 0,
        TREAD_CAREFULLY: 0,
        SMELLS_LIKE_RUG: 0,
        STAY_AWAY: 0,
      },
      chain_counts: {
        base: 0,
        solana: 0,
      },
    }
  }
}

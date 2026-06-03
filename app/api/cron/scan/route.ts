import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getLatestPairs, filterScanCriteria } from '@/lib/dexscreener'

export const maxDuration = 60

async function scanChain(chain: 'base' | 'solana', chainId: string) {
  console.log(`[v0] Scanning ${chain}...`)

  try {
    // Fetch latest pairs from DEXScreener
    const pairs = await getLatestPairs(chain, 50)
    const filtered = filterScanCriteria(pairs)

    console.log(`[v0] Found ${filtered.length} new pairs on ${chain}`)

    for (const pair of filtered) {
      // Check if coin already exists
      const existing = await sql`
        SELECT id FROM coins 
        WHERE pair_address = ${pair.pairAddress} 
        AND chain = ${chain}
        LIMIT 1
      `

      const liquidityUsd = pair.liquidity?.usd || 0
      const volume24h = pair.volume?.h24 || 0
      const priceChange24h = pair.priceChange?.h24 || 0
      const txnsH24Buy = pair.txns?.h24?.buys || 0
      const txnsH24Sell = pair.txns?.h24?.sells || 0

      if (existing.rows.length === 0) {
        // Insert new coin
        console.log(`[v0] Inserting new coin: ${pair.baseToken.symbol} on ${chain}`)

        const insertResult = await sql`
          INSERT INTO coins (
            pair_address,
            base_token_address,
            base_token_name,
            base_token_symbol,
            quote_token_address,
            quote_token_symbol,
            chain,
            dex,
            price_usd,
            liquidity_usd,
            market_cap,
            status,
            first_seen_at
          ) VALUES (
            ${pair.pairAddress},
            ${pair.baseToken.address},
            ${pair.baseToken.name},
            ${pair.baseToken.symbol},
            ${pair.quoteToken.address},
            ${pair.quoteToken.symbol},
            ${chain},
            ${pair.dexId || 'unknown'},
            ${pair.priceUsd},
            ${liquidityUsd},
            ${pair.marketCap || null},
            ${'new'},
            NOW()
          )
          RETURNING id
        `

        const coinId = insertResult.rows[0].id

        // Insert initial data snapshot
        await sql`
          INSERT INTO coin_data (
            coin_id,
            price_usd,
            liquidity_usd,
            volume_24h,
            price_change_24h,
            txns_24h_buys,
            txns_24h_sells,
            makers,
            recorded_at
          ) VALUES (
            ${coinId},
            ${pair.priceUsd},
            ${liquidityUsd},
            ${volume24h},
            ${priceChange24h},
            ${txnsH24Buy},
            ${txnsH24Sell},
            ${pair.makers || null},
            NOW()
          )
        `

        console.log(`[v0] Created new coin record: ${coinId}`)
      } else {
        // Update existing coin with latest data
        const coinId = existing.rows[0].id

        await sql`
          UPDATE coins SET
            price_usd = ${pair.priceUsd},
            liquidity_usd = ${liquidityUsd},
            market_cap = ${pair.marketCap || null},
            updated_at = NOW()
          WHERE id = ${coinId}
        `

        // Add data snapshot
        await sql`
          INSERT INTO coin_data (
            coin_id,
            price_usd,
            liquidity_usd,
            volume_24h,
            price_change_24h,
            txns_24h_buys,
            txns_24h_sells,
            makers,
            recorded_at
          ) VALUES (
            ${coinId},
            ${pair.priceUsd},
            ${liquidityUsd},
            ${volume24h},
            ${priceChange24h},
            ${txnsH24Buy},
            ${txnsH24Sell},
            ${pair.makers || null},
            NOW()
          )
        `
      }
    }

    return { success: true, chain, scanned: filtered.length }
  } catch (error) {
    console.error(`[v0] Error scanning ${chain}:`, error)
    return { success: false, chain, error: String(error) }
  }
}

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log('[v0] Starting coin scan...')

  try {
    const baseResult = await scanChain('base', 'base')
    const solanaResult = await scanChain('solana', 'solana')

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results: [baseResult, solanaResult],
    })
  } catch (error) {
    console.error('[v0] Cron job error:', error)
    return NextResponse.json(
      { error: 'Scan failed', details: String(error) },
      { status: 500 }
    )
  }
}

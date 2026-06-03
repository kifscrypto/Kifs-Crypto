import { Metadata } from 'next'
import Link from 'next/link'
import { getCoins, getCoinsStats } from '@/lib/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export const metadata: Metadata = {
  title: 'KIFS Scan — Meme Coin Scanner | BASE + Solana',
  description: 'Real-time meme coin scanner for BASE and Solana. Blunt verdicts. No fluff. Scan it before you ape in.',
  openGraph: {
    title: 'KIFS Scan — Meme Coin Scanner | BASE + Solana',
    description: 'Real-time meme coin scanner for BASE and Solana. Blunt verdicts. No fluff. Scan it before you ape in.',
  },
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
  return `$${num.toFixed(0)}`
}

function formatAge(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'now'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  return `${diffDays}d`
}

const getVerdictStyles = (verdict: string) => {
  const normalizedVerdict = verdict.toUpperCase().replace(/\s+/g, '_')
  
  switch (normalizedVerdict) {
    case 'BUY_THE_BITCH':
      return 'bg-[#001a0a] text-[#00cc66] border border-[#004d1e]'
    case 'TREAD_CAREFULLY':
      return 'bg-[#1a1200] text-[#ffaa00] border border-[#4d3600]'
    case 'SMELLS_LIKE_A_RUG':
      return 'bg-[#1a0000] text-[#ff4444] border border-[#4d0000]'
    case 'STAY_THE_F***_AWAY':
      return 'bg-[#0d0000] text-[#ff2222] border border-[#330000]'
    case 'PENDING_REVIEW':
      return 'bg-[#111111] text-[#444444] border border-[#1f1f1f]'
    default:
      return 'bg-[#111111] text-[#555555] border border-[#1f1f1f]'
  }
}

const getChainStyles = (chain: string) => {
  if (chain === 'SOL') {
    return 'bg-[#1a0a2e] text-[#aa77ff] border border-[#441a66]'
  }
  return 'bg-[#0a1628] text-[#4488ff] border border-[#1a3366]'
}

export default async function Home() {
  const [coinsData, statsData] = await Promise.all([getCoins(1, 8), getCoinsStats()])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Scan it before you ape in.
            </h1>

            {/* Live Status */}
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#ff3333] rounded-full animate-pulse"></span>
              <span className="text-xs text-[#555555] tracking-widest">
                LIVE · BASE + SOLANA · UPDATED EVERY 60S
              </span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-[3px] p-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">{statsData.total_launches_24h}</div>
                <div className="text-xs text-[#555555] mt-1">LAUNCHES TODAY</div>
              </div>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-[3px] p-4">
                <div className="text-2xl sm:text-3xl font-bold text-[#00cc66]">{statsData.verdict_counts.BUY_THE_BITCH}</div>
                <div className="text-xs text-[#555555] mt-1">BUY THE BITCH</div>
              </div>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-[3px] p-4">
                <div className="text-2xl sm:text-3xl font-bold text-[#ffaa00]">{statsData.verdict_counts.TREAD_CAREFULLY}</div>
                <div className="text-xs text-[#555555] mt-1">TREAD CAREFULLY</div>
              </div>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-[3px] p-4">
                <div className="text-2xl sm:text-3xl font-bold text-[#ff3333]">{statsData.verdict_counts.STAY_AWAY}</div>
                <div className="text-xs text-[#555555] mt-1">STAY AWAY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-[#1f1f1f] bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <Link href="/blog/kifscrypto-is-now-kifs-scan" className="block p-4 bg-[#0a0a0a] border border-[#ff3333]/20 rounded-[3px] hover:border-[#ff3333]/50 transition-colors group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-xs text-[#ff3333] font-medium mb-2">ANNOUNCEMENT</div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ff3333] transition-colors">
                  The challenge is over. KIFS Scan is live.
                </h3>
                <p className="text-sm text-[#555555] mt-2">
                  From the $1k challenge to meme coin scanner — here&apos;s what changed and why.
                </p>
              </div>
              <div className="text-[#ff3333] text-xl leading-none group-hover:translate-x-1 transition-transform">→</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Search Bar */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Search by token name or contract address..."
            className="w-full bg-[#0f0f0f] border border-[#1f1f1f] rounded-[3px] px-4 py-3 text-[#e8e8e8] placeholder-[#555555] focus:outline-none focus:border-[#ff3333] transition-colors"
          />
        </div>
      </section>

      {/* Filter Row */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-transparent border border-[#ff3333] text-[#ff3333] rounded-[3px] text-sm whitespace-nowrap hover:bg-[#ff3333]/10 transition-colors">
              ALL
            </button>
            <button className="px-4 py-2 bg-transparent border border-[#1f1f1f] text-[#555555] rounded-[3px] text-sm whitespace-nowrap hover:border-[#4488ff] hover:text-[#4488ff] transition-colors">
              BASE
            </button>
            <button className="px-4 py-2 bg-transparent border border-[#1f1f1f] text-[#555555] rounded-[3px] text-sm whitespace-nowrap hover:border-[#aa77ff] hover:text-[#aa77ff] transition-colors">
              SOLANA
            </button>
            <button className="px-4 py-2 bg-transparent border border-[#1f1f1f] text-[#555555] rounded-[3px] text-sm whitespace-nowrap hover:border-[#00cc66] hover:text-[#00cc66] transition-colors">
              BUY THE BITCH
            </button>
            <button className="px-4 py-2 bg-transparent border border-[#1f1f1f] text-[#555555] rounded-[3px] text-sm whitespace-nowrap hover:border-[#ffaa00] hover:text-[#ffaa00] transition-colors">
              TREAD CAREFULLY
            </button>
            <button className="px-4 py-2 bg-transparent border border-[#1f1f1f] text-[#555555] rounded-[3px] text-sm whitespace-nowrap hover:border-[#ff3333] hover:text-[#ff3333] transition-colors">
              STAY AWAY
            </button>
            <button className="px-4 py-2 bg-transparent border border-[#1f1f1f] text-[#555555] rounded-[3px] text-sm whitespace-nowrap hover:border-[#e8e8e8] hover:text-[#e8e8e8] transition-colors">
              REVIEWED
            </button>
            <button className="px-4 py-2 bg-transparent border border-[#1f1f1f] text-[#555555] rounded-[3px] text-sm whitespace-nowrap hover:border-[#e8e8e8] hover:text-[#e8e8e8] transition-colors">
              TRENDING
            </button>
          </div>
        </div>
      </section>

      {/* Scanner Feed Table */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-6 border-t border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  <th className="text-left py-3 px-4 text-[#555555] font-medium">TOKEN</th>
                  <th className="text-left py-3 px-4 text-[#555555] font-medium">VERDICT</th>
                  <th className="text-right py-3 px-4 text-[#555555] font-medium">MKT CAP</th>
                  <th className="text-right py-3 px-4 text-[#555555] font-medium">LIQUIDITY</th>
                  <th className="text-right py-3 px-4 text-[#555555] font-medium">24H</th>
                  <th className="text-right py-3 px-4 text-[#555555] font-medium">AGE</th>
                </tr>
              </thead>
              <tbody>
                {coinsData.coins.map((coin) => {
                  const verdict = coin.verdict || 'PENDING_REVIEW'
                  const verdictLabel = verdict
                    .replace(/_/g, ' ')
                    .split(' ')
                    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
                    .join(' ')

                  return (
                    <tr key={coin.id} className="border-b border-[#1f1f1f] hover:bg-[#111111] transition-colors cursor-pointer">
                      <td className="py-3 px-4 text-[#e8e8e8] font-medium">
                        <Link href={`/coins/${coin.pair_address}`} className="hover:text-[#ff3333] transition-colors">
                          <div className="flex items-center gap-2">
                            <span>${coin.base_token_symbol}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-[2px] ${getChainStyles(coin.chain === 'solana' ? 'SOL' : 'BASE')}`}>
                              {coin.chain === 'solana' ? 'SOL' : 'BASE'}
                            </span>
                          </div>
                          <div className="text-xs text-[#555555] mt-1">{coin.base_token_name}</div>
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-[3px] text-xs font-medium inline-block whitespace-nowrap ${getVerdictStyles(verdictLabel)}`}>
                          {verdictLabel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-[#e8e8e8]">{formatNumber(coin.market_cap || 0)}</td>
                      <td className="py-3 px-4 text-right text-[#e8e8e8]">{formatNumber(coin.liquidity_usd)}</td>
                      <td className={`py-3 px-4 text-right font-medium ${coin.price_change_24h >= 0 ? 'text-[#00cc66]' : 'text-[#ff3333]'}`}>
                        {coin.price_change_24h >= 0 ? '+' : ''}{coin.price_change_24h.toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 text-right text-[#555555]">{formatAge(coin.first_seen_at)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer Bar */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-[#1f1f1f] bg-[#111111]">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-[#555555]">
          <div>SHOWING {coinsData.coins.length} OF {coinsData.total} LAUNCHES · LAST 24H</div>
          <div className="flex gap-6">
            <span>
              {statsData.verdict_counts.BUY_THE_BITCH} BUY · {statsData.verdict_counts.TREAD_CAREFULLY} TREAD · {statsData.verdict_counts.STAY_AWAY} STAY
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

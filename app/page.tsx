import { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'KIFS Scan — Meme Coin Scanner | BASE + Solana',
  description: 'Real-time meme coin scanner for BASE and Solana. Blunt verdicts. No fluff. Scan it before you ape in.',
  openGraph: {
    title: 'KIFS Scan — Meme Coin Scanner | BASE + Solana',
    description: 'Real-time meme coin scanner for BASE and Solana. Blunt verdicts. No fluff. Scan it before you ape in.',
  },
  canonical: 'https://kifscrypto.com',
}

const mockData = [
  { token: '$RIBBIT', chain: 'SOL', verdict: 'BUY THE BITCH', mktCap: '$2.1M', liquidity: '$340K', change: '+1,840%', age: '5h', trending: true },
  { token: '$HONK', chain: 'BASE', verdict: 'BUY THE BITCH', mktCap: '$184K', liquidity: '$62K', change: '+284%', age: '2h', trending: false },
  { token: '$FLORK', chain: 'BASE', verdict: 'TREAD CAREFULLY', mktCap: '$93K', liquidity: '$29K', change: '+441%', age: '3h', trending: false },
  { token: '$BONKR', chain: 'SOL', verdict: 'PENDING REVIEW', mktCap: '$28K', liquidity: '$11K', change: '+118%', age: '22m', trending: false },
  { token: '$GAZL', chain: 'SOL', verdict: 'TREAD CAREFULLY', mktCap: '$47K', liquidity: '$18K', change: '+62%', age: '1h', trending: false },
  { token: '$PEPPA', chain: 'BASE', verdict: 'PENDING REVIEW', mktCap: '$54K', liquidity: '$21K', change: '+203%', age: '34m', trending: false },
  { token: '$MWAV', chain: 'BASE', verdict: 'SMELLS LIKE A RUG', mktCap: '$12K', liquidity: '$4K', change: '-38%', age: '43m', trending: false },
  { token: '$SNEK2', chain: 'SOL', verdict: 'STAY THE F*** AWAY', mktCap: '$8K', liquidity: '$3K', change: '-14%', age: '1h', trending: false },
]

const getVerdictStyles = (verdict: string) => {
  switch (verdict) {
    case 'BUY THE BITCH':
      return 'bg-[#001a0a] text-[#00cc66] border border-[#004d1e]'
    case 'TREAD CAREFULLY':
      return 'bg-[#1a1200] text-[#ffaa00] border border-[#4d3600]'
    case 'SMELLS LIKE A RUG':
      return 'bg-[#1a0000] text-[#ff4444] border border-[#4d0000]'
    case 'STAY THE F*** AWAY':
      return 'bg-[#0d0000] text-[#ff2222] border border-[#330000]'
    case 'PENDING REVIEW':
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

export default function Home() {
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
                <div className="text-2xl sm:text-3xl font-bold text-white">247</div>
                <div className="text-xs text-[#555555] mt-1">LAUNCHES TODAY</div>
              </div>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-[3px] p-4">
                <div className="text-2xl sm:text-3xl font-bold text-[#00cc66]">31</div>
                <div className="text-xs text-[#555555] mt-1">BUY THE BITCH</div>
              </div>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-[3px] p-4">
                <div className="text-2xl sm:text-3xl font-bold text-[#ffaa00]">84</div>
                <div className="text-xs text-[#555555] mt-1">TREAD CAREFULLY</div>
              </div>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-[3px] p-4">
                <div className="text-2xl sm:text-3xl font-bold text-[#ff3333]">112</div>
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
                {mockData.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#1f1f1f] hover:bg-[#111111] transition-colors cursor-pointer">
                    <td className="py-3 px-4 text-[#e8e8e8] font-medium">
                      <Link href={`/coins/${row.token.toLowerCase().replace('$', '')}`} className="hover:text-[#ff3333] transition-colors">
                        <div className="flex items-center gap-2">
                          <span>{row.token}</span>
                          {row.trending && <span className="text-[#ff3333] text-xs">🔥</span>}
                        </div>
                        <div className="text-xs text-[#555555]">{row.chain}</div>
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-[3px] text-xs font-medium inline-block whitespace-nowrap ${getVerdictStyles(row.verdict)}`}>
                        {row.verdict}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-[#e8e8e8]">{row.mktCap}</td>
                    <td className="py-3 px-4 text-right text-[#e8e8e8]">{row.liquidity}</td>
                    <td className={`py-3 px-4 text-right font-medium ${row.change.startsWith('+') ? 'text-[#00cc66]' : 'text-[#ff3333]'}`}>
                      {row.change}
                    </td>
                    <td className="py-3 px-4 text-right text-[#555555]">{row.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer Bar */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-[#1f1f1f] bg-[#111111]">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-[#555555]">
          <div>SHOWING 8 OF 247 LAUNCHES · LAST 24H</div>
          <div className="flex gap-6">
            <span>31 BUY · 84 TREAD · 112 STAY</span>
          </div>
        </div>
      </section>
    </div>
  )
}

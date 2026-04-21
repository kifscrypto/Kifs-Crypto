'use client'

import {
  getAllExchanges,
  getHighlightedExchanges,
  trackAffiliateClick,
  type AffiliateExchange,
} from '@/lib/affiliate-config'
import { Check, X } from 'lucide-react'

export default function AffiliateComparisonTable() {
  const exchanges = getAllExchanges()
  const highlighted = getHighlightedExchanges()

  const handleExchangeClick = (exchangeId: string, source: string) => {
    trackAffiliateClick(exchangeId, source)
  }

  return (
    <div className="w-full space-y-8">
      {/* Featured Exchanges */}
      {highlighted.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-amber-400">Featured Exchanges</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {highlighted.map((exchange) => (
              <div
                key={exchange.id}
                className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/40 rounded-lg p-6 hover:border-amber-500/60 transition-colors"
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{exchange.name}</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-amber-400 font-semibold">{exchange.bonus}</span>
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">
                        ★ {exchange.trustScore}/10
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Trading Fee</span>
                      <span className="text-white font-mono">{exchange.tradingFee}</span>
                    </div>
                    {exchange.referralBonus && (
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>Referral</span>
                        <span className="text-white font-mono">{exchange.referralBonus}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {exchange.pros.slice(0, 2).map((pro, idx) => (
                        <span key={idx} className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
                          ✓ {pro}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={exchange.bonusLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleExchangeClick(exchange.id, 'featured_card')}
                    className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Claim {exchange.name} Bonus
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Comparison Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">All Exchanges Comparison</h3>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Exchange</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Bonus</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Fee</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">KYC</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Rating</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {exchanges.map((exchange) => (
                <tr key={exchange.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">{exchange.name}</div>
                    <div className="text-xs text-zinc-500">{exchange.region}</div>
                  </td>
                  <td className="py-4 px-4 text-amber-400 font-mono">{exchange.bonus}</td>
                  <td className="py-4 px-4 text-zinc-300 font-mono">{exchange.tradingFee}</td>
                  <td className="py-4 px-4">
                    {exchange.kycRequired ? (
                      <span className="inline-flex items-center gap-1 text-zinc-400">
                        <X size={16} className="text-red-500" /> Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Check size={16} /> Not Needed
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-amber-400">★ {exchange.trustScore}</td>
                  <td className="py-4 px-4">
                    <a
                      href={exchange.bonusLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleExchangeClick(exchange.id, 'table')}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded transition-colors"
                    >
                      Claim
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {exchanges.map((exchange) => (
            <div key={exchange.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white">{exchange.name}</h4>
                  <p className="text-xs text-zinc-500">{exchange.bonus}</p>
                </div>
                <span className="text-amber-400 text-sm font-bold">★{exchange.trustScore}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                <div>
                  <p className="text-zinc-500">Fee</p>
                  <p className="text-white font-mono">{exchange.tradingFee}</p>
                </div>
                <div>
                  <p className="text-zinc-500">KYC</p>
                  <p className={exchange.kycRequired ? 'text-red-500' : 'text-emerald-400'}>
                    {exchange.kycRequired ? 'Required' : 'Optional'}
                  </p>
                </div>
              </div>

              <a
                href={exchange.bonusLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleExchangeClick(exchange.id, 'mobile_card')}
                className="w-full px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded text-sm transition-colors"
              >
                Claim Bonus
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-xs text-zinc-400">
        <p>
          All affiliate links are provided for informational purposes. Trading crypto carries risk. Please do your own research before investing. KIFS Crypto is not responsible for any losses.
        </p>
      </div>
    </div>
  )
}

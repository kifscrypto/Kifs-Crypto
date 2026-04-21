import { Metadata } from 'next'
import { getExchangesAction } from '@/app/actions/exchanges'

export const metadata: Metadata = {
  title: 'Exchanges Used - KIFS Crypto',
  description: 'The crypto exchanges and sign-up bonuses used in the KIFS $1M challenge.',
}

export default async function ExchangesPage() {
  let exchanges = []
  try {
    exchanges = await getExchangesAction()
  } catch (error) {
    console.error('Error fetching exchanges:', error)
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Rules and Challenge Info */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* The Rules */}
            <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#FFA500]">The Rules</h2>
              <ul className="space-y-2 text-[#9ca3af] text-sm">
                <li className="flex gap-2">
                  <span className="text-[#FFA500]">✓</span>
                  <span>Starting capital: $1,000</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FFA500]">✓</span>
                  <span>Only sign-up bonuses and referral rewards allowed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FFA500]">✓</span>
                  <span>No additional deposits permitted</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FFA500]">✓</span>
                  <span>All trades and moves documented weekly</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FFA500]">✓</span>
                  <span>Target: $1,000,000</span>
                </li>
              </ul>
            </div>

            {/* Why This Challenge */}
            <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#FFA500]">Why This Challenge?</h2>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                Crypto exchanges offer substantial bonuses to new traders. This challenge tests whether those incentives can compound into real wealth. It&apos;s a real money experiment documenting every move, every win, and every mistake. No hype. No fake accounts. Just raw data and honest updates.
              </p>
            </div>
          </div>

          {/* Exchanges Used Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#f0f0f0]">Exchanges Used</h2>

            {exchanges && exchanges.length > 0 ? (
              <div className="space-y-4">
                {exchanges.map((exchange) => (
                  <div key={exchange.id} className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {exchange.logo_url && (
                            <img src={exchange.logo_url} alt={exchange.name} className="w-6 h-6 rounded" />
                          )}
                          <h3 className="text-lg font-bold text-[#f0f0f0]">{exchange.name}</h3>
                        </div>
                        <p className="text-[#9ca3af] text-sm">{exchange.description || 'Trading platform with competitive sign-up bonuses for new accounts'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded text-xs font-medium ${
                        exchange.status === 'Claimed' ? 'bg-green-500/20 border border-green-500/50 text-green-400' :
                        exchange.status === 'Active Now' ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400' :
                        'bg-gray-500/20 border border-gray-500/50 text-gray-400'
                      }`}>
                        {exchange.week_claimed || 'Week pending'} - {exchange.status}
                      </span>
                      {exchange.bonus_amount && (
                        <span className="px-3 py-1 bg-[#FFA500]/20 border border-[#FFA500]/50 rounded text-[#FFA500] text-xs font-medium">
                          {exchange.bonus_amount} {exchange.bonus_type}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#f0f0f0]">No exchanges added yet</h3>
                    <p className="text-[#9ca3af] text-sm">Check back soon for updates on exchanges used in the challenge.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#FFA500]/10 to-transparent border border-[#FFA500]/30 rounded-lg p-8 space-y-4">
            <h3 className="text-xl font-bold text-[#FFA500]">Current Exchange Bonuses & Reviews</h3>
            <p className="text-[#9ca3af] text-sm">
              For comprehensive, updated lists of all current exchange sign-up bonuses and referral deals:
            </p>
            <a
              href="https://trading365.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#FFA500] text-[#080808] font-semibold rounded-lg hover:bg-[#FFB800] transition-colors"
            >
              Visit Trading365.org ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

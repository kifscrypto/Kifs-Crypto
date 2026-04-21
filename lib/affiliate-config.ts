// Centralized affiliate configuration for all 30 exchange links
// Update this file to manage all affiliate relationships, bonuses, and commissions

export interface AffiliateExchange {
  id: string
  name: string
  bonus: string
  bonusAmount?: string
  kycRequired: boolean
  fiatOnRamp: boolean
  tradingFee: string
  referralBonus?: string
  logo?: string
  bonusLink: string
  reviewLink: string
  features: string[]
  pros: string[]
  cons: string[]
  trustScore: number // 1-10
  region: 'global' | 'us-residents' | 'eu' | 'asia'
  highlighted?: boolean
}

export const AFFILIATE_EXCHANGES: Record<string, AffiliateExchange> = {
  bydfi: {
    id: 'bydfi',
    name: 'BYDFi',
    bonus: 'Up to $50 Trading Credit',
    bonusAmount: '$50',
    kycRequired: true,
    fiatOnRamp: true,
    tradingFee: '0.01%-0.1%',
    referralBonus: 'Up to 30% commission',
    bonusLink: 'https://partner.bydfi.com/register?vipCode=KifsCrypto',
    reviewLink: 'https://www.trading365.org/reviews/bydfi-review',
    features: ['Spot trading', 'Futures', 'Copy trading', 'Low fees'],
    pros: ['Competitive bonuses', 'Low trading fees', 'User-friendly', 'Fast withdrawals'],
    cons: ['Limited staking options', 'Smaller community'],
    trustScore: 8,
    region: 'global',
    highlighted: true,
  },
  weex: {
    id: 'weex',
    name: 'WEEX',
    bonus: 'Sign-up Bonus + Trading Rewards',
    bonusAmount: 'Variable',
    kycRequired: true,
    fiatOnRamp: true,
    tradingFee: '0.02%-0.1%',
    referralBonus: 'Up to 20% commission',
    bonusLink: 'https://trading365.org/reviews/weex-review',
    reviewLink: 'https://trading365.org/reviews/weex-review',
    features: ['Spot trading', 'Margin trading', 'Derivatives'],
    pros: ['Good bonus structure', 'Multiple trading pairs', 'Mobile app'],
    cons: ['Newer platform', 'Limited history'],
    trustScore: 7,
    region: 'global',
  },
  bingx: {
    id: 'bingx',
    name: 'BingX',
    bonus: 'Welcome Bonus + Referral Rewards',
    bonusAmount: 'Variable',
    kycRequired: true,
    fiatOnRamp: true,
    tradingFee: '0.01%-0.1%',
    referralBonus: 'Up to 25% commission',
    bonusLink: 'https://trading365.org/reviews/bingx-review',
    reviewLink: 'https://trading365.org/reviews/bingx-review',
    features: ['Spot trading', 'Futures', 'Copy trading'],
    pros: ['Strong referral program', 'Social trading', 'Good liquidity'],
    cons: ['Higher withdrawal limits', 'Regulatory concerns in some regions'],
    trustScore: 7,
    region: 'global',
  },
  bitunix: {
    id: 'bitunix',
    name: 'Bitunix',
    bonus: 'New User Promotion',
    kycRequired: false,
    fiatOnRamp: false,
    tradingFee: '0.02%-0.1%',
    bonusLink: 'https://trading365.org/no-kyc/bitunix-review',
    reviewLink: 'https://trading365.org/no-kyc/bitunix-review',
    features: ['Spot trading', 'Futures', 'No KYC'],
    pros: ['No KYC required', 'Instant deposits', 'Privacy-focused'],
    cons: ['Lower liquidity', 'Limited fiat options'],
    trustScore: 6,
    region: 'global',
  },
  blofin: {
    id: 'blofin',
    name: 'BloFin',
    bonus: 'Sign-up Incentives',
    kycRequired: false,
    fiatOnRamp: false,
    tradingFee: '0.02%-0.1%',
    bonusLink: 'https://trading365.org/no-kyc/blofin-review',
    reviewLink: 'https://trading365.org/no-kyc/blofin-review',
    features: ['Spot trading', 'Derivatives', 'No KYC'],
    pros: ['Privacy-friendly', 'Anonymous trading', 'Good for beginners'],
    cons: ['Limited support', 'Smaller platform'],
    trustScore: 6,
    region: 'global',
  },
  coinex: {
    id: 'coinex',
    name: 'CoinEx',
    bonus: 'New User Bonus + Trading Rewards',
    bonusAmount: 'Variable',
    kycRequired: true,
    fiatOnRamp: true,
    tradingFee: '0.05%-0.2%',
    referralBonus: 'Up to 20% commission',
    bonusLink: 'https://trading365.org/reviews/coinex-review',
    reviewLink: 'https://trading365.org/reviews/coinex-review',
    features: ['Spot trading', 'Margin', 'Derivatives'],
    pros: ['Generous bonuses', 'Altcoin listing', 'Global reach'],
    cons: ['Higher fees', 'Smaller trading volume'],
    trustScore: 7,
    region: 'global',
  },
  mexc: {
    id: 'mexc',
    name: 'MEXC',
    bonus: 'Sign-up Bonus Available',
    bonusAmount: 'Variable',
    kycRequired: true,
    fiatOnRamp: true,
    tradingFee: '0.01%-0.1%',
    referralBonus: 'Up to 30% commission',
    bonusLink: 'https://trading365.org/reviews/mexc-review',
    reviewLink: 'https://trading365.org/reviews/mexc-review',
    features: ['Spot trading', 'Futures', 'Launchpad'],
    pros: ['Lowest fees', 'Many altcoins', 'Fast growth'],
    cons: ['Still growing reputation', 'Complex interface'],
    trustScore: 7,
    region: 'global',
    highlighted: true,
  },
}

export function getExchangeById(id: string): AffiliateExchange | undefined {
  return AFFILIATE_EXCHANGES[id.toLowerCase()]
}

export function getHighlightedExchanges(): AffiliateExchange[] {
  return Object.values(AFFILIATE_EXCHANGES).filter((ex) => ex.highlighted)
}

export function getExchangesByRegion(region: AffiliateExchange['region']): AffiliateExchange[] {
  return Object.values(AFFILIATE_EXCHANGES).filter(
    (ex) => ex.region === region || ex.region === 'global'
  )
}

export function getAllExchanges(): AffiliateExchange[] {
  return Object.values(AFFILIATE_EXCHANGES)
}

// Analytics tracking function
export function trackAffiliateClick(exchangeId: string, source: string) {
  if (typeof window !== 'undefined') {
    // Send to Vercel Web Analytics
    if (window.va) {
      window.va?.('event', {
        name: `affiliate_click_${exchangeId}`,
        data: { source },
      })
    }

    // Log to database
    fetch('/api/affiliate-clicks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        exchange: exchangeId,
        referral_url: window.location.href,
      }),
    }).catch((err) => console.error('[v0] Failed to track affiliate click:', err))
  }
}

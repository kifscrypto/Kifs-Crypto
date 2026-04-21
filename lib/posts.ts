export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  exchange: string
  balance: number
  week: number
  published: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'week-1-bydfi-the-challenge-begins',
    title: 'Week 1: BYDFi — The Challenge Begins',
    excerpt: '$1,000 in. BYDFi sign-up bonus claimed. Here\'s exactly what I did, what the bonus got me, and where I stand after week one.',
    content: `
# Week 1: BYDFi — The Challenge Begins

**Starting Balance:** $1,000.00
**Current Balance:** $1,247.50
**Gain:** +24.75%

## The Setup

This week, I set up the first exchange and claimed the sign-up bonus. The goal is simple: turn $1,000 into $1,000,000 using *only* exchange bonuses and referral rewards. No additional deposits. Everything documented. Everything real.

I chose **BYDFi** as the first exchange for its competitive trading incentives and bonus structure for new accounts.

## What Happened

1. **Account Created** — Verified identity, passed KYC
2. **Sign-Up Bonus Claimed** — $50 in trading credits
3. **Initial Deposit** — $1,000 from personal funds
4. **First Trades** — Small positions to understand the platform
5. **Results** — Net gain of $247.50 through a combination of spot trading and bonus utilization

## The Numbers

- Starting: $1,000.00
- Bonus Applied: +$50.00
- Trading Gains: +$197.50
- Current Balance: $1,247.50

## Key Learnings

1. **Bonus Structure Matters** — Understanding bonus requirements upfront saves time
2. **Trading Fees** — Every transaction costs. Plan accordingly
3. **Volatility is Your Friend** — Used BTC/USDT movements to capture gains
4. **Documentation is Critical** — Tracking every move makes analysis easier

## Next Steps

Week 2 will focus on another exchange sign-up bonus while maintaining the BYDFi position. The goal is to compound gains week-over-week using multiple platforms' incentives.

For current exchange bonuses and full reviews, check [Trading365.org](https://trading365.org) — they keep up-to-date lists of all active promotions.

---

**Disclaimer:** This is a personal trading journey. Past performance does not guarantee future results. All trading involves risk. This is not financial advice.
    `,
    date: '2026-04-07',
    exchange: 'BYDFi',
    balance: 1247.50,
    week: 1,
    published: true,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.published)
}

export function getAllPublishedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return getAllPublishedPosts().slice(0, count)
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '5TARS Gaming - Web3 Gaming for Football & Soccer Fans',
  description: 'Web3 gaming platform for football and soccer enthusiasts. NFTs, rewards, and decentralized gaming.',
  canonical: 'https://kifscrypto.com/5tars-gaming-web-3-gaming-for-football-soccer-fans',
}

export default function FiveStarsGamingPage() {
  return (
    <div className="w-full">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f0f0f0] mb-4">
            5TARS Gaming — Web3 Gaming for Football & Soccer Fans
          </h1>
          <p className="text-[#9ca3af] mb-6">
            Web3 gaming platform content stub. For current crypto exchange bonuses and gaming opportunities:
          </p>
          <a
            href="https://trading365.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
          >
            Trading365.org
          </a>
        </div>
      </section>
    </div>
  )
}

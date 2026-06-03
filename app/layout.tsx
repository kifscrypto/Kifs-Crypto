import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ExitIntentPopup from '@/components/exit-intent-popup'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'KIFS Scan — Meme Coin Scanner | BASE + Solana',
  description: 'Real-time meme coin scanner for BASE and Solana. Blunt verdicts. No fluff. Scan it before you ape in.',
  generator: 'v0.app',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'KIFS Scan — Meme Coin Scanner | BASE + Solana',
    description: 'Real-time meme coin scanner for BASE and Solana. Blunt verdicts. No fluff. Scan it before you ape in.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-mono antialiased bg-[#0a0a0a] text-[#e8e8e8]">
        <Header />
        <main>{children}</main>
        <Footer />
        <ExitIntentPopup />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

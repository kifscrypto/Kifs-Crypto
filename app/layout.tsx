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
  title: 'KIFS Crypto - $1,000 to $1,000,000',
  description: 'A real money crypto trading challenge using only exchange sign-up bonuses. From $1,000 to $1,000,000 — every move documented weekly.',
  generator: 'v0.app',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'KIFS Crypto - $1,000 to $1,000,000',
    description: 'A real money crypto trading challenge using only exchange sign-up bonuses.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFA500',
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
      <body className="font-sans antialiased bg-[#080808] text-[#f0f0f0]">
        <Header />
        <main>{children}</main>
        <Footer />
        <ExitIntentPopup />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

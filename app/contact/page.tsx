import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact - KIFS Crypto',
  description: 'Get in touch with KIFS Crypto. Questions about the challenge or the journey?',
  canonical: 'https://kifscrypto.com/contact',
}

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-[#9ca3af]">
            Questions about the challenge? Want to collaborate? Send a message.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0d0d0d] border border-[#1f2937] rounded-lg p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#f0f0f0] mb-4">
                Contact Methods
              </h2>
              <p className="text-[#9ca3af] mb-6">
                Reach out through the following channels:
              </p>
            </div>

            {/* Email */}
            <div className="border-t border-[#1f2937] pt-6">
              <h3 className="text-lg font-semibold text-[#f59e0b] mb-2">
                Email
              </h3>
              <p className="text-[#9ca3af] mb-3">
                For inquiries, collaborations, or feedback:
              </p>
              <a href="mailto:contact@kifscrypto.com" className="text-[#f0f0f0] font-mono hover:text-[#f59e0b] transition-colors">
                contact@kifscrypto.com
              </a>
            </div>

            {/* Social */}
            <div className="border-t border-[#1f2937] pt-6">
              <h3 className="text-lg font-semibold text-[#f59e0b] mb-2">
                Follow the Journey
              </h3>
              <p className="text-[#9ca3af]">
                Weekly updates posted on the blog. No spam. No hype. Just raw data.
              </p>
              <Link href="/blog" className="inline-block mt-3 text-[#f59e0b] hover:text-[#d97706] font-semibold">
                Read Latest Updates →
              </Link>
            </div>

            {/* Exchange Info */}
            <div className="border-t border-[#1f2937] pt-6">
              <h3 className="text-lg font-semibold text-[#f59e0b] mb-2">
                Exchange & Bonus Questions?
              </h3>
              <p className="text-[#9ca3af] mb-3">
                For comprehensive info on current exchange bonuses and deals:
              </p>
              <a
                href="https://trading365.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#f59e0b] text-[#080808] rounded-lg font-semibold hover:bg-[#d97706] transition-colors"
              >
                Visit Trading365.org
                <span className="text-sm">↗</span>
              </a>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-[#374151]/20 border border-[#374151] rounded-lg p-6">
            <p className="text-sm text-[#9ca3af]">
              <strong className="text-[#f0f0f0]">Response time:</strong> I aim to respond to all inquiries within 48 hours. Due to volume, please be specific about your question.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Blog CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#1f2937]">
        <div className="max-w-2xl mx-auto text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-2 bg-[#f59e0b] text-[#080808] font-semibold rounded-lg hover:bg-[#d97706] transition-colors"
          >
            Back to the Journey
          </Link>
        </div>
      </section>
    </div>
  )
}

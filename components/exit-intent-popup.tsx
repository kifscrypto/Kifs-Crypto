'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const POPUP_DISMISSED_KEY = 'newsletter_dismissed'
const DISMISS_COOLDOWN_DAYS = 7
const TRIGGER_DELAY_MS = 20000 // 20 seconds
const SCROLL_DEPTH_TRIGGER = 0.5 // 50% down the page

export default function ExitIntentPopup() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [scrollDepth, setScrollDepth] = useState(0)
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)

  // Check if we're on admin page
  useEffect(() => {
    setIsAdmin(pathname?.startsWith('/admin') || false)
  }, [pathname])

  // Initialize session tracking and check dismissal status
  useEffect(() => {
    setSessionStartTime(Date.now())

    // Check if popup was dismissed within cooldown period
    const dismissedData = localStorage.getItem(POPUP_DISMISSED_KEY)
    if (dismissedData) {
      const dismissedTime = parseInt(dismissedData, 10)
      const cooldownExpired = Date.now() - dismissedTime > DISMISS_COOLDOWN_DAYS * 24 * 60 * 60 * 1000
      if (!cooldownExpired) {
        setHasShown(true)
      }
    }
  }, [])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const depth = scrollHeight > 0 ? scrolled / scrollHeight : 0
      setScrollDepth(depth)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Exit intent handler with refinements
  useEffect(() => {
    if (hasShown || isAdmin || !sessionStartTime) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Check all conditions before showing popup
      const now = Date.now()
      const sessionDuration = now - sessionStartTime

      // Require 20 seconds on site
      if (sessionDuration < TRIGGER_DELAY_MS) return

      // Must have scrolled at least 50% down
      if (scrollDepth < SCROLL_DEPTH_TRIGGER) return

      // Strict exit detection: mouse leaves window toward tabs/address bar
      if (e.clientY <= 0 && e.relatedTarget === null) {
        setIsVisible(true)
        setHasShown(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown, isAdmin, sessionStartTime, scrollDepth])

  // Don't render popup on admin pages
  if (isAdmin) {
    return null
  }

  const handleClose = () => {
    setIsVisible(false)
    // Set dismissal timestamp for 7-day cooldown
    localStorage.setItem(POPUP_DISMISSED_KEY, Date.now().toString())
  }

  const handleSubscribe = () => {
    window.location.href = '/api/subscribe'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Popup */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border border-amber-500/40 rounded-xl p-8 shadow-2xl">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Don&apos;t miss the move.
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Get weekly updates on the journey from $1,000 to $1,000,000. No spam, just real trading data.
                  </p>
                </div>

                {/* Subscribe form */}
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none transition-colors text-sm"
                  />

                  <button
                    onClick={handleSubscribe}
                    className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-amber-500/20"
                  >
                    Join the 0.1%
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full px-6 py-2 border border-zinc-600 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium rounded-lg transition-colors text-sm"
                  >
                    Maybe later
                  </button>
                </div>

                {/* Social proof */}
                <p className="text-xs text-zinc-500 text-center">
                  Join 5,000+ traders following the $1M challenge.
                </p>
              </div>

              {/* Decorative accent */}
              <div className="absolute -top-1 left-8 w-16 h-1 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 rounded-full blur-sm" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

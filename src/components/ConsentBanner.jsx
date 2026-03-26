import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { initGA } from '../utils/analytics'

// ─── Storage ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'idc_consent'

function getStoredConsent() {
  try { return localStorage.getItem(STORAGE_KEY) }
  catch { return null }
}

function storeConsent(value) {
  try { localStorage.setItem(STORAGE_KEY, value) }
  catch { /* ignore in environments without localStorage */ }
}

// ─── Motion ───────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1]

const bannerVariants = {
  hidden:  { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: EASE, delay: 1.2 },
    // 1.2 s delay lets the page settle before the banner appears
  },
  exit: {
    y: '110%',
    opacity: 0,
    transition: { duration: 0.35, ease: EASE },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONSENT BANNER
//
// Shows once per visitor.  Preference is persisted in localStorage under
// the key `idc_consent` with values `'accepted'` or `'declined'`.
//
// • Accept  → calls initGA() so GA4 loads immediately, then dismisses.
// • Decline → dismisses without loading GA4.
//
// The banner is deliberately small and non-intrusive (no overlay, no modal)
// to minimise disruption to the conversion journey.
// ═══════════════════════════════════════════════════════════════════════════════
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show if the user hasn't already made a choice
    if (!getStoredConsent()) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    storeConsent('accepted')
    initGA()
    setVisible(false)
  }

  const decline = () => {
    storeConsent('declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="consent-banner"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="
            fixed bottom-0 left-0 right-0 z-[9998]
            px-4 py-4 sm:px-6 sm:py-3
          "
          style={{ backgroundColor: '#060D18' }}
        >
          {/* Thin gold top border */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ backgroundColor: 'rgba(212,168,83,0.25)' }}
            aria-hidden="true"
          />

          <div className="
            max-w-5xl mx-auto
            flex flex-col sm:flex-row
            items-start sm:items-center
            gap-4 sm:gap-6
          ">

            {/* Cookie icon */}
            <Cookie
              size={18}
              strokeWidth={1.75}
              className="text-gold/60 flex-shrink-0 mt-[1px] sm:mt-0"
              aria-hidden="true"
            />

            {/* Copy */}
            <p className="font-body text-[0.83rem] text-white/55 leading-relaxed flex-1">
              This website uses cookies to improve your experience and measure
              site performance.{' '}
              <span className="text-white/35 text-[0.78rem]">
                No personal data is shared with third parties.
              </span>
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Accept — gold filled */}
              <motion.button
                onClick={accept}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="
                  px-5 py-2
                  bg-gold hover:bg-gold/90
                  text-navy font-body font-bold text-[0.8rem]
                  rounded-full cursor-pointer select-none
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
                "
                aria-label="Accept cookies"
              >
                Accept
              </motion.button>

              {/* Decline — text link */}
              <button
                onClick={decline}
                className="
                  font-body text-[0.78rem] text-white/30
                  hover:text-white/60
                  underline underline-offset-2
                  cursor-pointer select-none
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20
                "
                aria-label="Decline cookies"
              >
                Decline
              </button>
            </div>

            {/* Dismiss × — same as decline */}
            <button
              onClick={decline}
              className="
                absolute top-3 right-4
                text-white/20 hover:text-white/50
                transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20
                sm:relative sm:top-auto sm:right-auto sm:ml-1
              "
              aria-label="Close cookie banner"
            >
              <X size={15} strokeWidth={2} />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { initGA }       from './utils/analytics'
import useAnalytics     from './hooks/useAnalytics'
import ConsentBanner    from './components/ConsentBanner'
import { trackCTAClick } from './utils/analytics'

// ─── Eagerly loaded: above-the-fold, must render on first paint ───────────────
import Navbar      from './components/Navbar'
import HeroSection from './components/HeroSection'

// ─── Lazily loaded: below-the-fold sections ───────────────────────────────────
// Each section gets its own dynamic import chunk.  The browser requests them
// after the JS for Navbar + HeroSection has been parsed and the main thread
// is free, which improves First Contentful Paint and Time to Interactive.
const PainPointsSection   = lazy(() => import('./components/PainPointsSection'))
const AboutSection        = lazy(() => import('./components/AboutSection'))
const ServicesSection     = lazy(() => import('./components/ServicesSection'))
const ProcessSection      = lazy(() => import('./components/ProcessSection'))
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'))
const FAQSection          = lazy(() => import('./components/FAQSection'))
const BookingSection      = lazy(() => import('./components/BookingSection'))
const FooterSection       = lazy(() => import('./components/FooterSection'))

// ─── Config ───────────────────────────────────────────────────────────────────
const WHATSAPP    = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'
const EASE        = [0.22, 1, 0.36, 1]

// All section IDs observed for view-tracking (matches id props in JSX below)
const SECTION_IDS = [
  'hero', 'pain-points', 'about', 'services',
  'process', 'testimonials', 'faq', 'booking',
]

// ─── Section fallback placeholders ───────────────────────────────────────────
// Each fallback matches its section's background colour so there is no
// white flash while the dynamic chunk loads on slower connections.
const Fallback = ({ bg = '#ffffff', minH = '500px' }) => (
  <div
    style={{ backgroundColor: bg, minHeight: minH }}
    aria-hidden="true"
    role="presentation"
  />
)

// ─── WhatsApp SVG icon (official brand mark) ──────────────────────────────────
function WhatsAppIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Show scroll-to-top after user scrolls past the hero (~500px)
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Initialise GA4 immediately for returning visitors who already accepted
  useEffect(() => {
    if (localStorage.getItem('idc_consent') === 'accepted') initGA()
  }, [])

  // Observe all sections for automatic view + time-spent tracking
  useAnalytics(SECTION_IDS)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    // AnimatePresence at root allows page-exit animations if routing is added later.
    <AnimatePresence mode="wait">
      <div
        key="page"
        className="min-h-screen bg-white font-body overflow-x-hidden"
      >

        {/* ── Skip navigation — keyboard / screen-reader first ────────────── */}
        {/*
          Visually hidden until focused via Tab. Teleports keyboard users
          directly past the navbar to the main content.
        */}
        <a
          href="#main-content"
          className="
            sr-only
            focus:not-sr-only
            focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
            focus:inline-flex focus:items-center
            focus:px-5 focus:py-2.5
            focus:bg-gold focus:text-navy
            focus:font-body focus:font-bold focus:text-sm
            focus:rounded-full focus:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-navy/30
          "
        >
          Skip to main content
        </a>

        {/* ── Navbar — always eager, always visible ───────────────────────── */}
        <Navbar />

        {/* ── Main content ────────────────────────────────────────────────── */}
        <main id="main-content">

          {/* HeroSection: eager — first thing the user sees */}
          <HeroSection id="hero" />

          {/* All sections below the fold are lazily loaded */}
          <Suspense fallback={<Fallback bg="#F5F5F5" minH="600px" />}>
            <PainPointsSection id="pain-points" />
          </Suspense>

          <Suspense fallback={<Fallback bg="#ffffff" minH="700px" />}>
            <AboutSection id="about" />
          </Suspense>

          <Suspense fallback={<Fallback bg="#0A1628" minH="700px" />}>
            <ServicesSection id="services" />
          </Suspense>

          <Suspense fallback={<Fallback bg="#ffffff" minH="600px" />}>
            <ProcessSection id="process" />
          </Suspense>

          <Suspense fallback={<Fallback bg="#FAF7F0" minH="600px" />}>
            <TestimonialsSection id="testimonials" />
          </Suspense>

          <Suspense fallback={<Fallback bg="#ffffff" minH="500px" />}>
            <FAQSection id="faq" />
          </Suspense>

          <Suspense fallback={<Fallback bg="#0A1628" minH="700px" />}>
            <BookingSection id="booking" />
          </Suspense>

        </main>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <Suspense fallback={<Fallback bg="#060D18" minH="320px" />}>
          <FooterSection />
        </Suspense>

        {/* ── Floating WhatsApp button — bottom-left ───────────────────────── */}
        {/*
          Outer motion.div owns the vertical bounce animation.
          Inner motion.a owns the hover scale — separating the two avoids
          conflicting transform values on a single element.
        */}
        <div
          className="fixed bottom-6 left-5 z-50 group"
          aria-label="WhatsApp chat"
        >
          {/* Tooltip — slides in from the left, appears to the right of the button */}
          <div
            className="
              absolute left-full top-1/2 -translate-y-1/2 ml-3
              px-3 py-1.5
              bg-gray-900/90 backdrop-blur-sm
              text-white font-body text-[0.75rem] font-medium whitespace-nowrap
              rounded-md shadow-lg
              opacity-0 pointer-events-none
              group-hover:opacity-100
              transition-opacity duration-200
            "
            role="tooltip"
          >
            Chat with us
            {/* Tooltip arrow pointing left */}
            <span
              className="absolute right-full top-1/2 -translate-y-1/2"
              style={{
                borderWidth: '5px',
                borderStyle: 'solid',
                borderColor: 'transparent rgba(17,24,39,0.9) transparent transparent',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Bouncing button wrapper */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration:   2.6,
              repeat:     Infinity,
              ease:       'easeInOut',
              repeatType: 'loop',
            }}
          >
            <motion.a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open WhatsApp chat"
              onClick={() => trackCTAClick('whatsapp_chat')}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              className="
                w-13 h-13 rounded-full
                flex items-center justify-center
                text-white
                focus-visible:outline-none
                focus-visible:ring-4 focus-visible:ring-green-400/50
              "
              style={{
                width:     '52px',
                height:    '52px',
                backgroundColor: '#25D366',
                boxShadow:       '0 4px 24px rgba(37,211,102,0.42)',
              }}
            >
              <WhatsAppIcon size={24} />
            </motion.a>
          </motion.div>
        </div>

        {/* ── Cookie consent banner ────────────────────────────────────────── */}
        <ConsentBanner />

        {/* ── Scroll-to-top button — bottom-right ──────────────────────────── */}
        {/*
          Appears once the user scrolls past the hero section (~500px).
          Smoothly scrolls back to top on click.
        */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scroll-top"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.22, ease: EASE }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.93 }}
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="
                fixed bottom-6 right-5 z-50
                w-[52px] h-[52px] rounded-full
                flex items-center justify-center
                text-white
                focus-visible:outline-none
                focus-visible:ring-4 focus-visible:ring-coral/40
              "
              style={{
                backgroundColor: '#E8734A',
                boxShadow:       '0 4px 20px rgba(232,115,74,0.40)',
              }}
            >
              <ArrowUp size={20} strokeWidth={2.5} aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </AnimatePresence>
  )
}

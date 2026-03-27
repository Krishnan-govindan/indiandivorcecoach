import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Globe2, Gift } from 'lucide-react'
import { trackCTAClick } from '../utils/analytics'

// ─── Replace these with real values before launch ─────────────────────────────
const CALENDLY_URL    = 'https://calendly.com/fulsuccess/ai'
const CONTACT_EMAIL   = 'support@indianlifecoaches.com'
const WHATSAPP_NUMBER = '14254424167' // +1 (425) 442-4167
// ─────────────────────────────────────────────────────────────────────────────

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

// Calendly inline-embed URL — appends brand colours so the widget blends
// with the dark navy section background.
const WIDGET_URL =
  `${CALENDLY_URL}?hide_gdpr_banner=1` +
  `&background_color=0a1628` +
  `&text_color=ffffff` +
  `&primary_color=d4a853`

// ─── Reassurance points ───────────────────────────────────────────────────────
const REASSURANCES = [
  { Icon: Lock,   text: '100% Confidential'      },
  { Icon: Globe2, text: 'Any Timezone, Anywhere' },
  { Icon: Gift,   text: 'Completely Free'         },
]

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE            = [0.22, 1, 0.36, 1]
const LOADER_TIMEOUT  = 9000 // ms — fallback to hide spinner if postMessage never fires

// ─── Motion Variants ──────────────────────────────────────────────────────────

const headerVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const subVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.12, ease: EASE } },
}

// Reassurance row — stagger children
const reassuranceGroupVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
}
const reassuranceItemVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const calendarVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

const noteVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2, ease: EASE } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOOKING SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function BookingSection({ id }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // ── 1. Detect when Calendly widget is ready via postMessage ────────────
    const onMessage = (e) => {
      if (e.data?.event === 'calendly.event_type_viewed') {
        setIsLoaded(true)
      }
    }
    window.addEventListener('message', onMessage)

    // ── 2. Fallback — hide spinner after LOADER_TIMEOUT regardless ────────
    //    (handles slow networks, adblockers, or Calendly postMessage quirks)
    const fallback = setTimeout(() => setIsLoaded(true), LOADER_TIMEOUT)

    // ── 3. Inject Calendly script once (guard against duplicate injection) ─
    if (!document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`)) {
      const script = document.createElement('script')
      script.src   = CALENDLY_SCRIPT
      script.async = true
      document.head.appendChild(script)
    }

    return () => {
      window.removeEventListener('message', onMessage)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <section
      id={id}
      className="section-padding bg-navy overflow-hidden relative"
      aria-labelledby="booking-heading"
    >
      {/* Subtle gold ambient glow — top of section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(212,168,83,0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-10">

          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={headerVariants}
            className="section-label block"
          >
            Book Your Call
          </motion.span>

          <motion.h2
            id="booking-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={headerVariants}
            className="
              font-display font-bold text-white leading-tight tracking-tight
              text-[2rem] sm:text-[2.5rem] lg:text-[3rem]
              mt-2 mb-5
            "
          >
            Your New Chapter Starts Here
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={subVariants}
            className="
              font-body text-white/55 text-base sm:text-lg leading-relaxed
              max-w-xl mx-auto mb-10
            "
          >
            Book your free 15-30 minute discovery call.
            No pressure. No judgment. Just clarity.
          </motion.p>

          {/* ── Reassurance Points ───────────────────────────────────────── */}
          <motion.div
            variants={reassuranceGroupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="
              inline-flex flex-wrap items-center justify-center
              gap-x-8 gap-y-4
            "
            aria-label="What to expect"
          >
            {REASSURANCES.map(({ Icon, text }) => (
              <motion.div
                key={text}
                variants={reassuranceItemVariants}
                className="flex items-center gap-2.5"
              >
                {/* Gold icon circle */}
                <div
                  className="
                    w-8 h-8 rounded-full flex-shrink-0
                    bg-gold/[0.12] border border-gold/[0.22]
                    flex items-center justify-center
                  "
                  aria-hidden="true"
                >
                  <Icon size={14} strokeWidth={1.75} className="text-gold" />
                </div>
                <span className="font-body text-[0.88rem] font-medium text-white/70">
                  {text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Calendly Embed ──────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={calendarVariants}
          className="max-w-[700px] mx-auto"
        >
          {/*
            Outer wrapper handles visual styling (rounded corners, border,
            glow). overflow-hidden clips the Calendly iframe to rounded corners.
            The loading overlay sits absolutely on top until isLoaded is true.
          */}
          <div
            className="
              relative rounded-2xl overflow-hidden
              border border-gold/[0.18]
              shadow-[0_0_80px_rgba(212,168,83,0.06),0_24px_80px_rgba(0,0,0,0.45)]
            "
          >
            {/* Loading overlay */}
            {!isLoaded && <CalendlyLoader />}

            {/* Calendly inline widget */}
            <div
              className="calendly-inline-widget"
              data-url={WIDGET_URL}
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </motion.div>

        {/* ── Direct contact note ─────────────────────────────────────────── */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={noteVariants}
          className="
            font-body text-center text-white/30
            text-[0.82rem] leading-relaxed
            mt-8 max-w-md mx-auto
          "
        >
          Prefer to reach out directly?{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={() => trackCTAClick('email_click')}
            className="
              text-gold/60 hover:text-gold
              underline underline-offset-2
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40
            "
          >
            Email me
          </a>
          {' '}or message on{' '}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-gold/60 hover:text-gold
              underline underline-offset-2
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40
            "
          >
            WhatsApp
          </a>
          {' '}— I respond personally.
        </motion.p>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALENDLY LOADER
//
// Sits absolutely over the widget container while the Calendly iframe
// initialises. Dismissed once the widget fires its first postMessage event
// (calendly.event_type_viewed) or after LOADER_TIMEOUT milliseconds.
//
// Visual: a spinning gold arc (border-t on a rounded div) + status text.
// ═══════════════════════════════════════════════════════════════════════════════
function CalendlyLoader() {
  return (
    <div
      className="
        absolute inset-0 z-10
        flex flex-col items-center justify-center gap-4
        bg-navy rounded-2xl
      "
      aria-label="Loading calendar"
      role="status"
    >
      {/* Spinning arc */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        className="w-11 h-11 rounded-full"
        style={{
          border:      '2px solid rgba(212,168,83,0.15)',
          borderTopColor: '#D4A853',
        }}
        aria-hidden="true"
      />

      {/* Status text */}
      <p className="font-body text-white/35 text-[0.8rem] tracking-wide">
        Loading your calendar…
      </p>
    </div>
  )
}

import { Fragment, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, Users, Globe2, Award, ChevronDown, X, CalendarCheck, MessageCircle, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { trackCTAClick } from '../utils/analytics'

const YOUTUBE_VIDEO_ID = 'f4KJi4NTTmA'

// ─── Structured Data (JSON-LD) ────────────────────────────────────────────────
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Indian Divorce Coach - Krishnan Govindan',
  description:
    "India's first and most trusted online divorce coaching service helping NRIs and Indians worldwide navigate divorce with clarity, confidence, and a concrete action plan.",
  url: 'https://www.indiandivorcecoach.com',
  serviceType: 'Divorce Coaching',
  provider: {
    '@type': 'Person',
    name: 'Krishnan Govindan',
    jobTitle: "India's First Divorce Coach",
    knowsAbout: [
      'Divorce Coaching',
      'NRI Divorce',
      'Emotional Recovery',
      'Legal Navigation',
      'Co-Parenting Coaching',
    ],
  },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Singapore' },
    { '@type': 'Country', name: 'New Zealand' },
  ],
  availableLanguage: ['English', 'Hindi', 'Tamil'],
  offers: {
    '@type': 'Offer',
    name: 'Free Discovery Call',
    price: '0',
    priceCurrency: 'USD',
    description: "30-minute free discovery call with India's first divorce coach",
  },
}

// ─── Social Links ──────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { Icon: Instagram, href: 'https://instagram.com/YOUR-HANDLE',     label: 'Instagram' },
  { Icon: Facebook,  href: 'https://facebook.com/YOUR-PAGE',        label: 'Facebook'  },
  { Icon: Youtube,   href: 'https://youtube.com/@YOUR-CHANNEL',     label: 'YouTube'   },
  { Icon: Linkedin,  href: 'https://linkedin.com/in/YOUR-PROFILE',  label: 'LinkedIn'  },
]

const WHATSAPP_NUMBER = '14254424167'

// ─── Shared Easing ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1]
const SCROLL_OFFSET = -80

// ─── Motion Variants ──────────────────────────────────────────────────────────
const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.075, delayChildren: 0.42 },
  },
}
const wordVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE } },
}

const trustContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 1.05 },
  },
}
const trustItemVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function HeroSection({ id }) {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <section
        id={id}
        className="relative min-h-screen overflow-hidden"
        style={{ backgroundColor: '#0E1E38' }}
        aria-labelledby="hero-heading"
      >
        {/* ── Background Layers (bottom → top) ──────────────────────────── */}
        <HeroBackground />

        {/* ── Page Content ──────────────────────────────────────────────── */}
        <div className="container-custom relative z-10 h-full">
          <div className="
            flex flex-col lg:flex-row
            items-center
            justify-between
            min-h-screen
            pt-[96px] pb-20
            lg:pt-0 lg:pb-0
            gap-10 lg:gap-6
          ">
            {/* Left — Text Content */}
            <div className="w-full lg:w-[57%] lg:py-28 flex flex-col">
              <HeroText onWatchStory={() => setVideoOpen(true)} />
            </div>

            {/* Right — Coach Photo */}
            <div className="
              w-full
              max-w-[300px] sm:max-w-[380px] lg:max-w-none
              mx-auto lg:mx-0
              lg:w-[43%]
              lg:flex lg:items-center lg:justify-end
              lg:py-28
            ">
              <div className="w-full lg:max-w-[480px] xl:max-w-[520px]">
                <CoachPhoto />
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll Indicator ──────────────────────────────────────────── */}
        <ScrollIndicator />
      </section>

      {/* ── YouTube Video Modal ───────────────────────────────────────── */}
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND LAYERS
// ═══════════════════════════════════════════════════════════════════════════════
function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">

      {/* 1 — Rich multi-tone base gradient (deep indigo → slate blue → dark teal) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1a1035 0%, #0E1E38 30%, #0d2244 55%, #102238 80%, #0a1a2e 100%)',
        }}
      />

      {/* 2 — Radial spotlight: warm indigo-blue bloom at center-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 68% 35%, rgba(42,72,130,0.30) 0%, transparent 65%)',
        }}
      />

      {/* 3 — Subtle coral glow — bottom-left */}
      <div
        className="absolute -left-32 bottom-[5%] w-[750px] h-[750px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(232,115,74,0.10) 0%, rgba(232,115,74,0.04) 40%, transparent 68%)',
        }}
      />

      {/* 4 — Subtle gold glow — top-right */}
      <div
        className="absolute right-[-8%] top-[5%] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,168,83,0.09) 0%, rgba(212,168,83,0.03) 45%, transparent 65%)',
        }}
      />

      {/* 5 — Very soft purple accent top-left */}
      <div
        className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(120,80,200,0.07) 0%, transparent 60%)',
        }}
      />

      {/* 6 — Dot grid (gold tint) */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4A853 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />

      {/* 7 — Grain / noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
        }}
      />

      {/* 8 — Soft teal shimmer mid-section */}
      <div
        className="absolute left-[35%] top-[40%] w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,160,170,0.04) 0%, transparent 65%)',
          transform: 'rotate(-15deg)',
        }}
      />

      {/* 9 — Bottom fade → blends into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #0a1a2e 100%)',
        }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO TEXT BLOCK
// ═══════════════════════════════════════════════════════════════════════════════
function HeroText({ onWatchStory }) {
  return (
    <div>

      {/* ── Eyebrow pill ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        className="inline-flex mb-6"
      >
        <span className="
          inline-block
          px-4 py-2
          rounded-full
          bg-white/[0.08] border border-white/[0.15]
          font-body text-[0.72rem] font-medium text-white/70
          tracking-wide backdrop-blur-sm
        ">
          India's 1st Divorce Coach · CEO India Therapist · Founder Indian Life Coaches
        </span>
      </motion.div>

      {/* ── H1 line 1 — white bold title ─────────────────────────────────── */}
      <motion.h1
        id="hero-heading"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
        className="
          font-display font-black text-white leading-[1.05] tracking-[-0.02em]
          text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem]
          mb-3
        "
      >
        #1 Breakup &amp; Divorce<br />Recovery Coach
        <span className="sr-only"> — India's first online divorce coach for Indians and NRIs in USA, UK, Canada, Australia, and worldwide.</span>
      </motion.h1>

      {/* ── H2 line — gold large subhead ─────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.45, ease: EASE }}
        className="
          font-display font-bold text-gold leading-[1.1] tracking-[-0.01em]
          text-[1.9rem] sm:text-[2.3rem] md:text-[2.7rem] lg:text-[3rem]
          mb-3
        "
      >
        Heal, Rebuild &amp; Thrive Again
      </motion.p>

      {/* ── Tagline ──────────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
        className="
          font-display font-semibold text-gold/75
          text-[1rem] sm:text-[1.15rem] lg:text-[1.25rem]
          mb-7
        "
      >
        Life will never be the same again
      </motion.p>

      {/* ── Description ──────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.65, ease: EASE }}
        className="
          font-body text-[0.95rem] sm:text-[1rem] lg:text-[1.05rem]
          text-white/55 leading-[1.75]
          max-w-[520px] mb-9
        "
      >
        India's 1st Divorce Coach &amp; Life Strategist. Specialized in breakup
        recovery, digital nomad lifestyle, and relationship transitions.{' '}
        <span className="text-white/80 font-medium">
          CEO at India Therapist, founder of Indian Life Coaches.
        </span>
      </motion.p>

      {/* ── CTA Buttons ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.78, ease: EASE }}
        className="flex flex-col sm:flex-row gap-4 mb-10"
      >
        {/* Primary — Schedule a Session */}
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 380, damping: 20 }}
        >
          <ScrollLink
            to="booking"
            smooth
            duration={700}
            offset={SCROLL_OFFSET}
            onClick={() => trackCTAClick('book_free_call_hero')}
            className="
              inline-flex items-center justify-center gap-2.5
              px-7 py-[14px]
              bg-gold hover:bg-[#c49840]
              text-navy font-body font-bold
              text-[0.95rem] sm:text-[1rem]
              rounded-xl cursor-pointer select-none
              shadow-[0_8px_32px_rgba(212,168,83,0.40)]
              hover:shadow-[0_12px_44px_rgba(212,168,83,0.58)]
              transition-[background-color,box-shadow] duration-300
              focus-visible:ring-4 focus-visible:ring-gold/40 focus-visible:outline-none
              w-full sm:w-auto whitespace-nowrap
            "
            aria-label="Schedule a session with Krishnan Govindan"
          >
            <CalendarCheck size={17} strokeWidth={2.2} className="flex-shrink-0" aria-hidden="true" />
            Schedule a Session
          </ScrollLink>
        </motion.div>

        {/* Secondary — WhatsApp */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 380, damping: 20 }}
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('whatsapp_hero')}
            className="
              inline-flex items-center justify-center gap-3
              px-6 py-[14px]
              bg-white/[0.07] hover:bg-white/[0.14]
              border border-white/20 hover:border-white/40
              text-white/85 hover:text-white
              font-body font-semibold
              text-[0.95rem] sm:text-[1rem]
              rounded-xl cursor-pointer select-none
              backdrop-blur-sm
              transition-all duration-300
              focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:outline-none
              w-full sm:w-auto whitespace-nowrap
            "
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={17} strokeWidth={2} className="flex-shrink-0 text-[#25D366]" aria-hidden="true" />
            WhatsApp: +1 (425) 442-4167
          </a>
        </motion.div>
      </motion.div>

      {/* ── Social Icons ─────────────────────────────────────────────────── */}
      <motion.div
        variants={trustContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-4"
        aria-label="Social media links"
      >
        {SOCIAL_LINKS.map(({ Icon, href, label }) => (
          <motion.a
            key={label}
            variants={trustItemVariants}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ y: -3, scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="
              w-9 h-9 rounded-full
              bg-white/[0.08] hover:bg-white/[0.18]
              border border-white/[0.12] hover:border-gold/40
              flex items-center justify-center
              text-white/50 hover:text-gold
              transition-colors duration-200
            "
          >
            <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
          </motion.a>
        ))}
      </motion.div>

    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// COACH PHOTO — Right-side hero image with decorative frame
// ═══════════════════════════════════════════════════════════════════════════════
const COACH_IMAGE_URL =
  'https://assets.cdn.filesafe.space/m9jCzEyKqM4xlMWTjcgS/media/685aa9b8f1a848bc1fe8873d.jpeg'

function CoachPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.45, ease: EASE }}
      className="relative w-full select-none"
      aria-hidden="true"
    >
      {/* Outer gold accent ring */}
      <div
        className="absolute -inset-[6px] rounded-3xl pointer-events-none z-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(212,168,83,0.55) 0%, rgba(212,168,83,0.08) 50%, rgba(232,115,74,0.35) 100%)',
          borderRadius: '1.6rem',
        }}
      />

      {/* Diffuse glow behind photo */}
      <div
        className="absolute -inset-10 pointer-events-none z-[-1]"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 55% 50%, rgba(212,168,83,0.18) 0%, transparent 68%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Photo frame */}
      <div
        className="relative z-10 overflow-hidden w-full"
        style={{
          borderRadius: '1.4rem',
          border: '1.5px solid rgba(212,168,83,0.30)',
          boxShadow:
            '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,168,83,0.12) inset',
        }}
      >
        <img
          src={COACH_IMAGE_URL}
          alt="Krishnan Govindan — India's First Divorce Coach"
          className="w-full h-auto block object-cover object-top"
          loading="eager"
          decoding="async"
          style={{ display: 'block' }}
        />

        {/* Bottom name badge overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-4"
          style={{
            background:
              'linear-gradient(to top, rgba(6,13,24,0.92) 0%, rgba(6,13,24,0.60) 60%, transparent 100%)',
          }}
        >
          <p className="text-white font-display font-bold text-[1.05rem] leading-tight">
            Krishnan Govindan
          </p>
          <p className="text-gold text-[0.72rem] font-body font-semibold tracking-[0.14em] uppercase mt-0.5">
            India's First Divorce Coach
          </p>
        </div>
      </div>

      {/* Floating trust badge — top-left corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
        className="
          absolute -top-4 -left-4 z-20
          flex items-center gap-2
          px-3 py-2 rounded-xl
          backdrop-blur-sm
        "
        style={{
          background: 'rgba(6,13,24,0.88)',
          border: '1px solid rgba(212,168,83,0.35)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <span className="text-[1.1rem]">🏆</span>
        <div>
          <p className="text-white text-[0.65rem] font-body font-bold leading-tight">
            100+ Lives
          </p>
          <p className="text-gold text-[0.58rem] font-body tracking-wide uppercase">
            Transformed
          </p>
        </div>
      </motion.div>

      {/* Floating country badge — bottom-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5, ease: EASE }}
        className="
          absolute -bottom-4 -right-4 z-20
          flex items-center gap-2
          px-3 py-2 rounded-xl
          backdrop-blur-sm
        "
        style={{
          background: 'rgba(6,13,24,0.88)',
          border: '1px solid rgba(212,168,83,0.35)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <span className="text-[1.1rem]">🌏</span>
        <div>
          <p className="text-white text-[0.65rem] font-body font-bold leading-tight">
            12+ Countries
          </p>
          <p className="text-gold text-[0.58rem] font-body tracking-wide uppercase">
            Worldwide
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCROLL INDICATOR
// ═══════════════════════════════════════════════════════════════════════════════
// VIDEO MODAL — YouTube embed in a centred overlay
// ═══════════════════════════════════════════════════════════════════════════════
function VideoModal({ isOpen, onClose }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="
              fixed inset-0 z-[201]
              flex items-center justify-center
              px-4 sm:px-6
            "
            role="dialog"
            aria-modal="true"
            aria-label="Watch Krishnan Govindan's story"
          >
            <div className="relative w-full max-w-3xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="
                  absolute -top-11 right-0
                  flex items-center gap-2
                  text-white/70 hover:text-white
                  font-body text-sm
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                "
                aria-label="Close video"
              >
                <X size={18} strokeWidth={2} />
                Close
              </button>

              {/* 16:9 video wrapper */}
              <div
                className="relative w-full overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="Krishnan Govindan — India's First Divorce Coach Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.9 }}
      className="
        absolute bottom-7 left-1/2 -translate-x-1/2
        z-10 flex flex-col items-center gap-[6px]
        select-none pointer-events-none
      "
      aria-hidden="true"
    >
      <span className="
        text-[0.6rem] font-body font-semibold
        tracking-[0.2em] uppercase text-white/30
      ">
        Scroll Down
      </span>

      {/* Bouncing chevron */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown
          size={16}
          strokeWidth={2}
          className="text-gold/50"
        />
      </motion.div>
    </motion.div>
  )
}

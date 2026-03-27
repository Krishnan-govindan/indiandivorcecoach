import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Users, Globe2, Award, ChevronDown } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { trackCTAClick } from '../utils/analytics'

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

// ─── Headline Words ────────────────────────────────────────────────────────────
// Each word is animated individually; gold:true words render in brand gold.
const HEADLINE_WORDS = [
  { text: 'You',         gold: false },
  { text: "Don't",       gold: false },
  { text: 'Need',        gold: false },
  { text: 'Permission',  gold: false },
  { text: 'to',          gold: false },
  { text: 'Rebuild',     gold: true  },
  { text: 'Your',        gold: false },
  { text: 'Life',        gold: false },
]

// ─── Trust Statistics ──────────────────────────────────────────────────────────
const TRUST_STATS = [
  { Icon: Users,  label: '500+ Lives Transformed'     },
  { Icon: Globe2, label: 'Clients in 12+ Countries'   },
  { Icon: Award,  label: "India's First Divorce Coach" },
]

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
        style={{ backgroundColor: '#07111f' }}
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
              <HeroText />
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
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// BACKGROUND LAYERS
// ═══════════════════════════════════════════════════════════════════════════════
function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">

      {/* 1 — Base radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 130% 90% at 65% 25%, #0e2040 0%, #07111f 50%, #040c18 100%)',
        }}
      />

      {/* 2 — Dot grid (gold tint, very subtle) */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4A853 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />

      {/* 3 — Grain / noise texture via inline SVG data-URI */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
        }}
      />

      {/* 4 — Ambient coral glow (left) */}
      <div
        className="absolute -left-48 top-[20%] w-[640px] h-[640px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(232,115,74,0.07) 0%, transparent 62%)',
        }}
      />

      {/* 5 — Ambient gold glow (right, where mandala sits) */}
      <div
        className="absolute right-[-5%] top-[15%] w-[700px] h-[700px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(212,168,83,0.09) 0%, transparent 60%)',
        }}
      />

      {/* 6 — Bottom fade → blends into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #07111f 100%)',
        }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO TEXT BLOCK
// ═══════════════════════════════════════════════════════════════════════════════
function HeroText() {
  return (
    <div>
      {/* ── Eyebrow Badge ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
        className="inline-flex items-center gap-3 mb-7"
      >
        <span className="block w-8 h-px bg-gold" />
        <span
          className="
            text-[0.62rem] font-body font-semibold
            tracking-[0.22em] uppercase text-gold
          "
        >
          India's #1 Divorce Coach for NRIs
        </span>
        <span className="block w-8 h-px bg-gold" />
      </motion.div>

      {/* ── H1 — Word-by-word animation ────────────────────────────────── */}
      {/*
        The sr-only suffix appends SEO keywords to the heading without
        cluttering the visual layout.
      */}
      <motion.h1
        id="hero-heading"
        variants={wordContainerVariants}
        initial="hidden"
        animate="visible"
        className="
          font-display font-bold leading-[1.08] tracking-[-0.02em]
          text-[2rem] sm:text-[2.6rem] md:text-[3.1rem]
          lg:text-[3.4rem] xl:text-[3.9rem]
          flex flex-wrap gap-x-[0.22em] gap-y-[0.05em]
          mb-7
        "
      >
        {HEADLINE_WORDS.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className={word.gold ? 'text-gold' : 'text-white'}
            style={{ display: 'inline-block' }}
          >
            {word.text}
          </motion.span>
        ))}
        {/* Hidden keyword suffix for SEO — read by screen readers naturally */}
        <span className="sr-only">
          {' '}— India's first online divorce coach for Indians and NRIs
          in USA, UK, Canada, Australia, and worldwide.
        </span>
      </motion.h1>

      {/* ── Sub-headline ────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.76, ease: EASE }}
        className="
          font-body text-[1rem] sm:text-[1.05rem] lg:text-[1.1rem]
          text-white/60 leading-[1.75]
          max-w-[560px] mb-10
        "
      >
        India's first and most trusted online divorce coach — helping NRIs and
        Indians worldwide navigate divorce with{' '}
        <span className="text-white/90 font-medium">
          clarity, confidence, and a concrete plan
        </span>{' '}
        — not just sympathy.
      </motion.p>

      {/* ── CTA Buttons ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.9, ease: EASE }}
        className="flex flex-col sm:flex-row gap-4 mb-12"
      >
        {/* Primary — Book Free Call */}
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
              bg-coral hover:bg-coral-dark
              text-white font-body font-bold
              text-[0.95rem] sm:text-[1rem]
              rounded-full cursor-pointer select-none
              shadow-[0_8px_32px_rgba(232,115,74,0.38)]
              hover:shadow-[0_12px_44px_rgba(232,115,74,0.55)]
              transition-[background-color,box-shadow] duration-300
              focus-visible:ring-4 focus-visible:ring-coral/40 focus-visible:outline-none
              w-full sm:w-auto whitespace-nowrap
            "
            aria-label="Book your free 30-minute discovery call with Krishnan Govindan"
          >
            Book Your Free Discovery Call
            <ArrowRight
              size={17}
              strokeWidth={2.5}
              className="flex-shrink-0"
              aria-hidden="true"
            />
          </ScrollLink>
        </motion.div>

        {/* Secondary — Watch My Story */}
        {/*
          TODO: Replace ScrollLink with a button that opens a video modal
          once the video URL is available.
        */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 380, damping: 20 }}
        >
          <ScrollLink
            to="about"
            smooth
            duration={600}
            offset={SCROLL_OFFSET}
            onClick={() => trackCTAClick('watch_story')}
            className="
              inline-flex items-center justify-center gap-3
              px-7 py-[14px]
              bg-white/[0.06] hover:bg-white/[0.12]
              border border-white/20 hover:border-white/40
              text-white/80 hover:text-white
              font-body font-medium
              text-[0.95rem] sm:text-[1rem]
              rounded-full cursor-pointer select-none
              backdrop-blur-sm
              transition-all duration-300
              focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:outline-none
              w-full sm:w-auto whitespace-nowrap
            "
            aria-label="Watch Krishnan's story — scroll to About section"
          >
            {/* Play icon in a small circle */}
            <span
              className="
                flex items-center justify-center
                w-7 h-7 rounded-full
                bg-white/20
                flex-shrink-0
              "
              aria-hidden="true"
            >
              <Play size={11} fill="currentColor" strokeWidth={0} />
            </span>
            Watch My Story
          </ScrollLink>
        </motion.div>
      </motion.div>

      {/* ── Trust Indicators ────────────────────────────────────────────── */}
      <motion.div
        variants={trustContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center gap-x-0 gap-y-2"
        aria-label="Trust indicators"
      >
        {TRUST_STATS.map(({ Icon, label }, i) => (
          <Fragment key={label}>
            <motion.div
              variants={trustItemVariants}
              className="flex items-center gap-1.5"
            >
              <Icon
                size={13}
                strokeWidth={2}
                className="text-gold flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[0.75rem] font-body font-medium text-white/50 tracking-wide">
                {label}
              </span>
            </motion.div>
            {i < TRUST_STATS.length - 1 && (
              <motion.span
                variants={trustItemVariants}
                className="mx-4 text-white/20 text-base leading-none select-none"
                aria-hidden="true"
              >
                ·
              </motion.span>
            )}
          </Fragment>
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
            500+ Lives
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

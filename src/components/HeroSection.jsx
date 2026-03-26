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

            {/* Right — Decorative Mandala */}
            <div className="
              w-full
              max-w-[300px] sm:max-w-[380px] lg:max-w-none
              mx-auto lg:mx-0
              lg:w-[43%]
              lg:flex lg:items-center lg:justify-end
              lg:py-28
            ">
              <div className="w-full lg:max-w-[480px] xl:max-w-[520px]">
                <GeometricMandala />
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
// GEOMETRIC MANDALA — Pure CSS / SVG decorative element
//
// Three animation layers:
//   1. Outer ring of dots  → slow clockwise rotation (80s)
//   2. Dashed middle ring  → slow counter-clockwise (55s)
//   3. Static core rings, spokes, dot accents, cardinal diamonds
//   4. Inner glow         → gentle pulse (opacity + scale, 5s loop)
// ═══════════════════════════════════════════════════════════════════════════════
function GeometricMandala() {
  const CX = 200
  const CY = 200

  /**
   * Returns {x, y} coords for `count` evenly spaced points on a circle
   * of the given `radius`, starting from the top (−90°).
   */
  const ring = (count, radius) =>
    Array.from({ length: count }, (_, i) => {
      const a = ((-90 + (i * 360) / count) * Math.PI) / 180
      return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) }
    })

  const outerDots  = ring(12, 172)  // 12 dots on the rotating outer ring
  const middleDots = ring(8,  110)  // 8 dots on the static inner band
  const innerDots  = ring(6,  70)   // 6 smaller dots, innermost band

  // 8 spoke lines from center to outer radius
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = ((-90 + i * 45) * Math.PI) / 180
    return { x2: CX + 185 * Math.cos(a), y2: CY + 185 * Math.sin(a) }
  })

  // 4 cardinal diamond positions (top, right, bottom, left) at r=90
  const diamonds = [0, 90, 180, 270].map(deg => {
    const a = ((deg - 90) * Math.PI) / 180
    return { x: CX + 90 * Math.cos(a), y: CY + 90 * Math.sin(a), rot: deg }
  })

  return (
    <div
      className="relative w-full aspect-square select-none"
      aria-hidden="true"
      role="presentation"
    >
      {/* Soft diffuse glow — rendered below the SVG layers */}
      <div
        className="absolute inset-[12%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,168,83,0.13) 0%, rgba(212,168,83,0.04) 45%, transparent 72%)',
          filter: 'blur(28px)',
        }}
      />
      <div
        className="absolute inset-[32%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(232,115,74,0.09) 0%, transparent 68%)',
          filter: 'blur(18px)',
        }}
      />

      {/* ── Layer 1: Outer ring of dots, slow CW rotation ─────────────── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          <circle cx={CX} cy={CY} r="188" stroke="#D4A853" strokeWidth="0.7" strokeOpacity="0.18" />
          {outerDots.map((p, i) => (
            <circle
              key={i}
              cx={p.x} cy={p.y}
              r={i % 3 === 0 ? 3.5 : 2}
              fill="#D4A853"
              fillOpacity={i % 3 === 0 ? 0.65 : 0.32}
            />
          ))}
        </svg>
      </motion.div>

      {/* ── Layer 2: Dashed ring, slow CCW rotation ───────────────────── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          <circle
            cx={CX} cy={CY} r="148"
            stroke="#D4A853"
            strokeWidth="1"
            strokeDasharray="7 5"
            strokeOpacity="0.25"
          />
        </svg>
      </motion.div>

      {/* ── Layer 3: Static geometric core ───────────────────────────── */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric rings */}
        <circle cx={CX} cy={CY} r="170" stroke="#D4A853" strokeWidth="0.4" strokeOpacity="0.12" />
        <circle cx={CX} cy={CY} r="128" stroke="#D4A853" strokeWidth="1.1" strokeOpacity="0.28" />
        <circle cx={CX} cy={CY} r="90"  stroke="#D4A853" strokeWidth="0.8" strokeOpacity="0.20" />
        <circle cx={CX} cy={CY} r="54"  stroke="#D4A853" strokeWidth="1.4" strokeOpacity="0.42" />
        <circle cx={CX} cy={CY} r="25"  stroke="#D4A853" strokeWidth="1.8" strokeOpacity="0.58" />

        {/* 8 spokes */}
        {spokes.map((s, i) => (
          <line
            key={i}
            x1={CX} y1={CY}
            x2={s.x2} y2={s.y2}
            stroke="#D4A853"
            strokeWidth="0.5"
            strokeOpacity="0.12"
          />
        ))}

        {/* Middle ring — 8 dots */}
        {middleDots.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4"   fill="#D4A853" fillOpacity="0.52" />
        ))}

        {/* Inner ring — 6 smaller dots */}
        {innerDots.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.8" fill="#D4A853" fillOpacity="0.38" />
        ))}

        {/* 4 cardinal diamond accents (at r=90, rotated to point outward) */}
        {diamonds.map((d, i) => (
          <g key={i} transform={`translate(${d.x},${d.y}) rotate(${d.rot})`}>
            <path d="M0,-7.5 L5.5,0 L0,7.5 L-5.5,0 Z" fill="#D4A853" fillOpacity="0.52" />
          </g>
        ))}

        {/* Center glyph — outer halo, middle circle, bright core */}
        <circle cx={CX} cy={CY} r="22" fill="#D4A853" fillOpacity="0.06" />
        <circle cx={CX} cy={CY} r="7"  fill="#D4A853" fillOpacity="0.82" />
        <circle cx={CX} cy={CY} r="3"  fill="#FFFFFF"  fillOpacity="0.90" />
      </svg>

      {/* ── Layer 4: Inner pulsing glow ───────────────────────────────── */}
      <motion.div
        animate={{
          opacity: [0.35, 0.85, 0.35],
          scale:   [0.90, 1.06, 0.90],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[37%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,168,83,0.28) 0%, transparent 68%)',
          willChange: 'transform, opacity',
        }}
      />
    </div>
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

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Globe2, Award, Clock, ArrowRight, User } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { trackCTAClick } from '../utils/analytics'

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1]
const SCROLL_OFFSET = -80

// ─── Coach Story Paragraphs ───────────────────────────────────────────────────
const STORY = [
  "I know what this feels like — because I've lived it. I went through a divorce myself, as an Indian navigating life abroad. I know the loneliness, the cultural weight, and the disorienting confusion of not knowing which rules even apply to you. I know what it means to have your entire world collapse while you're thousands of miles from everyone who knows you.",
  "For years, I built a career in corporate India — eventually leading customer service operations at ICICI Bank. I believed I had the life I was supposed to have. Then my marriage broke down. I faced rejection, failure, and a kind of pain I had absolutely no framework for. And I realised something that changed my life: there was no one who truly understood what an Indian going through divorce abroad actually faces — not just the legal tangle, but the cultural shame, the isolation, the identity crisis.",
  "That gap became my purpose. I retrained, built India's first dedicated divorce coaching practice, and have since helped 100+ Indians and NRIs across 12+ countries navigate divorce — not just survive it, but come out with a plan, their dignity intact, and a life they're rebuilding on their own terms.",
]

// ─── Credentials Data ─────────────────────────────────────────────────────────
// countTo: number for count-up animation; null renders `display` statically
const CREDENTIALS = [
  { Icon: Users,  countTo: 100,  suffix: '+', label: 'Clients Coached'      },
  { Icon: Globe2, countTo: 12,   suffix: '+', label: 'Countries Served'     },
  { Icon: Award,  countTo: null, display: '#1',  label: 'Divorce Coach in India' },
  { Icon: Clock,  countTo: null, display: '24/7', label: 'Available Online'  },
]

// ─── useCountUp hook ──────────────────────────────────────────────────────────
/**
 * Animates a number from 0 → target using requestAnimationFrame with
 * easeOutCubic when the returned `ref` element scrolls into view.
 *
 * @param {number|null} target  Final value, or null to skip animation.
 * @param {number}      ms      Animation duration in milliseconds.
 */
function useCountUp(target, ms = 1600) {
  const [count, setCount] = useState(0)
  const ref          = useRef(null)
  const started      = useRef(false)
  const isInView     = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView || started.current || target === null) return
    started.current = true

    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / ms, 1)
      // easeOutCubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }

    requestAnimationFrame(tick)
  }, [isInView, target, ms])

  return { count, ref }
}

// ─── Motion Variants ──────────────────────────────────────────────────────────
const credGridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const credItemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function AboutSection({ id }) {
  return (
    <section
      id={id}
      className="section-padding bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16 xl:gap-20">

          {/* ── Left Column — Photo (45%) ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -64 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
            viewport={{ once: true, margin: '-80px' }}
            className="w-full max-w-[400px] mx-auto lg:mx-0 lg:w-[45%] flex-shrink-0"
          >
            <PhotoFrame />
          </motion.div>

          {/* ── Right Column — Text (55%) ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 64 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            viewport={{ once: true, margin: '-80px' }}
            className="w-full lg:w-[55%]"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="block w-7 h-px bg-gold" />
              <span className="section-label !mb-0">Meet Your Coach</span>
            </div>

            {/* Name */}
            <h2
              id="about-heading"
              className="font-display font-bold text-navy leading-tight tracking-tight
                text-[2.2rem] sm:text-[2.6rem] lg:text-[2.8rem]
                mb-2"
            >
              Krishnan Govindan
            </h2>

            {/* Title / Role */}
            <p className="font-body text-[0.9rem] text-gray-400 tracking-wide mb-7 leading-relaxed">
              India's First Divorce Coach&nbsp;&nbsp;·&nbsp;&nbsp;Breakup Recovery Expert&nbsp;&nbsp;·&nbsp;&nbsp;Life Strategist
            </p>

            {/* Story paragraphs */}
            <div className="space-y-4 mb-8">
              {STORY.map((para, i) => (
                <p
                  key={i}
                  className="font-body text-[0.925rem] text-gray-600 leading-[1.8]"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Pull Quote */}
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              viewport={{ once: true, margin: '-60px' }}
              className="
                relative my-8
                border-l-4 border-gold
                pl-5 py-1
              "
            >
              {/* Decorative large quote mark */}
              <span
                className="absolute -top-3 -left-1 font-display text-[4rem] leading-none text-gold/20 select-none"
                aria-hidden="true"
              >
                "
              </span>
              <p className="font-display italic text-navy text-[1.05rem] sm:text-[1.12rem] leading-relaxed">
                I've faced countless rejections, setbacks, and failures — my
                marriage being the biggest one. But did it stop me? No. It made
                me who I am today.
              </p>
              <footer className="mt-3 font-body text-[0.8rem] font-semibold text-gold tracking-wide not-italic">
                — Krishnan Govindan
              </footer>
            </motion.blockquote>

            {/* Credentials */}
            <motion.div
              variants={credGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="
                grid grid-cols-2 sm:grid-cols-4
                gap-4 sm:gap-3
                py-6 my-6
                border-t border-b border-gray-100
              "
            >
              {CREDENTIALS.map(cred => (
                <CredentialItem key={cred.label} cred={cred} />
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <span className="font-body text-gray-500 text-[0.95rem]">
                Let's talk —
              </span>
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
                  onClick={() => trackCTAClick('book_free_call_about')}
                  className="
                    inline-flex items-center gap-2.5
                    px-7 py-3.5
                    bg-coral hover:bg-coral-dark
                    text-white font-body font-bold text-[0.92rem]
                    rounded-full cursor-pointer select-none
                    shadow-[0_6px_28px_rgba(232,115,74,0.30)]
                    hover:shadow-[0_10px_40px_rgba(232,115,74,0.46)]
                    transition-[background-color,box-shadow] duration-300
                    focus-visible:ring-4 focus-visible:ring-coral/40 focus-visible:outline-none
                  "
                  aria-label="Book your free discovery call with Krishnan Govindan"
                >
                  Book Your Free Discovery Call
                  <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                </ScrollLink>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHOTO FRAME
//
// Visual layers (back → front):
//   1. Gold offset border rectangle  (bottom-right offset)
//   2. 3×3 dot grid accent           (top-left, outside frame)
//   3. Floating navy placeholder     (Framer Motion y-oscillation)
//      └── inner gradient + corner accents + placeholder copy
// ═══════════════════════════════════════════════════════════════════════════════
function PhotoFrame() {
  return (
    /*
      Outer wrapper provides breathing room so the offset frame and dots
      aren't clipped. pb-6 / pr-6 reserves space for the bottom-right frame.
      pt-4 / pl-4 reserves space for the top-left dots.
    */
    <div className="relative pt-4 pl-4 pb-6 pr-6">

      {/* 1 — Gold offset border rectangle (behind the photo) */}
      <div
        className="
          absolute bottom-0 right-0
          w-[calc(100%-16px)] h-[calc(100%-16px)]
          border-2 border-gold/45
          rounded-2xl
          z-0
        "
        aria-hidden="true"
      />

      {/* 2 — 3×3 dot grid accent (top-left corner, partially outside) */}
      <div
        className="absolute top-0 left-0 z-20 grid grid-cols-3 gap-[7px]"
        aria-hidden="true"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-[6px] h-[6px] rounded-full bg-gold/40"
          />
        ))}
      </div>

      {/* 3 — Floating photo placeholder */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
        aria-label="Coach photo placeholder — replace with Krishnan Govindan's actual photo"
      >
        <div
          className="
            relative w-full aspect-[3/4]
            rounded-2xl overflow-hidden
            shadow-[0_20px_60px_rgba(10,22,40,0.30)]
          "
          style={{
            background: 'linear-gradient(145deg, #1E3655 0%, #0A1628 55%, #040c18 100%)',
          }}
        >
          {/* Inner gradient depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 30%, rgba(212,168,83,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Corner accent lines — top-left */}
          <div
            className="absolute top-4 left-4 w-10 h-10
              border-t-2 border-l-2 border-gold/30 rounded-tl-lg"
            aria-hidden="true"
          />

          {/* Corner accent lines — bottom-right */}
          <div
            className="absolute bottom-4 right-4 w-10 h-10
              border-b-2 border-r-2 border-gold/30 rounded-br-lg"
            aria-hidden="true"
          />

          {/* Coach photo */}
          <img
            src="https://assets.cdn.filesafe.space/m9jCzEyKqM4xlMWTjcgS/media/685aa9b8f1a848bc1fe8873d.jpeg"
            alt="Krishnan Govindan — India's First Divorce Coach"
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="eager"
            decoding="async"
          />

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-28"
            style={{
              background: 'linear-gradient(to top, rgba(4,12,24,0.85) 0%, transparent 100%)',
            }}
          />

          {/* Bottom label */}
          <div className="absolute bottom-5 left-0 right-0 text-center">
            <span className="font-body text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-gold/65">
              India's First Divorce Coach
            </span>
          </div>
        </div>
      </motion.div>

    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CREDENTIAL ITEM
// Numbers use the count-up hook; non-numbers render their `display` string.
// ═══════════════════════════════════════════════════════════════════════════════
function CredentialItem({ cred }) {
  const { Icon, countTo, suffix = '', display, label } = cred
  const { count, ref } = useCountUp(countTo)

  return (
    <motion.div
      ref={ref}
      variants={credItemVariants}
      className="flex flex-col items-center text-center gap-2 px-2"
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-full bg-gold/[0.12] flex items-center justify-center mb-1"
      >
        <Icon size={17} strokeWidth={1.75} className="text-gold" aria-hidden="true" />
      </div>

      {/* Number / value */}
      <span className="font-display font-bold text-navy text-[1.6rem] leading-none tracking-tight">
        {countTo !== null
          ? <>{count}{suffix}</>
          : display
        }
      </span>

      {/* Label */}
      <span className="font-body text-[0.72rem] text-gray-400 font-medium leading-snug">
        {label}
      </span>
    </motion.div>
  )
}

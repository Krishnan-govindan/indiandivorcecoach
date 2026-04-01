import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { trackCTAClick } from '../utils/analytics'

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'Priya M.',
    location: 'California, USA',
    quote:
      "I was drowning in confusion — dealing with divorce laws in both the US and India, family pressure from back home, and complete emotional chaos. Krishnan didn't just listen — he gave me a roadmap. Within 3 months, I had clarity I hadn't felt in years.",
    rating: 5,
  },
  {
    name: 'Rahul S.',
    location: 'London, UK',
    quote:
      "As an Indian man going through divorce abroad, I felt like nobody understood my situation. The cultural shame, the isolation, the fear of losing access to my kids. Krishnan got it — because he'd been through it himself. That changed everything.",
    rating: 5,
  },
  {
    name: 'Anita K.',
    location: 'Dubai, UAE',
    quote:
      "I thought my life was over after my divorce. Krishnan helped me see it was actually just beginning. His coaching gave me the confidence to rebuild — my career, my social life, my sense of self. I'm genuinely happy now.",
    rating: 5,
  },
  {
    name: 'Vikram D.',
    location: 'Sydney, Australia',
    quote:
      "The best investment I made during the worst time of my life. Krishnan's approach is practical, no-nonsense, and deeply empathetic. He understands the NRI experience like nobody else.",
    rating: 5,
  },
  {
    name: 'Sneha P.',
    location: 'Toronto, Canada',
    quote:
      "I was scared to even say the word 'divorce' out loud. Krishnan created a safe space where I could think clearly for the first time. His guidance through the process was invaluable.",
    rating: 5,
  },
]

const COUNTRIES = [
  { flag: '🇮🇳', name: 'India' },
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇬🇧', name: 'UK' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇦🇺', name: 'Australia' },
  { flag: '🇦🇪', name: 'UAE' },
]

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE            = [0.22, 1, 0.36, 1]
const SCROLL_OFFSET   = -80
const AUTO_ADVANCE_MS = 5000

// ─── Motion Variants ──────────────────────────────────────────────────────────

const headerVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// Direction-aware card slide: positive direction = next (slides in from right)
const cardVariants = {
  enter:  (dir) => ({
    x:       dir > 0 ? 72 : -72,
    opacity: 0,
  }),
  center: {
    x:          0,
    opacity:    1,
    transition: { duration: 0.48, ease: EASE },
  },
  exit:   (dir) => ({
    x:          dir > 0 ? -72 : 72,
    opacity:    0,
    transition: { duration: 0.32, ease: EASE },
  }),
}

// Stars — staggered pop-in; re-triggers on every card because the card
// re-mounts under a new `key` on each carousel change.
const starGroupVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
}
const starItemVariants = {
  hidden:  { opacity: 0, scale: 0.2, rotate: -20, rotateY: -90 },
  visible: {
    opacity: 1,
    scale:   1,
    rotate:  0,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 520, damping: 14 },
  },
}

// Trust bar
const trustWrapVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
const trustGridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}
const trustItemVariants = {
  hidden:  { opacity: 0, scale: 0.85, y: 8 },
  visible: { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.38, ease: EASE } },
}

const ctaVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function TestimonialsSection({ id }) {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused,  setIsPaused]  = useState(false)

  const goTo = useCallback((idx, dir) => {
    setDirection(dir)
    setCurrent(idx)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % TESTIMONIALS.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1)
  }, [current, goTo])

  // Auto-advance — paused on hover / touch
  useEffect(() => {
    if (isPaused) return
    const t = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(t)
  }, [isPaused, next])

  return (
    <section
      id={id}
      className="section-padding"
      style={{
        backgroundColor: '#FAF7F0',
        backgroundImage: 'radial-gradient(circle, rgba(212,168,83,0.07) 1px, transparent 1px)',
        backgroundSize:  '28px 28px',
      }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerVariants}
          className="text-center mb-14"
        >
          <span className="section-label">Client Stories</span>
          <h2
            id="testimonials-heading"
            className="section-title text-navy mt-1 mb-4"
          >
            <span className="text-navy">Real Stories. </span>
            <span className="text-gold">Real Transformations.</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Hear from Indians and NRIs worldwide who <span className="text-gold font-semibold">took the first step</span>
          </p>
        </motion.div>

        {/* ── Carousel ────────────────────────────────────────────────────── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/*
            overflow-hidden clips the enter / exit slide translations.
            mode="wait": old card fully exits before the new one enters — avoids
            needing absolute positioning or fixed heights for overlap.
          */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50 && info.velocity.x <= 0)   next()
                  else if (info.offset.x > 50 && info.velocity.x >= 0) prev()
                }}
                className="cursor-grab active:cursor-grabbing"
                aria-live="polite"
                aria-label={`Testimonial ${current + 1} of ${TESTIMONIALS.length}`}
              >
                <TestimonialCard testimonial={TESTIMONIALS[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Controls bar: ← [dots] → ────────────────────────────────── */}
          <div
            className="flex items-center justify-center gap-4 mt-9"
            role="group"
            aria-label="Carousel controls"
          >
            {/* Prev */}
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              className="
                w-10 h-10 rounded-full flex-shrink-0
                bg-white border border-gold/25
                flex items-center justify-center
                shadow-[0_2px_14px_rgba(10,22,40,0.08)]
                hover:border-gold/55 hover:shadow-[0_4px_20px_rgba(212,168,83,0.18)]
                transition-[border-color,box-shadow] duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
              "
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={17} strokeWidth={2.2} className="text-navy/60" />
            </motion.button>

            {/* Dot indicators — active dot expands to a wider pill */}
            <div className="flex items-center gap-[7px]" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((_, i) => (
                <motion.button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  animate={{
                    width:           i === current ? 28 : 8,
                    backgroundColor: i === current ? '#D4A853' : 'rgba(212,168,83,0.28)',
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="h-2 rounded-full flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              className="
                w-10 h-10 rounded-full flex-shrink-0
                bg-white border border-gold/25
                flex items-center justify-center
                shadow-[0_2px_14px_rgba(10,22,40,0.08)]
                hover:border-gold/55 hover:shadow-[0_4px_20px_rgba(212,168,83,0.18)]
                transition-[border-color,box-shadow] duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50
              "
              aria-label="Next testimonial"
            >
              <ChevronRight size={17} strokeWidth={2.2} className="text-navy/60" />
            </motion.button>
          </div>
        </div>

        {/* ── Trust Bar ───────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={trustWrapVariants}
          className="mt-20 text-center"
        >
          <p className="font-body text-[0.88rem] font-medium text-navy/55 mb-5">
            Trusted by{' '}
            <span className="font-bold text-navy">500+ clients</span>
            {' '}across{' '}
            <span className="font-bold text-navy">12+ countries</span>
          </p>

          <motion.div
            variants={trustGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {COUNTRIES.map(country => (
              <motion.div
                key={country.name}
                variants={trustItemVariants}
                className="
                  inline-flex items-center gap-2
                  px-4 py-[9px]
                  bg-white rounded-full
                  border border-gold/[0.18]
                  shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                "
              >
                <span
                  className="text-[1.2rem] leading-none"
                  role="img"
                  aria-label={country.name}
                >
                  {country.flag}
                </span>
                <span className="font-body text-[0.8rem] font-medium text-gray-600">
                  {country.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={ctaVariants}
          className="text-center mt-14"
        >
          <p className="font-display font-semibold text-navy text-xl sm:text-2xl mb-7">
            Ready to write your own success story?
          </p>

          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className="inline-block"
          >
            <ScrollLink
              to="booking"
              smooth
              duration={700}
              offset={SCROLL_OFFSET}
              className="
                inline-flex items-center gap-2.5
                px-8 py-4
                bg-coral hover:bg-coral-dark
                text-white font-body font-bold text-[0.95rem]
                rounded-full cursor-pointer select-none
                shadow-[0_8px_32px_rgba(232,115,74,0.32)]
                hover:shadow-[0_12px_44px_rgba(232,115,74,0.50)]
                transition-[background-color,box-shadow] duration-300
                focus-visible:ring-4 focus-visible:ring-coral/40 focus-visible:outline-none
              "
              onClick={() => trackCTAClick('book_free_call_testimonials')}
              aria-label="Start with a free call"
            >
              Start With a Free Call
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ScrollLink>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIAL CARD
//
// Visual layers (back → front):
//   1. Gold left border  (border-l-4) — structural accent, always rendered
//   2. Decorative closing-quote glyph — gold/9%, top-right, aria-hidden
//   3. Stars row — stagger-pop on every card mount (AnimatePresence key swap)
//   4. Quote body text
//   5. Gold hairline divider
//   6. Initial avatar circle + client name & location row
//
// max-w-[680px] mx-auto keeps the card from stretching too wide on large
// screens. sm:px-4 leaves a small outer margin so the drop-shadow isn't
// hard-clipped against the container edge on mid-size viewports.
// ═══════════════════════════════════════════════════════════════════════════════
function TestimonialCard({ testimonial }) {
  const { name, location, quote, rating } = testimonial

  return (
    <div className="max-w-[680px] mx-auto sm:px-4">
      <div
        className="
          relative bg-white rounded-2xl
          border-l-4 border-gold
          p-8 sm:p-10 md:p-12
          shadow-[0_8px_44px_rgba(10,22,40,0.08)]
        "
      >

        {/* Decorative closing quote mark — top-right, purely decorative */}
        <span
          className="
            absolute top-4 right-6
            font-display text-[6rem] leading-none
            select-none pointer-events-none
          "
          style={{ color: 'rgba(212,168,83,0.09)' }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Stars — stagger-pop animation fires fresh on every card mount */}
        <motion.div
          variants={starGroupVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-1 mb-6"
          aria-label={`Rated ${rating} out of 5 stars`}
          role="img"
        >
          {Array.from({ length: rating }).map((_, i) => (
            <motion.span key={i} variants={starItemVariants}>
              <Star
                size={18}
                strokeWidth={0}
                fill="#D4A853"
                aria-hidden="true"
              />
            </motion.span>
          ))}
        </motion.div>

        {/* Quote body */}
        <p
          className="
            font-body text-[0.975rem] sm:text-[1.04rem]
            text-gray-700 leading-[1.88]
            mb-8 relative z-10
          "
        >
          {quote}
        </p>

        {/* Hairline divider */}
        <div
          className="h-px mb-6"
          style={{ backgroundColor: 'rgba(212,168,83,0.18)' }}
        />

        {/* Client row */}
        <div className="flex items-center gap-3">

          {/* Initial avatar */}
          <div
            className="
              w-10 h-10 rounded-full flex-shrink-0
              bg-gold/[0.12] border border-gold/[0.25]
              flex items-center justify-center
            "
            aria-hidden="true"
          >
            <span className="font-display font-bold text-gold text-[0.9rem]">
              {name[0]}
            </span>
          </div>

          <div>
            <p className="font-body font-bold text-navy text-[0.9rem] leading-tight">
              {name}
            </p>
            <p className="font-body text-[0.78rem] text-gray-400 leading-tight mt-0.5">
              {location}
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

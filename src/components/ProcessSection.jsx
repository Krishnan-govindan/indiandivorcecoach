import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CalendarCheck, FileText, Video, Rocket, ChevronRight, ArrowRight } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { trackCTAClick } from '../utils/analytics'

// ─── Steps Data ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: 1,
    Icon: CalendarCheck,
    title: 'Book Your Free Discovery Call',
    description:
      "Schedule a free 15-30 minute call. No pressure, no commitment. Just a conversation to understand your situation and see if we're the right fit.",
  },
  {
    n: 2,
    Icon: FileText,
    title: 'Get Your Personalised Plan',
    description:
      "Based on your unique situation — whether it's an NRI cross-border divorce, a difficult breakup, or life after separation — I'll create a coaching roadmap tailored just for you.",
  },
  {
    n: 3,
    Icon: Video,
    title: 'Weekly Coaching Sessions',
    description:
      'We meet online via video call — from anywhere in the world, any timezone. Each session is focused, actionable, and moves you forward. No endless venting — real progress.',
  },
  {
    n: 4,
    Icon: Rocket,
    title: 'Reclaim Your Life',
    description:
      "You'll walk away with clarity, confidence, and a concrete plan for your future. My clients don't just survive divorce — they come out stronger, sharper, and more self-assured than ever.",
  },
]

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1]
const SCROLL_OFFSET = -80

// ─── Motion Variants ──────────────────────────────────────────────────────────

const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// Grid container — drives stagger for step nodes
const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.35 } },
}

// Desktop / tablet step node — fades + rises
const stepVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// Mobile step — slides in from left
const mobileStepVariants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

const ctaVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROCESS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function ProcessSection({ id }) {
  return (
    <section
      id={id}
      className="section-padding bg-white overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="container-custom">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerVariants}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="section-label">Simple & Proven</span>
          <h2
            id="process-heading"
            className="section-title text-navy mt-1 mb-4"
          >
            How It Works
          </h2>
          <p className="section-subtitle mx-auto text-center">
            From confusion to clarity in 4 simple steps
          </p>
        </motion.div>

        {/* ── Process Area ───────────────────────────────────────────────── */}
        <div>

          {/* ══ DESKTOP + TABLET (md+): Grid with connecting line ══════════ */}
          <div className="relative hidden md:block">

            {/* Connecting line + arrows — desktop only (lg+) */}
            <ConnectingLine />

            {/* Step nodes */}
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-6 lg:gap-x-4"
            >
              {STEPS.map(step => (
                <StepNode key={step.n} step={step} />
              ))}
            </motion.div>
          </div>

          {/* ══ MOBILE (<md): Vertical timeline ═══════════════════════════ */}
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="md:hidden relative"
          >
            {/*
              Vertical gold line.
              Runs from top of first circle center to bottom of last circle center.
              Circles are w-14 h-14 = 56px; center at 28px = left-7.
            */}
            <div
              className="absolute left-7 top-0 bottom-0 w-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(212,168,83,0.45) 4%, rgba(212,168,83,0.35) 90%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            <div className="space-y-10">
              {STEPS.map(step => (
                <MobileStepNode key={step.n} step={step} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={ctaVariants}
          className="text-center mt-20 lg:mt-24"
        >
          <p className="font-display font-semibold text-navy text-xl sm:text-2xl md:text-[1.75rem] mb-8">
            Your new chapter starts with one call.
          </p>

          {/*
            Breathing / pulse animation on the wrapper div.
            boxShadow + scale loop gives the effect of the button "glowing"
            rhythmically. whileHover overrides scale for immediate feedback.
          */}
          <motion.div
            animate={{
              scale: [1, 1.025, 1],
              boxShadow: [
                '0 8px 32px rgba(232,115,74,0.26)',
                '0 16px 56px rgba(232,115,74,0.52)',
                '0 8px 32px rgba(232,115,74,0.26)',
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            className="inline-block rounded-full"
          >
            <ScrollLink
              to="booking"
              smooth
              duration={700}
              offset={SCROLL_OFFSET}
              className="
                inline-flex items-center gap-2.5
                px-8 py-4 sm:px-10 sm:py-[18px]
                bg-coral hover:bg-coral-dark
                text-white font-body font-bold
                text-[0.95rem] sm:text-[1rem]
                rounded-full cursor-pointer select-none
                transition-colors duration-300
                focus-visible:ring-4 focus-visible:ring-coral/40 focus-visible:outline-none
              "
              onClick={() => trackCTAClick('book_free_call_process')}
              aria-label="Book your free discovery call now"
            >
              Book Your Free Discovery Call Now
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </ScrollLink>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONNECTING LINE  (desktop only, hidden below lg)
//
// Two absolute layers inside the `div.relative.hidden.md:block` parent:
//   1. The dashed gold line  — reveals left→right via clipPath animation
//   2. Arrow circle indicators — at 25%, 50%, 75% of container width
//
// Positioning maths:
//   4 equal columns → column centers at 12.5 / 37.5 / 62.5 / 87.5 % of width.
//   Line: left:12.5%  right:12.5%  (spans between outer circle centers).
//   Line vertical: top:32px = center of 64px (h-16) circles.
//   Arrows: at 25%, 50%, 75% container x = midpoints between circle centers.
// ═══════════════════════════════════════════════════════════════════════════════
function ConnectingLine() {
  return (
    <>
      {/* ── Dashed line ──────────────────────────────────────────────────── */}
      <div
        className="absolute hidden lg:block pointer-events-none"
        style={{
          top: '32px',
          left: '12.5%',
          right: '12.5%',
          height: '2px',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.7, ease: EASE, delay: 0.2 }}
          viewport={{ once: true, margin: '-80px' }}
          className="w-full h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(212,168,83,0.55) 0px, rgba(212,168,83,0.55) 9px, transparent 9px, transparent 16px)',
          }}
        />
      </div>

      {/* ── Arrow circle indicators (between each pair of steps) ─────────── */}
      {/*
        Positioned relative to the outer process container (left:0, right:0)
        at the same vertical height as the line (top:32px).
        height:0 so the div doesn't push layout; arrows use absolute positioning.
      */}
      <div
        className="absolute hidden lg:block pointer-events-none"
        style={{ top: '32px', left: 0, right: 0, height: 0, zIndex: 5 }}
        aria-hidden="true"
      >
        {[25, 50, 75].map(pos => (
          <div
            key={pos}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos}%`, top: 0 }}
          >
            <div
              className="
                w-[22px] h-[22px] rounded-full
                bg-white
                border border-gold/45
                flex items-center justify-center
                shadow-[0_1px_6px_rgba(0,0,0,0.10)]
              "
            >
              <ChevronRight
                size={11}
                strokeWidth={2.5}
                className="text-gold/75 -mr-[1px]"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP NODE  (desktop & tablet grid)
//
// Layout (flex-col, items-center):
//   ┌─ Circle area (w-16 h-16, relative) ──────────────────────┐
//   │  StepNumber: absolute, large, gold/12%, behind circle    │
//   │  Icon circle: relative z-10, navy bg, gold border        │
//   └──────────────────────────────────────────────────────────┘
//   Title  (Playfair, bold, navy)
//   Description (DM Sans, grey)
// ═══════════════════════════════════════════════════════════════════════════════
function StepNode({ step }) {
  const { n, Icon, title, description } = step

  return (
    <motion.div
      variants={stepVariants}
      className="flex flex-col items-center text-center lg:px-2"
    >
      {/* Circle + number container */}
      <div className="relative flex items-center justify-center w-16 h-16 mb-6">
        {/* Large background step number — count-up on scroll */}
        <StepNumber n={n} />

        {/* Icon circle — z-10 to sit above the translucent number */}
        <div
          className="
            relative z-10
            w-16 h-16 rounded-full
            bg-navy border-2 border-gold/50
            flex items-center justify-center
            shadow-[0_4px_20px_rgba(10,22,40,0.22)]
          "
        >
          <Icon size={22} strokeWidth={1.75} className="text-gold" aria-hidden="true" />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-navy text-[1.02rem] leading-snug mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="font-body text-[0.865rem] text-gray-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOBILE STEP NODE  (vertical timeline, <md)
//
// Layout: flex-row.
//   Left:  icon circle (w-14 h-14, z-10) — sits on top of the vertical line
//   Right: step label + title + description
//
// The parent container has a gold vertical line at left-7 (28px = circle center).
// ═══════════════════════════════════════════════════════════════════════════════
function MobileStepNode({ step }) {
  const { n, Icon, title, description } = step

  return (
    <motion.div
      variants={mobileStepVariants}
      className="relative flex items-start gap-5"
    >
      {/* Icon circle (overlaps the vertical line) */}
      <div
        className="
          flex-shrink-0 relative z-10
          w-14 h-14 rounded-full
          bg-navy border-2 border-gold/50
          flex items-center justify-center
          shadow-[0_4px_16px_rgba(10,22,40,0.20)]
        "
      >
        <Icon size={20} strokeWidth={1.75} className="text-gold" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="pt-1">
        {/* Step label */}
        <span className="
          block font-body font-semibold text-gold/65
          text-[0.62rem] tracking-[0.18em] uppercase mb-1.5
        ">
          Step {String(n).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="font-display font-bold text-navy text-[1.05rem] leading-snug mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-[0.875rem] text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP NUMBER  (large translucent count-up digit behind the icon circle)
//
// Uses requestAnimationFrame + easeOutCubic for a smooth 0 → n animation.
// Triggers once when the element scrolls into view.
// Renders as aria-hidden since it's purely decorative.
// ═══════════════════════════════════════════════════════════════════════════════
function StepNumber({ n }) {
  const [count, setCount] = useState(0)
  const ref     = useRef(null)
  const started = useRef(false)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true

    const t0 = performance.now()
    const DURATION = 700 // ms

    const tick = (now) => {
      const p     = Math.min((now - t0) / DURATION, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setCount(Math.floor(eased * n))
      if (p < 1) requestAnimationFrame(tick)
      else setCount(n)
    }

    requestAnimationFrame(tick)
  }, [isInView, n])

  return (
    <span
      ref={ref}
      className="
        absolute
        font-display font-bold text-gold/[0.11]
        leading-none select-none pointer-events-none
        whitespace-nowrap
      "
      style={{ fontSize: 'clamp(4.5rem, 7vw, 5.75rem)' }}
      aria-hidden="true"
    >
      {String(count).padStart(2, '0')}
    </span>
  )
}

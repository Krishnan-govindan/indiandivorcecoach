import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  UserCheck,
  HeartHandshake,
  Target,
  Check,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { trackCTAClick } from '../utils/analytics'

// ─── Services Data ────────────────────────────────────────────────────────────
// SEO keywords are woven naturally into descriptions per the brief.
const SERVICES = [
  {
    Icon: UserCheck,
    name: '1-on-1 Divorce Coaching',
    badge: 'Most Popular',
    description:
      "Personalised, confidential divorce coach sessions for NRIs and Indians worldwide — guiding you through every stage, from the moment you're considering it to rebuilding your life on the other side. Built around Indian cultural context and the legal complexities NRIs face across borders.",
    points: [
      'Personalised roadmap & step-by-step action plan',
      'Emotional support & decision-making clarity',
      'Co-parenting strategy & communication guidance',
      'NRI cross-border legal navigation support',
      'Managing family pressure & cultural shame',
    ],
    idealFor:
      "NRIs navigating cross-border divorce, Indians dealing with family pressure, or anyone who feels stuck, overwhelmed, and alone in the process.",
  },
  {
    Icon: HeartHandshake,
    name: 'Breakup Recovery Coaching',
    badge: null,
    description:
      "Heartbreak doesn't have to break you. This breakup recovery program for Indians and NRIs helps you process the pain, rebuild your identity, and come out stronger — whether your relationship ended by choice or not.",
    points: [
      'Emotional processing & structured grief support',
      'Identity rebuilding after a relationship ends',
      'Releasing guilt, shame & resentment',
      'Restoring confidence & self-worth',
      'Crafting a clear, exciting new life vision',
    ],
    idealFor:
      "Anyone recovering from a painful breakup or separation who wants to truly heal — not just survive it and move on.",
  },
  {
    Icon: Target,
    name: 'Life Strategy & Mindset Coaching',
    badge: null,
    description:
      "Divorce changes everything — your finances, your social world, your sense of who you are. This Indian divorce coaching online program helps you redesign your life with real intention, build an unshakeable mindset, and create a future you are genuinely excited about.",
    points: [
      'Goal setting & intentional life redesign',
      'Career pivoting & post-divorce financial clarity',
      'Rebuilding your social circle & support network',
      'Mindset transformation & long-term resilience',
      'Confidence restoration & building a new identity',
    ],
    idealFor:
      "Post-divorce individuals who are done just surviving and are ready to start thriving — fully and intentionally — on their own terms.",
  },
]

// ─── Shared easing ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1]
const SCROLL_OFFSET = -80

// ─── Motion Variants ──────────────────────────────────────────────────────────

// Section header — fades up
const headerVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// Card grid — drives stagger of children
const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.08 } },
}

// Individual card scroll-in — rises from below
const cardScrollVariants = {
  hidden:  { opacity: 0, y: 52 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// Bottom CTA block
const ctaVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function ServicesSection({ id }) {
  return (
    <section
      id={id}
      className="section-padding bg-navy overflow-hidden"
      aria-labelledby="services-heading"
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
          <span className="section-label">What I Offer</span>

          <h2
            id="services-heading"
            className="
              font-display font-bold text-white leading-tight tracking-tight
              text-[1.8rem] sm:text-[2.2rem] lg:text-[2.75rem]
              mt-1 mb-4
            "
          >
            How I Can Help You
          </h2>

          <p className="font-body text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Three focused coaching programs designed for Indians and NRIs
            worldwide — wherever you are in the process.
          </p>
        </motion.div>

        {/* ── Cards Grid ─────────────────────────────────────────────────── */}
        {/*
          Desktop (lg+): 3 columns side by side
          Tablet / Mobile: stacked single column
        */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14"
        >
          {SERVICES.map(service => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={ctaVariants}
          className="text-center"
        >
          <p className="font-body text-white/45 text-[0.95rem] mb-6">
            Not sure which is right for you?
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
                inline-flex items-center justify-center gap-2.5
                px-7 py-4
                bg-coral hover:bg-coral-dark
                text-white font-body font-bold text-[0.95rem]
                rounded-full cursor-pointer select-none
                shadow-[0_8px_32px_rgba(232,115,74,0.32)]
                hover:shadow-[0_12px_44px_rgba(232,115,74,0.50)]
                transition-[background-color,box-shadow] duration-300
                focus-visible:ring-4 focus-visible:ring-coral/40 focus-visible:outline-none
              "
              onClick={() => trackCTAClick('book_free_call_services')}
              aria-label="Book a free discovery call to find the right coaching program for you"
            >
              Book a Free Discovery Call — Let's Figure It Out Together
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ScrollLink>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE CARD
//
// Hover behaviour:
//   — Card lifts & scales (whileHover on outer motion.div)
//   — Gold 3px top border reveals (opacity 0→1 on gold overlay div)
//   — Icon rotates 15° (separate motion.div, driven by React isHovered state)
//
// Why React state for icon rotation instead of CSS group-hover:
//   Framer Motion manages transforms via inline styles; CSS rotate classes
//   would conflict. Tracking hover state in React and animating via
//   motion.div `animate` prop avoids the conflict cleanly.
// ═══════════════════════════════════════════════════════════════════════════════
function ServiceCard({ service }) {
  const { Icon, name, badge, description, points, idealFor } = service
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={cardScrollVariants}
      whileHover={{
        scale: 1.02,
        y: -6,
        transition: { type: 'spring', stiffness: 340, damping: 22 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="
        group relative flex flex-col
        rounded-2xl overflow-hidden
        border border-white/[0.07]
        transition-shadow duration-300
        hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)]
      "
      style={{ backgroundColor: '#0d1c34' }}
    >
      {/* Gold top border — fades in on hover */}
      <div
        className="
          absolute top-0 left-0 right-0 h-[3px]
          bg-gold-gradient rounded-t-2xl
          transition-opacity duration-300
        "
        style={{ opacity: isHovered ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* ── Card Body ─────────────────────────────────────────────────── */}
      <div className="relative flex flex-col flex-1 p-6 sm:p-7 lg:p-6 xl:p-7">

        {/* Badge */}
        {badge && (
          <div className="mb-5">
            <span className="
              inline-flex items-center
              px-3 py-[5px]
              bg-gold/[0.12] text-gold
              border border-gold/[0.22]
              font-body font-semibold text-[0.62rem] tracking-[0.16em] uppercase
              rounded-full
            ">
              {badge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="mb-6">
          <div className="
            w-14 h-14 rounded-full
            bg-gold/[0.10] border border-gold/[0.18]
            flex items-center justify-center
            transition-colors duration-300
            group-hover:bg-gold/[0.18]
          ">
            <motion.div
              animate={{ rotate: isHovered ? 15 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Icon
                size={24}
                strokeWidth={1.75}
                className="text-gold"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>

        {/* Service name */}
        <h3 className="
          font-display font-bold text-white
          text-[1.12rem] leading-snug
          mb-3
        ">
          {name}
        </h3>

        {/* Description */}
        <p className="font-body text-[0.875rem] text-white/50 leading-relaxed mb-5">
          {description}
        </p>

        {/* Key points list */}
        <ul
          className="space-y-[10px] mb-6"
          aria-label={`Key features of ${name}`}
        >
          {points.map(point => (
            <li key={point} className="flex items-start gap-2.5">
              {/* Checkmark badge */}
              <span
                className="
                  w-[18px] h-[18px] rounded-full flex-shrink-0 mt-[2px]
                  bg-gold/[0.12] flex items-center justify-center
                "
                aria-hidden="true"
              >
                <Check size={10} strokeWidth={3} className="text-gold" />
              </span>
              <span className="font-body text-[0.845rem] text-white/65 leading-snug">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* "Ideal for" */}
        <p className="font-body text-[0.795rem] leading-relaxed mb-7 text-white/35">
          <span className="not-italic font-semibold text-gold/65 tracking-wide">
            Ideal for:
          </span>{' '}
          <span className="italic">{idealFor}</span>
        </p>

        {/* Spacer — pushes Learn More to bottom of card */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-5" />

        {/* Learn More link */}
        <ScrollLink
          to="booking"
          smooth
          duration={700}
          offset={SCROLL_OFFSET}
          onClick={() => trackCTAClick(`service_learn_more_${name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}`)}
          className="
            group/link inline-flex items-center gap-1.5
            text-gold hover:text-[#F5D78E]
            font-body font-semibold text-[0.84rem]
            cursor-pointer select-none
            transition-colors duration-200
            w-fit
          "
          aria-label={`Book a call for ${name}`}
        >
          Learn More
          <ChevronRight
            size={15}
            strokeWidth={2.5}
            className="
              transition-transform duration-200
              group-hover/link:translate-x-[3px]
            "
            aria-hidden="true"
          />
        </ScrollLink>

      </div>
    </motion.div>
  )
}

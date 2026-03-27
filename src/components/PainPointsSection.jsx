import { motion } from 'framer-motion'
import {
  Globe,
  Users,
  Heart,
  Shield,
  Briefcase,
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { trackCTAClick } from '../utils/analytics'

// ─── Pain Points Data ─────────────────────────────────────────────────────────
// Each entry has a curated Unsplash image that visually tells the story
// before the reader even processes the text.
const PAIN_POINTS = [
  {
    Icon: Globe,
    title: 'Stuck Between Two Legal Systems',
    body: "You're trying to understand divorce laws in India and your country of residence — and they contradict each other. No one is explaining how the two interact, and one wrong move could cost you everything.",
    image:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=640&h=380&fit=crop&crop=center&auto=format&q=82',
    imageAlt:
      'Person overwhelmed by stacks of conflicting legal documents from two different countries',
    imageFocus: 'object-center',
  },
  {
    Icon: Users,
    title: 'Family Pressure & Cultural Shame',
    body: 'Every call home brings more judgment than support. The weight of "what will people say" is making an already devastating situation feel suffocating — and deeply isolating.',
    image:
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=640&h=380&fit=crop&crop=faces,center&auto=format&q=82',
    imageAlt:
      'Person sitting alone on a call, head bowed, visibly distressed by the conversation',
    imageFocus: 'object-top',
  },
  {
    Icon: Heart,
    title: 'Alone in a Foreign Country',
    body: 'Your closest people — parents, siblings, lifelong friends — are thousands of miles away. You are facing the hardest chapter of your life without your support system anywhere near you.',
    image:
      'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=640&h=380&fit=crop&crop=center&auto=format&q=82',
    imageAlt:
      'Person sitting alone in a large empty urban space, looking small and isolated in a foreign city',
    imageFocus: 'object-center',
  },
  {
    Icon: Shield,
    title: 'Fear of Losing Everything',
    body: "Custody of your children, your shared home, your savings, your visa status — everything feels up in the air. The cross-border financial and legal uncertainty is completely overwhelming.",
    image:
      'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=640&h=380&fit=crop&crop=faces,top&auto=format&q=82',
    imageAlt:
      'A worried parent holding a child close, expression showing fear of separation and loss',
    imageFocus: 'object-top',
  },
  {
    Icon: Briefcase,
    title: 'Your Career Is Taking the Hit',
    body: "You can't concentrate at work. Deadlines are slipping and performance is dropping. You're holding it together on the outside while quietly unraveling on the inside.",
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=640&h=380&fit=crop&crop=center&auto=format&q=82',
    imageAlt:
      'Person sitting at a laptop at work, staring blankly into space instead of working, clearly distracted',
    imageFocus: 'object-top',
  },
  {
    Icon: HelpCircle,
    title: 'No One Understands the Full Picture',
    body: "Therapists don't understand Indian cultural context. Lawyers only handle the legal angle. Your family is too emotionally involved. You need someone who sees — and can guide — the whole picture.",
    image:
      'https://assets.cdn.filesafe.space/m9jCzEyKqM4xlMWTjcgS/media/69c68ffdea96ae28e1ebccfd.png',
    imageAlt:
      'Person sitting across from multiple advisors looking frustrated and misunderstood — no one gets the full story',
    imageFocus: 'object-top',
  },
]

// ─── Shared easing ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1]

// ─── Motion Variants ──────────────────────────────────────────────────────────
const headerVariants = {
  hidden:  { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
}

const subtextVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.18, ease: EASE } },
}

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
}

const ctaVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAIN POINTS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function PainPointsSection({ id }) {
  return (
    <section
      id={id}
      className="section-padding bg-offwhite"
      aria-labelledby="pain-points-heading"
    >
      <div className="container-custom">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={headerVariants}
            className="flex flex-col items-center"
          >
            <span className="section-label">You Are Not Alone</span>

            <h2
              id="pain-points-heading"
              className="section-title text-navy mt-1 text-balance"
            >
              Are You Going Through This Right Now?
            </h2>

            <div className="gold-divider mx-auto" />
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={subtextVariants}
            className="section-subtitle mx-auto text-center"
          >
            If any of this feels familiar, you're not alone —{' '}
            <span className="text-navy font-medium">
              and you don't have to figure this out by yourself.
            </span>
          </motion.p>
        </div>

        {/* ── Pain Point Cards Grid ──────────────────────────────────────── */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-16"
        >
          {PAIN_POINTS.map(point => (
            <PainCard key={point.title} point={point} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={ctaVariants}
          className="flex flex-col items-center gap-6 text-center"
        >
          <p className="font-display font-semibold text-navy text-xl md:text-2xl">
            Ready to take back control?
          </p>

          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
          >
            <ScrollLink
              to="booking"
              smooth
              duration={700}
              offset={-80}
              onClick={() => trackCTAClick('book_free_call_painpoints')}
              className="
                inline-flex items-center gap-2.5
                px-8 py-4
                bg-coral hover:bg-coral-dark
                text-white font-body font-bold text-base
                rounded-full cursor-pointer select-none
                shadow-[0_8px_32px_rgba(232,115,74,0.32)]
                hover:shadow-[0_12px_44px_rgba(232,115,74,0.50)]
                transition-[background-color,box-shadow] duration-300
                focus-visible:ring-4 focus-visible:ring-coral/40 focus-visible:outline-none
              "
              aria-label="Book your free discovery call"
            >
              Book Your Free Call
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ScrollLink>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAIN CARD
//
// Layout (top → bottom):
//   1. Full-width photo  — visually communicates the pain point instantly
//   2. Icon pill         — reinforces category at a glance
//   3. Title             — names the specific struggle
//   4. Body              — empathetic description
//
// Hover effects:
//   — card:  lifts (y -6) + gold left border
//   — image: subtle scale-up (1.04×) over 700ms for depth
//   — icon:  navy/45 → solid gold
// ═══════════════════════════════════════════════════════════════════════════════
function PainCard({ point }) {
  const { Icon, title, body, image, imageAlt, imageFocus } = point

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        transition: { type: 'spring', stiffness: 340, damping: 22 },
      }}
      className="
        group relative flex flex-col
        bg-white rounded-2xl
        border-l-4 border-l-transparent hover:border-l-gold
        shadow-soft hover:shadow-card
        transition-[border-color,box-shadow] duration-300
        cursor-default overflow-hidden
      "
    >
      {/* ── Image ──────────────────────────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={imageAlt}
          className={`
            w-full h-full object-cover ${imageFocus}
            transition-transform duration-700 ease-out
            group-hover:scale-[1.05]
          `}
          loading="lazy"
          decoding="async"
        />
        {/* Bottom fade — blends image into white card body */}
        <div
          className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.55) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 relative">

        {/* Decorative corner dot */}
        <div
          className="
            absolute top-4 right-4 w-2 h-2 rounded-full
            bg-gold/20 group-hover:bg-gold/50
            transition-colors duration-300
          "
          aria-hidden="true"
        />

        {/* Icon pill */}
        <div
          className="
            w-10 h-10 rounded-full
            bg-[#D4A853]/[0.12] group-hover:bg-[#D4A853]/[0.22]
            flex items-center justify-center
            mb-4 flex-shrink-0
            transition-colors duration-300
          "
        >
          <Icon
            size={18}
            strokeWidth={1.75}
            className="text-navy/45 group-hover:text-gold transition-colors duration-300"
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3 className="
          font-display font-bold text-navy leading-snug
          text-[1.02rem] lg:text-[1.06rem]
          mb-3
        ">
          {title}
        </h3>

        {/* Body */}
        <p className="font-body text-[0.875rem] text-gray-500 leading-relaxed">
          {body}
        </p>
      </div>
    </motion.div>
  )
}

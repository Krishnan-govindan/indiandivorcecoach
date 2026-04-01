import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { trackCTAClick } from '../utils/analytics'

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What exactly is a divorce coach, and how is it different from a therapist or lawyer?",
    a: "A divorce coach is your strategic partner through the divorce process. Unlike a therapist who focuses on your past, I focus on your present and future — helping you make clear decisions, manage emotions practically, and create an actionable plan. Unlike a lawyer, I don't give legal advice — but I help you prepare for legal conversations, organize your thoughts, and avoid costly emotional mistakes. Think of me as the person who sees the full picture and helps you navigate it.",
  },
  {
    q: "I'm an NRI — can you help with cross-border divorce situations?",
    a: "Absolutely. This is my specialty. I work with NRIs across the USA, UK, Canada, Australia, the Middle East, and more. I understand the unique complexities — dual legal systems, cultural pressure from family back in India, custody across countries, and the emotional isolation of going through this far from home. Every coaching plan I create is tailored to your specific cross-border situation.",
  },
  {
    q: "Is everything confidential?",
    a: "100%. Your privacy is sacred. All our sessions are completely confidential. Nothing you share will ever be disclosed to anyone — not your family, not your spouse, not anyone. This is a safe space.",
  },
  {
    q: "How do the sessions work? I'm in a different timezone.",
    a: "All sessions are online via video call — Zoom or Google Meet, whichever you prefer. I work with clients across multiple timezones, including IST, EST, PST, GMT, AEST, and GST. We'll find a time that works for your schedule, including evenings and weekends if needed.",
  },
  {
    q: "How much does coaching cost?",
    a: "Coaching packages vary based on your situation and needs. The best way to find out is to book a free discovery call — it's 15-30 minutes, completely free, and there's zero pressure. We'll discuss your situation, and I'll recommend the right approach and share pricing transparently.",
  },
  {
    q: "I'm not sure if I even want a divorce yet. Can you still help?",
    a: "Yes — and honestly, this is one of the most important times to get support. I help people gain clarity on whether divorce is the right path or not. My role isn't to push you in any direction — it's to help you think clearly, understand your options, and make a decision you won't regret.",
  },
  {
    q: "What if my spouse doesn't know I'm considering divorce?",
    a: "That's completely fine and more common than you think. Our sessions are private and confidential. Many of my clients start coaching before they've made any decisions or told anyone. This is your space to think.",
  },
  {
    q: "How is this different from talking to friends or family?",
    a: "Friends and family love you — but they also have opinions, biases, and their own emotions about your situation. A coach gives you objective, structured support. I won't tell you what to do — I'll help you figure out what YOU want to do, and then build a plan to make it happen.",
  },
  {
    q: "How long does the coaching process take?",
    a: "It depends on your situation. Some clients need just 4-6 sessions for clarity and a plan. Others work with me for 3-6 months through the entire divorce journey. In our free discovery call, I'll give you a realistic timeline based on your specific circumstances.",
  },
  {
    q: "What makes you different from other coaches?",
    a: "Three things. First, I've been through divorce myself — I'm not teaching from a textbook, I'm coaching from lived experience. Second, I specialize in Indians and NRIs — I understand the cultural weight, the family dynamics, the cross-border legal maze. And third, my approach is bold and action-oriented — I don't just hold your hand and sympathize, I help you build a concrete plan and execute it.",
  },
]

// ─── FAQ schema (JSON-LD) — built from data to stay DRY ──────────────────────
const FAQ_SCHEMA = {
  '@context':   'https://schema.org',
  '@type':      'FAQPage',
  mainEntity:   FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name:    q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE          = [0.22, 1, 0.36, 1]
const SCROLL_OFFSET = -80

// ─── Motion Variants ──────────────────────────────────────────────────────────

const headerVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// List container — drives stagger for FAQ items
const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

// Individual FAQ row — 3D perspective reveal
const rowVariants = {
  hidden:  { opacity: 0, y: 22, rotateX: 18 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: EASE } },
}

const ctaVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function FAQSection({ id }) {
  // null = all closed; number = index of the open item
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <section
      id={id}
      className="section-padding bg-white overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* ── FAQ JSON-LD ──────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="container-custom">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerVariants}
          className="text-center mb-14"
        >
          <span className="section-label">FAQ</span>
          <h2
            id="faq-heading"
            className="section-title text-navy mt-1 mb-4"
          >
            <span className="text-navy">Questions? </span>
            <span className="text-gold">I've Got Answers.</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Everything you need to know before taking the <span className="text-gold font-semibold">first step</span>
          </p>
        </motion.div>

        {/* ── Accordion ──────────────────────────────────────────────────── */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-[800px] mx-auto"
          style={{ perspective: '700px' }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              isLast={i === FAQS.length - 1}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={ctaVariants}
          className="text-center mt-16"
        >
          <p className="font-body text-gray-500 text-[0.95rem] mb-6">
            Still have questions?
          </p>

          <p className="font-display font-semibold text-navy text-xl sm:text-2xl mb-7">
            Book a free call and ask me directly.
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
              aria-label="Book your free discovery call"
              onClick={() => trackCTAClick('book_free_call_faq')}
            >
              Book Free Discovery Call
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </ScrollLink>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ ITEM  (accordion row)
//
// Layout per item:
//   ┌─[border-l-4, transparent → gold on open]──────────────────────────┐
//   │  [button: question text]                    [+ icon, rotates 45°] │
//   ├─────────────────────────────────────────────────────────────────── │
//   │  [answer — AnimatePresence height: 0 → auto]                      │
//   └────────────────────────────────────────────────────────────────────┘
//   [border-b divider, hidden on last item when open to avoid double-line]
//
// border-l-4 is always rendered (transparent when closed) so no layout shift
// occurs when the color transitions from transparent → gold on open.
//
// The `+` icon uses a Framer rotate 0° → 45° to morph into `×`.
// The answer uses `height: 'auto'` which Framer Motion v11 handles correctly.
// ═══════════════════════════════════════════════════════════════════════════════
function FAQItem({ faq, index, isOpen, isLast, onToggle }) {
  const { q, a } = faq

  return (
    <motion.div
      variants={rowVariants}
      className={`
        border-l-4 transition-colors duration-300
        ${isOpen ? 'border-gold' : 'border-transparent'}
        ${!isLast ? 'border-b border-b-gray-100' : ''}
      `}
    >
      {/* ── Question button ──────────────────────────────────────────── */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="
          w-full flex items-start justify-between gap-5
          py-5 pl-5 pr-1
          text-left
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40
          group
        "
      >
        <span
          className={`
            font-display font-bold leading-snug
            text-[1rem] sm:text-[1.05rem]
            transition-colors duration-200
            ${isOpen ? 'text-navy' : 'text-navy/80 group-hover:text-navy'}
          `}
        >
          {q}
        </span>

        {/*
          The Plus icon rotates 45° when open, turning into a × shape.
          Framer Motion animates the rotation; color changes via className swap.
        */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className={`
            flex-shrink-0 mt-[3px]
            transition-colors duration-200
            ${isOpen ? 'text-gold' : 'text-navy/35 group-hover:text-navy/55'}
          `}
          aria-hidden="true"
        >
          <Plus size={20} strokeWidth={2.2} />
        </motion.span>
      </button>

      {/* ── Answer — smooth height expand/collapse ───────────────────── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="
                font-body text-[0.9rem] sm:text-[0.925rem]
                text-gray-500 leading-[1.85]
                pl-5 pb-6 pr-4
              "
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

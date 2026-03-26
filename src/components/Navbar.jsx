import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, PhoneCall, ChevronRight } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import useScrollPosition from '../hooks/useScrollPosition'
import useActiveSection from '../hooks/useActiveSection'

// ─── Configuration ────────────────────────────────────────────────────────────

/** Scroll depth (px) after which the navbar solidifies */
const SCROLL_THRESHOLD = 80

/** Negative offset so sections don't hide behind the fixed navbar when jumped to */
const SCROLL_OFFSET = -80

/** Scroll animation duration in milliseconds */
const SCROLL_DURATION = 600

const NAV_LINKS = [
  { label: 'Home',         to: 'hero'         },
  { label: 'About',        to: 'about'        },
  { label: 'Services',     to: 'services'     },
  { label: 'How It Works', to: 'process'      },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'FAQ',          to: 'faq'          },
]

const SECTION_IDS = NAV_LINKS.map(l => l.to)

// ─── Framer Motion Variants ───────────────────────────────────────────────────

const navbarVariants = {
  hidden: {
    y: -96,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.25,
    },
  },
}

const overlayVariants = {
  hidden: {
    opacity: 0,
    x: '100%',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.32,
      ease: [0.55, 0, 1, 0.45],
    },
  },
}

const linkListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.12,
    },
  },
}

const linkItemVariants = {
  hidden: {
    opacity: 0,
    x: 48,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const mobileCTAVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.48,
    },
  },
}

const iconVariants = {
  enter: { rotate: 0,   opacity: 1, transition: { duration: 0.22 } },
  exit:  { rotate: 90,  opacity: 0, transition: { duration: 0.18 } },
}

// ─── Navbar Component ─────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollY       = useScrollPosition()
  const activeSection = useActiveSection(SECTION_IDS)

  const isScrolled = scrollY > SCROLL_THRESHOLD

  const closeMobile  = useCallback(() => setMobileOpen(false), [])
  const toggleMobile = useCallback(() => setMobileOpen(prev => !prev), [])

  // Lock body scroll while mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Auto-close overlay when viewport widens to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          NAVBAR BAR
          ════════════════════════════════════════════════════════════════════ */}
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={[
          'fixed top-0 left-0 right-0 z-[999]',
          'transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out',
          isScrolled || mobileOpen
            ? 'bg-navy shadow-[0_4px_32px_rgba(10,22,40,0.45)]'
            : 'bg-transparent backdrop-blur-[6px]',
        ].join(' ')}
        aria-label="Main navigation"
      >
        {/* Gold top-accent line — always present, adds brand identity */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient pointer-events-none" />

        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px] lg:h-[80px]">

            {/* ── Logo ───────────────────────────────────────────────────── */}
            <ScrollLink
              to="hero"
              smooth
              duration={SCROLL_DURATION}
              offset={SCROLL_OFFSET}
              onClick={closeMobile}
              className="cursor-pointer select-none flex-shrink-0 group"
              aria-label="Indian Divorce Coach — scroll to top"
            >
              <span className="font-display text-xl lg:text-[1.35rem] font-bold tracking-tight leading-none">
                <span className="text-gold transition-colors duration-300 group-hover:brightness-110">
                  Indian
                </span>
                <span className="text-white">
                  DivorceCoach
                </span>
              </span>
            </ScrollLink>

            {/* ── Desktop Navigation Links ────────────────────────────────
                Hidden below lg breakpoint; hamburger takes over instead.
            ─────────────────────────────────────────────────────────────── */}
            <nav
              aria-label="Desktop navigation links"
              className="hidden lg:flex items-center gap-0.5 xl:gap-1"
            >
              {NAV_LINKS.map(link => (
                <DesktopNavLink
                  key={link.to}
                  link={link}
                  isActive={activeSection === link.to}
                />
              ))}
            </nav>

            {/* ── Right-side Actions ──────────────────────────────────────── */}
            <div className="flex items-center gap-3">

              {/* Desktop CTA — "Book Free Call" */}
              <motion.div
                className="hidden lg:block"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              >
                <ScrollLink
                  to="booking"
                  smooth
                  duration={700}
                  offset={SCROLL_OFFSET}
                  className={[
                    'inline-flex items-center gap-2',
                    'px-5 py-[10px]',
                    'bg-coral hover:bg-coral-dark',
                    'text-white font-body font-semibold text-[0.82rem] tracking-wide',
                    'rounded-full cursor-pointer select-none',
                    'shadow-coral hover:shadow-coral-lg',
                    'transition-[background-color,box-shadow] duration-300',
                    'focus-visible:ring-4 focus-visible:ring-coral/40 focus-visible:outline-none',
                    // Subtle pulse animation defined in tailwind keyframes
                    'animate-pulse-gold',
                  ].join(' ')}
                  aria-label="Book your free 30-minute discovery call"
                >
                  <PhoneCall size={14} strokeWidth={2.5} aria-hidden="true" />
                  Book Free Call
                </ScrollLink>
              </motion.div>

              {/* Hamburger / Close button — visible on tablet + mobile */}
              <button
                type="button"
                onClick={toggleMobile}
                className={[
                  'lg:hidden',
                  'flex items-center justify-center',
                  'w-10 h-10 rounded-xl',
                  'text-white',
                  'transition-colors duration-200',
                  'hover:bg-white/10',
                  'focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none',
                ].join(' ')}
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="icon-close"
                      variants={iconVariants}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate="enter"
                      exit="exit"
                    >
                      <X size={22} strokeWidth={2} aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="icon-menu"
                      variants={iconVariants}
                      initial={{ rotate: 90, opacity: 0 }}
                      animate="enter"
                      exit="exit"
                    >
                      <Menu size={22} strokeWidth={2} aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE FULL-SCREEN OVERLAY
          Rendered outside the <nav> so it fills the entire viewport.
          z-[998] keeps it just below the navbar bar (z-[999]) so the
          hamburger/X button stays interactive.
          ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            links={NAV_LINKS}
            activeSection={activeSection}
            onClose={closeMobile}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Desktop Nav Link ─────────────────────────────────────────────────────────

function DesktopNavLink({ link, isActive }) {
  return (
    <ScrollLink
      to={link.to}
      smooth
      duration={SCROLL_DURATION}
      offset={SCROLL_OFFSET}
      className={[
        'relative px-3 py-2',
        'font-body text-[0.82rem] font-medium tracking-wide',
        'rounded-lg cursor-pointer select-none',
        'transition-colors duration-200',
        'focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:outline-none',
        isActive
          ? 'text-gold'
          : 'text-white/75 hover:text-white',
      ].join(' ')}
      aria-current={isActive ? 'page' : undefined}
    >
      {link.label}

      {/* Animated gold underline — shared layout animation via layoutId */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId="desktop-nav-indicator"
            className="absolute bottom-[4px] left-3 right-3 h-[2px] rounded-full bg-gold"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{   scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </ScrollLink>
  )
}

// ─── Mobile Menu Overlay ──────────────────────────────────────────────────────

function MobileMenu({ links, activeSection, onClose }) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={[
        'fixed inset-0 z-[998]',
        'bg-navy',
        'flex flex-col',
        'px-5 sm:px-8',
        // Clear space for the navbar bar above
        'pt-[88px] pb-8',
        'overflow-y-auto no-scrollbar',
      ].join(' ')}
    >
      {/* Decorative gold gradient top strip (matches the one in the navbar) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient pointer-events-none" />

      {/* Subtle radial glow for depth */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #D4A853 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
        aria-hidden="true"
      />

      {/* ── Nav Links list ───────────────────────────────────────────────── */}
      <motion.ul
        variants={linkListVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-2 flex-1"
        role="list"
      >
        {links.map(link => (
          <motion.li key={link.to} variants={linkItemVariants}>
            <ScrollLink
              to={link.to}
              smooth
              duration={SCROLL_DURATION}
              offset={SCROLL_OFFSET}
              onClick={onClose}
              className={[
                'flex items-center justify-between w-full',
                'px-5 py-4 sm:py-[18px]',
                'rounded-2xl cursor-pointer select-none',
                'font-display text-[1.6rem] sm:text-[1.8rem] font-semibold leading-none',
                'border',
                'transition-all duration-200',
                activeSection === link.to
                  ? 'text-gold bg-gold/[0.08] border-gold/25'
                  : 'text-white/85 hover:text-white hover:bg-white/[0.05] border-transparent hover:border-white/10',
              ].join(' ')}
              aria-current={activeSection === link.to ? 'page' : undefined}
            >
              <span>{link.label}</span>
              <ChevronRight
                size={20}
                strokeWidth={2}
                className={
                  activeSection === link.to
                    ? 'text-gold'
                    : 'text-white/25'
                }
                aria-hidden="true"
              />
            </ScrollLink>
          </motion.li>
        ))}
      </motion.ul>

      {/* ── Mobile CTA ───────────────────────────────────────────────────── */}
      <motion.div
        variants={mobileCTAVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 flex flex-col gap-3"
      >
        {/* Thin gold separator */}
        <div className="h-px bg-white/10" />

        <ScrollLink
          to="booking"
          smooth
          duration={700}
          offset={SCROLL_OFFSET}
          onClick={onClose}
          className={[
            'flex items-center justify-center gap-3',
            'w-full py-[18px] px-6',
            'bg-coral hover:bg-coral-dark active:scale-[0.98]',
            'text-white font-body font-bold text-lg',
            'rounded-2xl cursor-pointer select-none',
            'shadow-coral',
            'transition-all duration-300',
            'focus-visible:ring-4 focus-visible:ring-coral/40 focus-visible:outline-none',
          ].join(' ')}
          aria-label="Book your free 30-minute discovery call"
        >
          <PhoneCall size={20} strokeWidth={2.5} aria-hidden="true" />
          Book Free Call
        </ScrollLink>

        <p className="text-center text-white/35 text-[0.72rem] font-body tracking-wide pt-1">
          No commitment · 30-min session · 100% confidential
        </p>
      </motion.div>
    </motion.div>
  )
}

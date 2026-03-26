import { motion } from 'framer-motion'
import { Mail, MessageCircle, Linkedin, Instagram, Youtube } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { trackCTAClick } from '../utils/analytics'

// ─── Replace with real values before launch ───────────────────────────────────
const CONTACT_EMAIL   = 'hello@indiandivorcecoach.com'
const WHATSAPP_NUMBER = '919999999999' // digits only: country code + number
const SOCIAL_LINKS = {
  linkedin:  'https://linkedin.com/in/YOUR-PROFILE',
  instagram: 'https://instagram.com/YOUR-HANDLE',
  youtube:   'https://youtube.com/@YOUR-CHANNEL',
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── Navigation data ──────────────────────────────────────────────────────────
// `to` values must match the `id` props passed in App.jsx
const QUICK_LINKS = [
  { label: 'Home',         to: 'hero'         },
  { label: 'About',        to: 'about'        },
  { label: 'Services',     to: 'services'     },
  { label: 'How It Works', to: 'process'      },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'FAQ',          to: 'faq'          },
  { label: 'Book a Call',  to: 'booking'      },
]

const SERVICE_LINKS = [
  { label: '1-on-1 Divorce Coaching',   to: 'services' },
  { label: 'Breakup Recovery Coaching', to: 'services' },
  { label: 'Life Strategy Coaching',    to: 'services' },
  { label: 'Free Discovery Call',       to: 'booking'  },
]

const SOCIAL_ICONS = [
  { Icon: Linkedin,  href: SOCIAL_LINKS.linkedin,  label: 'LinkedIn',  trackId: 'social_linkedin'  },
  { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram', trackId: 'social_instagram' },
  { Icon: Youtube,   href: SOCIAL_LINKS.youtube,   label: 'YouTube',   trackId: 'social_youtube'   },
]

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE          = [0.22, 1, 0.36, 1]
const SCROLL_OFFSET = -80
const SCROLL_DUR    = 600

// Copyright range — start year hardcoded; end year computed at runtime
const START_YEAR    = 2024
const currentYear   = new Date().getFullYear()
const COPYRIGHT_RANGE = currentYear > START_YEAR
  ? `${START_YEAR}–${currentYear}`
  : `${START_YEAR}`

// ─── Motion Variants ──────────────────────────────────────────────────────────

// Grid wrapper — staggers the 4 columns
const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const colVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const bottomBarVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: EASE, delay: 0.2 } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER SECTION
// ═══════════════════════════════════════════════════════════════════════════════
export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="text-white overflow-hidden"
      style={{ backgroundColor: '#060D18' }}
      aria-label="Site footer"
    >
      {/* sr-only SEO keyword block — visible to screen readers + search engines */}
      <p className="sr-only">
        Online divorce coach for Indians, NRI divorce coaching, breakup recovery
        coach India, divorce coaching platform NRIs, first Indian divorce coach online,
        Krishnan Govindan divorce coach, Indian divorce help abroad, NRI separation coaching.
      </p>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div className="container-custom py-16 lg:py-20">
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.65fr_1fr_1fr_1.2fr] gap-12 lg:gap-8"
        >

          {/* ── Column 1: Brand ───────────────────────────────────────────── */}
          <motion.div variants={colVariants}>

            {/* Brand name — mirrors Navbar logo styling */}
            <div className="mb-4" aria-label="IndianDivorceCoach">
              <span className="font-display font-bold text-[1.35rem] leading-none">
                <span className="text-gold">Indian</span>
                <span className="text-white">DivorceCoach</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="font-body text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-gold/65 mb-4">
              India's First &amp; #1 Online Divorce Coach for NRIs
            </p>

            {/* Mini description */}
            <p className="font-body text-[0.855rem] text-white/45 leading-relaxed mb-6 max-w-[260px]">
              Empowering Indians and NRIs worldwide to navigate divorce with
              clarity, confidence, and a concrete plan. Coaching available
              online from anywhere in the world.
            </p>

            {/* Gold accent line */}
            <div
              className="w-10 h-[2px] rounded-full"
              style={{ backgroundColor: 'rgba(212,168,83,0.45)' }}
              aria-hidden="true"
            />
          </motion.div>

          {/* ── Column 2: Quick Links ─────────────────────────────────────── */}
          <motion.div variants={colVariants}>
            <ColHeading>Quick Links</ColHeading>
            <nav aria-label="Footer quick links">
              <ul className="space-y-3">
                {QUICK_LINKS.map(({ label, to }) => (
                  <li key={label}>
                    <ScrollLink
                      to={to}
                      smooth
                      duration={SCROLL_DUR}
                      offset={SCROLL_OFFSET}
                      className="
                        group inline-flex items-center gap-1.5
                        font-body text-[0.855rem] text-white/45
                        hover:text-white cursor-pointer
                        transition-colors duration-200
                        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40
                      "
                    >
                      <span
                        className="
                          inline-block w-[5px] h-[5px] rounded-full flex-shrink-0
                          bg-gold/30 group-hover:bg-gold
                          transition-colors duration-200
                        "
                        aria-hidden="true"
                      />
                      {label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* ── Column 3: Services ────────────────────────────────────────── */}
          <motion.div variants={colVariants}>
            <ColHeading>Services</ColHeading>
            <nav aria-label="Footer services links">
              <ul className="space-y-3">
                {SERVICE_LINKS.map(({ label, to }) => (
                  <li key={label}>
                    <ScrollLink
                      to={to}
                      smooth
                      duration={SCROLL_DUR}
                      offset={SCROLL_OFFSET}
                      className="
                        group inline-flex items-center gap-1.5
                        font-body text-[0.855rem] text-white/45
                        hover:text-white cursor-pointer
                        transition-colors duration-200
                        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40
                      "
                    >
                      <span
                        className="
                          inline-block w-[5px] h-[5px] rounded-full flex-shrink-0
                          bg-gold/30 group-hover:bg-gold
                          transition-colors duration-200
                        "
                        aria-hidden="true"
                      />
                      {label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* ── Column 4: Connect ─────────────────────────────────────────── */}
          <motion.div variants={colVariants}>
            <ColHeading>Connect</ColHeading>

            {/* Email */}
            <div className="flex items-start gap-3 mb-4">
              <div
                className="
                  w-8 h-8 rounded-full flex-shrink-0 mt-[1px]
                  bg-white/[0.06] border border-white/[0.08]
                  flex items-center justify-center
                "
                aria-hidden="true"
              >
                <Mail size={13} strokeWidth={1.75} className="text-gold/70" />
              </div>
              <div>
                <p className="font-body text-[0.7rem] text-white/30 uppercase tracking-[0.14em] mb-0.5">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  onClick={() => trackCTAClick('email_click')}
                  className="
                    font-body text-[0.845rem] text-white/55
                    hover:text-gold transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40
                    break-all
                  "
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-3 mb-7">
              <div
                className="
                  w-8 h-8 rounded-full flex-shrink-0 mt-[1px]
                  bg-white/[0.06] border border-white/[0.08]
                  flex items-center justify-center
                "
                aria-hidden="true"
              >
                <MessageCircle size={13} strokeWidth={1.75} className="text-gold/70" />
              </div>
              <div>
                <p className="font-body text-[0.7rem] text-white/30 uppercase tracking-[0.14em] mb-0.5">
                  WhatsApp
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    font-body text-[0.845rem] text-white/55
                    hover:text-gold transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40
                  "
                >
                  +{WHATSAPP_NUMBER}
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 mb-5" aria-label="Social media">
              {SOCIAL_ICONS.map(({ Icon, href, label, trackId }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} page`}
                  onClick={() => trackCTAClick(trackId)}
                  whileHover={{ y: -3, scale: 1.12 }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                  className="
                    w-9 h-9 rounded-full
                    border border-white/[0.12]
                    flex items-center justify-center
                    text-white/35 hover:text-gold hover:border-gold/40
                    hover:bg-gold/[0.06]
                    transition-[color,border-color,background-color] duration-200
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40
                  "
                >
                  <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                </motion.a>
              ))}
            </div>

            {/* Availability note */}
            <p className="font-body text-[0.76rem] text-white/28 leading-relaxed">
              Available worldwide — any timezone
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <div
        className="w-full h-px"
        style={{ backgroundColor: 'rgba(212,168,83,0.18)' }}
        aria-hidden="true"
      />

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <motion.div
        variants={bottomBarVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        className="container-custom py-6"
      >
        <div className="
          flex flex-col sm:flex-row
          items-center justify-between
          gap-4 text-center sm:text-left
        ">

          {/* Copyright */}
          <p className="font-body text-[0.77rem] text-white/28 order-2 sm:order-1">
            © {COPYRIGHT_RANGE} IndianDivorceCoach.com — All Rights Reserved
          </p>

          {/* Centre tagline */}
          <p
            className="font-body text-[0.77rem] text-white/22 order-1 sm:order-2"
            aria-hidden="true"
          >
            Made with ❤️ for Indians worldwide
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-1 order-3 text-[0.77rem]">
            <a
              href="#"
              className="
                font-body text-white/28 hover:text-white/60
                transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/30
              "
            >
              Privacy Policy
            </a>
            <span className="text-white/18 mx-2" aria-hidden="true">|</span>
            <a
              href="#"
              className="
                font-body text-white/28 hover:text-white/60
                transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/30
              "
            >
              Terms of Service
            </a>
          </div>

        </div>
      </motion.div>

    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// COL HEADING  — small uppercase label used for each footer column
// ═══════════════════════════════════════════════════════════════════════════════
function ColHeading({ children }) {
  return (
    <h3
      className="
        font-body font-semibold uppercase tracking-[0.18em]
        text-[0.68rem] text-gold/60
        mb-5
      "
    >
      {children}
    </h3>
  )
}

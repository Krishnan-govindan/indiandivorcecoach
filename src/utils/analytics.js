// ─── analytics.js ────────────────────────────────────────────────────────────
//
// Lightweight GA4 wrapper for Indian Divorce Coach.
//
// Design principles:
//   • GA4 is NEVER loaded until the user explicitly accepts cookies.
//   • All exported functions are safe no-ops before initGA() is called.
//   • A single `isInitialized` flag prevents double-injection.
//   • The module can be imported anywhere without side effects.
// ─────────────────────────────────────────────────────────────────────────────

const GA_ID = import.meta.env.VITE_GA_TRACKING_ID

let isInitialized = false

// ─── Initialisation ───────────────────────────────────────────────────────────

/**
 * Inject the gtag.js script and configure GA4.
 * Called once, only after the user grants consent.
 * Safe to call multiple times — guards against double-injection.
 */
export function initGA() {
  if (!GA_ID || isInitialized) return

  // Inject the gtag library script
  const script = document.createElement('script')
  script.src   = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  script.async = true
  document.head.appendChild(script)

  // Bootstrap the dataLayer and gtag function
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) } // eslint-disable-line prefer-arrow-callback
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', GA_ID, {
    anonymize_ip:    true,  // GDPR-friendly
    send_page_view:  false, // we control page-view events manually via trackPageView()
  })

  isInitialized = true
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns true once initGA() has been called successfully. */
export function isAnalyticsReady() {
  return isInitialized && typeof window.gtag === 'function'
}

// ─── Tracking Functions ───────────────────────────────────────────────────────

/**
 * Fire a virtual page-view for a section of the single-page site.
 *
 * @param {string} sectionId - The HTML id of the section (e.g. 'services').
 */
export function trackPageView(sectionId) {
  if (!isAnalyticsReady()) return
  window.gtag('event', 'page_view', {
    page_title:    sectionId,
    page_location: `${window.location.origin}/#${sectionId}`,
    page_path:     `/#${sectionId}`,
  })
}

/**
 * Fire a generic GA4 event.
 *
 * @param {string} category - event_category (e.g. 'engagement')
 * @param {string} action   - GA4 event name (e.g. 'scroll_depth')
 * @param {string} label    - event_label for further context
 * @param {number} [value]  - optional numeric value (e.g. seconds on section)
 */
export function trackEvent(category, action, label, value) {
  if (!isAnalyticsReady()) return
  window.gtag('event', action, {
    event_category: category,
    event_label:    label,
    ...(value !== undefined && { value }),
  })
}

/**
 * Track a CTA button click. Every "Book a call", WhatsApp link, social icon,
 * email click, etc. should call this.
 *
 * @param {string} ctaName - snake_case identifier, e.g. 'book_free_call_hero'
 *
 * Convention for ctaName values used on this site:
 *   book_free_call_hero       — Hero section primary CTA
 *   book_free_call_painpoints — Pain Points section CTA
 *   book_free_call_about      — About section CTA
 *   book_free_call_services   — Services section CTA
 *   book_free_call_process    — Process section CTA
 *   book_free_call_testimonials — Testimonials section CTA
 *   book_free_call_faq        — FAQ section CTA
 *   watch_story               — Hero "Watch My Story" ghost button
 *   whatsapp_chat             — Floating WhatsApp button
 *   email_click               — Any clickable email link
 *   social_linkedin           — Footer LinkedIn icon
 *   social_instagram          — Footer Instagram icon
 *   social_youtube            — Footer YouTube icon
 *   service_learn_more_[name] — Service card "Learn More" links
 */
export function trackCTAClick(ctaName) {
  if (!isAnalyticsReady()) return
  window.gtag('event', 'cta_click', {
    event_category: 'conversion',
    event_label:    ctaName,
    cta_name:       ctaName,
  })
}

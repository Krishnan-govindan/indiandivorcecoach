// ─── useAnalytics.js ─────────────────────────────────────────────────────────
//
// Automatically tracks section visibility and time-on-section via
// IntersectionObserver.  Safe to call unconditionally — the underlying
// analytics helpers are no-ops until GA4 has been initialised.
//
// Usage (in App.jsx):
//   useAnalytics(['hero', 'pain-points', 'about', 'services', ...])
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { trackPageView, trackEvent } from '../utils/analytics'

/**
 * @param {string[]} sectionIds - Array of HTML element `id` values to observe.
 *
 * Behaviour per section:
 *   • When ≥ 50 % of the element enters the viewport:
 *       - fires trackPageView(id)          — virtual page-view for this section
 *       - records entry timestamp
 *   • When the element leaves the viewport:
 *       - computes seconds spent
 *       - fires trackEvent('section_engagement', 'time_spent', id, seconds)
 *         only if at least 2 seconds were spent (avoids noise from fast scrolls)
 *
 * Lazy-loaded sections (React.lazy + Suspense) may not be in the DOM when
 * the hook first runs.  A MutationObserver watches for new elements and
 * begins observing them as they appear, then disconnects once all sections
 * are found (or after a 12-second ceiling).
 */
export default function useAnalytics(sectionIds = []) {
  // Stable ref — avoids re-running the effect when parent re-renders
  const sectionIdsRef = useRef(sectionIds)

  useEffect(() => {
    const ids        = sectionIdsRef.current
    const entryTimes = {}   // id → performance.now() when section entered view
    const pageViewed = new Set() // prevent duplicate page-view events

    // ── IntersectionObserver ─────────────────────────────────────────────────
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id

          if (entry.isIntersecting) {
            // Section entered viewport
            entryTimes[id] = performance.now()

            // Fire page-view only once per session per section
            if (!pageViewed.has(id)) {
              pageViewed.add(id)
              trackPageView(id)
            }
          } else if (entryTimes[id] != null) {
            // Section left viewport — report time spent
            const seconds = Math.round((performance.now() - entryTimes[id]) / 1000)
            if (seconds >= 2) {
              trackEvent('section_engagement', 'time_spent', id, seconds)
            }
            delete entryTimes[id]
          }
        })
      },
      { threshold: 0.5 },
    )

    // ── Helper: observe any unobserved section that exists in the DOM ────────
    const observed = new Set()

    const tryObserve = () => {
      ids.forEach((id) => {
        if (observed.has(id)) return
        const el = document.getElementById(id)
        if (el) {
          io.observe(el)
          observed.add(id)
        }
      })

      // Once all sections are observed, stop the MutationObserver
      if (observed.size >= ids.length) {
        mo.disconnect()
        clearTimeout(stopTimer)
      }
    }

    // ── MutationObserver: catch lazy-loaded sections as they mount ───────────
    const mo = new MutationObserver(tryObserve)
    mo.observe(document.body, { childList: true, subtree: true })

    // Safety ceiling — disconnect MutationObserver after 12 s regardless
    const stopTimer = setTimeout(() => mo.disconnect(), 12_000)

    // Initial sweep (catches eagerly loaded sections)
    tryObserve()

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      io.disconnect()
      mo.disconnect()
      clearTimeout(stopTimer)
    }
  }, []) // intentionally empty — run once after mount, refs stay stable
}

import { useState, useEffect, useRef } from 'react'

/**
 * Tracks which section is currently "active" (visible near the top of the
 * viewport) as the user scrolls.
 *
 * Strategy: on each scroll event, walk backward through the sectionIds array
 * and find the last one whose top offset is above the 25%-from-top viewport
 * threshold. This reliably mirrors which section the user is reading.
 *
 * @param {string[]} sectionIds  Ordered array of element IDs matching the DOM.
 * @returns {string}             The ID of the currently active section.
 */
export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')
  // Cache element refs so we don't query the DOM on every scroll event
  const elementsRef = useRef({})

  useEffect(() => {
    // Populate element cache after mount (DOM is ready)
    sectionIds.forEach(id => {
      elementsRef.current[id] = document.getElementById(id)
    })
  }, [sectionIds])

  useEffect(() => {
    const ACTIVATION_OFFSET = window.innerHeight * 0.25 // 25% down from top

    const handleScroll = () => {
      const scrollPosition = window.scrollY + ACTIVATION_OFFSET

      // Walk backward: last section whose top ≤ scrollPosition is active
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = elementsRef.current[sectionIds[i]]
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          return
        }
      }
      // Scrolled above all sections — default to first
      setActiveSection(sectionIds[0] ?? '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Run once immediately to set correct initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return activeSection
}

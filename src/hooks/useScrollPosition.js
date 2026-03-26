import { useState, useEffect } from 'react'

/**
 * Returns the current window.scrollY value, updated on every scroll event.
 * Uses a passive listener for maximum performance.
 */
export default function useScrollPosition() {
  const [scrollY, setScrollY] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0
  )

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollY
}

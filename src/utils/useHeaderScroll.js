import { useState, useEffect, useCallback } from "react"

export function useHeaderScroll() {
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const headerHeight = 112

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    if (currentScrollY > headerHeight) {
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsScrollingDown(true)
        setIsAtTop(false)
      } else {
        // Scrolling up - show header
        setIsScrollingDown(false)
        setIsAtTop(false)
      }
    } else {
      // At the top of the page - always show header
      setIsScrollingDown(false)
      setIsAtTop(true)
    }

    setLastScrollY(currentScrollY)
    setIsScrolling(false)
  }, [lastScrollY])

  const throttleScroll = useCallback(() => {
    if (!isScrolling) {
      window.requestAnimationFrame(handleScroll)
      setIsScrolling(true)
    }
  }, [isScrolling, handleScroll])

  useEffect(() => {
    // Set initial scroll position
    setLastScrollY(window.scrollY)
    setIsAtTop(window.scrollY <= headerHeight)

    // Add scroll event listener
    window.addEventListener("scroll", throttleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("scroll", throttleScroll)
    }
  }, [throttleScroll])

  return {
    isScrollingDown,
    isAtTop,
    shouldHideHeader: isScrollingDown && !isAtTop,
  }
}

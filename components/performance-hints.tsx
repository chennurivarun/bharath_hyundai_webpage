"use client"

import { useEffect } from "react"

export function PerformanceHints() {
  useEffect(() => {
    // Add preconnect links for performance
    const addLink = (rel: string, href: string, crossOrigin?: string) => {
      const link = document.createElement("link")
      link.rel = rel
      link.href = href
      if (crossOrigin) {
        link.crossOrigin = crossOrigin
      }
      document.head.appendChild(link)
    }

    // Preconnect to external domains
    addLink("preconnect", "https://fonts.googleapis.com")
    addLink("preconnect", "https://fonts.gstatic.com", "anonymous")
    addLink("dns-prefetch", "https://wa.me")
    addLink("dns-prefetch", "https://www.googletagmanager.com")
  }, [])

  return null
}


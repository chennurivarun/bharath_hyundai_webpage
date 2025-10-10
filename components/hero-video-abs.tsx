"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  videoId?: string
  endTrimSeconds?: number // seconds to trim from end (we skip last N seconds)
}

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

export default function HeroVideoAbs({ videoId = "t8JrZLMtF2U", endTrimSeconds = 7 }: Props) {
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference on client side only
  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery?.matches ?? false)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery?.addEventListener("change", handleChange)
    return () => mediaQuery?.removeEventListener("change", handleChange)
  }, [])

  // load iframe API once
  useEffect(() => {
    if (prefersReducedMotion) return // Don't load video if reduced motion is preferred

    const scriptId = "yt-iframe-api"
    if (!document.getElementById(scriptId)) {
      const tag = document.createElement("script")
      tag.id = scriptId
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)
    }

    let raf: number | null = null
    let duration = 0

    function ensureCover() {
      const el = containerRef.current?.firstElementChild as HTMLElement | null
      if (!el) return
      const vw = window.visualViewport?.width ?? window.innerWidth
      const vh = window.visualViewport?.height ?? window.innerHeight
      // 16:9 cover sizing
      const videoRatio = 16 / 9
      const viewportRatio = vw / vh
      let width = vw
      let height = vh
      if (viewportRatio > videoRatio) {
        // viewport is wider → set width to vw, height to vw / ratio
        height = Math.ceil(vw / videoRatio)
        width = vw
      } else {
        // viewport is taller → set height to vh, width to vh * ratio
        width = Math.ceil(vh * videoRatio)
        height = vh
      }
      el.style.width = `${width}px`
      el.style.height = `${height}px`
      el.style.left = "50%"
      el.style.top = "50%"
      el.style.transform = "translate(-50%, -50%)"
    }

    function onPlayerReady(e: any) {
      try {
        e.target.mute()
        e.target.setVolume(0)
        e.target.playVideo()
        duration = e.target.getDuration()
      } catch {}
      const loopTick = () => {
        try {
          const t = e.target.getCurrentTime?.() ?? 0
          if (duration && t >= Math.max(0, duration - endTrimSeconds)) {
            e.target.seekTo(0.1, true)
          }
        } catch {}
        raf = window.requestAnimationFrame(loopTick)
      }
      raf = window.requestAnimationFrame(loopTick)
    }

    function mount() {
      if (!window.YT || !window.YT.Player) return
      if (playerRef.current) return

      // build wrapper that we can resize for cover
      const target = document.createElement("div")
      target.style.position = "absolute"
      target.style.inset = "50% auto auto 50%"
      target.style.transform = "translate(-50%, -50%)"
      containerRef.current?.appendChild(target)

      playerRef.current = new window.YT.Player(target, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          playsinline: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          rel: 0,
          modestbranding: 1,
          showinfo: 0,
          fs: 0,
        },
        events: {
          onReady: onPlayerReady,
        },
      })

      ensureCover()
      window.addEventListener("resize", ensureCover)
      window.addEventListener("orientationchange", ensureCover)
    }

    // if API already loaded
    if (window.YT && window.YT.Player) {
      mount()
    } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        mount()
      }
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      try {
        playerRef.current?.destroy?.()
      } catch {}
      window.removeEventListener("resize", ensureCover)
      window.removeEventListener("orientationchange", ensureCover)
    }
  }, [videoId, endTrimSeconds, prefersReducedMotion])

  return (
    <div ref={containerRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {prefersReducedMotion && (
        <img src="/hyundai-showroom-black-and-white.jpg" alt="" className="h-full w-full object-cover" />
      )}
      {/* subtle readability gradient without glass */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
    </div>
  )
}

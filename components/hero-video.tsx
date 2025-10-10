"use client"

import { useEffect, useRef, useState } from "react"

type HeroVideoProps = {
  videoId: string
  className?: string
  loopTrimSeconds?: number
}

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

export default function HeroVideo({ videoId, className, loopTrimSeconds = 7 }: HeroVideoProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<any>(null)
  const [apiReady, setApiReady] = useState(false)

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true)
      return
    }
    const scriptId = "youtube-iframe-api"
    if (!document.getElementById(scriptId)) {
      const tag = document.createElement("script")
      tag.id = scriptId
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)
    }
    window.onYouTubeIframeAPIReady = () => setApiReady(true)
  }, [])

  useEffect(() => {
    if (!apiReady || !containerRef.current) return

    const applyCoverSizing = () => {
      const vw = window.visualViewport?.width ?? window.innerWidth
      const vh = window.visualViewport?.height ?? window.innerHeight
      const VIDEO_RATIO = 16 / 9
      const windowRatio = vw / vh

      let width: number
      let height: number
      if (windowRatio > VIDEO_RATIO) {
        width = vw
        height = Math.ceil(vw / VIDEO_RATIO)
      } else {
        height = vh
        width = Math.ceil(vh * VIDEO_RATIO)
      }

      if (containerRef.current) {
        containerRef.current.style.height = `${height}px`
        containerRef.current.style.width = `${width}px`
      }
    }
    applyCoverSizing()
    const ro = new ResizeObserver(applyCoverSizing)
    ro.observe(document.documentElement)
    window.addEventListener("resize", applyCoverSizing)
    window.visualViewport?.addEventListener("resize", applyCoverSizing)

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        fs: 0,
      },
      events: {
        onReady: (e: any) => {
          try {
            e.target.mute()
            e.target.playVideo()
          } catch {}
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            const interval = setInterval(() => {
              try {
                const duration = playerRef.current?.getDuration?.() || 0
                const current = playerRef.current?.getCurrentTime?.() || 0
                const cutoff = Math.max(0, duration - loopTrimSeconds)
                if (duration > 0 && current >= cutoff) {
                  playerRef.current.seekTo(0, true)
                }
              } catch {}
            }, 500)
            const clearPoll = () => clearInterval(interval)
            setTimeout(clearPoll, 120000)
            return () => clearPoll()
          }
        },
      },
    })

    return () => {
      window.removeEventListener("resize", applyCoverSizing)
      ro.disconnect()
      window.visualViewport?.removeEventListener("resize", applyCoverSizing)
      try {
        playerRef.current?.destroy?.()
      } catch {}
    }
  }, [apiReady, videoId, loopTrimSeconds])

  return (
    <div ref={wrapperRef} className={`absolute inset-0 -z-10 overflow-hidden ${className || ""}`}>
      {/* Center crop the 16:9 player to cover */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={containerRef}
          className="pointer-events-none [&_iframe]:h-full [&_iframe]:w-full rounded-none"
          aria-hidden="true"
        />
      </div>

      {/* Reduced-motion fallback image */}
      <div className="absolute inset-0 hidden [@media(prefers-reduced-motion)]:block">
        <img src="/images/hero-bg.png" alt="" className="h-full w-full object-cover opacity-70" />
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

type HeroVideoCoverProps = {
  youtubeId: string // e.g. "t8JrZLMtF2U"
  className?: string
  asBackground?: boolean // <--- NEW: when true, render absolute inset background instead of sticky section
}

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

export default function HeroVideoCover({ youtubeId, className, asBackground }: HeroVideoCoverProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<any>(null)
  const iframeRef = useRef<HTMLDivElement | null>(null)
  const [apiReady, setApiReady] = useState(false)

  // Load YouTube IFrame API once
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true)
      return
    }
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    if (existing) {
      // another instance will set the ready callback
      ;(window as any).onYouTubeIframeAPIReady = () => setApiReady(true)
      return
    }
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    ;(window as any).onYouTubeIframeAPIReady = () => setApiReady(true)
    document.head.appendChild(tag)
  }, [])

  // Create player
  useEffect(() => {
    if (!apiReady || !iframeRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    playerRef.current = new window.YT.Player(iframeRef.current, {
      videoId: youtubeId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        playsinline: 1,
        modestbranding: 1,
        loop: 1,
        mute: 1,
        playlist: youtubeId,
        fs: 0,
        iv_load_policy: 3,
        // start at 0; we'll loop before last 7s below
      },
      events: {
        onReady: (e: any) => {
          try {
            e.target.mute()
            e.target.playVideo()
          } catch {}
        },
      },
    })

    return () => {
      try {
        playerRef.current?.destroy?.()
      } catch {}
    }
  }, [apiReady, youtubeId])

  // Maintain perfect "cover" sizing for 16:9 iframe
  useEffect(() => {
    const R = 16 / 9
    const el = containerRef.current
    if (!el) return

    const resize = () => {
      const vv = (window as any).visualViewport
      const vw = vv?.width ?? window.innerWidth
      const vh = vv?.height ?? window.innerHeight

      let w = vw
      let h = vw / R
      if (h < vh) {
        h = vh
        w = vh * R
      }

      // Center the video box within container
      const videoEl = el.querySelector<HTMLElement>("[data-yt-box]")
      if (videoEl) {
        videoEl.style.width = `${w}px`
        videoEl.style.height = `${h}px`
        videoEl.style.left = `${(vw - w) / 2}px`
        videoEl.style.top = `${(vh - h) / 2}px`
      }
    }

    resize()
    window.addEventListener("resize", resize)
    ;(window as any).visualViewport?.addEventListener?.("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
      ;(window as any).visualViewport?.removeEventListener?.("resize", resize)
    }
  }, [])

  // Loop before last 7 seconds
  useEffect(() => {
    const id = window.setInterval(() => {
      const player = playerRef.current
      if (!player || typeof player.getCurrentTime !== "function") return
      const dur = player.getDuration?.() ?? 0
      const t = player.getCurrentTime?.() ?? 0
      if (dur > 0 && t >= Math.max(0, dur - 7)) {
        try {
          player.seekTo(0, true)
        } catch {}
      }
    }, 500)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      ref={containerRef}
      className={[
        asBackground ? "absolute inset-0 h-full w-full" : "relative sticky top-0 h-dvh w-full",
        "overflow-hidden",
        className ?? "",
      ].join(" ")}
      aria-label="Hero video background"
    >
      {/* Video box (absolutely centered and sized to cover) */}
      <div data-yt-box className="absolute" style={{ left: 0, top: 0, width: "100%", height: "100%" }}>
        <div ref={iframeRef} className="h-full w-full" aria-hidden="true" />
      </div>

      {/* Contrast gradient for legibility but no glass/backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"

type Props = {
  videoSrc?: string
}

export default function HeroVideoLocal({ videoSrc = "/hero-video.mp4" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Attempt to autoplay with retry logic
    const attemptPlay = () => {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented:", error)
          // Try again after user interaction
          const playOnInteraction = () => {
            video.play()
            document.removeEventListener("click", playOnInteraction)
            document.removeEventListener("touchstart", playOnInteraction)
          }
          document.addEventListener("click", playOnInteraction)
          document.addEventListener("touchstart", playOnInteraction)
        })
      }
    }

    // Ensure video is ready
    if (video.readyState >= 3) {
      attemptPlay()
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true })
    }
  }, [])

  // Control video to skip last 1 second
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 1) {
        // Skip last 1 second by looping back to start
        video.currentTime = 0
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Gradient overlay for better text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
    </div>
  )
}


"use client"

import { useEffect, useRef } from "react"
import VenueFullRedesign from "@/components/venue-page"

export default function VenuePageWithVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Control video to skip last 5 seconds
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 5) {
        // Skip last 5 seconds by looping back to start
        video.currentTime = 0
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-transparent text-white">
      {/* Sticky Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/assets1/Hyundai VENUE _ Adventure Film.mp4"
      />
      <div className="relative z-10">
        <VenueFullRedesign />
      </div>
    </div>
  )
}


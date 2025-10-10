"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { MODELS, type Segment, segmentLabel, segmentHeroImage } from "@/lib/models"
import HatchbackImageSlider from "./hatchback-image-slider"
import SedanImageSlider from "./sedan-image-slider"
import SuvImageSlider from "./suv-image-slider"

const SEGMENTS: Segment[] = ["hatchback", "sedan", "suv", "electric"]

export default function CarAccordionSlider() {
  const counts: Record<Segment, number> = {
    hatchback: MODELS.filter((m) => m.segment === "hatchback").length,
    sedan: MODELS.filter((m) => m.segment === "sedan").length,
    suv: MODELS.filter((m) => m.segment === "suv").length,
    electric: MODELS.filter((m) => m.segment === "electric").length,
  }
  const [active, setActive] = useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true)

  // Auto-play animation
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % SEGMENTS.length)
    }, 10000) // Changed to 10 seconds
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const onKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    setIsAutoPlaying(false)
    if (e.key === "ArrowRight") {
      setActive((a) => (a < SEGMENTS.length - 1 ? a + 1 : 0))
    } else if (e.key === "ArrowLeft") {
      setActive((a) => (a > 0 ? a - 1 : SEGMENTS.length - 1))
    }
  }, [])

  return (
    <section
      aria-labelledby="lineup-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-black/40 backdrop-blur-sm rounded-3xl"
    >
      <h2 id="lineup-heading" className="text-2xl md:text-3xl font-semibold mb-6">
        Explore Hyundai Lineup
      </h2>

      <div
        role="list"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onKey}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="group relative flex gap-3 rounded-3xl p-2 bg-white/5 ring-1 ring-white/10 overflow-hidden"
      >
        {SEGMENTS.map((seg, i) => {
          const isActive = i === active
          const basisClass = isActive ? "basis-[55%] md:basis-[60%]" : "basis-[15%] md:basis-[13%]"
          
          return (
            <a
              role="listitem"
              key={seg}
              href={`/models/${seg}`}
              onMouseEnter={() => {
                setActive(i)
                setIsAutoPlaying(false)
              }}
              onFocus={() => {
                setActive(i)
                setIsAutoPlaying(false)
              }}
              aria-label={`Explore ${segmentLabel(seg)} models`}
              aria-selected={isActive}
              className={[
                "relative overflow-hidden rounded-2xl border",
                isActive ? "border-red-500/30 shadow-lg shadow-red-500/20" : "border-white/10",
                "transition-[flex-basis,filter,transform,border-color,box-shadow] duration-700 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 ring-white/40",
                "hover:scale-[1.01]",
                basisClass,
              ].join(" ")}
              style={{ minHeight: 380 }}
            >
              {/* Image with enhanced animations */}
              <div className="absolute inset-0 overflow-hidden group">
                {seg === "hatchback" && isActive ? (
                  <HatchbackImageSlider />
                ) : seg === "sedan" && isActive ? (
                  <SedanImageSlider />
                ) : seg === "suv" && isActive ? (
                  <SuvImageSlider />
                ) : (
                  <img
                    src={segmentHeroImage(seg) || "/placeholder.svg?height=760&width=1200&query=hyundai+segment"}
                    alt=""
                    aria-hidden="true"
                    className={[
                      "h-full w-full object-cover",
                      "transition-[filter,transform] duration-700 ease-in-out",
                      isActive 
                        ? "scale-110 filter-none brightness-100" 
                        : "scale-100 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105",
                    ].join(" ")}
                  />
                )}
              </div>
              
              {/* Gradient overlay with animation */}
              <div 
                className={[
                  "absolute inset-0 bg-gradient-to-b transition-opacity duration-700",
                  isActive 
                    ? "from-black/30 via-black/20 to-black/60 opacity-100" 
                    : "from-black/60 via-black/50 to-black/80 opacity-100"
                ].join(" ")} 
                aria-hidden 
              />
              
              {/* Content card with animation */}
              <div className="relative z-10 mt-auto flex h-full w-full items-end p-4">
                <div 
                  className={[
                    "w-full rounded-xl backdrop-blur-md border p-4",
                    "transition-all duration-700 ease-in-out",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
                    isActive 
                      ? "bg-white/15 border-white/20 translate-y-0 opacity-100" 
                      : "bg-white/5 border-white/10 translate-y-2 opacity-90"
                  ].join(" ")}
                >
                  <p className={[
                    "text-xs uppercase tracking-widest transition-colors duration-500",
                    isActive ? "text-red-400" : "text-white/60"
                  ].join(" ")}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className={[
                    "mt-1 font-semibold transition-all duration-500",
                    isActive ? "text-2xl text-white" : "text-xl text-white/90"
                  ].join(" ")}>
                    {segmentLabel(seg)}
                  </h3>
                  <p className={[
                    "text-sm transition-colors duration-500",
                    isActive ? "text-white/90" : "text-white/70"
                  ].join(" ")}>
                    {counts[seg]} models
                  </p>
                  <div className={[
                    "mt-3 inline-flex items-center gap-1 text-sm transition-all duration-500",
                    isActive ? "text-white opacity-100 translate-x-0" : "text-white/70 opacity-0 -translate-x-2"
                  ].join(" ")}>
                    Explore <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-2 right-2 z-20">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
                </div>
              )}
            </a>
          )
        })}
      </div>

      {/* Auto-play indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {SEGMENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActive(i)
              setIsAutoPlaying(false)
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={[
              "h-1.5 rounded-full transition-all duration-300",
              i === active 
                ? "w-8 bg-red-500" 
                : "w-1.5 bg-white/30 hover:bg-white/50"
            ].join(" ")}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <a
          href="/models"
          className="inline-flex items-center gap-1 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 ring-white/40 rounded-md px-2 py-1"
        >
          View all categories <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Users, Fuel } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Model, Segment } from "@/lib/models"
import { MODELS, segmentLabel } from "@/lib/models"

interface ModelsShowcaseProps {}

type SegmentFilter = Segment | "all"

export function ModelsShowcase({}: ModelsShowcaseProps) {
  const [activeSegment, setActiveSegment] = useState<SegmentFilter>("suv")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false) // Start with auto-play off to show first card

  const segments: { key: SegmentFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "suv", label: "SUV" },
    { key: "sedan", label: "Sedan" },
    { key: "hatchback", label: "Hatchback" },
    { key: "electric", label: "Electric" }
  ]

  const segmentOrder: Segment[] = ["suv", "sedan", "hatchback", "electric"]
  const allOrdered = [...MODELS].sort((a, b) => segmentOrder.indexOf(a.segment) - segmentOrder.indexOf(b.segment))

  const filteredModels = activeSegment === "all"
    ? allOrdered
    : MODELS.filter(model => model.segment === activeSegment)

  // Determine if slider should move (skip when Sedan has only 2 models)
  const shouldSlide = !(
    (activeSegment === "sedan" && filteredModels.length <= 2) ||
    (activeSegment === "electric" && filteredModels.length <= 2)
  ) && filteredModels.length > 1

  // Auto-slide functionality - start after a delay to ensure first card is visible
  useEffect(() => {
    if (!shouldSlide) return
    if (filteredModels.length === 0) return
    
    // Start auto-play after 3 seconds to ensure first card is fully visible
    const startDelay = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 3000)

    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredModels.length)
    }, 4000) // Increased to 4 seconds for better visibility

    return () => {
      clearTimeout(startDelay)
      clearInterval(interval)
    }
  }, [isAutoPlaying, filteredModels.length, shouldSlide])


  const goToPrevious = () => {
    if (filteredModels.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + filteredModels.length) % filteredModels.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    if (filteredModels.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % filteredModels.length)
    setIsAutoPlaying(false)
  }

  const handleSegmentChange = (segment: SegmentFilter) => {
    setActiveSegment(segment)
    setCurrentIndex(0)
    setIsAutoPlaying(false) // Keep first card visible when changing segments
  }

  // Build an extended list for seamless looping (no gaps)
  const CARD_WIDTH = 380
  const GAP = 32
  const CARD_STRIDE = CARD_WIDTH + GAP
  const extendedModels: Model[] = shouldSlide && filteredModels.length > 0
    ? [...filteredModels, ...filteredModels]
    : filteredModels

  return (
    <div className="w-full bg-transparent">
      {/* Header */}
      <div className="text-center pt-8 pb-4">
        <h1 className="text-4xl font-bold text-[#0B1F3A] mb-4 scroll-mt-[140px]" id="our-models-heading">Our Models</h1>
        
        {/* Segment Filter Tabs */}
        <div className="flex justify-center gap-1 mb-4">
          {segments.map((segment) => (
            <button
              key={segment.key}
              onClick={() => handleSegmentChange(segment.key)}
              className={`px-6 py-2 text-base font-semibold transition-all duration-300 ${
                activeSegment === segment.key
                  ? "bg-gradient-to-r from-[#0057B8] to-[#00A9E0] text-white shadow-lg shadow-[#0057B8]/40 border border-[#00A9E0]/30"
                  : "bg-[#D6E4F5] text-[#0B1F3A] hover:bg-[#0057B8]/10 hover:text-[#0057B8] border border-[#D6E4F5]"
              }`}
            >
              {segment.label}
            </button>
          ))}
        </div>
      </div>

      {/* Car Slider Section */}
      <div className="relative w-full">
        {/* Navigation Arrows */}
        {shouldSlide && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-24 -translate-y-1/2 z-10 w-12 h-12 bg-[#0057B8]/20 hover:bg-[#0057B8]/30 border border-[#0057B8]/30 backdrop-blur-md flex items-center justify-center transition-colors shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-[#0057B8]" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-24 -translate-y-1/2 z-10 w-12 h-12 bg-[#0057B8]/20 hover:bg-[#0057B8]/30 border border-[#0057B8]/30 backdrop-blur-md flex items-center justify-center transition-colors shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-[#0057B8]" />
            </button>
          </>
        )}

        {/* Main Slider Container (2 cards visible, seamless loop) */}
        <div className="relative w-full py-2 overflow-hidden">
          <div className="flex items-center justify-start pl-4">
            <div 
              className="flex gap-8 transition-transform duration-700 ease-in-out"
              style={{ 
                transform: shouldSlide && filteredModels.length > 0 
                  ? `translateX(-${(currentIndex % filteredModels.length) * CARD_STRIDE}px)` 
                  : `translateX(0)`
              }}
            >
              {extendedModels.map((model, index) => (
                <div key={`${model.id}-${index}`} className="flex-shrink-0 w-[380px]">
                  <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-[#D6E4F5] hover:border-[#0057B8]/30 transition-all duration-300 group relative overflow-hidden">
                    {/* Shine Animation */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0057B8]/5 via-transparent to-[#00A9E0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {/* NEW Badge */}
                    {model.isNew && (
                      <div className="absolute top-4 left-4 z-30 bg-gradient-to-r from-[#00A9E0] to-[#0057B8] text-white px-3 py-1.5 rounded-full shadow-lg shadow-[#0057B8]/50 flex items-center gap-1.5 animate-pulse">
                        <span className="text-xs font-bold tracking-wider">NEW</span>
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                      </div>
                    )}
                    {/* Car Image */}
                    <div className="relative h-[240px] w-[380px] bg-white flex items-center justify-center relative z-10">
                      <img
                        src={model.imageSrc}
                        alt={model.name}
                        className="max-w-full max-h-full object-contain"
                        style={{ filter: 'drop-shadow(0 8px 16px rgba(0,87,184,0.15))' }}
                      />
                    </div>

                    {/* Information Panel */}
                    <div className="p-4 space-y-3 relative z-10">
                      {/* Model Name */}
                      <h3 className="text-xl font-bold text-[#0B1F3A]">{model.name}</h3>

                      {/* Price */}
                      <div className="space-y-1">
                        <p className="text-xs text-[#0B1F3A]/60">Starting At</p>
                        <p className="text-xl font-bold text-[#0057B8]">{model.priceBand}</p>
                      </div>

                      {/* Specifications */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#0057B8]" />
                          <span className="text-sm text-[#0B1F3A] font-medium">5 Seats</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Fuel className="h-4 w-4 text-[#0057B8]" />
                          <span className="text-sm text-[#0B1F3A] font-medium">
                            {model.segment === "suv" ? "Petrol / CNG" : 
                             model.id === 'i20' ? 'Petrol' : 
                             model.id === 'i20-nline' ? 'petrol 7-speed DCT /petrol MT' : 'Petrol'}
                          </span>
                        </div>
                        <p className="text-xs text-[#0B1F3A]/60">Ex- Showroom Price</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-2">
                        <Button asChild className="w-full bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white font-semibold py-2 text-sm shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden">
                          <a href="/test-drive">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative z-10">BOOK NOW</span>
                          </a>
                        </Button>
                        <Button asChild className="w-full bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white font-semibold py-2 text-sm shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden">
                          <a href={
                            model.id === 'alcazar' ? '/alcazar' :
                            model.id === 'exter' ? '/exter' :
                            model.id === 'cretan' ? '/creta-nline' :
                            model.id === 'venuen' ? '/model/venue-nline' :
                            model.id === 'tucson' ? '/tucson' :
                            model.id === 'venue-all-new' ? '/model/venue-all-new' :
                            `/model/${model.id}`
                          }>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative z-10">KNOW MORE</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Removed All Models section as requested */}

        {/* Slide Indicators */}
        {shouldSlide && (
          <div className="flex justify-center gap-2 mt-4">
            {filteredModels.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-[#0057B8] shadow-lg shadow-[#0057B8]/40" : "bg-[#D6E4F5] hover:bg-[#0057B8]/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

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

  // Auto-slide functionality
  useEffect(() => {
    if (!shouldSlide) return
    if (!isAutoPlaying || filteredModels.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredModels.length)
    }, 2000)

    return () => clearInterval(interval)
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
    setIsAutoPlaying(true)
  }

  // Build an extended list for seamless looping (no gaps)
  const CARD_WIDTH = 500
  const GAP = 48
  const CARD_STRIDE = CARD_WIDTH + GAP
  const extendedModels: Model[] = shouldSlide && filteredModels.length > 0
    ? [...filteredModels, ...filteredModels]
    : filteredModels

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-black mb-8">Our Models</h1>
        
        {/* Segment Filter Tabs */}
        <div className="flex justify-center gap-1 mb-8">
          {segments.map((segment) => (
            <button
              key={segment.key}
              onClick={() => handleSegmentChange(segment.key)}
              className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                activeSegment === segment.key
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </>
        )}

        {/* Main Slider Container (2 cards visible, seamless loop) */}
        <div className="relative w-full py-8 overflow-hidden">
          <div className="flex items-center justify-center">
            <div 
              className="flex gap-12 transition-transform duration-700 ease-in-out"
              style={{ 
                transform: shouldSlide && filteredModels.length > 0 
                  ? `translateX(-${(currentIndex % filteredModels.length) * CARD_STRIDE}px)` 
                  : 'translateX(0)'
              }}
            >
              {extendedModels.map((model, index) => (
                <div key={`${model.id}-${index}`} className="flex-shrink-0 w-[500px]">
                  <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    {/* Car Image */}
                    <div className="relative h-[400px] w-[500px] bg-white flex items-center justify-center">
                      <img
                        src={model.imageSrc}
                        alt={model.name}
                        className="max-w-full max-h-full object-contain"
                        style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
                      />
                    </div>

                    {/* Information Panel */}
                    <div className="p-8 space-y-6">
                      {/* Model Name */}
                      <h3 className="text-3xl font-bold text-black">{model.name}</h3>

                      {/* Price */}
                      <div className="space-y-2">
                        <p className="text-base text-gray-600">Starting At</p>
                        <p className="text-3xl font-bold text-black">{model.priceBand}</p>
                      </div>

                      {/* Specifications */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Users className="h-6 w-6 text-gray-600" />
                          <span className="text-lg text-gray-800 font-medium">5 Seats</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Fuel className="h-6 w-6 text-gray-600" />
                          <span className="text-lg text-gray-800 font-medium">
                            {model.segment === "suv" ? "Petrol / CNG" : 
                             model.id === 'i20' ? 'Petrol' : 
                             model.id === 'i20-nline' ? 'petrol 7-speed DCT /petrol MT' : 'Petrol'}
                          </span>
                        </div>
                        <p className="text-base text-gray-600">Ex- Showroom Price</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-4 pt-6">
                        <Button asChild className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 text-lg">
                          <a href="/test-drive">BOOK NOW</a>
                        </Button>
                        <Button asChild className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 text-lg">
                          <a href={
                            model.id === 'alcazar' ? '/alcazar' :
                            model.id === 'exter' ? '/exter' :
                            model.id === 'cretan' ? '/creta-nline' :
                            model.id === 'venuen' ? '/venue-nline' :
                            model.id === 'tucson' ? '/tucson' :
                            `/model/${model.id}`
                          }>KNOW MORE</a>
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
                  index === currentIndex ? "bg-gray-800" : "bg-gray-300"
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

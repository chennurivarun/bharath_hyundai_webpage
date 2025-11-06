"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Users, Fuel } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Model } from "@/lib/models"

interface CarSliderProps {
  models: Model[]
}

export function CarSlider({ models }: CarSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false) // Start with auto-play off to show first card

  // Auto-slide functionality - start after delay to ensure first card is visible
  useEffect(() => {
    // Start auto-play after 3 seconds to ensure first card is fully visible
    const startDelay = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 3000)

    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % models.length)
    }, 4000) // Increased to 4 seconds for better visibility

    return () => {
      clearTimeout(startDelay)
      clearInterval(interval)
    }
  }, [isAutoPlaying, models.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + models.length) % models.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % models.length)
    setIsAutoPlaying(false)
  }

  if (models.length === 0) return null

  return (
    <div className="relative w-full">
      {/* Navigation Arrows */}
      {models.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-red-600/80 border border-white/20 flex items-center justify-center transition-all backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-red-600/80 border border-white/20 flex items-center justify-center transition-all backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Main Slider Container */}
      <div className="relative w-full py-6 overflow-hidden">
        <div className="flex items-center justify-start pl-4">
          <div 
            className="flex gap-12 transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (500 + 48)}px)` // Start from left, no gap
            }}
          >
            {models.map((model, index) => (
              <div key={`${model.id}-${index}`} className="flex-shrink-0 w-[500px]">
                <div className="bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 border border-white/10 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm">
                  {/* Car Image */}
                  <div className="relative h-[280px] w-[500px] bg-white/5 flex items-center justify-center">
                    <img
                      src={model.imageSrc}
                      alt={model.name}
                      className="max-w-full max-h-full object-contain"
                      style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
                    />
                  </div>

                  {/* Information Panel */}
                  <div className="p-6">
                    {/* Model Name */}
                    <h3 className="text-2xl font-bold text-white mb-3">{model.name}</h3>

                    {/* Price */}
                    <div className="mb-3">
                      <p className="text-sm text-white/70 font-medium mb-0 leading-none">Starting At</p>
                      <p className="text-2xl font-bold text-white leading-tight -mt-1">{model.priceBand || "Price on request"}</p>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-red-500" />
                        <span className="text-base text-white/90 font-medium">5 Seats</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Fuel className="h-5 w-5 text-red-500" />
                        <span className="text-base text-white/90 font-medium">
                          {model.segment === "suv" ? "Petrol / CNG" : 
                           model.id === 'i20' ? 'Petrol' : 
                           model.id === 'i20-nline' ? 'petrol 7-speed DCT /petrol MT' : 
                           model.segment === "electric" ? "Electric" : 'Petrol'}
                        </span>
                      </div>
                      <p className="text-sm text-white/70">Ex- Showroom Price</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2.5">
                      <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 text-base shadow-lg shadow-red-600/30">
                        <a href="/test-drive" className="w-full block text-center">BOOK NOW</a>
                      </Button>
                      <Button className="w-full border border-white/20 text-white hover:bg-white/10 font-semibold py-3 text-base">
                        <a 
                          href={
                            model.id === "alcazar" ? "/alcazar" :
                            model.id === "exter" ? "/exter" :
                            model.id === "cretan" ? "/creta-nline" :
                            model.id === "venuen" ? "/venue-nline" :
                            model.id === "tucson" ? "/tucson" :
                            model.id === "ioniq5" ? "/ioniq5" :
                            `/model/${model.id}`
                          }
                          className="w-full block text-center"
                        >
                          KNOW MORE
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

      {/* Slide Indicators */}
      {models.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {models.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-red-600" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}


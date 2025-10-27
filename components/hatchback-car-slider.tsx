"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Users, Fuel } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Model } from "@/lib/models"

interface HatchbackCarSliderProps {
  models: Model[]
}

export function HatchbackCarSlider({ models }: HatchbackCarSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % models.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, models.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + models.length) % models.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % models.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative w-full bg-white">
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>

      {/* Main Slider Container */}
      <div className="relative w-full py-12 overflow-hidden">
        <div className="flex items-center justify-center">
          <div 
            className="flex gap-12 transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (500 + 48)}px)` // 500px width + 48px gap
            }}
          >
            {models.map((model, index) => (
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
                          {model.id === 'i20' ? 'Petrol' : model.id === 'i20-nline' ? 'petrol 7-speed DCT /petrol MT' : 'Petrol'}
                        </span>
                      </div>
                      <p className="text-base text-gray-600">Ex- Showroom Price</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 pt-6">
                      <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 text-lg">
                        BOOK NOW
                      </Button>
                      <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 text-lg">
                        KNOW MORE
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
      <div className="flex justify-center gap-2 mt-4">
        {models.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-900" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
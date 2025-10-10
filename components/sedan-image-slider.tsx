"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SEDAN_IMAGES = [
  {
    src: "/images/sedan1.avif",
    alt: "Hyundai sedan - Premium sedan with elegant design",
    title: "Premium Sedan",
    description: "Elegant sedan with sophisticated styling and premium features"
  },
  {
    src: "/images/sedan2.avif", 
    alt: "Hyundai sedan - Sporty sedan with dynamic performance",
    title: "Sport Sedan",
    description: "Dynamic sedan with performance-focused design and handling"
  }
]

export default function SedanImageSlider() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageErrors, setImageErrors] = useState<boolean[]>(new Array(SEDAN_IMAGES.length).fill(false))

  // Auto-slide every 3 seconds for faster cycling
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % SEDAN_IMAGES.length)
    }, 3000) // 3 seconds for fast sliding
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % SEDAN_IMAGES.length)
    setIsAutoPlaying(false)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + SEDAN_IMAGES.length) % SEDAN_IMAGES.length)
    setIsAutoPlaying(false)
  }

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-2xl group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main image display */}
      <div className="relative h-full grayscale group-hover:grayscale-0 transition-all duration-500">
        {SEDAN_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={() => {
                const newErrors = [...imageErrors]
                newErrors[index] = true
                setImageErrors(newErrors)
              }}
            />
            {imageErrors[index] && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🚗</div>
                  <div className="text-lg font-semibold">{image.title}</div>
                  <div className="text-sm text-gray-300">{image.description}</div>
                </div>
              </div>
            )}
            {/* Overlay with image info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <h4 className="text-white font-semibold text-lg">{image.title}</h4>
                <p className="text-white/80 text-sm">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevImage}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all hover:scale-110"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <button
        onClick={nextImage}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all hover:scale-110"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Image indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {SEDAN_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImage(index)
              setIsAutoPlaying(false)
            }}
            aria-label={`Go to image ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImage 
                ? 'w-8 bg-red-500' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-2 right-2">
        <div className={`h-2 w-2 rounded-full transition-colors duration-300 ${
          isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
        }`} />
      </div>
    </div>
  )
}

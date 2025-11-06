"use client"

import { useState } from "react"
import { Car, Fuel, Users, ChevronRight, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ModelDetailModal } from "./model-detail-modal"
import type { Model } from "@/lib/models"

interface CarDisplayCardProps {
  model: Model
  variant?: "default" | "featured"
}

// Extended model data for enhanced display
const MODEL_DETAILS: Record<string, {
  engine: string
  seating: string
  features: string[]
  rating: number
  reviews: number
}> = {
  "nios": {
    engine: "1.2L Petrol / CNG",
    seating: "5 Seats",
    features: ["Manual", "AMT", "Touchscreen"],
    rating: 4.2,
    reviews: 127
  },
  "i20": {
    engine: "1.2L Petrol / 1.0L Turbo",
    seating: "5 Seats",
    features: ["Manual", "iMT", "DCT"],
    rating: 4.5,
    reviews: 234
  },
  "aura": {
    engine: "1.2L Petrol",
    seating: "5 Seats",
    features: ["Manual", "AMT"],
    rating: 4.1,
    reviews: 89
  },
  "verna": {
    engine: "1.5L Petrol / Diesel",
    seating: "5 Seats",
    features: ["Manual", "Automatic"],
    rating: 4.6,
    reviews: 312
  },
  "exter": {
    engine: "1.2L Petrol / CNG",
    seating: "5 Seats",
    features: ["Manual", "AMT"],
    rating: 4.3,
    reviews: 156
  },
  "venue": {
    engine: "1.2L Petrol / 1.5L Diesel",
    seating: "5 Seats",
    features: ["Manual", "DCT", "Automatic"],
    rating: 4.4,
    reviews: 198
  },
  "venuen": {
    engine: "1.0L Turbo Petrol",
    seating: "5 Seats",
    features: ["Manual", "DCT"],
    rating: 4.7,
    reviews: 145
  },
  "creta": {
    engine: "1.5L Petrol / Diesel / Turbo",
    seating: "5 Seats",
    features: ["Manual", "iMT", "Automatic"],
    rating: 4.6,
    reviews: 423
  },
  "cretan": {
    engine: "1.5L Turbo Petrol",
    seating: "5 Seats",
    features: ["DCT"],
    rating: 4.8,
    reviews: 67
  },
  "alcazar": {
    engine: "1.5L Petrol / Diesel",
    seating: "6 / 7 Seats",
    features: ["Manual", "Automatic"],
    rating: 4.5,
    reviews: 89
  },
  "tucson": {
    engine: "2.0L Petrol / Diesel",
    seating: "5 Seats",
    features: ["Automatic"],
    rating: 4.7,
    reviews: 45
  },
  "ioniq5": {
    engine: "Electric (72.6 kWh)",
    seating: "5 Seats",
    features: ["Single-Speed"],
    rating: 4.9,
    reviews: 23
  },
}

export function CarDisplayCard({ model, variant = "default" }: CarDisplayCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const details = MODEL_DETAILS[model.id] || {
    engine: "N/A",
    seating: "5 Seats",
    features: [],
    rating: 4.0,
    reviews: 0
  }

  const isFeatured = variant === "featured"

  return (
    <Card className={`group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
      isFeatured 
        ? "bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 border-white/20 shadow-lg backdrop-blur-sm" 
        : "bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 border-white/10 shadow-md hover:shadow-xl backdrop-blur-sm"
    }`}>
      {/* Car Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-white/5 to-white/10 overflow-hidden">
        {/* Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-red-600 rounded-full animate-spin" />
          </div>
        )}
        
        {/* Car Image */}
        <img
          src={model.imageSrc || "/placeholder.svg"}
          alt={model.imageAlt}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Navigation Arrow (like in reference) */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-red-600/80 border border-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur-sm">
          <ChevronRight className="h-5 w-5 text-white" />
        </button>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg shadow-red-600/30">
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Model Name */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
            {model.priceBand && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70">Starting At</span>
                <span className="text-lg font-semibold text-white">{model.priceBand}</span>
              </div>
            )}
            <p className="text-xs text-white/50 mt-1">Ex-Showroom Price</p>
          </div>
          
          {/* Rating */}
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-white/90">{details.rating}</span>
            </div>
            <p className="text-xs text-white/50">{details.reviews} reviews</p>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-red-500" />
            <span className="text-sm text-white/80">{details.seating}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-red-500" />
            <span className="text-sm text-white/80">{details.engine}</span>
          </div>
        </div>

        {/* Features */}
        {details.features.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-white/70 mb-2">Available Variants:</p>
            <div className="flex flex-wrap gap-2">
              {details.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/5 border border-white/10 text-white/90 text-xs rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            asChild
            className="flex-1 bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30"
          >
            <a href="/test-drive">BOOK NOW</a>
          </Button>
          <Button 
            asChild
            variant="outline" 
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <a href={
              model.id === "alcazar" ? "/alcazar" :
              model.id === "exter" ? "/exter" :
              model.id === "cretan" ? "/creta-nline" :
              model.id === "venuen" ? "/venue-nline" :
              model.id === "tucson" ? "/tucson" :
              `/model/${model.id}`
            }>KNOW MORE</a>
          </Button>
        </div>

                  {/* Quick Actions */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <button 
                        onClick={() => setShowDetailModal(true)}
                        className="text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>
                      <button className="text-white/70 hover:text-white font-medium transition-colors">
                        Compare
                      </button>
                      <button className="text-white/70 hover:text-white font-medium transition-colors">
                        Brochure
                      </button>
                    </div>
                  </div>
      </div>
      
      {/* Detail Modal */}
      <ModelDetailModal 
        model={model}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </Card>
  )
}

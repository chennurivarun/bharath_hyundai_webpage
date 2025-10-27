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
        ? "bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-lg" 
        : "bg-white border-gray-200 shadow-md hover:shadow-xl"
    }`}>
      {/* Car Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {/* Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
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
        <button className="absolute top-4 right-4 w-10 h-10 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
          <ChevronRight className="h-5 w-5 text-white" />
        </button>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Model Name */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{model.name}</h3>
            {model.priceBand && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Starting At</span>
                <span className="text-lg font-semibold text-gray-900">{model.priceBand}</span>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Ex-Showroom Price</p>
          </div>
          
          {/* Rating */}
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-gray-700">{details.rating}</span>
            </div>
            <p className="text-xs text-gray-500">{details.reviews} reviews</p>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-700">{details.seating}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-700">{details.engine}</span>
          </div>
        </div>

        {/* Features */}
        {details.features.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Available Variants:</p>
            <div className="flex flex-wrap gap-2">
              {details.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
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
            className={`flex-1 ${isFeatured ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
          >
            <a href="/test-drive">BOOK NOW</a>
          </Button>
          <Button 
            asChild
            variant="outline" 
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
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
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <button 
                        onClick={() => setShowDetailModal(true)}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 font-medium">
                        Compare
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 font-medium">
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

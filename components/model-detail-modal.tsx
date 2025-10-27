"use client"

import { useState } from "react"
import { X, Star, Car, Fuel, Users, Calendar, ArrowRight, Play, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Model } from "@/lib/models"

interface ModelDetailModalProps {
  model: Model | null
  isOpen: boolean
  onClose: () => void
}

const MODEL_DETAILS: Record<string, {
  engine: string
  seating: string
  features: string[]
  rating: number
  reviews: number
  specifications: Record<string, string>
  highlights: string[]
  colors: string[]
}> = {
  "nios": {
    engine: "1.2L Petrol / CNG",
    seating: "5 Seats",
    features: ["Manual", "AMT", "Touchscreen"],
    rating: 4.2,
    reviews: 127,
    specifications: {
      "Engine": "1.2L Kappa Petrol",
      "Power": "83 PS @ 6000 rpm",
      "Torque": "114 Nm @ 4000 rpm",
      "Transmission": "5-Speed Manual / AMT",
      "Mileage": "20.7 kmpl (ARAI)",
      "Fuel Tank": "37 L",
      "Length": "3765 mm",
      "Width": "1660 mm",
      "Height": "1520 mm",
      "Wheelbase": "2450 mm"
    },
    highlights: [
      "Premium cabin with quality materials",
      "8-inch touchscreen infotainment",
      "Automatic climate control",
      "Rear parking sensors",
      "CNG variant available"
    ],
    colors: ["Polar White", "Titan Grey", "Fiery Red", "Typhoon Silver"]
  },
  "i20": {
    engine: "1.2L Petrol / 1.0L Turbo",
    seating: "5 Seats",
    features: ["Manual", "iMT", "DCT"],
    rating: 4.5,
    reviews: 234,
    specifications: {
      "Engine": "1.2L Kappa / 1.0L GDi Turbo",
      "Power": "83 PS / 120 PS",
      "Torque": "114 Nm / 172 Nm",
      "Transmission": "5-Speed Manual / iMT / 7-Speed DCT",
      "Mileage": "20.35 kmpl (ARAI)",
      "Fuel Tank": "37 L",
      "Length": "3995 mm",
      "Width": "1775 mm",
      "Height": "1505 mm",
      "Wheelbase": "2580 mm"
    },
    highlights: [
      "Sporty and modern design",
      "10.25-inch touchscreen",
      "Wireless phone charging",
      "Bose premium sound system",
      "Sunroof available"
    ],
    colors: ["Polar White", "Titan Grey", "Fiery Red", "Typhoon Silver", "Starry Night"]
  }
}

export function ModelDetailModal({ model, isOpen, onClose }: ModelDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(false)

  if (!model) return null

  const details = MODEL_DETAILS[model.id] || {
    engine: "N/A",
    seating: "5 Seats",
    features: [],
    rating: 4.0,
    reviews: 0,
    specifications: {},
    highlights: [],
    colors: []
  }

  const images = [
    model.imageSrc,
    model.imageSrc, // In real app, you'd have multiple images
    model.imageSrc,
    model.imageSrc
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {model.name} - Detailed View
            </DialogTitle>
            <Button onClick={onClose} variant="ghost" size="icon">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={images[selectedImageIndex]}
                  alt={model.name}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${
                    isImageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setIsImageLoading(false)}
                  onLoadStart={() => setIsImageLoading(true)}
                />
                
                {/* Video Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="icon"
                    className="w-16 h-16 bg-white/90 hover:bg-white rounded-full shadow-lg"
                  >
                    <Play className="h-8 w-8 text-gray-900" />
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary" className="w-10 h-10">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="secondary" className="w-10 h-10">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${model.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Colors */}
              {details.colors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Available Colors</h4>
                  <div className="flex gap-2">
                    {details.colors.map((color) => (
                      <div key={color} className="text-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-gray-400 mb-1" />
                        <span className="text-xs text-gray-600">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="space-y-6">
              {/* Price & Rating */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-3xl font-bold text-gray-900">{model.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{details.rating}</span>
                    <span className="text-gray-600 text-sm">({details.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-2">{model.priceBand}</p>
                <p className="text-gray-600">Ex-Showroom Price</p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Seating</p>
                    <p className="font-semibold">{details.seating}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Engine</p>
                    <p className="font-semibold">{details.engine}</p>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {details.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  <Car className="h-5 w-5 mr-2" />
                  Book Test Drive
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="py-3">
                    Get Quote
                  </Button>
                  <Button variant="outline" className="py-3">
                    Download Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="mt-8">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(details.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < details.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="font-semibold text-gray-900">{details.rating}/5.0</p>
                    <p className="text-gray-600 text-sm">{details.reviews} customer reviews</p>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-3">
                    {[
                      { name: "Rajesh K.", rating: 5, comment: "Excellent car with great features and smooth driving experience." },
                      { name: "Priya S.", rating: 4, comment: "Good value for money. Love the design and comfort." }
                    ].map((review, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

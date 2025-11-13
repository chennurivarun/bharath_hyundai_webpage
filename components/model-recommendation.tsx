"use client"

import { useState } from "react"
import { Car, Users, Fuel, MapPin, TrendingUp, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MODELS } from "@/lib/models"
import type { Model } from "@/lib/models"

interface ModelRecommendationProps {
  onModelSelect: (model: Model) => void
}

interface UserPreferences {
  budget: number
  usage: string
  fuelType: string
  seating: number
  transmission: string
  features: string[]
}

export function ModelRecommendation({ onModelSelect }: ModelRecommendationProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: 8,
    usage: "city",
    fuelType: "petrol",
    seating: 5,
    transmission: "manual",
    features: []
  })

  const [recommendations, setRecommendations] = useState<Array<{model: Model, score: number}>>([])

  const budgetOptions = [
    { value: 5, label: "Under ₹6 Lakh" },
    { value: 8, label: "₹6-10 Lakh" },
    { value: 12, label: "₹10-15 Lakh" },
    { value: 20, label: "Above ₹15 Lakh" }
  ]

  const usageOptions = [
    { value: "city", label: "City Driving", icon: "🏙️" },
    { value: "highway", label: "Highway Cruising", icon: "🛣️" },
    { value: "mixed", label: "Mixed Usage", icon: "🔄" },
    { value: "family", label: "Family Use", icon: "👨‍👩‍👧‍👦" }
  ]

  const fuelOptions = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "cng", label: "CNG" },
    { value: "electric", label: "Electric" }
  ]

  const featureOptions = [
    "Sunroof", "Touchscreen", "Automatic AC", "Cruise Control", 
    "Parking Sensors", "Reverse Camera", "Wireless Charging", "Apple CarPlay"
  ]

  const updatePreferences = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const generateRecommendations = () => {
    const scores = MODELS.map(model => {
      let score = 0
      
      // Budget scoring
      const modelPrice = parseFloat(model.priceBand?.replace(/[₹,L*]/g, '').split('–')[0] || '0')
      if (Math.abs(modelPrice - preferences.budget) <= 2) score += 30
      else if (Math.abs(modelPrice - preferences.budget) <= 4) score += 20
      else score += 10

      // Segment scoring based on usage
      if (preferences.usage === "city" && model.segment === "hatchback") score += 25
      else if (preferences.usage === "highway" && model.segment === "sedan") score += 25
      else if (preferences.usage === "family" && model.segment === "suv") score += 25
      else if (preferences.usage === "mixed") score += 15

      // Add some randomness for demo
      score += Math.random() * 20

      return { model, score }
    })

    const sortedRecommendations = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    setRecommendations(sortedRecommendations)
    setCurrentStep(4)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">What's your budget range?</h3>
              <p className="text-white/80">Help us find the perfect car for your budget</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updatePreferences('budget', option.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    preferences.budget === option.value
                      ? "border-[#0057B8] bg-[#0057B8]/20 text-white"
                      : "border-white/20 hover:border-[#0057B8]/50 text-white/90 bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      preferences.budget === option.value
                        ? "border-[#0057B8] bg-[#0057B8]"
                        : "border-white/40"
                    }`} />
                    <span className="font-semibold">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">How will you use your car?</h3>
              <p className="text-white/80">This helps us match you with the right type of vehicle</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usageOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updatePreferences('usage', option.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    preferences.usage === option.value
                      ? "border-[#0057B8] bg-[#0057B8]/20 text-white"
                      : "border-white/20 hover:border-[#0057B8]/50 text-white/90 bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-semibold">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">What features matter to you?</h3>
              <p className="text-white/80">Select all that apply</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {featureOptions.map((feature) => (
                <button
                  key={feature}
                  onClick={() => {
                    const newFeatures = preferences.features.includes(feature)
                      ? preferences.features.filter(f => f !== feature)
                      : [...preferences.features, feature]
                    updatePreferences('features', newFeatures)
                  }}
                  className={`p-3 rounded-lg border-2 text-sm transition-all ${
                    preferences.features.includes(feature)
                      ? "border-[#0057B8] bg-[#0057B8]/20 text-white"
                      : "border-white/20 hover:border-[#0057B8]/50 text-white/90 bg-white/5"
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Your Perfect Matches</h3>
              <p className="text-white/80">Based on your preferences, here are our top recommendations</p>
            </div>
            
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={rec.model.id} className="relative overflow-hidden bg-[#0057B8]/20 border border-[#0057B8]/30 backdrop-blur-md rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <CardContent className="p-0 relative">
                    <div className="flex">
                      <div className="w-32 h-24 bg-[#0057B8]/10 flex-shrink-0 border-r border-[#0057B8]/20 relative z-10">
                        <img
                          src={rec.model.imageSrc}
                          alt={rec.model.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4 relative z-10">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-white">{rec.model.name}</h4>
                            <p className="text-white/80 text-sm">{rec.model.priceBand}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={index === 0 ? "bg-gradient-to-r from-[#0057B8] to-[#00A9E0] text-white border border-[#00A9E0]/30 shadow-md shadow-[#0057B8]/20" : "bg-[#0057B8]/20 text-white border-[#0057B8]/30"}>
                              {index === 0 ? "Best Match" : `${Math.round(rec.score)}% Match`}
                            </Badge>
                            <div className="mt-1">
                              <Progress value={rec.score} className="w-16 h-2 bg-white/10" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>5 Seats</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Fuel className="h-4 w-4" />
                            <span>Petrol</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="mt-3 bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden"
                          onClick={() => onModelSelect(rec.model)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <span className="relative z-10">View Details</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-30 pointer-events-none" />
      <CardContent className="p-6 relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-lg border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
            <TrendingUp className="h-6 w-6 text-[#00A9E0]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Find Your Perfect Car</h3>
            <p className="text-white/80">Answer a few questions to get personalized recommendations</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-white/80 mb-2">
            <span>Step {currentStep} of 4</span>
            <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2 bg-white/10" />
        </div>

        {/* Step Content */}
        <div className="mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          
          {currentStep < 3 ? (
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Next</span>
            </Button>
          ) : currentStep === 3 ? (
            <Button 
              onClick={generateRecommendations}
              className="bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Get Recommendations</span>
            </Button>
          ) : (
            <Button 
              onClick={() => {
                setCurrentStep(1)
                setPreferences({
                  budget: 8,
                  usage: "city",
                  fuelType: "petrol",
                  seating: 5,
                  transmission: "manual",
                  features: []
                })
                setRecommendations([])
              }}
              className="bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Start Over</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">What's your budget range?</h3>
              <p className="text-gray-600">Help us find the perfect car for your budget</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updatePreferences('budget', option.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    preferences.budget === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      preferences.budget === option.value
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">How will you use your car?</h3>
              <p className="text-gray-600">This helps us match you with the right type of vehicle</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usageOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updatePreferences('usage', option.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    preferences.usage === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">What features matter to you?</h3>
              <p className="text-gray-600">Select all that apply</p>
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
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Perfect Matches</h3>
              <p className="text-gray-600">Based on your preferences, here are our top recommendations</p>
            </div>
            
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={rec.model.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-32 h-24 bg-gray-100 flex-shrink-0">
                        <img
                          src={rec.model.imageSrc}
                          alt={rec.model.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{rec.model.name}</h4>
                            <p className="text-gray-600 text-sm">{rec.model.priceBand}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                              {index === 0 ? "Best Match" : `${Math.round(rec.score)}% Match`}
                            </Badge>
                            <div className="mt-1">
                              <Progress value={rec.score} className="w-16 h-2" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
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
                          className="mt-3"
                          onClick={() => onModelSelect(rec.model)}
                        >
                          View Details
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
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Find Your Perfect Car</h3>
            <p className="text-gray-600">Answer a few questions to get personalized recommendations</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of 4</span>
            <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2" />
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
          >
            Previous
          </Button>
          
          {currentStep < 3 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Next
            </Button>
          ) : currentStep === 3 ? (
            <Button onClick={generateRecommendations}>
              Get Recommendations
            </Button>
          ) : (
            <Button onClick={() => {
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
            }}>
              Start Over
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

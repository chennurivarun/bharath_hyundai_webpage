"use client"

import { useState } from "react"
import { ChevronDown, X, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MODELS } from "@/lib/models"

const COMPARISON_FEATURES = [
  { id: "price", label: "Price Range", key: "priceBand" },
  { id: "segment", label: "Segment", key: "segment" },
  { id: "engine", label: "Engine Type", value: (id: string) => {
    const engineMap: Record<string, string> = {
      "i20": "1.2L Petrol / 1.0L Turbo",
      "nios": "1.2L Petrol / CNG",
      "aura": "1.2L Petrol",
      "verna": "1.5L Petrol / Diesel",
      "exter": "1.2L Petrol / CNG",
      "venue": "1.2L Petrol / 1.5L Diesel",
      "venuen": "1.0L Turbo Petrol",
      "creta": "1.5L Petrol / Diesel / Turbo",
      "cretan": "1.5L Turbo Petrol",
      "alcazar": "1.5L Petrol / Diesel",
      "tucson": "2.0L Petrol / Diesel",
      "ioniq5": "Electric (72.6 kWh)",
    }
    return engineMap[id] || "N/A"
  }},
  { id: "transmission", label: "Transmission", value: (id: string) => {
    const transmissionMap: Record<string, string> = {
      "i20": "Manual / iMT / DCT",
      "nios": "Manual / AMT",
      "aura": "Manual / AMT",
      "verna": "Manual / Automatic",
      "exter": "Manual / AMT",
      "venue": "Manual / DCT / Automatic",
      "venuen": "Manual / DCT",
      "creta": "Manual / iMT / Automatic",
      "cretan": "DCT",
      "alcazar": "Manual / Automatic",
      "tucson": "Automatic",
      "ioniq5": "Single-Speed Automatic",
    }
    return transmissionMap[id] || "N/A"
  }},
  { id: "seating", label: "Seating Capacity", value: (id: string) => {
    return ["alcazar"].includes(id) ? "6 / 7 Seater" : "5 Seater"
  }},
  { id: "mileage", label: "Mileage (Est.)", value: (id: string) => {
    const mileageMap: Record<string, string> = {
      "i20": "20.35 kmpl",
      "nios": "20.7 kmpl",
      "aura": "20.5 kmpl",
      "verna": "17-24 kmpl",
      "exter": "19.4 kmpl",
      "venue": "16.5-23.4 kmpl",
      "venuen": "18.2 kmpl",
      "creta": "17-21 kmpl",
      "cretan": "18.4 kmpl",
      "alcazar": "18-20 kmpl",
      "tucson": "14-16 kmpl",
      "ioniq5": "631 km/charge",
    }
    return mileageMap[id] || "N/A"
  }},
  { id: "safety", label: "Safety Rating", value: (id: string) => {
    const safetyMap: Record<string, string> = {
      "i20": "3★ Global NCAP",
      "creta": "5★ ASEAN NCAP",
      "verna": "5★ Global NCAP",
      "alcazar": "5★ ASEAN NCAP",
      "tucson": "5★ Euro NCAP",
    }
    return safetyMap[id] || "Not Rated"
  }},
]

export function ModelComparison() {
  const [selectedModels, setSelectedModels] = useState<string[]>(["", "", ""])

  const handleModelSelect = (index: number, modelId: string) => {
    const newSelection = [...selectedModels]
    newSelection[index] = modelId
    setSelectedModels(newSelection)
  }

  const clearModel = (index: number) => {
    const newSelection = [...selectedModels]
    newSelection[index] = ""
    setSelectedModels(newSelection)
  }

  const clearAll = () => {
    setSelectedModels(["", "", ""])
  }

  const getModelById = (id: string) => MODELS.find((m) => m.id === id)

  const selectedCount = selectedModels.filter((id) => id).length

  return (
    <section
      aria-labelledby="comparison-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 shadow-lg shadow-[#0057B8]/20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0057B8]/10 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A9E0]/10 rounded-full blur-3xl" aria-hidden />

        <div className="relative z-10 p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <AlertCircle className="h-6 w-6 text-[#00A9E0]" />
              <span className="text-[#00A9E0] font-semibold uppercase tracking-wider text-sm">
                Compare Models
              </span>
            </div>
            <h2 id="comparison-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Your Perfect Match
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Compare up to 3 models side-by-side to make an informed decision
            </p>
          </div>

          {/* Model Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[0, 1, 2].map((index) => {
              const modelId = selectedModels[index]
              const model = modelId ? getModelById(modelId) : null

              return (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    {!model ? (
                      <div>
                        <p className="text-white/60 text-sm mb-3">Select Model {index + 1}</p>
                        <Select onValueChange={(value) => handleModelSelect(index, value)}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Choose a model" />
                          </SelectTrigger>
                          <SelectContent>
                            {MODELS.filter((m) => !selectedModels.includes(m.id)).map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                {model.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-white font-semibold">{model.name}</h3>
                            <p className="text-[#00A9E0] text-sm">{model.priceBand}</p>
                          </div>
                          <button
                            onClick={() => clearModel(index)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Remove model"
                          >
                            <X className="h-4 w-4 text-white/60" />
                          </button>
                        </div>
                        <div className="aspect-video rounded-lg bg-white/5 overflow-hidden">
                          <img
                            src={model.imageSrc}
                            alt={model.imageAlt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Comparison Table */}
          {selectedCount >= 2 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">Feature Comparison</h3>
                <Button
                  onClick={clearAll}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-white/60 text-sm font-semibold">
                        Feature
                      </th>
                      {selectedModels.map((modelId, index) => {
                        const model = modelId ? getModelById(modelId) : null
                        return (
                          <th key={index} className="text-left py-4 px-4">
                            {model && (
                              <span className="text-white font-semibold">{model.name}</span>
                            )}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_FEATURES.map((feature) => (
                      <tr key={feature.id} className="border-b border-white/5">
                        <td className="py-4 px-4 text-white/80 font-medium">{feature.label}</td>
                        {selectedModels.map((modelId, index) => {
                          const model = modelId ? getModelById(modelId) : null
                          if (!model) return <td key={index} className="py-4 px-4" />

                          let value = ""
                          if (feature.value) {
                            value = feature.value(model.id)
                          } else if (feature.key) {
                            value = (model as any)[feature.key] || "N/A"
                          }

                          return (
                            <td key={index} className="py-4 px-4 text-white">
                              {value}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {selectedModels.map((modelId, index) => {
                  const model = modelId ? getModelById(modelId) : null
                  if (!model) return <div key={index} />

                  return (
                    <div key={index} className="space-y-2">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden"
                      >
                        <a href={`/models/${model.segment}#${model.id}`}>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <span className="relative z-10">View Details</span>
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        <a href="/test-drive">Book Test Drive</a>
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/60">Select at least 2 models to compare</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


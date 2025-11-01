"use client"

import { useState, useMemo, useEffect } from "react"
import type { Segment } from "@/lib/models"
import { MODELS, segmentLabel } from "@/lib/models"
import { CarDisplayCard } from "@/components/car-display-card"
import { HatchbackCarSlider } from "@/components/hatchback-car-slider"
import { ModelFilters } from "@/components/model-filters"
import { FinancingOptions } from "@/components/financing-options"
import { ModelRecommendation } from "@/components/model-recommendation"
import { SiteNavigation } from "@/components/site-navigation"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import type { Model } from "@/lib/models"

export default function SegmentPage({ params }: { params: { segment: Segment } }) {
  const [segment, setSegment] = useState<Segment>("hatchback") // Will be set from params
  const [filters, setFilters] = useState({
    priceRange: "all",
    sortBy: "name",
    transmission: "all",
    fuelType: "all"
  })
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)

  // Filter and sort models
  const filteredModels = useMemo(() => {
    let filtered = MODELS.filter((m) => m.segment === segment)

    // Apply price filter
    if (filters.priceRange !== "all") {
      filtered = filtered.filter((model) => {
        const price = model.priceBand
        if (!price) return true
        
        const numericPrice = parseFloat(price.replace(/[₹,L*]/g, '').split('–')[0])
        
        switch (filters.priceRange) {
          case "under-6": return numericPrice < 6
          case "6-8": return numericPrice >= 6 && numericPrice < 8
          case "8-10": return numericPrice >= 8 && numericPrice < 10
          case "over-10": return numericPrice >= 10
          default: return true
        }
      })
    }

    // Apply transmission filter (simplified - in real app you'd have transmission data)
    if (filters.transmission !== "all") {
      // This would filter based on actual transmission data
    }

    // Apply fuel type filter (simplified - in real app you'd have fuel type data)
    if (filters.fuelType !== "all") {
      // This would filter based on actual fuel type data
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          const priceA = parseFloat(a.priceBand?.replace(/[₹,L*]/g, '').split('–')[0] || '0')
          const priceB = parseFloat(b.priceBand?.replace(/[₹,L*]/g, '').split('–')[0] || '0')
          return priceA - priceB
        case "price-high":
          const priceA2 = parseFloat(a.priceBand?.replace(/[₹,L*]/g, '').split('–')[0] || '0')
          const priceB2 = parseFloat(b.priceBand?.replace(/[₹,L*]/g, '').split('–')[0] || '0')
          return priceB2 - priceA2
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [segment, filters])

  // Set segment from params when component mounts
  useEffect(() => {
    setSegment(params.segment)
  }, [params])

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNavigation />
      
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">Home</a>
            <span>/</span>
            <a href="/models" className="hover:text-gray-900">Models</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{segmentLabel(segment)}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {segmentLabel(segment)} Models
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore our premium {segmentLabel(segment).toLowerCase()} collection designed for modern lifestyle and performance.
          </p>
        </div>

        {/* Car Slider - Only for Hatchback */}
        {segment === "hatchback" && (
          <div className="mb-16">
            <HatchbackCarSlider models={filteredModels} />
          </div>
        )}

        {/* Filters - Only show for non-hatchback segments */}
        {segment !== "hatchback" && (
          <ModelFilters 
            onFiltersChange={setFilters}
            totalModels={filteredModels.length}
          />
        )}

        {/* Models Grid - Only show for non-hatchback segments */}
        {segment !== "hatchback" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredModels.map((model, index) => (
              <CarDisplayCard 
                key={model.id} 
                model={model} 
                variant={index === 0 ? "featured" : "default"}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No models found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
            <Button onClick={() => setFilters({
              priceRange: "all",
              sortBy: "name", 
              transmission: "all",
              fuelType: "all"
            })} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Financing Options */}
        <div className="mt-12">
          <FinancingOptions 
            modelName={segmentLabel(segment)}
            priceRange="₹5-15 Lakh"
          />
        </div>

        {/* Model Recommendation */}
        <div className="mt-12">
          <ModelRecommendation onModelSelect={setSelectedModel} />
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-6">
              Our expert team can help you find the perfect {segmentLabel(segment).toLowerCase()} model for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/test-drive"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Test Drive
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Expert
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Bharath Hyundai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

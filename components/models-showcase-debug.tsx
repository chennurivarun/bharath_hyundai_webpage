"use client"

import { useState } from "react"
import type { Segment } from "@/lib/models"
import { MODELS } from "@/lib/models"

export function ModelsShowcaseDebug() {
  const [activeSegment, setActiveSegment] = useState<Segment>("suv")

  const segments: { key: Segment; label: string }[] = [
    { key: "suv", label: "SUV" },
    { key: "sedan", label: "Sedan" },
    { key: "hatchback", label: "Hatchback" },
    { key: "electric", label: "Electric" }
  ]

  const filteredModels = MODELS.filter(model => model.segment === activeSegment)

  return (
    <div className="w-full bg-white p-8">
      <h1 className="text-5xl font-bold text-black mb-8 text-center">Our Models</h1>
      
      {/* Segment Filter Tabs */}
      <div className="flex justify-center gap-1 mb-8">
        {segments.map((segment) => (
          <button
            key={segment.key}
            onClick={() => setActiveSegment(segment.key)}
            className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
              activeSegment === segment.key
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {segment.label}
          </button>
        ))}
      </div>

      {/* Debug Info */}
      <div className="text-center mb-8">
        <p className="text-lg">Active Segment: {activeSegment}</p>
        <p className="text-lg">Filtered Models Count: {filteredModels.length}</p>
      </div>

      {/* Models Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredModels.slice(0, 2).map((model) => (
          <div key={model.id} className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{model.name}</h3>
            <p className="text-lg mb-2">{model.priceBand}</p>
            <p className="text-sm text-gray-600">Segment: {model.segment}</p>
            <img 
              src={model.imageSrc} 
              alt={model.name}
              className="w-full h-48 object-contain mt-4"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

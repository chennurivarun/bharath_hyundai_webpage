"use client"

import { useState } from "react"
import { Filter, SortAsc, SortDesc, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ModelFiltersProps {
  onFiltersChange: (filters: {
    priceRange: string
    sortBy: string
    transmission: string
    fuelType: string
  }) => void
  totalModels: number
}

export function ModelFilters({ onFiltersChange, totalModels }: ModelFiltersProps) {
  const [filters, setFilters] = useState({
    priceRange: "all",
    sortBy: "name",
    transmission: "all",
    fuelType: "all"
  })

  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: "all",
      sortBy: "name",
      transmission: "all",
      fuelType: "all"
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const activeFiltersCount = Object.values(filters).filter(value => value !== "all").length

  return (
    <div className="mb-8">
      {/* Filter Toggle Button (Mobile) */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h2 className="text-lg font-semibold text-white">
          {totalModels} {totalModels === 1 ? 'Model' : 'Models'} Found
        </h2>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs bg-red-600 text-white">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Desktop Filters */}
      <Card className={`hidden lg:block bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 border-white/10 backdrop-blur-sm ${showFilters ? 'lg:block' : ''}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Filter & Sort ({totalModels} {totalModels === 1 ? 'Model' : 'Models'})
            </h3>
            {activeFiltersCount > 0 && (
              <Button onClick={clearFilters} variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Price Range
              </label>
              <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10 w-full">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20 text-white">
                  <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">All Prices</SelectItem>
                  <SelectItem value="under-6" className="text-white hover:bg-white/10 focus:bg-white/10">Under ₹6 Lakh</SelectItem>
                  <SelectItem value="6-8" className="text-white hover:bg-white/10 focus:bg-white/10">₹6 - ₹8 Lakh</SelectItem>
                  <SelectItem value="8-10" className="text-white hover:bg-white/10 focus:bg-white/10">₹8 - ₹10 Lakh</SelectItem>
                  <SelectItem value="over-10" className="text-white hover:bg-white/10 focus:bg-white/10">Over ₹10 Lakh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Sort By
              </label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10 w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20 text-white">
                  <SelectItem value="name" className="text-white hover:bg-white/10 focus:bg-white/10">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low" className="text-white hover:bg-white/10 focus:bg-white/10">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high" className="text-white hover:bg-white/10 focus:bg-white/10">Price (High to Low)</SelectItem>
                  <SelectItem value="popularity" className="text-white hover:bg-white/10 focus:bg-white/10">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Transmission
              </label>
              <Select value={filters.transmission} onValueChange={(value) => handleFilterChange('transmission', value)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10 w-full">
                  <SelectValue placeholder="All Transmissions" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20 text-white">
                  <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">All Transmissions</SelectItem>
                  <SelectItem value="manual" className="text-white hover:bg-white/10 focus:bg-white/10">Manual</SelectItem>
                  <SelectItem value="automatic" className="text-white hover:bg-white/10 focus:bg-white/10">Automatic</SelectItem>
                  <SelectItem value="cvt" className="text-white hover:bg-white/10 focus:bg-white/10">CVT</SelectItem>
                  <SelectItem value="dct" className="text-white hover:bg-white/10 focus:bg-white/10">DCT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Fuel Type
              </label>
              <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange('fuelType', value)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10 w-full">
                  <SelectValue placeholder="All Fuel Types" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20 text-white">
                  <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">All Fuel Types</SelectItem>
                  <SelectItem value="petrol" className="text-white hover:bg-white/10 focus:bg-white/10">Petrol</SelectItem>
                  <SelectItem value="diesel" className="text-white hover:bg-white/10 focus:bg-white/10">Diesel</SelectItem>
                  <SelectItem value="cng" className="text-white hover:bg-white/10 focus:bg-white/10">CNG</SelectItem>
                  <SelectItem value="electric" className="text-white hover:bg-white/10 focus:bg-white/10">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-white/70">Active filters:</span>
                {filters.priceRange !== "all" && (
                  <Badge className="flex items-center gap-1 bg-red-600/20 text-white border-red-500/30">
                    Price: {filters.priceRange.replace('-', ' - ').replace('under-', 'Under ₹').replace('over-', 'Over ₹')}
                    <button
                      onClick={() => handleFilterChange('priceRange', 'all')}
                      className="ml-1 hover:bg-red-600/30 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.transmission !== "all" && (
                  <Badge className="flex items-center gap-1 bg-red-600/20 text-white border-red-500/30">
                    {filters.transmission}
                    <button
                      onClick={() => handleFilterChange('transmission', 'all')}
                      className="ml-1 hover:bg-red-600/30 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.fuelType !== "all" && (
                  <Badge className="flex items-center gap-1 bg-red-600/20 text-white border-red-500/30">
                    {filters.fuelType}
                    <button
                      onClick={() => handleFilterChange('fuelType', 'all')}
                      className="ml-1 hover:bg-red-600/30 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mobile Filters */}
      {showFilters && (
        <Card className="lg:hidden bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 border-white/10 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Filters</h3>
              <Button onClick={() => setShowFilters(false)} variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Price Range
                </label>
                <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10 w-full">
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20 text-white">
                    <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">All Prices</SelectItem>
                    <SelectItem value="under-6" className="text-white hover:bg-white/10 focus:bg-white/10">Under ₹6 Lakh</SelectItem>
                    <SelectItem value="6-8" className="text-white hover:bg-white/10 focus:bg-white/10">₹6 - ₹8 Lakh</SelectItem>
                    <SelectItem value="8-10" className="text-white hover:bg-white/10 focus:bg-white/10">₹8 - ₹10 Lakh</SelectItem>
                    <SelectItem value="over-10" className="text-white hover:bg-white/10 focus:bg-white/10">Over ₹10 Lakh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Sort By
                </label>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10 w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20 text-white">
                    <SelectItem value="name" className="text-white hover:bg-white/10 focus:bg-white/10">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low" className="text-white hover:bg-white/10 focus:bg-white/10">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high" className="text-white hover:bg-white/10 focus:bg-white/10">Price (High to Low)</SelectItem>
                    <SelectItem value="popularity" className="text-white hover:bg-white/10 focus:bg-white/10">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={clearFilters} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                Clear All
              </Button>
              <Button onClick={() => setShowFilters(false)} className="flex-1 bg-red-600 hover:bg-red-500 text-white">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

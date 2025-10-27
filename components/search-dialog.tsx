"use client"

import { useState, useEffect } from "react"
import { Search, ChevronRight, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MODELS, type Model } from "@/lib/models"

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

const QUICK_LINKS = [
  { label: "Book Test Drive", href: "/test-drive", category: "Services" },
  { label: "Service Booking", href: "/service", category: "Services" },
  { label: "Accessories", href: "/accessories", category: "Shop" },
  { label: "Insurance", href: "/insurance", category: "Services" },
  { label: "Used Cars", href: "/used-cars", category: "Inventory" },
  { label: "Our Locations", href: "/locations", category: "Info" },
  { label: "Contact Us", href: "/contact", category: "Info" },
]

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<{ models: Model[]; links: typeof QUICK_LINKS }>({
    models: [],
    links: [],
  })

  useEffect(() => {
    if (!query.trim()) {
      setResults({ models: [], links: [] })
      return
    }

    const searchTerm = query.toLowerCase()
    
    // Search models
    const matchingModels = MODELS.filter(
      (model) =>
        model.name.toLowerCase().includes(searchTerm) ||
        model.segment.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    // Search quick links
    const matchingLinks = QUICK_LINKS.filter(
      (link) =>
        link.label.toLowerCase().includes(searchTerm) ||
        link.category.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    setResults({ models: matchingModels, links: matchingLinks })
  }, [query])

  const handleClose = () => {
    setQuery("")
    setResults({ models: [], links: [] })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-gray-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="sr-only">Search</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models, services, or pages..."
            className="pl-10 pr-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-lg focus-visible:ring-red-500"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-white/50" />
            </button>
          )}
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {!query.trim() ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["i20", "Creta", "Venue", "Test Drive", "Service", "Insurance"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                  Quick Links
                </h3>
                <div className="space-y-1">
                  {QUICK_LINKS.slice(0, 6).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleClose}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50 uppercase tracking-wider w-16">
                          {link.category}
                        </span>
                        <span className="text-white">{link.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-red-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Models Results */}
              {results.models.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                    Models ({results.models.length})
                  </h3>
                  <div className="space-y-1">
                    {results.models.map((model) => (
                      <a
                        key={model.id}
                        href={`/models/${model.segment}#${model.id}`}
                        onClick={handleClose}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 rounded-md bg-white/5 border border-white/10 overflow-hidden">
                            <img
                              src={model.imageSrc}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-white font-medium">{model.name}</p>
                            <p className="text-sm text-white/60">{model.priceBand}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-red-500 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Links Results */}
              {results.links.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                    Pages ({results.links.length})
                  </h3>
                  <div className="space-y-1">
                    {results.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={handleClose}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-white/50 uppercase tracking-wider w-16">
                            {link.category}
                          </span>
                          <span className="text-white">{link.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-red-500 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {results.models.length === 0 && results.links.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/60">No results found for "{query}"</p>
                  <p className="text-white/40 text-sm mt-1">Try searching for a model name or service</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-3">
          <div className="flex items-center justify-between text-xs text-white/40">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">ESC</kbd> to close
              </span>
            </div>
            <span>{results.models.length + results.links.length} results</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


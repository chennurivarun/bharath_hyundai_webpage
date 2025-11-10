 "use client"

import { useState } from "react"
import { SiteNavigation } from "@/components/site-navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"

const VENUE_NLINE_ACCESSORIES = [
  {
    id: "armrest-cushion",
    name: "ARMREST CUSHION - N LINE",
    category: "Interior",
    price: "₹1,400",
    originalPrice: "₹2,000",
    image: "/images/accessories/venue-nline/armrest-cushion.png",
    rating: 4.7,
    reviews: 128,
    description: "Ergonomic armrest cushion with N Line branding for added comfort."
  },
  {
    id: "blaupunkt-key",
    name: "BLAUPUNKT - KEY",
    category: "Electronics",
    price: "₹12,500",
    originalPrice: "₹17,500",
    image: "/images/accessories/venue-nline/blaupunkt-key.png",
    rating: 4.8,
    reviews: 94,
    description: "Premium Blaupunkt infotainment upgrade with smart key integration."
  },
  {
    id: "blaupunkt",
    name: "BLAUPUNKT SPEAKER KIT",
    category: "Electronics",
    price: "₹9,800",
    originalPrice: "₹14,200",
    image: "/images/accessories/venue-nline/blaupunkt.png",
    rating: 4.7,
    reviews: 102,
    description: "High-fidelity Blaupunkt speaker system tuned for Venue N Line."
  },
  {
    id: "boot-mat-3d",
    name: "3D BOOT MAT",
    category: "Interior",
    price: "₹3,200",
    originalPrice: "₹4,600",
    image: "/images/accessories/venue-nline/boot-mat-3d.png",
    rating: 4.6,
    reviews: 156,
    description: "Custom-fit 3D boot mat to protect cargo space from dirt and spills."
  },
  {
    id: "dash-cam",
    name: "DASH CAM",
    category: "Electronics",
    price: "₹6,900",
    originalPrice: "₹9,900",
    image: "/images/accessories/venue-nline/dash-cam.png",
    rating: 4.8,
    reviews: 141,
    description: "Full HD dash camera with night vision to capture every drive."
  },
  {
    id: "door-striker-cover",
    name: "DOOR STRIKER COVER",
    category: "Exterior",
    price: "₹850",
    originalPrice: "₹1,200",
    image: "/images/accessories/venue-nline/door-striker-cover.png",
    rating: 4.5,
    reviews: 109,
    description: "Protective door striker covers that add a refined finishing touch."
  },
  {
    id: "door-visor",
    name: "DOOR VISOR",
    category: "Exterior",
    price: "₹3,000",
    originalPrice: "₹4,200",
    image: "/images/accessories/venue-nline/door-visor.png",
    rating: 4.6,
    reviews: 173,
    description: "Aerodynamic door visors for ventilation during rainy drives."
  },
  {
    id: "gt0609c",
    name: "GT0609C SPEAKER SET",
    category: "Electronics",
    price: "₹8,200",
    originalPrice: "₹11,500",
    image: "/images/accessories/venue-nline/gt0609c.png",
    rating: 4.7,
    reviews: 97,
    description: "Hyundai GT0609C speaker upgrade for immersive cabin audio."
  },
  {
    id: "head-lamp",
    name: "HEAD LAMP GARNISH",
    category: "Exterior",
    price: "₹2,600",
    originalPrice: "₹3,800",
    image: "/images/accessories/venue-nline/head-lamp.png",
    rating: 4.6,
    reviews: 121,
    description: "Sporty head lamp garnish accentuating the N Line's aggressive stance."
  },
  {
    id: "mud-guard",
    name: "MUD GUARD SET",
    category: "Exterior",
    price: "₹1,900",
    originalPrice: "₹2,700",
    image: "/images/accessories/venue-nline/mud-guard.png",
    rating: 4.5,
    reviews: 138,
    description: "Durable mud guards to keep the bodywork clean and protected."
  },
  {
    id: "seat-belt-cover",
    name: "SEAT BELT COVER",
    category: "Interior",
    price: "₹650",
    originalPrice: "₹950",
    image: "/images/accessories/venue-nline/seat-belt-cover.png",
    rating: 4.4,
    reviews: 165,
    description: "Soft seat belt covers for enhanced comfort during spirited drives."
  },
  {
    id: "twin-hood-scoop",
    name: "TWIN HOOD SCOOP",
    category: "Exterior",
    price: "₹3,800",
    originalPrice: "₹5,200",
    image: "/images/accessories/venue-nline/twin-hood-scoop.png",
    rating: 4.8,
    reviews: 88,
    description: "Bold twin hood scoop kit emphasizing the Venue N Line performance DNA."
  }
]

const CATEGORIES = ["All", "Interior", "Exterior", "Electronics"]

export default function VenueNLineAccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredAccessories = VENUE_NLINE_ACCESSORIES.filter((accessory) => {
    const matchesSearch =
      accessory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      accessory.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || accessory.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <>
      <SiteNavigation />
      <main className="pt-[120px] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                Venue N Line Accessories
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Amplify the sportiness of your Venue N Line with genuine Hyundai accessories crafted for performance, comfort, and style.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Search accessories..."
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart (0)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Accessories Grid */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Accessories ({filteredAccessories.length})</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredAccessories.map((accessory) => (
                <Card
                  key={accessory.id}
                  className="border-gray-700 bg-gray-800/50 transition-colors hover:border-red-500/50"
                >
                  <CardHeader className="p-0">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden rounded-t-lg bg-white/5">
                        <img
                          src={accessory.image}
                          alt={accessory.name}
                          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <Badge className="absolute left-2 top-2 bg-red-600">
                        {Math.round(
                          ((parseFloat(accessory.originalPrice.replace(/[₹,]/g, "")) -
                            parseFloat(accessory.price.replace(/[₹,]/g, ""))) /
                            parseFloat(accessory.originalPrice.replace(/[₹,]/g, ""))) *
                            100
                        )}
                        % OFF
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-white">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {accessory.category}
                      </Badge>
                      <Badge className="bg-red-600 text-xs hover:bg-red-500">
                        Venue N Line
                      </Badge>
                    </div>
                    <CardTitle className="mb-2">{accessory.name}</CardTitle>
                    <p className="mb-4 text-sm text-gray-300">{accessory.description}</p>

                    <div className="mb-4 flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{accessory.rating}</span>
                      </div>
                      <span className="text-gray-400">({accessory.reviews} reviews)</span>
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-lg font-bold text-red-400">{accessory.price}</span>
                      <span className="text-sm text-gray-400 line-through">{accessory.originalPrice}</span>
                    </div>

                    <Button className="w-full bg-red-600 hover:bg-red-500">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Genuine Accessories */}
        <section className="bg-gray-900/50 py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Why Choose Genuine Accessories?
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 p-4">
                  <Shield className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Genuine Quality</h3>
                <p className="text-gray-300">
                  Engineered for Venue N Line to ensure precise fit, finish, and long-lasting performance.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 p-4">
                  <Truck className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Professional Support</h3>
                <p className="text-gray-300">
                  Installation by certified technicians with genuine Hyundai warranty backing.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 p-4">
                  <RotateCcw className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Comprehensive Warranty</h3>
                <p className="text-gray-300">
                  Coverage on all accessories for peace of mind through every exhilarating journey.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}



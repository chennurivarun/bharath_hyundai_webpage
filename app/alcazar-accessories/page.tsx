"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const ALCAZAR_ACCESSORIES = [
  {
    id: "3d-boot-mat",
    name: "3D BOOT MAT",
    category: "Interior",
    price: "₹3,200",
    originalPrice: "₹4,500",
    image: "/images/accessories/alcazar/3d-boot-mat.png",
    rating: 4.8,
    reviews: 145,
    description: "Custom-fit 3D boot mat for Alcazar"
  },
  {
    id: "body-cover-premium",
    name: "BODY COVER - PREMIUM",
    category: "Exterior",
    price: "₹6,500",
    originalPrice: "₹8,500",
    image: "/images/accessories/alcazar/body-cover-premium.png",
    rating: 4.8,
    reviews: 189,
    description: "Premium waterproof body cover for Alcazar"
  },
  {
    id: "body-side-moulding",
    name: "BODY SIDE MOULDING",
    category: "Exterior",
    price: "₹3,200",
    originalPrice: "₹4,500",
    image: "/images/accessories/alcazar/body-side-moulding.png",
    rating: 4.6,
    reviews: 123,
    description: "Protective body side molding for Alcazar"
  },
  {
    id: "door-edge-guard",
    name: "DOOR EDGE GUARD",
    category: "Exterior",
    price: "₹1,500",
    originalPrice: "₹2,200",
    image: "/images/accessories/alcazar/door-edge-guard.png",
    rating: 4.7,
    reviews: 178,
    description: "Protective door edge guard set"
  },
  {
    id: "door-visor",
    name: "DOOR VISOR",
    category: "Exterior",
    price: "₹2,500",
    originalPrice: "₹3,500",
    image: "/images/accessories/alcazar/door-visor.png",
    rating: 4.7,
    reviews: 156,
    description: "Premium door visor set for Alcazar"
  },
  {
    id: "front-bumper",
    name: "FRONT BUMPER",
    category: "Exterior",
    price: "₹4,500",
    originalPrice: "₹6,500",
    image: "/images/accessories/alcazar/front-bumper.png",
    rating: 4.6,
    reviews: 98,
    description: "Front bumper guard for protection"
  },
  {
    id: "rear-bumper-granish",
    name: "REAR BUMPER GRANISH",
    category: "Exterior",
    price: "₹3,800",
    originalPrice: "₹5,200",
    image: "/images/accessories/alcazar/rear-bumper-granish.png",
    rating: 4.7,
    reviews: 112,
    description: "Chrome rear bumper garnish"
  },
  {
    id: "alcazar-sunshade-a-c-r",
    name: "ALCAZAR SUNSHADE A+C+R",
    category: "Interior",
    price: "₹2,200",
    originalPrice: "₹3,200",
    image: "/images/accessories/alcazar/alcazar-sunshade-a-c-r.png",
    rating: 4.6,
    reviews: 134,
    description: "Sun shade for all rows (A+C+R)"
  },
  {
    id: "sunshade-c-r",
    name: "SUNSHADE C+R",
    category: "Interior",
    price: "₹1,800",
    originalPrice: "₹2,600",
    image: "/images/accessories/alcazar/sunshade-c-r.png",
    rating: 4.5,
    reviews: 98,
    description: "Sun shade for C and R rows"
  },
  {
    id: "screen-protector",
    name: "SCREEN PROTECTOR",
    category: "Interior",
    price: "₹900",
    originalPrice: "₹1,300",
    image: "/images/accessories/alcazar/screen-protector.png",
    rating: 4.5,
    reviews: 203,
    description: "Anti-glare screen protector for infotainment"
  },
  {
    id: "sporty-pedal-cover",
    name: "SPORTY PEDAL COVER",
    category: "Interior",
    price: "₹1,500",
    originalPrice: "₹2,200",
    image: "/images/accessories/alcazar/sporty-pedal-cover.png",
    rating: 4.7,
    reviews: 189,
    description: "Sporty pedal covers for enhanced grip"
  },
  {
    id: "a302h3",
    name: "A302H3",
    category: "Electrical",
    price: "₹8,500",
    originalPrice: "₹12,000",
    image: "/images/accessories/alcazar/a302h3.png",
    rating: 4.8,
    reviews: 67,
    description: "Sony A302H3 audio system"
  },
  {
    id: "reverse-camera",
    name: "REVERSE CAMERA",
    category: "Electrical",
    price: "₹6,200",
    originalPrice: "₹8,500",
    image: "/images/accessories/alcazar/reverse-camera.png",
    rating: 4.9,
    reviews: 234,
    description: "HD reverse camera with parking guidelines"
  },
  {
    id: "sony-x-s-nw12002",
    name: "SONY - X S - NW12002",
    category: "Electrical",
    price: "₹12,000",
    originalPrice: "₹16,500",
    image: "/images/accessories/alcazar/sony-x-s-nw12002.png",
    rating: 4.7,
    reviews: 89,
    description: "Sony XS-NW12002 audio system"
  },
  {
    id: "sony-channel-stereo",
    name: "SONY CHANNEL STEREO",
    category: "Electrical",
    price: "₹15,000",
    originalPrice: "₹20,000",
    image: "/images/accessories/alcazar/sony-channel-stereo.png",
    rating: 4.8,
    reviews: 56,
    description: "Sony channel stereo amplifier system"
  },
]

const CATEGORIES = ["All", "Interior", "Exterior", "Electrical", "Protection"]

export default function AlcazarAccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const filteredAccessories = ALCAZAR_ACCESSORIES.filter((accessory) => {
    const matchesSearch = accessory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         accessory.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || accessory.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  return (
    <>
      <SiteNavigation />
      <main className="pt-[120px] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Genuine Alcazar Accessories
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Enhance your Alcazar SUV with genuine accessories designed specifically for your 7-seater premium SUV.
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
              <ShoppingCart className="h-5 w-5 text-white" />
              <span className="text-white">Cart (0)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accessories Grid */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Accessories ({filteredAccessories.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccessories.map((accessory) => (
              <Card key={accessory.id} className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-colors group">
                <CardHeader className="p-0">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden rounded-t-lg bg-white/5">
                      <img
                        src={accessory.image}
                        alt={accessory.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <Badge className="absolute top-2 left-2 bg-red-600">
                      {Math.round(((parseFloat(accessory.originalPrice.replace(/[₹,]/g, '')) - parseFloat(accessory.price.replace(/[₹,]/g, ''))) / parseFloat(accessory.originalPrice.replace(/[₹,]/g, ''))) * 100)}% OFF
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {accessory.category}
                    </Badge>
                    <Badge className="text-xs bg-emerald-600 hover:bg-emerald-500">
                      Alcazar
                    </Badge>
                  </div>
                  <CardTitle className="text-white mb-2">{accessory.name}</CardTitle>
                  <p className="text-gray-300 text-sm mb-4">{accessory.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{accessory.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({accessory.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-red-400 font-bold text-lg">{accessory.price}</span>
                    <span className="text-gray-400 line-through text-sm">{accessory.originalPrice}</span>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-500 group">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Genuine Accessories */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Genuine Accessories?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Genuine Quality</h3>
              <p className="text-gray-300">Designed and tested specifically for Alcazar to ensure perfect fit and performance.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Free Installation</h3>
              <p className="text-gray-300">Professional installation by certified technicians at our service centers.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <RotateCcw className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Warranty Coverage</h3>
              <p className="text-gray-300">All genuine accessories come with manufacturer warranty for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const CRETA_ACCESSORIES = [
  {
    id: "body-cover-premium",
    name: "BODY COVER PREMIUM",
    category: "Exterior",
    price: "₹6,500",
    originalPrice: "₹8,500",
    image: "/images/accessories/creta/body-cover-premium.png",
    rating: 4.8,
    reviews: 189,
    description: "Premium waterproof body cover for Creta"
  },
  {
    id: "body-side-moulding",
    name: "BODY SIDE MOULDING",
    category: "Exterior",
    price: "₹3,200",
    originalPrice: "₹4,500",
    image: "/images/accessories/creta/body-side-moulding.png",
    rating: 4.6,
    reviews: 123,
    description: "Protective body side molding for Creta"
  },
  {
    id: "bumper-corner",
    name: "BUMPER CORNER",
    category: "Exterior",
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/creta/bumper-corner.png",
    rating: 4.5,
    reviews: 98,
    description: "Bumper corner guard for protection"
  },
  {
    id: "door-cladding",
    name: "DOOR CLADDING",
    category: "Exterior",
    price: "₹2,800",
    originalPrice: "₹4,000",
    image: "/images/accessories/creta/door-cladding.png",
    rating: 4.7,
    reviews: 130,
    description: "Stylish and protective door cladding"
  },
  {
    id: "door-handle-keyless",
    name: "DOOR HANDLE KEYLESS",
    category: "Exterior",
    price: "₹1,500",
    originalPrice: "₹2,200",
    image: "/images/accessories/creta/door-handle-keyless.png",
    rating: 4.6,
    reviews: 145,
    description: "Keyless door handle cover"
  },
  {
    id: "tail-lamp-garnish",
    name: "TAIL LAMP GARNISH",
    category: "Exterior",
    price: "₹2,200",
    originalPrice: "₹3,200",
    image: "/images/accessories/creta/tail-lamp-garnish.png",
    rating: 4.7,
    reviews: 112,
    description: "Stylish tail lamp garnish"
  },
  {
    id: "window-beading",
    name: "WINDOW BEADING",
    category: "Exterior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/creta/window-beading.png",
    rating: 4.4,
    reviews: 87,
    description: "Window beading for enhanced aesthetics"
  },
  {
    id: "twin-hood-scoop",
    name: "TWIN HOOD SCOOP",
    category: "Exterior",
    price: "₹2,500",
    originalPrice: "₹3,500",
    image: "/images/accessories/creta/twin-hood-scoop.png",
    rating: 4.7,
    reviews: 75,
    description: "Sporty twin hood scoop for aggressive look"
  },
  {
    id: "3d-boot-mat",
    name: "3D BOOT MAT",
    category: "Interior",
    price: "₹3,200",
    originalPrice: "₹4,500",
    image: "/images/accessories/creta/3d-boot-mat.png",
    rating: 4.8,
    reviews: 203,
    description: "Custom-fit 3D boot mat for all-weather protection"
  },
  {
    id: "seat-covers",
    name: "SEAT COVERS",
    category: "Interior",
    price: "₹7,500",
    originalPrice: "₹10,000",
    image: "/images/accessories/creta/seat-covers.png",
    rating: 4.8,
    reviews: 234,
    description: "Premium custom-fit seat covers"
  },
  {
    id: "cup-holder-caster",
    name: "CUP HOLDER CASTER",
    category: "Interior",
    price: "₹600",
    originalPrice: "₹900",
    image: "/images/accessories/creta/cup-holder-caster.png",
    rating: 4.3,
    reviews: 156,
    description: "Cup holder caster for convenience"
  },
  {
    id: "steering-wheel-cover",
    name: "STEERING WHEEL COVER",
    category: "Interior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/creta/steering-wheel-cover.png",
    rating: 4.6,
    reviews: 189,
    description: "Premium steering wheel cover for comfort"
  },
  {
    id: "a302hi",
    name: "A302HI",
    category: "Electrical",
    price: "₹9,500",
    originalPrice: "₹13,500",
    image: "/images/accessories/creta/a302hi.png",
    rating: 4.8,
    reviews: 78,
    description: "Sony A302HI audio system"
  },
  {
    id: "reverse-camera",
    name: "REVERSE CAMERA",
    category: "Electrical",
    price: "₹6,200",
    originalPrice: "₹8,500",
    image: "/images/accessories/creta/reverse-camera.png",
    rating: 4.9,
    reviews: 234,
    description: "HD reverse camera with parking guidelines"
  },
  {
    id: "gto609c",
    name: "GTO609C",
    category: "Electrical",
    price: "₹8,500",
    originalPrice: "₹12,000",
    image: "/images/accessories/creta/gto609c.png",
    rating: 4.6,
    reviews: 89,
    description: "Hyundai interior speakers GTO609C"
  },
  {
    id: "sony-xm-channel",
    name: "SONY XM CHANNEL",
    category: "Electrical",
    price: "₹16,000",
    originalPrice: "₹22,000",
    image: "/images/accessories/creta/sony-xm-channel.png",
    rating: 4.9,
    reviews: 56,
    description: "Sony XM channel stereo amplifier system"
  },
]

const CATEGORIES = ["All", "Interior", "Exterior", "Electrical"]

export default function CretaAccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const filteredAccessories = CRETA_ACCESSORIES.filter((accessory) => {
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
              Genuine Creta Accessories
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Enhance your Creta SUV with genuine accessories that combine comfort, safety, and modern style.
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
                    <Badge className="text-xs bg-red-600 hover:bg-red-500">
                      Creta
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
              <p className="text-gray-300">Designed and tested specifically for Creta to ensure perfect fit and performance.</p>
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


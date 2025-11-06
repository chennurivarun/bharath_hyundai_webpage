"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const EXTER_ACCESSORIES = [
  {
    id: "body-cover-premium",
    name: "BODY COVER PREMIUM",
    category: "Exterior",
    price: "₹5,500",
    originalPrice: "₹7,500",
    image: "/images/accessories/exter/body-cover-premium.png",
    rating: 4.8,
    reviews: 145,
    description: "Premium waterproof body cover for Exter"
  },
  {
    id: "body-side-moulding",
    name: "BODY SIDE MOULDING",
    category: "Exterior",
    price: "₹2,800",
    originalPrice: "₹4,000",
    image: "/images/accessories/exter/body-side-moulding.png",
    rating: 4.6,
    reviews: 112,
    description: "Protective body side molding for Exter"
  },
  {
    id: "bumper-corner-protector",
    name: "BUMPER CORNER PROTECTOR",
    category: "Exterior",
    price: "₹1,500",
    originalPrice: "₹2,200",
    image: "/images/accessories/exter/bumper-corner-protector.png",
    rating: 4.5,
    reviews: 98,
    description: "Bumper corner protector for enhanced protection"
  },
  {
    id: "door-cladding",
    name: "DOOR CLADDING",
    category: "Exterior",
    price: "₹2,500",
    originalPrice: "₹3,500",
    image: "/images/accessories/exter/door-cladding.png",
    rating: 4.7,
    reviews: 123,
    description: "Stylish and protective door cladding"
  },
  {
    id: "door-edge-guard",
    name: "DOOR EDGE GUARD",
    category: "Exterior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/exter/door-edge-guard.png",
    rating: 4.6,
    reviews: 134,
    description: "Protective door edge guard set"
  },
  {
    id: "front-rear-scoop",
    name: "FRONT & REAR SCOOP",
    category: "Exterior",
    price: "₹2,200",
    originalPrice: "₹3,200",
    image: "/images/accessories/exter/front-rear-scoop.png",
    rating: 4.7,
    reviews: 89,
    description: "Sporty front and rear scoop for aggressive look"
  },
  {
    id: "mud-guard",
    name: "MUD GUARD",
    category: "Exterior",
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/exter/mud-guard.png",
    rating: 4.6,
    reviews: 156,
    description: "Durable mud guards to protect from splashes"
  },
  {
    id: "twin-hood-scoop",
    name: "TWIN HOOD SCOOP",
    category: "Exterior",
    price: "₹2,000",
    originalPrice: "₹3,000",
    image: "/images/accessories/exter/twin-hood-scoop.png",
    rating: 4.7,
    reviews: 78,
    description: "Sporty twin hood scoop for enhanced aesthetics"
  },
  {
    id: "3d-boot-mat",
    name: "3D BOOT MAT",
    category: "Interior",
    price: "₹2,800",
    originalPrice: "₹4,000",
    image: "/images/accessories/exter/3d-boot-mat.png",
    rating: 4.8,
    reviews: 189,
    description: "Custom-fit 3D boot mat for all-weather protection"
  },
  {
    id: "head-rest-cushions",
    name: "HEAD REST CUSHIONS",
    category: "Interior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/exter/head-rest-cushions.png",
    rating: 4.5,
    reviews: 145,
    description: "Comfortable head rest cushions"
  },
  {
    id: "scuff-plates",
    name: "SCUFF PLATES",
    category: "Interior",
    price: "₹1,500",
    originalPrice: "₹2,200",
    image: "/images/accessories/exter/scuff-plates.png",
    rating: 4.6,
    reviews: 112,
    description: "Stylish scuff plates for door sills"
  },
  {
    id: "sunshade-rower",
    name: "SUNSHADE ROWER",
    category: "Interior",
    price: "₹1,800",
    originalPrice: "₹2,600",
    image: "/images/accessories/exter/sunshade-rower.png",
    rating: 4.7,
    reviews: 134,
    description: "Custom-fit sunshade for all rows"
  },
  {
    id: "a302hi",
    name: "A302HI",
    category: "Electrical",
    price: "₹8,500",
    originalPrice: "₹12,000",
    image: "/images/accessories/exter/a302hi.png",
    rating: 4.8,
    reviews: 67,
    description: "Sony A302HI audio system"
  },
  {
    id: "reverse-camera",
    name: "REVERSE CAMERA",
    category: "Electrical",
    price: "₹5,500",
    originalPrice: "₹7,500",
    image: "/images/accessories/exter/reverse-camera.png",
    rating: 4.9,
    reviews: 203,
    description: "HD reverse camera with parking guidelines"
  },
  {
    id: "sony-xm-channel",
    name: "SONY XM CHANNEL",
    category: "Electrical",
    price: "₹14,000",
    originalPrice: "₹19,000",
    image: "/images/accessories/exter/sony-xm-channel.png",
    rating: 4.9,
    reviews: 45,
    description: "Sony XM channel stereo amplifier system"
  },
  {
    id: "gt0609c",
    name: "GT0609C",
    category: "Electrical",
    price: "₹7,500",
    originalPrice: "₹10,500",
    image: "/images/accessories/exter/gt0609c.png",
    rating: 4.6,
    reviews: 78,
    description: "Hyundai interior speakers GT0609C"
  },
]

const CATEGORIES = ["All", "Interior", "Exterior", "Electrical"]

export default function ExterAccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const filteredAccessories = EXTER_ACCESSORIES.filter((accessory) => {
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
              Genuine Exter Accessories
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Enhance your Exter SUV's adventurous spirit with genuine accessories that combine style, safety, and convenience.
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
                      Exter
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
              <p className="text-gray-300">Designed and tested specifically for Exter to ensure perfect fit and performance.</p>
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


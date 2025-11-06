"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const CRETA_EV_ACCESSORIES = [
  {
    id: "1l-engine-coolant-pre-mix",
    name: "1L Engine Coolant PRE - MIX",
    category: "Electrical",
    price: "₹450",
    originalPrice: "₹650",
    image: "/images/accessories/creta-ev/1l-engine-coolant-pre-mix.png",
    rating: 4.5,
    reviews: 89,
    description: "Genuine Hyundai engine coolant pre-mix for optimal performance"
  },
  {
    id: "1l-brake-fluid-dot-3",
    name: "1L Brake fluid DOT 3",
    category: "Electrical",
    price: "₹380",
    originalPrice: "₹550",
    image: "/images/accessories/creta-ev/1l-brake-fluid-dot-3.png",
    rating: 4.4,
    reviews: 67,
    description: "High-quality brake fluid DOT 3 for Creta EV"
  },
  {
    id: "1l-brake-fluid-dot-4-lv",
    name: "1L Brake fluid DOT 4 LV",
    category: "Electrical",
    price: "₹420",
    originalPrice: "₹600",
    image: "/images/accessories/creta-ev/1l-brake-fluid-dot-4-lv.png",
    rating: 4.6,
    reviews: 78,
    description: "Premium brake fluid DOT 4 LV for enhanced braking"
  },
  {
    id: "240g-balancing-weight-stick",
    name: "240g Balancing weight - stick",
    category: "Exterior",
    price: "₹150",
    originalPrice: "₹250",
    image: "/images/accessories/creta-ev/240g-balancing-weight-stick.png",
    rating: 4.3,
    reviews: 45,
    description: "Stick-type balancing weight for wheel alignment"
  },
  {
    id: "25ml-engine-sealant",
    name: "25ml Engine Sealant",
    category: "Electrical",
    price: "₹280",
    originalPrice: "₹400",
    image: "/images/accessories/creta-ev/25ml-engine-sealant.png",
    rating: 4.5,
    reviews: 92,
    description: "Engine sealant for leak prevention"
  },
  {
    id: "30ml-dashboard-polish",
    name: "30ml Dashboard Polish",
    category: "Interior",
    price: "₹220",
    originalPrice: "₹350",
    image: "/images/accessories/creta-ev/30ml-dashboard-polish.png",
    rating: 4.4,
    reviews: 134,
    description: "Premium dashboard polish for shine and protection"
  },
  {
    id: "3d-boot-mat",
    name: "3D BOOT MAT",
    category: "Interior",
    price: "₹2,800",
    originalPrice: "₹3,800",
    image: "/images/accessories/creta-ev/3d-boot-mat.png",
    rating: 4.8,
    reviews: 156,
    description: "Custom-fit 3D boot mat for Creta EV"
  },
  {
    id: "5-l-engine-coolant-pre-mix",
    name: "5 - L Engine Coolant Pre - Mix",
    category: "Electrical",
    price: "₹1,850",
    originalPrice: "₹2,500",
    image: "/images/accessories/creta-ev/5-l-engine-coolant-pre-mix.png",
    rating: 4.6,
    reviews: 67,
    description: "5-liter engine coolant pre-mix pack"
  },
  {
    id: "70gm-rust-bust",
    name: "70GM - RUST BUST",
    category: "Protection",
    price: "₹180",
    originalPrice: "₹280",
    image: "/images/accessories/creta-ev/70gm-rust-bust.png",
    rating: 4.5,
    reviews: 98,
    description: "Rust prevention and removal solution"
  },
  {
    id: "anti-skid-mat",
    name: "ANTI - SKID MAT",
    category: "Interior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/creta-ev/anti-skid-mat.png",
    rating: 4.7,
    reviews: 112,
    description: "Anti-skid mat for enhanced safety"
  },
  {
    id: "body-cover-premium",
    name: "Body Cover - Premium",
    category: "Exterior",
    price: "₹5,500",
    originalPrice: "₹7,500",
    image: "/images/accessories/creta-ev/body-cover-premium.png",
    rating: 4.8,
    reviews: 189,
    description: "Premium waterproof body cover for Creta EV"
  },
  {
    id: "body-side-moulding",
    name: "Body Side Moulding",
    category: "Exterior",
    price: "₹2,800",
    originalPrice: "₹4,000",
    image: "/images/accessories/creta-ev/body-side-moulding.png",
    rating: 4.6,
    reviews: 145,
    description: "Protective body side molding for Creta EV"
  },
  {
    id: "cabin-led-light",
    name: "Cabin LED Light",
    category: "Interior",
    price: "₹1,500",
    originalPrice: "₹2,200",
    image: "/images/accessories/creta-ev/cabin-led-light.png",
    rating: 4.7,
    reviews: 203,
    description: "Premium LED cabin lighting"
  },
  {
    id: "car-back-seat-organizar",
    name: "Car back seat organizar",
    category: "Interior",
    price: "₹850",
    originalPrice: "₹1,200",
    image: "/images/accessories/creta-ev/car-back-seat-organizar.png",
    rating: 4.5,
    reviews: 78,
    description: "Back seat organizer for storage"
  },
  {
    id: "car-care-kit",
    name: "Car care kit",
    category: "Interior",
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/creta-ev/car-care-kit.png",
    rating: 4.6,
    reviews: 167,
    description: "Complete car care kit with all essentials"
  },
  {
    id: "car-document-organizer",
    name: "Car Document Organizer",
    category: "Interior",
    price: "₹450",
    originalPrice: "₹650",
    image: "/images/accessories/creta-ev/car-document-organizer.png",
    rating: 4.4,
    reviews: 98,
    description: "Organizer for car documents"
  },
  {
    id: "car-perfume-citrus-breeze",
    name: "Car Perfume - Citrus Breeze",
    category: "Interior",
    price: "₹350",
    originalPrice: "₹500",
    image: "/images/accessories/creta-ev/car-perfume-citrus-breeze.png",
    rating: 4.5,
    reviews: 234,
    description: "Fresh citrus breeze car perfume"
  },
  {
    id: "carpet-mat-designer",
    name: "Carpet MAT Designer",
    category: "Interior",
    price: "₹3,200",
    originalPrice: "₹4,500",
    image: "/images/accessories/creta-ev/carpet-mat-designer.png",
    rating: 4.8,
    reviews: 189,
    description: "Designer carpet mats for Creta EV"
  },
  {
    id: "comfort-kit",
    name: "Comfort Kit",
    category: "Interior",
    price: "₹2,500",
    originalPrice: "₹3,500",
    image: "/images/accessories/creta-ev/comfort-kit.png",
    rating: 4.7,
    reviews: 145,
    description: "Complete comfort kit for enhanced driving experience"
  },
  {
    id: "door-cladding",
    name: "DOOR CLADDING",
    category: "Exterior",
    price: "₹3,200",
    originalPrice: "₹4,500",
    image: "/images/accessories/creta-ev/door-cladding.png",
    rating: 4.7,
    reviews: 123,
    description: "Premium door cladding for Creta EV"
  },
  {
    id: "door-edge-guard",
    name: "Door Edge Guard",
    category: "Exterior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/creta-ev/door-edge-guard.png",
    rating: 4.6,
    reviews: 156,
    description: "Protective door edge guard"
  },
  {
    id: "door-side-vent",
    name: "Door Side Vent",
    category: "Exterior",
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/creta-ev/door-side-vent.png",
    rating: 4.5,
    reviews: 89,
    description: "Stylish door side vent for Creta EV"
  },
  {
    id: "door-visor",
    name: "Door Visor",
    category: "Exterior",
    price: "₹2,200",
    originalPrice: "₹3,200",
    image: "/images/accessories/creta-ev/door-visor.png",
    rating: 4.7,
    reviews: 178,
    description: "Premium door visor set"
  },
  {
    id: "door-handle-key",
    name: "Door Handle Key",
    category: "Exterior",
    price: "₹1,500",
    originalPrice: "₹2,200",
    image: "/images/accessories/creta-ev/door-handle-key.png",
    rating: 4.6,
    reviews: 112,
    description: "Chrome door handle key"
  },
  {
    id: "heat-control-sunroof-50",
    name: "Heat control sunroof - 50",
    category: "Exterior",
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/creta-ev/heat-control-sunroof-50.png",
    rating: 4.5,
    reviews: 98,
    description: "Heat control sunroof film 50%"
  },
  {
    id: "heat-control-sunroof-80",
    name: "Heat control sunroof -80",
    category: "Exterior",
    price: "₹2,200",
    originalPrice: "₹3,000",
    image: "/images/accessories/creta-ev/heat-control-sunroof-80.png",
    rating: 4.6,
    reviews: 87,
    description: "Heat control sunroof film 80%"
  },
  {
    id: "hood-branding-creta",
    name: "Hood Branding Creta",
    category: "Exterior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/creta-ev/hood-branding-creta.png",
    rating: 4.7,
    reviews: 134,
    description: "Official Creta hood branding"
  },
  {
    id: "key-cover",
    name: "Key Cover",
    category: "Interior",
    price: "₹450",
    originalPrice: "₹650",
    image: "/images/accessories/creta-ev/key-cover.png",
    rating: 4.5,
    reviews: 267,
    description: "Premium key cover for protection"
  },
  {
    id: "mudflap",
    name: "Mudflap",
    category: "Exterior",
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/creta-ev/mudflap.png",
    rating: 4.6,
    reviews: 198,
    description: "Heavy-duty mudflap set for Creta EV"
  },
  {
    id: "nfc-card-holder",
    name: "NFC Card Holder",
    category: "Interior",
    price: "₹350",
    originalPrice: "₹500",
    image: "/images/accessories/creta-ev/nfc-card-holder.png",
    rating: 4.4,
    reviews: 89,
    description: "NFC card holder for easy access"
  },
  {
    id: "orvm-garnish",
    name: "ORVM Garnish",
    category: "Exterior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/creta-ev/orvm-garnish.png",
    rating: 4.6,
    reviews: 145,
    description: "Chrome ORVM garnish"
  },
  {
    id: "tail-lamp-garnish",
    name: "Tail Lamp Garnish",
    category: "Exterior",
    price: "₹2,500",
    originalPrice: "₹3,500",
    image: "/images/accessories/creta-ev/tail-lamp-garnish.png",
    rating: 4.7,
    reviews: 112,
    description: "Premium tail lamp garnish"
  },
  {
    id: "twin-hood-scoop",
    name: "Twin Hood Scoop",
    category: "Exterior",
    price: "₹4,500",
    originalPrice: "₹6,500",
    image: "/images/accessories/creta-ev/twin-hood-scoop.png",
    rating: 4.8,
    reviews: 78,
    description: "Sporty twin hood scoop for Creta EV"
  },
  {
    id: "seat-cover",
    name: "Seat Cover",
    category: "Interior",
    price: "₹8,500",
    originalPrice: "₹12,000",
    image: "/images/accessories/creta-ev/seat-cover.png",
    rating: 4.9,
    reviews: 245,
    description: "Premium seat covers for Creta EV"
  },
  {
    id: "dual-layer-mat",
    name: "Dual layer MAT",
    category: "Interior",
    price: "₹3,500",
    originalPrice: "₹5,000",
    image: "/images/accessories/creta-ev/dual-layer-mat.png",
    rating: 4.8,
    reviews: 167,
    description: "Dual layer floor mats for maximum protection"
  },
  {
    id: "front-trunk-liner",
    name: "Front Trunk Liner",
    category: "Interior",
    price: "₹2,200",
    originalPrice: "₹3,200",
    image: "/images/accessories/creta-ev/front-trunk-liner.png",
    rating: 4.7,
    reviews: 98,
    description: "Custom-fit front trunk liner"
  },
  {
    id: "neck-rest-cushion-kit",
    name: "Neck Rest & Cushion kit",
    category: "Interior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/creta-ev/neck-rest-cushion-kit.png",
    rating: 4.6,
    reviews: 189,
    description: "Comfortable neck rest and cushion kit"
  },
  {
    id: "pet-protection-cover",
    name: "Pet Protection Cover",
    category: "Interior",
    price: "₹2,800",
    originalPrice: "₹4,000",
    image: "/images/accessories/creta-ev/pet-protection-cover.png",
    rating: 4.7,
    reviews: 112,
    description: "Protective cover for pet safety"
  },
  {
    id: "premium-boot-mat",
    name: "Premium Boot MAT",
    category: "Interior",
    price: "₹3,200",
    originalPrice: "₹4,500",
    image: "/images/accessories/creta-ev/premium-boot-mat.png",
    rating: 4.8,
    reviews: 145,
    description: "Premium boot mat for Creta EV"
  },
  {
    id: "screen-protector",
    name: "Screen Protector",
    category: "Interior",
    price: "₹800",
    originalPrice: "₹1,200",
    image: "/images/accessories/creta-ev/screen-protector.png",
    rating: 4.5,
    reviews: 203,
    description: "Anti-glare screen protector for infotainment"
  },
  {
    id: "seat-belt-cover",
    name: "Seat Belt Cover",
    category: "Interior",
    price: "₹450",
    originalPrice: "₹650",
    image: "/images/accessories/creta-ev/seat-belt-cover.png",
    rating: 4.4,
    reviews: 156,
    description: "Comfortable seat belt covers"
  },
  {
    id: "sporty-pedal-cover",
    name: "Sporty Pedal Cover",
    category: "Interior",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/creta-ev/sporty-pedal-cover.png",
    rating: 4.7,
    reviews: 178,
    description: "Sporty pedal covers for enhanced grip"
  },
  {
    id: "sun-shade-row-a-pear",
    name: "Sun Shade (Row A + Pear)",
    category: "Interior",
    price: "₹1,500",
    originalPrice: "₹2,200",
    image: "/images/accessories/creta-ev/sun-shade-row-a-pear.png",
    rating: 4.6,
    reviews: 134,
    description: "Premium sun shade for front row"
  },
  {
    id: "mh7-dash-cam",
    name: "MH7 DASH CAM",
    category: "Electrical",
    price: "₹6,800",
    originalPrice: "₹9,500",
    image: "/images/accessories/creta-ev/mh7-dash-cam.png",
    rating: 4.8,
    reviews: 234,
    description: "Full HD dash camera with night vision"
  },
]

const CATEGORIES = ["All", "Interior", "Exterior", "Electrical", "Protection"]

export default function CretaEvAccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const filteredAccessories = CRETA_EV_ACCESSORIES.filter((accessory) => {
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
              Genuine Creta EV Accessories
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Enhance your Creta EV with genuine accessories designed specifically for your electric SUV.
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
                      Creta EV
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
              <p className="text-gray-300">Designed and tested specifically for Creta EV to ensure perfect fit and performance.</p>
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


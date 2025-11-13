"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"
import { AccessoryEnquiryModal } from "@/components/accessory-enquiry-modal"

const CRETA_ACCESSORIES = [
  {
    id: "body-cover-premium",
    name: "BODY COVER PREMIUM",
    category: "Exterior",
    price: "₹3,466",
    originalPrice: "₹3,466",
    image: "/images/accessories/creta/body-cover-premium.png",
    rating: 4.8,
    reviews: 189,
    description: "Premium waterproof body cover for Creta"
  },
  {
    id: "body-side-moulding",
    name: "BODY SIDE MOULDING",
    category: "Exterior",
    price: "₹2,833",
    originalPrice: "₹2,833",
    image: "/images/accessories/creta/body-side-moulding.png",
    rating: 4.6,
    reviews: 123,
    description: "Protective body side molding for Creta"
  },
  {
    id: "bumper-corner",
    name: "BUMPER CORNER",
    category: "Exterior",
    price: "₹863",
    originalPrice: "₹863",
    image: "/images/accessories/creta/bumper-corner.png",
    rating: 4.5,
    reviews: 98,
    description: "Bumper corner guard for protection"
  },
  {
    id: "door-cladding",
    name: "DOOR CLADDING",
    category: "Exterior",
    price: "₹9,203",
    originalPrice: "₹9,203",
    image: "/images/accessories/creta/door-cladding.png",
    rating: 4.7,
    reviews: 130,
    description: "Stylish and protective door cladding"
  },
  {
    id: "door-handle-keyless",
    name: "DOOR HANDLE KEYLESS",
    category: "Exterior",
    price: "₹1,341",
    originalPrice: "₹1,341",
    image: "/images/accessories/creta/door-handle-keyless.png",
    rating: 4.6,
    reviews: 145,
    description: "Keyless door handle cover"
  },
  {
    id: "tail-lamp-garnish",
    name: "TAIL LAMP GARNISH",
    category: "Exterior",
    price: "₹1,170",
    originalPrice: "₹1,170",
    image: "/images/accessories/creta/tail-lamp-garnish.png",
    rating: 4.7,
    reviews: 112,
    description: "Stylish tail lamp garnish"
  },
  {
    id: "window-beading",
    name: "WINDOW BEADING",
    category: "Exterior",
    price: "₹2,079",
    originalPrice: "₹2,079",
    image: "/images/accessories/creta/window-beading.png",
    rating: 4.4,
    reviews: 87,
    description: "Window beading for enhanced aesthetics"
  },
  {
    id: "twin-hood-scoop",
    name: "TWIN HOOD SCOOP",
    category: "Exterior",
    price: "₹2,312",
    originalPrice: "₹2,312",
    image: "/images/accessories/creta/twin-hood-scoop.png",
    rating: 4.7,
    reviews: 75,
    description: "Sporty twin hood scoop for aggressive look"
  },
  {
    id: "3d-boot-mat",
    name: "3D BOOT MAT",
    category: "Interior",
    price: "₹2,000",
    originalPrice: "₹2,000",
    image: "/images/accessories/creta/3d-boot-mat.png",
    rating: 4.8,
    reviews: 203,
    description: "Custom-fit 3D boot mat for all-weather protection"
  },
  {
    id: "seat-covers",
    name: "SEAT COVERS",
    category: "Interior",
    price: "₹8,333",
    originalPrice: "₹8,333",
    image: "/images/accessories/creta/seat-covers.png",
    rating: 4.8,
    reviews: 234,
    description: "Premium custom-fit seat covers"
  },
  {
    id: "cup-holder-caster",
    name: "CUP HOLDER CASTER",
    category: "Interior",
    price: "₹163",
    originalPrice: "₹163",
    image: "/images/accessories/creta/cup-holder-caster.png",
    rating: 4.3,
    reviews: 156,
    description: "Cup holder caster for convenience"
  },
  {
    id: "steering-wheel-cover",
    name: "STEERING WHEEL COVER",
    category: "Interior",
    price: "₹740",
    originalPrice: "₹740",
    image: "/images/accessories/creta/steering-wheel-cover.png",
    rating: 4.6,
    reviews: 189,
    description: "Premium steering wheel cover for comfort"
  },
  {
    id: "a302hi",
    name: "A302HI",
    category: "Electrical",
    price: "₹4,100",
    originalPrice: "₹4,100",
    image: "/images/accessories/creta/a302hi.png",
    rating: 4.8,
    reviews: 78,
    description: "Sony A302HI audio system"
  },
  {
    id: "reverse-camera",
    name: "REVERSE CAMERA",
    category: "Electrical",
    price: "₹2,450",
    originalPrice: "₹2,450",
    image: "/images/accessories/creta/reverse-camera.png",
    rating: 4.9,
    reviews: 234,
    description: "HD reverse camera with parking guidelines"
  },
  {
    id: "gto609c",
    name: "GTO609C",
    category: "Electrical",
    price: "₹14,790",
    originalPrice: "₹14,790",
    image: "/images/accessories/creta/gto609c.png",
    rating: 4.6,
    reviews: 89,
    description: "Hyundai interior speakers GTO609C"
  },
  {
    id: "sony-xm-channel",
    name: "SONY XM CHANNEL",
    category: "Electrical",
    price: "₹7,990",
    originalPrice: "₹7,990",
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
  const [selectedAccessory, setSelectedAccessory] = useState<typeof CRETA_ACCESSORIES[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const filteredAccessories = CRETA_ACCESSORIES.filter((accessory) => {
    const matchesSearch = accessory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         accessory.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || accessory.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleEnquire = (accessory: typeof CRETA_ACCESSORIES[0]) => {
    setSelectedAccessory(accessory)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAccessory(null)
  }
  
  return (
    <>
      <SiteNavigation />
      <main className="pt-[120px] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#0057B8]/20 via-black to-[#0057B8]/20">
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
              <Card key={accessory.id} className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group overflow-hidden">
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <CardHeader className="p-0 relative">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-[#0057B8]/10 to-[#00A9E0]/5 border-b border-[#0057B8]/20">
                      <img
                        src={accessory.image}
                        alt={accessory.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 relative">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className="text-xs border-[#0057B8]/40 text-white/90 bg-[#0057B8]/10 backdrop-blur-sm">
                      {accessory.category}
                    </Badge>
                    <Badge className="text-xs bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-md shadow-[#0057B8]/30 border border-[#00A9E0]/30">
                      Creta
                    </Badge>
                  </div>
                  <CardTitle className="text-white mb-2">{accessory.name}</CardTitle>
                  <p className="text-white/80 text-sm mb-4">{accessory.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{accessory.rating}</span>
                    </div>
                    <span className="text-white/60 text-sm">({accessory.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#00A9E0] font-bold text-lg drop-shadow-[0_0_8px_rgba(0,169,224,0.5)]">{accessory.price}</span>
                    <span className="text-white/50 line-through text-sm">{accessory.originalPrice}</span>
                  </div>

                  <Button 
                    onClick={() => handleEnquire(accessory)}
                    className="w-full bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <ShoppingCart className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">Enquire Now</span>
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
              <div className="p-4 bg-[#0057B8]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Genuine Quality</h3>
              <p className="text-gray-300">Designed and tested specifically for Creta to ensure perfect fit and performance.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-[#0057B8]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Free Installation</h3>
              <p className="text-gray-300">Professional installation by certified technicians at our service centers.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-[#0057B8]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <RotateCcw className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Warranty Coverage</h3>
              <p className="text-gray-300">All genuine accessories come with manufacturer warranty for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Enquiry Modal */}
      {selectedAccessory && (
        <AccessoryEnquiryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          accessoryName={selectedAccessory.name}
          carModel="Creta"
          accessoryPrice={selectedAccessory.price}
          accessoryImage={selectedAccessory.image}
        />
      )}
    </>
  )
}


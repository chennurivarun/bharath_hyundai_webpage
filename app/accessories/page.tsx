"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

// Note: Metadata export doesn't work in client components
// This metadata should be added to a parent layout or server component wrapper

const ACCESSORIES = [
  // Universal Accessories
  {
    id: "floor-mats",
    name: "Premium Floor Mats",
    category: "Interior",
    compatibility: "Universal",
    price: "₹2,500",
    originalPrice: "₹3,500",
    image: "/images/accessories/floor-mats.jpg",
    rating: 4.8,
    reviews: 124,
    description: "High-quality rubber floor mats for all Hyundai models"
  },
  {
    id: "car-cover",
    name: "Car Cover",
    category: "Protection",
    compatibility: "Universal",
    price: "₹4,200",
    originalPrice: "₹5,500",
    image: "/images/accessories/car-cover.jpg",
    rating: 4.6,
    reviews: 89,
    description: "Waterproof car cover with UV protection"
  },
  {
    id: "seat-covers",
    name: "Leather Seat Covers",
    category: "Interior",
    compatibility: "Universal",
    price: "₹8,500",
    originalPrice: "₹12,000",
    image: "/images/accessories/seat-covers.jpg",
    rating: 4.9,
    reviews: 156,
    description: "Premium genuine leather seat covers"
  },
  {
    id: "dash-cam",
    name: "Dash Camera",
    category: "Electronics",
    compatibility: "Universal",
    price: "₹6,800",
    originalPrice: "₹8,500",
    image: "/images/accessories/dash-cam.jpg",
    rating: 4.7,
    reviews: 203,
    description: "HD dash camera with night vision"
  },
  {
    id: "phone-holder",
    name: "Magnetic Phone Holder",
    category: "Electronics",
    compatibility: "Universal",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/phone-holder.jpg",
    rating: 4.5,
    reviews: 78,
    description: "Strong magnetic phone holder for dashboard"
  },
  {
    id: "air-freshener",
    name: "Premium Air Freshener",
    category: "Interior",
    compatibility: "Universal",
    price: "₹450",
    originalPrice: "₹650",
    image: "/images/accessories/air-freshener.jpg",
    rating: 4.3,
    reviews: 92,
    description: "Long-lasting car air freshener"
  },
  {
    id: "alloy-wheels",
    name: "Alloy Wheels",
    category: "Exterior",
    compatibility: "Universal",
    price: "₹18,500",
    originalPrice: "₹24,000",
    image: "/images/accessories/alloy-wheels.jpg",
    rating: 4.9,
    reviews: 145,
    description: "Premium alloy wheels for enhanced look"
  },
  {
    id: "roof-carrier",
    name: "Roof Carrier",
    category: "Exterior",
    compatibility: "Universal",
    price: "₹5,500",
    originalPrice: "₹7,500",
    image: "/images/accessories/roof-carrier.jpg",
    rating: 4.6,
    reviews: 67,
    description: "Heavy-duty roof carrier for extra storage"
  },
  {
    id: "mud-flaps",
    name: "Mud Flaps Set",
    category: "Protection",
    compatibility: "Universal",
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/mud-flaps.jpg",
    rating: 4.4,
    reviews: 98,
    description: "Durable mud flaps to protect your car"
  },
  
  // i20 Accessories - Exterior
  {
    id: "i20-body-cover",
    name: "i20 Body Cover Premium",
    category: "Exterior",
    compatibility: "i20",
    price: "₹4,500",
    originalPrice: "₹6,000",
    image: "/images/accessories/i20-body-cover.jpg",
    rating: 4.7,
    reviews: 145,
    description: "Premium waterproof body cover for Hyundai i20"
  },
  {
    id: "i20-bumper-garnish",
    name: "i20 Lower Bumper Garnish",
    category: "Exterior",
    compatibility: "i20",
    price: "₹3,200",
    originalPrice: "₹4,500",
    image: "/images/accessories/i20-bumper-garnish.jpg",
    rating: 4.6,
    reviews: 89,
    description: "Stylish lower bumper garnish for i20"
  },
  {
    id: "i20-tail-lamp-garnish",
    name: "i20 Tail Lamp Garnish",
    category: "Exterior",
    compatibility: "i20",
    price: "₹2,800",
    originalPrice: "₹3,800",
    image: "/images/accessories/i20-tail-lamp.jpg",
    rating: 4.5,
    reviews: 112,
    description: "Chrome tail lamp garnish for i20"
  },
  {
    id: "i20-door-handle-garnish",
    name: "i20 Door Handle Garnish",
    category: "Exterior",
    compatibility: "i20",
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/i20-door-handle.jpg",
    rating: 4.4,
    reviews: 67,
    description: "Chrome door handle garnish set for i20"
  },
  {
    id: "i20-door-molding",
    name: "i20 Door Side Molding",
    category: "Exterior",
    compatibility: "i20",
    price: "₹2,200",
    originalPrice: "₹3,000",
    image: "/images/accessories/i20-door-molding.jpg",
    rating: 4.6,
    reviews: 98,
    description: "Protective door side molding for i20"
  },
  {
    id: "i20-window-beading",
    name: "i20 Window Beading",
    category: "Exterior",
    compatibility: "i20",
    price: "₹1,500",
    originalPrice: "₹2,200",
    image: "/images/accessories/i20-window-beading.jpg",
    rating: 4.3,
    reviews: 56,
    description: "Chrome window beading for i20"
  },
  {
    id: "i20-mud-guard",
    name: "i20 Mud Guard Set",
    category: "Protection",
    compatibility: "i20",
    price: "₹1,600",
    originalPrice: "₹2,300",
    image: "/images/accessories/i20-mud-guard.jpg",
    rating: 4.5,
    reviews: 134,
    description: "Heavy-duty mud guard set for i20"
  },
  {
    id: "i20-side-skirt",
    name: "i20 Side Skirt Extender",
    category: "Exterior",
    compatibility: "i20",
    price: "₹3,500",
    originalPrice: "₹4,800",
    image: "/images/accessories/i20-side-skirt.jpg",
    rating: 4.7,
    reviews: 76,
    description: "Sporty side skirt extender for i20"
  },
  
  // i20 Accessories - Interior
  {
    id: "i20-screen-protector",
    name: "i20 Screen Protector",
    category: "Interior",
    compatibility: "i20",
    price: "₹800",
    originalPrice: "₹1,200",
    image: "/images/accessories/i20-screen-protector.jpg",
    rating: 4.4,
    reviews: 203,
    description: "Anti-glare screen protector for i20 infotainment"
  },
  {
    id: "i20-headrest-cushion",
    name: "i20 Headrest Cushion Set",
    category: "Interior",
    compatibility: "i20",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/i20-cushions.jpg",
    rating: 4.6,
    reviews: 167,
    description: "Comfortable headrest cushions for i20"
  },
  {
    id: "i20-steering-cover",
    name: "i20 Steering Wheel Cover",
    category: "Interior",
    compatibility: "i20",
    price: "₹900",
    originalPrice: "₹1,400",
    image: "/images/accessories/i20-steering-cover.jpg",
    rating: 4.5,
    reviews: 189,
    description: "Premium leather steering wheel cover for i20"
  },
  {
    id: "i20-seat-cover-specific",
    name: "i20 Seat Cover Premium",
    category: "Interior",
    compatibility: "i20",
    price: "₹9,500",
    originalPrice: "₹13,000",
    image: "/images/accessories/i20-seat-cover.jpg",
    rating: 4.8,
    reviews: 245,
    description: "Custom-fit premium seat covers for i20"
  },
  
  // i20 Accessories - Electrical
  {
    id: "i20-dash-cam-specific",
    name: "i20 Dash Camera HD",
    category: "Electronics",
    compatibility: "i20",
    price: "₹7,200",
    originalPrice: "₹9,500",
    image: "/images/accessories/i20-dash-cam.jpg",
    rating: 4.7,
    reviews: 198,
    description: "Full HD dash camera for i20 with GPS"
  },
  {
    id: "i20-blaupunkt",
    name: "i20 Blaupunkt Speaker System",
    category: "Electronics",
    compatibility: "i20",
    price: "₹12,000",
    originalPrice: "₹16,000",
    image: "/images/accessories/i20-blaupunkt.jpg",
    rating: 4.9,
    reviews: 89,
    description: "Premium Blaupunkt speaker system for i20"
  },
  {
    id: "i20-gt0609c",
    name: "i20 GT0609C Speaker",
    category: "Electronics",
    compatibility: "i20",
    price: "₹8,500",
    originalPrice: "₹11,500",
    image: "/images/accessories/i20-speakers.jpg",
    rating: 4.6,
    reviews: 67,
    description: "High-quality GT0609C speaker for i20"
  },
  {
    id: "i20-reverse-camera",
    name: "i20 Reverse Camera",
    category: "Electronics",
    compatibility: "i20",
    price: "₹5,500",
    originalPrice: "₹7,500",
    image: "/images/accessories/i20-reverse-camera.jpg",
    rating: 4.8,
    reviews: 234,
    description: "HD reverse camera with parking guidelines for i20"
  },
  
  // Creta Accessories - Exterior
  {
    id: "creta-body-cover",
    name: "Creta Body Cover Premium",
    category: "Exterior",
    compatibility: "Creta",
    price: "₹5,500",
    originalPrice: "₹7,500",
    image: "/images/accessories/creta-body-cover.jpg",
    rating: 4.8,
    reviews: 189,
    description: "Premium waterproof body cover for Hyundai Creta"
  },
  {
    id: "creta-body-molding",
    name: "Creta Body Side Molding",
    category: "Exterior",
    compatibility: "Creta",
    price: "₹2,800",
    originalPrice: "₹4,000",
    image: "/images/accessories/creta-molding.jpg",
    rating: 4.6,
    reviews: 145,
    description: "Protective body side molding for Creta"
  },
  {
    id: "creta-bumper-corner",
    name: "Creta Bumper Corner Guard",
    category: "Exterior",
    compatibility: "Creta",
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/creta-bumper-corner.jpg",
    rating: 4.5,
    reviews: 98,
    description: "Chrome bumper corner guard for Creta"
  },
  {
    id: "creta-door-cladding",
    name: "Creta Door Cladding",
    category: "Exterior",
    compatibility: "Creta",
    price: "₹3,200",
    originalPrice: "₹4,500",
    image: "/images/accessories/creta-door-cladding.jpg",
    rating: 4.7,
    reviews: 123,
    description: "Premium door cladding for Creta"
  },
  {
    id: "creta-keyless-handle",
    name: "Creta Door Handle Keyless",
    category: "Exterior",
    compatibility: "Creta",
    price: "₹15,000",
    originalPrice: "₹20,000",
    image: "/images/accessories/creta-keyless-handle.jpg",
    rating: 4.9,
    reviews: 67,
    description: "Keyless door handle system for Creta"
  },
  {
    id: "creta-tail-lamp",
    name: "Creta Tail Lamp Garnish",
    category: "Exterior",
    compatibility: "Creta",
    price: "₹3,500",
    originalPrice: "₹4,800",
    image: "/images/accessories/creta-tail-lamp.jpg",
    rating: 4.6,
    reviews: 112,
    description: "Chrome tail lamp garnish for Creta"
  },
  {
    id: "creta-window-beading",
    name: "Creta Window Beading",
    category: "Exterior",
    compatibility: "Creta",
    price: "₹2,000",
    originalPrice: "₹2,800",
    image: "/images/accessories/creta-window-beading.jpg",
    rating: 4.4,
    reviews: 89,
    description: "Chrome window beading for Creta"
  },
  {
    id: "creta-hood-scoop",
    name: "Creta Twin Hood Scoop",
    category: "Exterior",
    compatibility: "Creta",
    price: "₹4,500",
    originalPrice: "₹6,500",
    image: "/images/accessories/creta-hood-scoop.jpg",
    rating: 4.7,
    reviews: 78,
    description: "Sporty twin hood scoop for Creta"
  },
  
  // Venue Accessories
  {
    id: "venue-roof-rails",
    name: "Venue Roof Rails",
    category: "Exterior",
    compatibility: "Venue",
    price: "₹4,800",
    originalPrice: "₹6,500",
    image: "/images/accessories/venue-roof-rails.jpg",
    rating: 4.6,
    reviews: 134,
    description: "Aluminum roof rails for Venue SUV"
  },
  {
    id: "venue-side-steps",
    name: "Venue Side Steps",
    category: "Exterior",
    compatibility: "Venue",
    price: "₹8,500",
    originalPrice: "₹12,000",
    image: "/images/accessories/venue-side-steps.jpg",
    rating: 4.7,
    reviews: 98,
    description: "Premium side steps for Venue SUV"
  },
  {
    id: "venue-dash-cam",
    name: "Venue Dash Camera HD",
    category: "Electronics",
    compatibility: "Venue",
    price: "₹7,500",
    originalPrice: "₹10,000",
    image: "/images/accessories/venue-dash-cam.jpg",
    rating: 4.8,
    reviews: 167,
    description: "Full HD dash camera for Venue with night vision"
  },
  
  // Verna Accessories
  {
    id: "verna-chrome-garnish",
    name: "Verna Chrome Garnish Kit",
    category: "Exterior",
    compatibility: "Verna",
    price: "₹6,500",
    originalPrice: "₹9,000",
    image: "/images/accessories/verna-chrome-garnish.jpg",
    rating: 4.7,
    reviews: 156,
    description: "Complete chrome garnish kit for Verna"
  },
  {
    id: "verna-alloy-wheels",
    name: "Verna Alloy Wheels 17-inch",
    category: "Exterior",
    compatibility: "Verna",
    price: "₹32,000",
    originalPrice: "₹45,000",
    image: "/images/accessories/verna-alloy-wheels.jpg",
    rating: 4.9,
    reviews: 89,
    description: "Premium 17-inch alloy wheels for Verna"
  },
  {
    id: "verna-seat-covers",
    name: "Verna Premium Seat Covers",
    category: "Interior",
    compatibility: "Verna",
    price: "₹14,500",
    originalPrice: "₹19,000",
    image: "/images/accessories/verna-seat-covers.jpg",
    rating: 4.8,
    reviews: 234,
    description: "Custom-fit premium seat covers for Verna"
  },
  
  // Alcazar Accessories
  {
    id: "alcazar-roof-rails",
    name: "Alcazar Roof Rails",
    category: "Exterior",
    compatibility: "Alcazar",
    price: "₹6,500",
    originalPrice: "₹8,500",
    image: "/images/accessories/alcazar-roof-rails.jpg",
    rating: 4.6,
    reviews: 67,
    description: "Heavy-duty roof rails for Alcazar"
  },
  {
    id: "alcazar-running-boards",
    name: "Alcazar Running Boards",
    category: "Exterior",
    compatibility: "Alcazar",
    price: "₹12,000",
    originalPrice: "₹16,500",
    image: "/images/accessories/alcazar-running-boards.jpg",
    rating: 4.8,
    reviews: 45,
    description: "Premium running boards for Alcazar"
  },
  {
    id: "alcazar-floor-mats-3d",
    name: "Alcazar 3D Floor Mats",
    category: "Interior",
    compatibility: "Alcazar",
    price: "₹5,500",
    originalPrice: "₹7,800",
    image: "/images/accessories/alcazar-floor-mats.jpg",
    rating: 4.9,
    reviews: 98,
    description: "Premium 3D floor mats for Alcazar all rows"
  },
  
  // Tucson Accessories
  {
    id: "tucson-roof-rails",
    name: "Tucson Roof Rails",
    category: "Exterior",
    compatibility: "Tucson",
    price: "₹8,500",
    originalPrice: "₹11,500",
    image: "/images/accessories/tucson-roof-rails.jpg",
    rating: 4.7,
    reviews: 78,
    description: "Premium aluminum roof rails for Tucson"
  },
  {
    id: "tucson-alloy-wheels",
    name: "Tucson Alloy Wheels 18-inch",
    category: "Exterior",
    compatibility: "Tucson",
    price: "₹58,000",
    originalPrice: "₹75,000",
    image: "/images/accessories/tucson-alloy-wheels.jpg",
    rating: 4.9,
    reviews: 34,
    description: "Premium 18-inch alloy wheels for Tucson"
  },
  {
    id: "tucson-seat-covers",
    name: "Tucson Leather Seat Covers",
    category: "Interior",
    compatibility: "Tucson",
    price: "₹28,000",
    originalPrice: "₹38,000",
    image: "/images/accessories/tucson-seat-covers.jpg",
    rating: 4.8,
    reviews: 56,
    description: "Genuine leather seat covers for Tucson"
  },
  
  // Grand i10 Nios Accessories
  {
    id: "nios-body-cover",
    name: "Nios Body Cover Premium",
    category: "Exterior",
    compatibility: "Grand i10 Nios",
    price: "₹3,800",
    originalPrice: "₹5,500",
    image: "/images/accessories/nios-body-cover.jpg",
    rating: 4.6,
    reviews: 189,
    description: "Premium waterproof body cover for Grand i10 Nios"
  },
  {
    id: "nios-steering-cover",
    name: "Nios Steering Wheel Cover",
    category: "Interior",
    compatibility: "Grand i10 Nios",
    price: "₹750",
    originalPrice: "₹1,100",
    image: "/images/accessories/nios-steering-cover.jpg",
    rating: 4.5,
    reviews: 267,
    description: "Premium leather steering wheel cover for Nios"
  },
  {
    id: "nios-dash-cam",
    name: "Nios Dash Camera HD",
    category: "Electronics",
    compatibility: "Grand i10 Nios",
    price: "₹6,200",
    originalPrice: "₹8,500",
    image: "/images/accessories/nios-dash-cam.jpg",
    rating: 4.7,
    reviews: 145,
    description: "Full HD dash camera for Nios"
  },
  
  // Aura Accessories
  {
    id: "aura-body-cover",
    name: "Aura Body Cover Premium",
    category: "Exterior",
    compatibility: "Aura",
    price: "₹4,200",
    originalPrice: "₹6,000",
    image: "/images/accessories/aura-body-cover.jpg",
    rating: 4.7,
    reviews: 123,
    description: "Premium waterproof body cover for Aura sedan"
  },
  {
    id: "aura-seat-covers",
    name: "Aura Premium Seat Covers",
    category: "Interior",
    compatibility: "Aura",
    price: "₹11,500",
    originalPrice: "₹15,500",
    image: "/images/accessories/aura-seat-covers.jpg",
    rating: 4.8,
    reviews: 178,
    description: "Custom-fit premium seat covers for Aura"
  },
  
  // Exter Accessories
  {
    id: "exter-roof-rails",
    name: "Exter Roof Rails",
    category: "Exterior",
    compatibility: "Exter",
    price: "₹3,800",
    originalPrice: "₹5,500",
    image: "/images/accessories/exter-roof-rails.jpg",
    rating: 4.5,
    reviews: 112,
    description: "Premium roof rails for Exter micro SUV"
  },
  {
    id: "exter-body-cover",
    name: "Exter Body Cover Premium",
    category: "Exterior",
    compatibility: "Exter",
    price: "₹3,500",
    originalPrice: "₹5,000",
    image: "/images/accessories/exter-body-cover.jpg",
    rating: 4.6,
    reviews: 145,
    description: "Premium waterproof body cover for Exter"
  },
  
  // Creta N Line Accessories
  {
    id: "creta-nline-badge",
    name: "Creta N Line Badge Kit",
    category: "Exterior",
    compatibility: "Creta N Line",
    price: "₹2,200",
    originalPrice: "₹3,200",
    image: "/images/accessories/creta-nline-badge.jpg",
    rating: 4.9,
    reviews: 56,
    description: "Official N Line badge kit for Creta"
  },
  {
    id: "creta-nline-steering",
    name: "Creta N Line Steering Badge",
    category: "Interior",
    compatibility: "Creta N Line",
    price: "₹1,200",
    originalPrice: "₹1,800",
    image: "/images/accessories/creta-nline-steering.jpg",
    rating: 4.8,
    reviews: 34,
    description: "Official N Line steering wheel badge for Creta"
  },
  
  // IONIQ 5 Accessories
  {
    id: "ioniq5-v2l-adapter",
    name: "IONIQ 5 V2L Adapter",
    category: "Electronics",
    compatibility: "IONIQ 5",
    price: "₹15,000",
    originalPrice: "₹20,000",
    image: "/images/accessories/ioniq5-v2l-adapter.jpg",
    rating: 4.9,
    reviews: 23,
    description: "Vehicle-to-Load adapter for IONIQ 5"
  },
  {
    id: "ioniq5-charger",
    name: "IONIQ 5 Home Charger",
    category: "Electronics",
    compatibility: "IONIQ 5",
    price: "₹45,000",
    originalPrice: "₹60,000",
    image: "/images/accessories/ioniq5-charger.jpg",
    rating: 4.8,
    reviews: 12,
    description: "7.2 kW AC home charger for IONIQ 5"
  },
  {
    id: "ioniq5-alloy-wheels",
    name: "IONIQ 5 Alloy Wheels 20-inch",
    category: "Exterior",
    compatibility: "IONIQ 5",
    price: "₹85,000",
    originalPrice: "₹1,20,000",
    image: "/images/accessories/ioniq5-alloy-wheels.jpg",
    rating: 4.9,
    reviews: 8,
    description: "Aerodynamic 20-inch alloy wheels for IONIQ 5"
  },
  
  // Creta EV Accessories
  {
    id: "creta-ev-charger",
    name: "Creta EV Home Charger",
    category: "Electronics",
    compatibility: "Creta EV",
    price: "₹38,000",
    originalPrice: "₹52,000",
    image: "/images/accessories/creta-ev-charger.jpg",
    rating: 4.7,
    reviews: 15,
    description: "AC home charger for Creta EV"
  },
  {
    id: "creta-ev-body-cover",
    name: "Creta EV Body Cover",
    category: "Exterior",
    compatibility: "Creta EV",
    price: "₹5,500",
    originalPrice: "₹7,500",
    image: "/images/accessories/creta-ev-body-cover.jpg",
    rating: 4.8,
    reviews: 22,
    description: "Premium body cover for Creta EV"
  }
]

const CATEGORIES = ["All", "Interior", "Exterior", "Electronics", "Protection", "Performance"]
const CAR_MODELS = ["All", "Universal", "i20", "Creta", "Venue", "Verna", "Alcazar", "Tucson", "Grand i10 Nios", "Aura", "Exter", "Creta N Line", "IONIQ 5", "Creta EV"]

// Quick links to model-specific accessories
const CRETA_EV_ACCESSORIES_LINK = "/creta-ev-accessories"
const ALCAZAR_ACCESSORIES_LINK = "/alcazar-accessories"
const CRETA_NLINE_ACCESSORIES_LINK = "/creta-nline-accessories"
const CRETA_ACCESSORIES_LINK = "/creta-accessories"
const EXTER_ACCESSORIES_LINK = "/exter-accessories"
const I20_ACCESSORIES_LINK = "/i20-accessories"

export default function AccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedModel, setSelectedModel] = useState("All")
  
  const filteredAccessories = ACCESSORIES.filter((accessory) => {
    const matchesSearch = accessory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         accessory.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || accessory.category === selectedCategory
    const matchesModel = selectedModel === "All" || accessory.compatibility === selectedModel
    
    return matchesSearch && matchesCategory && matchesModel
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
              Genuine Accessories
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
              Enhance your Hyundai with genuine accessories designed specifically for your vehicle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={CRETA_EV_ACCESSORIES_LINK}
                className="px-6 py-3 rounded-lg bg-emerald-600/20 text-emerald-200 ring-1 ring-emerald-500/30 hover:bg-emerald-600/30 transition-colors font-semibold"
              >
                🚗 Creta EV Accessories
              </a>
              <a 
                href={CRETA_ACCESSORIES_LINK}
                className="px-6 py-3 rounded-lg bg-red-600/20 text-red-200 ring-1 ring-red-500/30 hover:bg-red-600/30 transition-colors font-semibold"
              >
                🚙 Creta Accessories
              </a>
              <a 
                href={ALCAZAR_ACCESSORIES_LINK}
                className="px-6 py-3 rounded-lg bg-red-600/20 text-red-200 ring-1 ring-red-500/30 hover:bg-red-600/30 transition-colors font-semibold"
              >
                🚙 Alcazar Accessories
              </a>
              <a 
                href={CRETA_NLINE_ACCESSORIES_LINK}
                className="px-6 py-3 rounded-lg bg-red-600/20 text-red-200 ring-1 ring-red-500/30 hover:bg-red-600/30 transition-colors font-semibold"
              >
                🏎️ Creta N Line Accessories
              </a>
              <a 
                href={EXTER_ACCESSORIES_LINK}
                className="px-6 py-3 rounded-lg bg-red-600/20 text-red-200 ring-1 ring-red-500/30 hover:bg-red-600/30 transition-colors font-semibold"
              >
                🚗 Exter Accessories
              </a>
              <a 
                href={I20_ACCESSORIES_LINK}
                className="px-6 py-3 rounded-lg bg-red-600/20 text-red-200 ring-1 ring-red-500/30 hover:bg-red-600/30 transition-colors font-semibold"
              >
                🚙 i20 Accessories
              </a>
            </div>
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
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Car Model" />
                </SelectTrigger>
                <SelectContent>
                  {CAR_MODELS.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
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
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={accessory.image}
                        alt={accessory.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    {accessory.compatibility !== "Universal" && (
                      <Badge className="text-xs bg-emerald-600 hover:bg-emerald-500">
                        {accessory.compatibility}
                      </Badge>
                    )}
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
              <p className="text-gray-300">Designed and tested specifically for Hyundai vehicles to ensure perfect fit and performance.</p>
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

      {/* Installation Services */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600/10 via-gray-800/50 to-red-600/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Professional Installation</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Get your accessories professionally installed by our certified technicians. 
                We ensure perfect fit and maintain your vehicle's warranty.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Installation Services Include:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Free installation for most accessories
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Certified technician service
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Quality assurance testing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Warranty protection maintained
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <Button className="bg-red-600 hover:bg-red-500 px-8 py-3">
                  Schedule Installation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

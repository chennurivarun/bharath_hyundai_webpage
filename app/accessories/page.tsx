import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const ACCESSORIES = [
  {
    id: "floor-mats",
    name: "Premium Floor Mats",
    category: "Interior",
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
    price: "₹1,800",
    originalPrice: "₹2,500",
    image: "/images/accessories/mud-flaps.jpg",
    rating: 4.4,
    reviews: 98,
    description: "Durable mud flaps to protect your car"
  }
]

const CATEGORIES = ["All", "Interior", "Exterior", "Electronics", "Protection", "Performance"]

export default function AccessoriesPage() {
  return (
    <>
      <SiteNavigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Genuine Accessories
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Enhance your Hyundai with genuine accessories designed specifically for your vehicle.
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
                />
              </div>
              <Select>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACCESSORIES.map((accessory) => (
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
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {accessory.category}
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

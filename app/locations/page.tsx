import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Car, Wrench, Navigation } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const BRANCHES = [
  {
    id: "gachibowli",
    name: "Gachibowli",
    address: "#3,4,5,6 Survey No 58/1, Gowliddodi, Gopanpally, Financial District, Gachibowli – 500075",
    phone: "7997806806",
    email: "gachibowli@bharathyundai.com",
    services: ["Sales", "Service", "Parts", "Insurance"],
    hours: {
      sales: "9:00 AM - 7:00 PM",
      service: "8:00 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    features: ["Showroom", "Service Center", "Parts Store", "Test Drive Track"],
    image: "/placeholder.svg?height=300&width=500"
  },
  {
    id: "gopanpally",
    name: "Gopanpally",
    address: "Gopanpally, Hyderabad, Telangana",
    phone: "7997582582",
    email: "gopanpally@bharathyundai.com",
    services: ["Sales", "Service"],
    hours: {
      sales: "9:00 AM - 7:00 PM",
      service: "8:00 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    features: ["Showroom", "Service Center"],
    image: "/placeholder.svg?height=300&width=500"
  },
  {
    id: "nampally",
    name: "Nampally",
    address: "5-9-171, Chapel Rd, Abids, Hyderabad 500001",
    phone: "7837837777",
    email: "nampally@bharathyundai.com",
    services: ["Sales", "Service", "Parts"],
    hours: {
      sales: "9:00 AM - 7:00 PM",
      service: "8:00 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    features: ["Showroom", "Service Center", "Parts Store"],
    image: "/placeholder.svg?height=300&width=500"
  },
  {
    id: "vikarabad",
    name: "Vikarabad",
    address: "2-3-98/3, Shiva Reddypet, Vikarabad 501102",
    phone: "6305946839",
    email: "vikarabad@bharathyundai.com",
    services: ["Sales", "Service"],
    hours: {
      sales: "9:00 AM - 7:00 PM",
      service: "8:00 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    features: ["Showroom", "Service Center"],
    image: "/placeholder.svg?height=300&width=500"
  },
  {
    id: "khammam",
    name: "Khammam",
    address: "Sri Sri circle, Gopalapuram, Khammam 507002",
    phone: "7680905905",
    email: "khammam@bharathyundai.com",
    services: ["Sales", "Service", "Parts"],
    hours: {
      sales: "9:00 AM - 7:00 PM",
      service: "8:00 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    features: ["Showroom", "Service Center", "Parts Store"],
    image: "/placeholder.svg?height=300&width=500"
  },
  {
    id: "kothagudem",
    name: "Kothagudem",
    address: "S S Complex, Near Chunchupalli, Vidya Nagar, 507101",
    phone: "7036952952",
    email: "kothagudem@bharathyundai.com",
    services: ["Sales", "Service"],
    hours: {
      sales: "9:00 AM - 7:00 PM",
      service: "8:00 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    features: ["Showroom", "Service Center"],
    image: "/placeholder.svg?height=300&width=500"
  },
  {
    id: "sathupally",
    name: "Sathupally",
    address: "Near JVR Park, Sathupally 507303",
    phone: "7036907907",
    email: "sathupally@bharathyundai.com",
    services: ["Sales", "Service"],
    hours: {
      sales: "9:00 AM - 7:00 PM",
      service: "8:00 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    features: ["Showroom", "Service Center"],
    image: "/placeholder.svg?height=300&width=500"
  },
  {
    id: "bhadrachalam",
    name: "Bhadrachalam",
    address: "Charla Rd, beside KK Function Hall, 507111",
    phone: "9550229931",
    email: "bhadrachalam@bharathyundai.com",
    services: ["Sales", "Service"],
    hours: {
      sales: "9:00 AM - 7:00 PM",
      service: "8:00 AM - 6:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    features: ["Showroom", "Service Center"],
    image: "/placeholder.svg?height=300&width=500"
  }
]

export default function LocationsPage() {
  return (
    <>
      <SiteNavigation />
      <main className="pt-[120px] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Locations
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Visit us at any of our 8 branches across Hyderabad and Khammam. We're conveniently located to serve you better.
            </p>
          </div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRANCHES.map((branch) => (
              <Card key={branch.id} className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-colors">
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={branch.image}
                      alt={`${branch.name} branch`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-4">{branch.name}</CardTitle>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{branch.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <a href={`tel:${branch.phone}`} className="text-gray-300 text-sm hover:text-white">
                        {branch.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <div className="text-gray-300 text-sm">
                        <p>Sales: {branch.hours.sales}</p>
                        <p>Service: {branch.hours.service}</p>
                        <p>Sunday: {branch.hours.sunday}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Services Available:</h4>
                    <div className="flex flex-wrap gap-1">
                      {branch.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Facilities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {branch.features.map((feature) => (
                        <Badge key={feature} className="bg-red-600/20 text-red-400 border-red-500/30 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-red-600 hover:bg-red-500">
                      Visit Branch
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Quick Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Car className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Test Drive</h3>
              <p className="text-gray-300 mb-4">Book a test drive at any of our branches</p>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                Book Test Drive
              </Button>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Wrench className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Service Booking</h3>
              <p className="text-gray-300 mb-4">Schedule your vehicle service online</p>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                Book Service
              </Button>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
              <p className="text-gray-300 mb-4">Get in touch for any queries</p>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                Contact Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600/10 via-gray-800/50 to-red-600/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Find Us on Map</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Use the interactive map below to find the nearest Bharath Hyundai branch to your location.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

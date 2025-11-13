import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Car, Wrench, Navigation } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

export const metadata: Metadata = {
  title: "Our Locations | Bharat Hyundai Showrooms | Hyderabad & Khammam",
  description: "Find Bharat Hyundai showrooms and service centers across Hyderabad & Khammam. 8 branches: Gachibowli, Gopanpally, Nampally, Vikarabad, Khammam, Kothagudem, Sathupally, Bhadrachalam.",
  keywords: ["Hyundai showroom", "Hyundai dealer locations", "Hyundai service center", "Hyundai dealer Hyderabad", "Hyundai dealer Khammam", "car showroom"],
  openGraph: {
    title: "Our Locations | Bharat Hyundai",
    description: "Find Bharat Hyundai showrooms and service centers across Telangana.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Our Locations | Bharat Hyundai",
    description: "Find Bharat Hyundai showrooms across Telangana.",
  },
}

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
      <section className="relative py-20 bg-gradient-to-r from-[#0057B8]/20 via-black to-[#0057B8]/20">
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
              <Card key={branch.id} className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <CardHeader className="p-0 relative">
                  <div className="aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-[#0057B8]/10 to-[#00A9E0]/5 border-b border-[#0057B8]/20">
                    <img
                      src={branch.image}
                      alt={`${branch.name} branch`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 relative">
                  <CardTitle className="text-white mb-4">{branch.name}</CardTitle>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#00A9E0] mt-0.5 flex-shrink-0" />
                      <p className="text-white/80 text-sm">{branch.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-[#00A9E0] flex-shrink-0" />
                      <a href={`tel:${branch.phone}`} className="text-white/80 text-sm hover:text-[#00A9E0] transition-colors">
                        {branch.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-[#00A9E0] flex-shrink-0" />
                      <div className="text-white/80 text-sm">
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
                        <Badge key={service} variant="outline" className="text-xs border-[#0057B8]/40 text-white/90 bg-[#0057B8]/10 backdrop-blur-sm">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Facilities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {branch.features.map((feature) => (
                        <Badge key={feature} className="bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 text-[#00A9E0] border border-[#0057B8]/30 text-xs shadow-md shadow-[#0057B8]/20">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative z-10">Visit Branch</span>
                    </Button>
                    <Button variant="outline" className="border-[#0057B8]/40 text-white hover:bg-[#0057B8]/20 hover:border-[#0057B8]/60">
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
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <Car className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Test Drive</h3>
              <p className="text-white/80 mb-4">Book a test drive at any of our branches</p>
              <Button variant="outline" className="border-[#0057B8]/40 text-white hover:bg-[#0057B8]/20 hover:border-[#0057B8]/60">
                Book Test Drive
              </Button>
            </div>
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <Wrench className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Service Booking</h3>
              <p className="text-white/80 mb-4">Schedule your vehicle service online</p>
              <Button variant="outline" className="border-[#0057B8]/40 text-white hover:bg-[#0057B8]/20 hover:border-[#0057B8]/60">
                Book Service
              </Button>
            </div>
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <Phone className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
              <p className="text-white/80 mb-4">Get in touch for any queries</p>
              <Button variant="outline" className="border-[#0057B8]/40 text-white hover:bg-[#0057B8]/20 hover:border-[#0057B8]/60">
                Contact Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-3xl p-8 md:p-12 shadow-lg shadow-[#0057B8]/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-50 pointer-events-none" />
            <div className="text-center mb-8 relative">
              <h2 className="text-3xl font-bold text-white mb-4">Find Us on Map</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Use the interactive map below to find the nearest Bharat Hyundai branch to your location.
              </p>
            </div>
            <div className="bg-white/5 border border-[#0057B8]/30 rounded-lg h-96 flex items-center justify-center backdrop-blur-sm relative">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-[#00A9E0]/60 mx-auto mb-4" />
                <p className="text-white/60">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

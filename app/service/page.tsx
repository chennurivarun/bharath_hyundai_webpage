import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Phone, Wrench, CheckCircle, Star } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const SERVICES = [
  {
    id: "periodic",
    name: "Periodic Maintenance",
    description: "Regular servicing to keep your vehicle in top condition",
    price: "₹2,500 - ₹8,000",
    duration: "2-4 hours",
    icon: Wrench
  },
  {
    id: "body-paint",
    name: "Body & Paint",
    description: "Professional body repair and paint work",
    price: "₹3,000 - ₹25,000",
    duration: "1-3 days",
    icon: Wrench
  },
  {
    id: "quick-check",
    name: "Quick Check",
    description: "Comprehensive vehicle health check",
    price: "₹500 - ₹1,500",
    duration: "30-60 mins",
    icon: CheckCircle
  },
  {
    id: "ac-service",
    name: "AC Service",
    description: "Air conditioning system maintenance",
    price: "₹1,500 - ₹4,000",
    duration: "1-2 hours",
    icon: Wrench
  }
]

const BRANCHES = [
  { id: "gachibowli", name: "Gachibowli", address: "Gachibowli, Hyderabad, Telangana 500046", phone: "7997806806" },
  { id: "gopanpally", name: "Gopanpally", address: "Gopanpally, Hyderabad", phone: "7997582582" },
  { id: "nampally", name: "Nampally", address: "5-9-171, Chapel Rd, Abids, Hyderabad 500001", phone: "7837837777" },
  { id: "vikarabad", name: "Vikarabad", address: "2-3-98/3, Shiva Reddypet, Vikarabad 501102", phone: "6305946839" }
]

export default function ServicePage() {
  return (
    <>
      <SiteNavigation />
      <main className="pt-[120px] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Service Your Hyundai
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Professional service and maintenance for your Hyundai vehicle. Book online and get the best care for your car.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.id} className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-600/20 rounded-lg">
                        <Icon className="h-6 w-6 text-red-500" />
                      </div>
                      <CardTitle className="text-white">{service.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      <p className="text-red-400 font-semibold">{service.price}</p>
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </p>
                    </div>
                    <Button className="w-full mt-4 bg-red-600 hover:bg-red-500">
                      Book Service
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Book Your Service</h2>
            <p className="text-gray-300">Fill out the form below to schedule your service appointment</p>
          </div>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input id="name" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input id="phone" type="tel" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" type="email" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="vehicle" className="text-white">Vehicle Model</Label>
                    <Input id="vehicle" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="service" className="text-white">Service Type</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="branch" className="text-white">Preferred Branch</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANCHES.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Additional Requirements</Label>
                  <Textarea id="message" className="bg-gray-700 border-gray-600 text-white" rows={4} />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 py-3">
                  Book Service Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Branches */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Service Branches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRANCHES.map((branch) => (
              <Card key={branch.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-red-500 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold">{branch.name}</h3>
                      <p className="text-gray-300 text-sm">{branch.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <a href={`tel:${branch.phone}`} className="text-gray-300 hover:text-white">
                      {branch.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Bharath Hyundai Service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Genuine Parts</h3>
              <p className="text-gray-300">We use only genuine Hyundai parts for all repairs and maintenance</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Wrench className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Technicians</h3>
              <p className="text-gray-300">Certified Hyundai technicians with years of experience</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quality Assurance</h3>
              <p className="text-gray-300">Comprehensive quality checks and warranty on all services</p>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

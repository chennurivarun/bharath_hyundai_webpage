import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Phone, Car, Users, Shield } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const TEST_DRIVE_MODELS = [
  {
    id: "i20",
    name: "i20",
    segment: "Hatchback",
    price: "₹6.86–11.25L*",
    image: "/images/hatchback2.jpg"
  },
  {
    id: "verna",
    name: "Verna",
    segment: "Sedan",
    price: "₹10.69–16.97L*",
    image: "/images/sedan2.avif"
  },
  {
    id: "creta",
    name: "Creta",
    segment: "SUV",
    price: "₹10.72–20.09L*",
    image: "/images/creata.avif"
  },
  {
    id: "tucson",
    name: "Tucson",
    segment: "SUV",
    price: "₹27.31–33.63L*",
    image: "/images/tucson.avif"
  }
]

const BRANCHES = [
  { id: "gachibowli", name: "Gachibowli", address: "Gachibowli, Hyderabad, Telangana 500046", phone: "7997806806" },
  { id: "gopanpally", name: "Gopanpally", address: "Gopanpally, Hyderabad", phone: "7997582582" },
  { id: "nampally", name: "Nampally", address: "5-9-171, Chapel Rd, Abids, Hyderabad 500001", phone: "7837837777" },
  { id: "vikarabad", name: "Vikarabad", address: "2-3-98/3, Shiva Reddypet, Vikarabad 501102", phone: "6305946839" }
]

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
]

export default function TestDrivePage() {
  return (
    <>
      <SiteNavigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Book Your Test Drive
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experience the performance and comfort of your next Hyundai. Schedule a free test drive today.
            </p>
          </div>
        </div>
      </section>

      {/* Available Models */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Available for Test Drive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEST_DRIVE_MODELS.map((model) => (
              <Card key={model.id} className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-colors">
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-white mb-2">{model.name}</CardTitle>
                  <p className="text-gray-400 text-sm mb-2">{model.segment}</p>
                  <p className="text-red-400 font-semibold mb-4">{model.price}</p>
                  <Button className="w-full bg-red-600 hover:bg-red-500">
                    Select for Test Drive
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Schedule Your Test Drive</h2>
            <p className="text-gray-300">Fill out the form below to book your test drive appointment</p>
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
                    <Label htmlFor="license" className="text-white">Driving License Number</Label>
                    <Input id="license" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="model" className="text-white">Vehicle Model</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEST_DRIVE_MODELS.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
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
                  <div>
                    <Label htmlFor="date" className="text-white">Preferred Date</Label>
                    <Input id="date" type="date" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="time" className="text-white">Preferred Time</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 py-3">
                  Book Test Drive
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Test Drive Benefits */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Test Drive with Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Car className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Free Test Drive</h3>
              <p className="text-gray-300">No charges for test drives. Experience the car at your convenience.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Guidance</h3>
              <p className="text-gray-300">Our sales experts will guide you through all features and benefits.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Safe & Insured</h3>
              <p className="text-gray-300">All test drive vehicles are fully insured and maintained.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Test Drive Locations</h2>
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
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm mb-2">Test Drive Hours:</p>
                    <p className="text-gray-300 text-sm">Mon-Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-300 text-sm">Sun: 10:00 AM - 6:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Phone, Car, Users, Shield } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"
import { MODELS, segmentLabel } from "@/lib/models"

// Map all models from MODELS array to test drive format
const TEST_DRIVE_MODELS = MODELS.map(model => ({
  id: model.id,
  name: model.name,
  segment: segmentLabel(model.segment),
  image: model.imageSrc
}))

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
  const [selectedModel, setSelectedModel] = useState<string>("")
  const formSectionRef = useRef<HTMLDivElement>(null)

  const handleCardClick = (modelId: string) => {
    setSelectedModel(modelId)
    // Smooth scroll to form section
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {TEST_DRIVE_MODELS.map((model) => (
              <Card 
                key={model.id} 
                className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group overflow-hidden cursor-pointer"
                onClick={() => handleCardClick(model.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <CardHeader className="p-0 relative">
                  <div className="aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-[#0057B8]/10 to-[#00A9E0]/5 border-b border-[#0057B8]/20">
                    <img
                      src={model.image}
                      alt={`${model.name} - ${model.segment} car available for test drive`}
                      loading="lazy"
                      width="400"
                      height="300"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 relative">
                  <CardTitle className="text-white mb-2">{model.name}</CardTitle>
                  <p className="text-white/60 text-sm mb-4">{model.segment}</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardClick(model.id)
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10">Select for Test Drive</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section 
        id="schedule-test-drive" 
        ref={formSectionRef}
        className="py-16 bg-gray-900/50 scroll-mt-24"
      >
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Schedule Your Test Drive</h2>
            <p className="text-white/80">Fill out the form below to book your test drive appointment</p>
          </div>

          <Card className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-30 pointer-events-none" />
            <CardContent className="p-8 relative">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name <span className="text-red-400" aria-label="required">*</span></Label>
                    <Input 
                      id="name" 
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      aria-label="Full Name"
                      className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number <span className="text-red-400" aria-label="required">*</span></Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      required
                      aria-required="true"
                      aria-label="Phone Number"
                      className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-white">Email <span className="text-red-400" aria-label="required">*</span></Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      required
                      aria-required="true"
                      aria-label="Email Address"
                      className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="license" className="text-white">Driving License Number</Label>
                    <Input 
                      id="license" 
                      name="license"
                      type="text"
                      aria-label="Driving License Number"
                      className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="model" className="text-white">Vehicle Model <span className="text-red-400" aria-label="required">*</span></Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel} required>
                      <SelectTrigger 
                        id="model"
                        aria-label="Select vehicle model"
                        aria-required="true"
                        className="bg-white/10 border-[#0057B8]/40 text-white focus:border-[#00A9E0] focus:ring-[#00A9E0]/20"
                      >
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
                    <Label htmlFor="branch" className="text-white">Preferred Branch <span className="text-red-400" aria-label="required">*</span></Label>
                    <Select required>
                      <SelectTrigger 
                        id="branch"
                        aria-label="Select preferred branch"
                        aria-required="true"
                        className="bg-white/10 border-[#0057B8]/40 text-white focus:border-[#00A9E0] focus:ring-[#00A9E0]/20"
                      >
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
                    <Label htmlFor="date" className="text-white">Preferred Date <span className="text-red-400" aria-label="required">*</span></Label>
                    <Input 
                      id="date" 
                      name="date"
                      type="date" 
                      required
                      aria-required="true"
                      aria-label="Preferred test drive date"
                      className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="time" className="text-white">Preferred Time <span className="text-red-400" aria-label="required">*</span></Label>
                  <Select required>
                    <SelectTrigger 
                      id="time"
                      aria-label="Select preferred time slot"
                      aria-required="true"
                      className="bg-white/10 border-[#0057B8]/40 text-white focus:border-[#00A9E0] focus:ring-[#00A9E0]/20"
                    >
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

                <Button type="submit" className="w-full bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 py-3 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">Book Test Drive</span>
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
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <Car className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Free Test Drive</h3>
              <p className="text-white/80">No charges for test drives. Experience the car at your convenience.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <Users className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Guidance</h3>
              <p className="text-white/80">Our sales experts will guide you through all features and benefits.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <Shield className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Safe & Insured</h3>
              <p className="text-white/80">All test drive vehicles are fully insured and maintained.</p>
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
              <Card key={branch.id} className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <CardContent className="p-6 relative">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-[#00A9E0] mt-1" />
                    <div>
                      <h3 className="text-white font-semibold">{branch.name}</h3>
                      <p className="text-white/80 text-sm">{branch.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-white/60" />
                    <a href={`tel:${branch.phone}`} className="text-white/80 hover:text-[#00A9E0] transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="mt-4">
                    <p className="text-white/60 text-sm mb-2">Test Drive Hours:</p>
                    <p className="text-white/80 text-sm">Mon-Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-white/80 text-sm">Sun: 10:00 AM - 6:00 PM</p>
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

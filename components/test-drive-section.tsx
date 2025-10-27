"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Car, CheckCircle, Clock } from "lucide-react"

const POPULAR_MODELS = [
  { id: "i20", name: "i20", image: "/images/hatchback2.jpg" },
  { id: "verna", name: "Verna", image: "/images/sedan2.avif" },
  { id: "creta", name: "Creta", image: "/images/creata.avif" },
  { id: "tucson", name: "Tucson", image: "/images/tucson.avif" }
]

const BRANCHES = [
  "Gachibowli",
  "Gopanpally",
  "Nampally",
  "Vikarabad",
  "Khammam",
  "Kothagudem",
  "Sathupally",
  "Bhadrachalam"
]

export default function TestDriveSection() {
  const [selectedModel, setSelectedModel] = useState("")

  return (
    <section
      aria-labelledby="test-drive-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 border border-white/10 backdrop-blur-sm">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" aria-hidden />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Car className="h-6 w-6 text-red-500" />
              <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">Test Drive</span>
            </div>
            
            <h2 id="test-drive-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience Your Dream Hyundai
            </h2>
            
            <p className="text-white/70 text-lg mb-6">
              Book a free test drive and feel the performance, comfort, and innovation of Hyundai. 
              Available at all our branches across Hyderabad and Khammam.
            </p>

            {/* Popular Models */}
            <div className="mb-6">
              <p className="text-white font-semibold mb-3">Popular Models:</p>
              <div className="grid grid-cols-4 gap-3">
                {POPULAR_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.name)}
                    className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedModel === model.name
                        ? "border-red-500 scale-105"
                        : "border-white/20 hover:border-red-500/50"
                    }`}
                  >
                    <div className="w-full h-full overflow-hidden">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover transition-all duration-500"
                        style={{
                          filter: selectedModel === model.name ? 'grayscale(0%)' : 'grayscale(100%)',
                          transform: 'scale(1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'grayscale(0%)';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          if (selectedModel !== model.name) {
                            e.currentTarget.style.filter = 'grayscale(100%)';
                          }
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 pointer-events-none">
                      <span className="text-white text-xs font-semibold">{model.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="p-3 bg-red-600/20 rounded-lg mb-2 inline-flex">
                  <CheckCircle className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-white/80 text-sm">Free Test Drive</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-red-600/20 rounded-lg mb-2 inline-flex">
                  <Car className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-white/80 text-sm">Expert Guidance</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-red-600/20 rounded-lg mb-2 inline-flex">
                  <Clock className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-white/80 text-sm">Flexible Timing</p>
              </div>
            </div>
          </div>

          {/* Right side - Booking Form */}
          <div>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Book Your Test Drive</h3>
                
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="td-name" className="text-white">Full Name</Label>
                    <Input 
                      id="td-name" 
                      placeholder="Enter your name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <Label htmlFor="td-phone" className="text-white">Phone Number</Label>
                    <Input 
                      id="td-phone" 
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <Label htmlFor="td-email" className="text-white">Email (Optional)</Label>
                    <Input 
                      id="td-email" 
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <Label htmlFor="td-model" className="text-white">Select Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Choose a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="i20">i20</SelectItem>
                        <SelectItem value="i20-nline">i20 N Line</SelectItem>
                        <SelectItem value="verna">Verna</SelectItem>
                        <SelectItem value="aura">Aura</SelectItem>
                        <SelectItem value="exter">Exter</SelectItem>
                        <SelectItem value="venue">Venue</SelectItem>
                        <SelectItem value="venue-nline">Venue N Line</SelectItem>
                        <SelectItem value="creta">Creta</SelectItem>
                        <SelectItem value="creta-nline">Creta N Line</SelectItem>
                        <SelectItem value="alcazar">Alcazar</SelectItem>
                        <SelectItem value="tucson">Tucson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="td-branch" className="text-white">Preferred Branch</Label>
                    <Select>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANCHES.map((branch) => (
                          <SelectItem key={branch} value={branch.toLowerCase()}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="td-date" className="text-white">Preferred Date</Label>
                    <Input 
                      id="td-date" 
                      type="date"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-500 text-white py-6 text-base font-semibold"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Free Test Drive
                  </Button>

                  <p className="text-white/60 text-xs text-center">
                    We'll contact you within 24 hours to confirm your booking
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

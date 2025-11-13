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
  { id: "tucson", name: "Tucson", image: "/images/tucson.avif" },
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
  const [selectedModel, setSelectedModel] = useState(POPULAR_MODELS[0].id)

  return (
    <section
      aria-labelledby="test-drive-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 via-[#F4F6F9]/95 to-white/95 border border-[#D6E4F5] shadow-[0_24px_48px_-24px_rgba(11,31,58,0.35)]">
        {/* Decorative background elements */}
        <div className="absolute top-[-4rem] left-[-2rem] w-96 h-96 bg-[#C8D9F2]/60 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-[-3rem] right-[-4rem] w-64 h-64 bg-[#A8DBF5]/50 rounded-full blur-3xl" aria-hidden />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Car className="h-6 w-6 text-[#0057B8]" />
              <span className="text-[#0057B8] font-semibold uppercase tracking-wider text-sm">Test Drive</span>
            </div>
            
            <h2 id="test-drive-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
              Experience Your Dream Hyundai
            </h2>
            
            <p className="text-base sm:text-lg mb-6 text-[#4A6076]">
              Book a free test drive and feel the performance, comfort, and innovation of Hyundai. 
              Available at all our branches across Hyderabad and Khammam.
            </p>

            {/* Popular Models */}
            <div className="mb-6">
              <p className="text-[#0B1F3A] font-semibold mb-3">Popular Models:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {POPULAR_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedModel === model.id
                        ? "border-[#0057B8] scale-105 shadow-[0_12px_24px_-16px_rgba(0,45,95,0.5)]"
                        : "border-[#D6E4F5] hover:border-[#0057B8]/60"
                    }`}
                  >
                    <div className="w-full h-full overflow-hidden">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2 pointer-events-none">
                      <span className="text-white text-xs font-semibold drop-shadow-sm">{model.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="p-3 bg-[#E3EDF9] rounded-lg mb-2 inline-flex">
                  <CheckCircle className="h-5 w-5 text-[#0057B8]" />
                </div>
                <p className="text-[#4A6076] text-sm font-medium">Free Test Drive</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-[#E3EDF9] rounded-lg mb-2 inline-flex">
                  <Car className="h-5 w-5 text-[#0057B8]" />
                </div>
                <p className="text-[#4A6076] text-sm font-medium">Expert Guidance</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-[#E3EDF9] rounded-lg mb-2 inline-flex">
                  <Clock className="h-5 w-5 text-[#0057B8]" />
                </div>
                <p className="text-[#4A6076] text-sm font-medium">Flexible Timing</p>
              </div>
            </div>
          </div>

          {/* Right side - Booking Form */}
          <div>
            <Card className="bg-white/90 border border-[#D6E4F5] shadow-[0_20px_40px_-24px_rgba(11,31,58,0.35)] backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#0B1F3A] mb-4">Book Your Test Drive</h3>
                
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="td-name" className="text-[#0B1F3A]">Full Name</Label>
                    <Input 
                      id="td-name" 
                      placeholder="Enter your name"
                      className="bg-white border border-[#D6E4F5] text-[#0B1F3A] placeholder:text-[#90A1B7] focus:border-[#0057B8] focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="td-phone" className="text-[#0B1F3A]">Phone Number</Label>
                    <Input 
                      id="td-phone" 
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-white border border-[#D6E4F5] text-[#0B1F3A] placeholder:text-[#90A1B7] focus:border-[#0057B8] focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="td-email" className="text-[#0B1F3A]">Email (Optional)</Label>
                    <Input 
                      id="td-email" 
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white border border-[#D6E4F5] text-[#0B1F3A] placeholder:text-[#90A1B7] focus:border-[#0057B8] focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="td-model" className="text-[#0B1F3A]">Select Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="bg-white border border-[#D6E4F5] text-[#0B1F3A] focus:border-[#0057B8]">
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
                    <Label htmlFor="td-branch" className="text-[#0B1F3A]">Preferred Branch</Label>
                    <Select>
                      <SelectTrigger className="bg-white border border-[#D6E4F5] text-[#0B1F3A] focus:border-[#0057B8]">
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
                    <Label htmlFor="td-date" className="text-[#0B1F3A]">Preferred Date</Label>
                    <Input 
                      id="td-date" 
                      type="date"
                      className="bg-white border border-[#D6E4F5] text-[#0B1F3A] focus:border-[#0057B8] focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#0057B8] hover:bg-[#00458A] text-white py-6 text-base font-semibold shadow-[0_18px_32px_-18px_rgba(0,69,138,0.75)]"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Free Test Drive
                  </Button>

                  <p className="text-[#6B7C92] text-xs text-center">
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

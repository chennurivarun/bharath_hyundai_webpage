"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, MessageCircle, CheckCircle, Shield, Wrench, FileText, 
  TrendingUp, Clock, Star, ChevronDown, MapPin, Calculator
} from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const BRANCHES = [
  "Gachibowli", "Gopanpally", "Nampally", "Vikarabad", 
  "Khammam", "Kothagudem", "Sathupally", "Bhadrachalam"
]

const BUDGET_RANGES = ["Under ₹5L", "₹5-7L", "₹7-10L", "₹10-15L", "Above ₹15L"]
const BODY_TYPES = ["Hatchback", "Sedan", "SUV", "Any"]
const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Any"]
const TRANSMISSION_TYPES = ["Manual", "Automatic", "Any"]

export default function UsedCarsPage() {
  const [showBuyForm, setShowBuyForm] = useState(false)
  const [showSellForm, setShowSellForm] = useState(false)
  const [formStep, setFormStep] = useState(1)

  return (
    <>
      <SiteNavigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
        
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-r from-red-600/20 via-black to-red-600/20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/creata.avif')] opacity-10 bg-cover bg-center" />
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Hyundai Certified Pre-Owned in Hyderabad
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                147-point inspected. Refurbished with genuine parts. Warranty up to 1 year / 20,000 km.
              </p>
              
              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  onClick={() => setShowBuyForm(true)}
                  className="bg-red-600 hover:bg-red-500 text-white px-8 py-6 text-lg rounded-full"
                >
                  Tell Us What You Need
                </Button>
                <Button 
                  onClick={() => setShowSellForm(true)}
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                >
                  Sell / Exchange Your Car
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                  asChild
                >
                  <a href="https://wa.me/917733888999" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp Now
                  </a>
                </Button>
              </div>

              {/* Trust Strip */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  147-Point Check
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Warranty
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2">
                  <Wrench className="h-4 w-4 mr-2" />
                  Two Free Services
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2">
                  <FileText className="h-4 w-4 mr-2" />
                  Clean Documentation
                </Badge>
              </div>

              {/* Micro Risk Reversal */}
              <p className="text-white/60 text-sm">
                No obligation • Free evaluation • Instant callback
              </p>
            </div>
          </div>
        </section>

        {/* Quick Intent Selector */}
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Buy a Car */}
              <Card 
                className="bg-gradient-to-br from-red-600/20 to-gray-800/50 border-red-500/30 hover:border-red-500 transition-all cursor-pointer group"
                onClick={() => setShowBuyForm(true)}
              >
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Buy a Car</h3>
                  <p className="text-white/70 mb-4">Tell us budget & must-haves. We'll shortlist today.</p>
                  <ul className="text-left text-white/60 text-sm space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Certified & inspected
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Warranty included
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Finance available
                    </li>
                  </ul>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                    Start in 30s
                  </Badge>
                </CardContent>
              </Card>

              {/* Sell / Exchange */}
              <Card 
                className="bg-gradient-to-br from-blue-600/20 to-gray-800/50 border-blue-500/30 hover:border-blue-500 transition-all cursor-pointer group"
                onClick={() => setShowSellForm(true)}
              >
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-blue-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-8 w-8 text-blue-500 rotate-180" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Sell / Exchange</h3>
                  <p className="text-white/70 mb-4">Free evaluation • Quick payment • Clean documentation.</p>
                  <ul className="text-left text-white/60 text-sm space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Best market price
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Instant evaluation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hassle-free process
                    </li>
                  </ul>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                    Start in 30s
                  </Badge>
                </CardContent>
              </Card>

              {/* Just Exploring */}
              <Card className="bg-gradient-to-br from-green-600/20 to-gray-800/50 border-green-500/30 hover:border-green-500 transition-all cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <a href="https://wa.me/917733888999" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="p-4 bg-green-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Just Exploring</h3>
                    <p className="text-white/70 mb-4">Chat with our expert on WhatsApp.</p>
                    <ul className="text-left text-white/60 text-sm space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Instant responses
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        No pressure
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Expert guidance
                      </li>
                    </ul>
                    <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                      Start in 30s
                    </Badge>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Buy Form Modal */}
        {showBuyForm && (
          <BuyCarForm onClose={() => setShowBuyForm(false)} />
        )}

        {/* Sell Form Modal */}
        {showSellForm && (
          <SellCarForm onClose={() => setShowSellForm(false)} />
        )}

        {/* Why Bharath Hyundai Pre-Owned */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Why Bharath Hyundai Pre-Owned
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "147-Point Inspection",
                  desc: "by Hyundai Advantage Engineers"
                },
                {
                  icon: Wrench,
                  title: "Workshop Refurbishment",
                  desc: "with Hyundai Genuine Parts"
                },
                {
                  icon: Shield,
                  title: "Warranty + Two Free Services",
                  desc: "Up to 1 year / 20,000 km coverage"
                },
                {
                  icon: Calculator,
                  title: "Finance & Exchange Support",
                  desc: "Easy EMI options & best exchange value"
                },
                {
                  icon: FileText,
                  title: "Transparent Evaluation",
                  desc: "Clean documentation & paperwork"
                },
                {
                  icon: Star,
                  title: "3,000+ Buyers Served",
                  desc: "in Hyderabad & Khammam"
                }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-red-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Tell us your need</h3>
                <p className="text-white/70">30s form</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">We shortlist / evaluate</h3>
                <p className="text-white/70">Same day</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Test drive & paperwork</h3>
                <p className="text-white/70">48–72 hrs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Deals You Can Expect */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Deals You Can Expect
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge className="bg-red-600/20 text-red-400 border-red-500/30 px-6 py-3 text-base">
                Under ₹6L hatchbacks
              </Badge>
              <Badge className="bg-red-600/20 text-red-400 border-red-500/30 px-6 py-3 text-base">
                Under ₹10L SUVs
              </Badge>
              <Badge className="bg-red-600/20 text-red-400 border-red-500/30 px-6 py-3 text-base">
                Auto-transmission picks
              </Badge>
              <Badge className="bg-red-600/20 text-red-400 border-red-500/30 px-6 py-3 text-base">
                Low-KM company-owned cars
              </Badge>
            </div>
            <p className="text-white/60 text-center text-sm">
              Inventory changes daily—share your need, we'll match you.
            </p>
          </div>
        </section>

        {/* Finance & Exchange Callouts */}
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-600/20 to-gray-800/50 border-blue-500/30">
                <CardContent className="p-8">
                  <Calculator className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">Finance Options</h3>
                  <p className="text-white/70 mb-4">EMI from ₹1,500 per ₹1L loan</p>
                  <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => setShowBuyForm(true)}>
                    Check Eligibility
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-600/20 to-gray-800/50 border-green-500/30">
                <CardContent className="p-8">
                  <TrendingUp className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">Instant Upgrade Offer</h3>
                  <p className="text-white/70 mb-4">Exchange your old car for the best value</p>
                  <Button className="bg-green-600 hover:bg-green-500" onClick={() => setShowSellForm(true)}>
                    Get Exchange Value
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rajesh Kumar",
                  text: "Bought a certified i20. The 147-point inspection gave me complete confidence. Great service!",
                  rating: 5
                },
                {
                  name: "Priya Sharma",
                  text: "Sold my old Verna and got instant payment. The process was transparent and hassle-free.",
                  rating: 5
                },
                {
                  name: "Amit Patel",
                  text: "The warranty and free services are amazing. Best pre-owned car buying experience!",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/80 mb-4">"{testimonial.text}"</p>
                    <p className="text-white font-semibold">— {testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-6 py-3">
                Local Hyundai Dealer
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-6 py-3">
                Official Workshop Network
              </Badge>
            </div>
          </div>
        </section>

        {/* Branch & Contact */}
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Visit Our Branches
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {BRANCHES.map((branch) => (
                <Card key={branch} className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    <p className="text-white font-semibold">{branch}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-red-600 hover:bg-red-500" asChild>
                <a href="tel:+917733888999">
                  <Phone className="h-5 w-5 mr-2" />
                  Call: +91 7733888999
                </a>
              </Button>
              <Button className="bg-green-600 hover:bg-green-500" asChild>
                <a href="https://wa.me/917733888999" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Now
                </a>
              </Button>
            </div>
            <p className="text-white/60 text-center mt-4">
              <Clock className="h-4 w-4 inline mr-2" />
              We call within 10 minutes (10am–7pm IST)
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA Band */}
        <section className="py-16 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Get Your Shortlist Today
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Input 
                type="tel" 
                placeholder="Enter your phone number"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-lg py-6"
              />
              <Button className="bg-red-600 hover:bg-red-500 px-8 py-6 text-lg" onClick={() => setShowBuyForm(true)}>
                Get Shortlist
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <a href="https://wa.me/917733888999?text=Hatchback ₹5–7L" target="_blank" rel="noopener noreferrer">
                  Hatchback ₹5–7L
                </a>
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <a href="https://wa.me/917733888999?text=Automatic SUV ₹8–12L" target="_blank" rel="noopener noreferrer">
                  Automatic SUV ₹8–12L
                </a>
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <a href="https://wa.me/917733888999?text=Sell my car" target="_blank" rel="noopener noreferrer">
                  Sell my car
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Sticky Bottom Bar (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 p-4 lg:hidden z-50">
          <div className="flex gap-2">
            <Button className="flex-1 bg-green-600 hover:bg-green-500" asChild>
              <a href="https://wa.me/917733888999" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-500" asChild>
              <a href="tel:+917733888999">
                <Phone className="h-5 w-5 mr-2" />
                Call
              </a>
            </Button>
            <Button className="flex-1 bg-red-600 hover:bg-red-500" onClick={() => setShowBuyForm(true)}>
              Get Shortlist
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

// Buy Car Form Component
function BuyCarForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Buy a Car</h3>
            <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input id="name" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input id="phone" type="tel" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <Label htmlFor="branch" className="text-white">Preferred Branch</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map((branch) => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-500" onClick={() => setStep(2)}>
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="budget" className="text-white">Budget Range</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bodytype" className="text-white">Body Type</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BODY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fuel" className="text-white">Fuel Type</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUEL_TYPES.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transmission" className="text-white">Transmission</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSMISSION_TYPES.map((trans) => (
                      <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-gray-700 text-white" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-500">
                  Submit Request
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Sell Car Form Component
function SellCarForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Sell / Exchange Your Car</h3>
            <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="sell-name" className="text-white">Full Name</Label>
              <Input id="sell-name" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="sell-phone" className="text-white">Phone Number</Label>
              <Input id="sell-phone" type="tel" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="car-number" className="text-white">Car Registration Number</Label>
              <Input id="car-number" className="bg-gray-800 border-gray-700 text-white" placeholder="TS 09 XX 1234" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year" className="text-white">Year</Label>
                <Input id="year" type="number" className="bg-gray-800 border-gray-700 text-white" placeholder="2020" />
              </div>
              <div>
                <Label htmlFor="kms" className="text-white">Kilometers Driven</Label>
                <Input id="kms" type="number" className="bg-gray-800 border-gray-700 text-white" placeholder="25000" />
              </div>
            </div>
            <div>
              <Label htmlFor="variant" className="text-white">Variant</Label>
              <Input id="variant" className="bg-gray-800 border-gray-700 text-white" placeholder="e.g., Verna SX 1.5 Diesel" />
            </div>
            <div>
              <Label htmlFor="condition" className="text-white">Condition</Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-500">
              Get Free Evaluation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// FAQ Section Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: "What is the 147-point certification?",
      a: "Our Hyundai Advantage Engineers inspect every pre-owned car across 147 checkpoints covering engine, transmission, electrical, body, interior, and safety systems."
    },
    {
      q: "What warranty do you provide?",
      a: "We offer warranty coverage up to 1 year or 20,000 km (whichever comes first) along with two free services at our authorized service centers."
    },
    {
      q: "How long does the documentation process take?",
      a: "Once you finalize the car, we complete all documentation and paperwork within 48-72 hours. We handle RC transfer, insurance, and all legal formalities."
    },
    {
      q: "Do you provide finance options?",
      a: "Yes, we partner with leading banks and NBFCs to offer competitive EMI options. Finance approval typically takes 24-48 hours with minimal documentation."
    },
    {
      q: "How does the exchange process work?",
      a: "Share your car details through our form. We'll evaluate your car at your location and provide an instant quote. If you accept, we handle all paperwork and adjust the amount in your new purchase."
    },
    {
      q: "When can I test drive the car?",
      a: "Once we shortlist cars based on your requirements, we'll arrange test drives at your preferred branch within 24 hours."
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-700/30 transition-colors"
                >
                  <span className="text-white font-semibold pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-white transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-white/70">
                    {faq.a}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Phone, FileText, Clock, CheckCircle, Star, Users } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"
import { MODELS } from "@/lib/models"

export const metadata: Metadata = {
  title: "Car Insurance | Comprehensive & Third Party Insurance | Bharat Hyundai",
  description: "Get car insurance for your Hyundai. Compare comprehensive, third party, and zero depreciation insurance plans. Quick quotes from top insurance companies.",
  keywords: ["car insurance", "Hyundai insurance", "comprehensive insurance", "third party insurance", "zero depreciation", "car insurance quote", "vehicle insurance"],
  openGraph: {
    title: "Car Insurance | Bharat Hyundai",
    description: "Get car insurance for your Hyundai. Compare plans and get quick quotes.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Car Insurance | Bharat Hyundai",
    description: "Get car insurance for your Hyundai.",
  },
}

const INSURANCE_TYPES = [
  {
    id: "comprehensive",
    name: "Comprehensive Insurance",
    description: "Complete coverage including own damage and third party liability",
    features: ["Own Damage Cover", "Third Party Liability", "Natural Calamities", "Theft Coverage"],
    startingPrice: "₹15,000"
  },
  {
    id: "third-party",
    name: "Third Party Insurance",
    description: "Mandatory coverage for third party liability as per Motor Vehicles Act",
    features: ["Third Party Liability", "Personal Accident Cover", "Legal Compliance"],
    startingPrice: "₹3,000"
  },
  {
    id: "zero-dep",
    name: "Zero Depreciation",
    description: "Enhanced coverage with zero depreciation on parts replacement",
    features: ["Zero Depreciation", "Comprehensive Coverage", "Engine Protection"],
    startingPrice: "₹20,000"
  },
  {
    id: "add-ons",
    name: "Add-on Covers",
    description: "Additional protection for specific needs and circumstances",
    features: ["Roadside Assistance", "Engine Protection", "Return to Invoice"],
    startingPrice: "₹2,000"
  }
]

export default function InsurancePage() {
  return (
    <>
      <SiteNavigation />
      <main className="pt-[120px] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#0057B8]/20 via-black to-[#0057B8]/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Car Insurance
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Protect your Hyundai with comprehensive insurance coverage. Get the best quotes from top insurance providers.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Types */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Insurance Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSURANCE_TYPES.map((type) => (
              <Card key={type.id} className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <CardHeader className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-lg border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                      <Shield className="h-6 w-6 text-[#00A9E0]" />
                    </div>
                    <CardTitle className="text-white">{type.name}</CardTitle>
                  </div>
                  <p className="text-white/80 text-sm">{type.description}</p>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-2 mb-4">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/80 text-sm">
                        <CheckCircle className="h-4 w-4 text-[#00A9E0]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-4">
                    <p className="text-[#00A9E0] font-bold text-lg drop-shadow-[0_0_8px_rgba(0,169,224,0.5)]">From {type.startingPrice}</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10">Get Quote</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get Instant Quote</h2>
            <p className="text-white/80">Fill out the form below to get personalized insurance quotes</p>
          </div>

          <Card className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-30 pointer-events-none" />
            <CardContent className="p-8 relative">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input id="name" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input id="phone" type="tel" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" type="email" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                  </div>
                  <div>
                    <Label htmlFor="vehicle" className="text-white">Vehicle Model</Label>
                    <Select>
                      <SelectTrigger className="bg-white/10 border-[#0057B8]/40 text-white focus:border-[#00A9E0] focus:ring-[#00A9E0]/20">
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="year" className="text-white">Manufacturing Year</Label>
                    <Input id="year" type="number" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                  </div>
                  <div>
                    <Label htmlFor="value" className="text-white">Current Market Value (₹)</Label>
                    <Input id="value" type="number" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-white">Insurance Type</Label>
                    <Select>
                      <SelectTrigger className="bg-white/10 border-[#0057B8]/40 text-white focus:border-[#00A9E0] focus:ring-[#00A9E0]/20">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {INSURANCE_TYPES.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Additional Requirements</Label>
                  <Textarea id="message" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" rows={4} />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 py-3 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">Get Insurance Quote</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Our Insurance */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Our Insurance Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <Phone className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-white/80">Round-the-clock assistance for all your insurance needs and claims.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <FileText className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Claims</h3>
              <p className="text-white/80">Fast and hassle-free claims processing with high settlement rates.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <Users className="h-8 w-8 text-[#00A9E0]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Guidance</h3>
              <p className="text-white/80">Professional advice to help you choose the right coverage for your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-3xl p-8 md:p-12 shadow-lg shadow-[#0057B8]/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-50 pointer-events-none" />
            <div className="text-center mb-8 relative">
              <h2 className="text-3xl font-bold text-white mb-4">Simple Claims Process</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                We make insurance claims simple and stress-free with our streamlined process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="text-center">
                <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                  <Phone className="h-8 w-8 text-[#00A9E0]" />
                </div>
                <h3 className="text-white font-semibold mb-2">1. Report</h3>
                <p className="text-white/80 text-sm">Call us immediately to report the incident</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                  <FileText className="h-8 w-8 text-[#00A9E0]" />
                </div>
                <h3 className="text-white font-semibold mb-2">2. Documentation</h3>
                <p className="text-white/80 text-sm">Submit required documents online</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                  <CheckCircle className="h-8 w-8 text-[#00A9E0]" />
                </div>
                <h3 className="text-white font-semibold mb-2">3. Assessment</h3>
                <p className="text-white/80 text-sm">Quick assessment by our surveyors</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                  <Clock className="h-8 w-8 text-[#00A9E0]" />
                </div>
                <h3 className="text-white font-semibold mb-2">4. Settlement</h3>
                <p className="text-white/80 text-sm">Fast settlement within 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Phone, FileText, Clock, CheckCircle, Star, Users } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

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

const INSURANCE_COMPANIES = [
  {
    name: "HDFC ERGO",
    rating: 4.8,
    claims: "98%",
    logo: "/placeholder.svg?height=60&width=120"
  },
  {
    name: "ICICI Lombard",
    rating: 4.7,
    claims: "97%",
    logo: "/placeholder.svg?height=60&width=120"
  },
  {
    name: "Bajaj Allianz",
    rating: 4.6,
    claims: "96%",
    logo: "/placeholder.svg?height=60&width=120"
  },
  {
    name: "New India Assurance",
    rating: 4.5,
    claims: "95%",
    logo: "/placeholder.svg?height=60&width=120"
  }
]

export default function InsurancePage() {
  return (
    <>
      <SiteNavigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
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
              <Card key={type.id} className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-600/20 rounded-lg">
                      <Shield className="h-6 w-6 text-red-500" />
                    </div>
                    <CardTitle className="text-white">{type.name}</CardTitle>
                  </div>
                  <p className="text-gray-300 text-sm">{type.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-4">
                    <p className="text-red-400 font-bold text-lg">From {type.startingPrice}</p>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-500">
                    Get Quote
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
            <p className="text-gray-300">Fill out the form below to get personalized insurance quotes</p>
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
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="i20">i20</SelectItem>
                        <SelectItem value="verna">Verna</SelectItem>
                        <SelectItem value="creta">Creta</SelectItem>
                        <SelectItem value="tucson">Tucson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="year" className="text-white">Manufacturing Year</Label>
                    <Input id="year" type="number" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="value" className="text-white">Current Market Value (₹)</Label>
                    <Input id="value" type="number" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-white">Insurance Type</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
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
                  <Textarea id="message" className="bg-gray-700 border-gray-600 text-white" rows={4} />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 py-3">
                  Get Insurance Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Insurance Partners */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Insurance Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSURANCE_COMPANIES.map((company, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <img src={company.logo} alt={company.name} className="h-12 mx-auto" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{company.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white">{company.rating}</span>
                  </div>
                  <p className="text-gray-300 text-sm">Claims Settlement: {company.claims}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Insurance */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Our Insurance Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-300">Round-the-clock assistance for all your insurance needs and claims.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Claims</h3>
              <p className="text-gray-300">Fast and hassle-free claims processing with high settlement rates.</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Guidance</h3>
              <p className="text-gray-300">Professional advice to help you choose the right coverage for your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600/10 via-gray-800/50 to-red-600/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Simple Claims Process</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We make insurance claims simple and stress-free with our streamlined process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">1. Report</h3>
                <p className="text-gray-300 text-sm">Call us immediately to report the incident</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">2. Documentation</h3>
                <p className="text-gray-300 text-sm">Submit required documents online</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">3. Assessment</h3>
                <p className="text-gray-300 text-sm">Quick assessment by our surveyors</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">4. Settlement</h3>
                <p className="text-gray-300 text-sm">Fast settlement within 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

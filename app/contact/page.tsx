import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

export const metadata: Metadata = {
  title: "Contact Us | Bharat Hyundai | Hyderabad & Khammam",
  description: "Get in touch with Bharat Hyundai. Contact us for sales, service, or any inquiries. Phone: +91 7733888999 (Sales), +91 7997806806 (Service). Multiple branches across Telangana.",
  keywords: ["contact Hyundai dealer", "Bharat Hyundai contact", "Hyundai dealer phone", "Hyundai dealer email", "Hyderabad Hyundai dealer"],
  openGraph: {
    title: "Contact Us | Bharat Hyundai",
    description: "Get in touch with Bharat Hyundai. Contact us for sales, service, or any inquiries.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Bharat Hyundai",
    description: "Get in touch with Bharat Hyundai for sales and service.",
  },
}

const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Phone",
    details: ["Sales: +91 7733888999", "Service: +91 7997806806"],
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["bharathyundaidm@gmail.com"],
    action: "Send Email"
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["#3,4,5,6 Survey No 58/1, Gowliddodi, Gopanpally", "Financial District, Gachibowli – 500075"],
    action: "Get Directions"
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon-Sat: 9:00 AM - 7:00 PM", "Sun: 10:00 AM - 6:00 PM"],
    action: "Visit Us"
  }
]

const DEPARTMENTS = [
  "General Inquiry",
  "Sales",
  "Service",
  "Parts & Accessories",
  "Insurance",
  "Finance",
  "Used Cars",
  "Complaints"
]

export default function ContactPage() {
  return (
    <>
      <SiteNavigation />
      <main className="pt-[120px] min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#0057B8]/20 via-black to-[#0057B8]/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Get in touch with us for any queries about our vehicles, services, or support. We're here to help you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_INFO.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index} className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 text-center group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <CardContent className="p-6 relative">
                    <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                      <Icon className="h-8 w-8 text-[#00A9E0]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-white/80 text-sm">{detail}</p>
                      ))}
                    </div>
                    <Button variant="outline" className="border-[#0057B8]/40 text-white hover:bg-[#0057B8]/20 hover:border-[#0057B8]/60">
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Send us a Message</h2>
            <p className="text-white/80">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>

          <Card className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-30 pointer-events-none" />
            <CardContent className="p-8 relative">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input id="firstName" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input id="lastName" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" type="email" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input id="phone" type="tel" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="department" className="text-white">Department</Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-[#0057B8]/40 text-white focus:border-[#00A9E0] focus:ring-[#00A9E0]/20">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white">Subject</Label>
                  <Input id="subject" className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea 
                    id="message" 
                    rows={6}
                    className="bg-white/10 border-[#0057B8]/40 text-white placeholder:text-white/50 focus:border-[#00A9E0] focus:ring-[#00A9E0]/20" 
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 py-3 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Send className="h-4 w-4 mr-2 relative z-10" />
                  <span className="relative z-10">Send Message</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WhatsApp Contact */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-30 pointer-events-none" />
            <CardContent className="p-8 text-center relative">
              <div className="p-4 bg-gradient-to-r from-[#0057B8]/20 to-[#00A9E0]/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-[#0057B8]/30 shadow-md shadow-[#0057B8]/20">
                <MessageCircle className="h-10 w-10 text-[#00A9E0]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Quick WhatsApp Support</h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                For immediate assistance, chat with us on WhatsApp. Our team is available to help you with any questions.
              </p>
              <Button className="bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 px-8 py-3 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <MessageCircle className="h-5 w-5 mr-2 relative z-10" />
                <span className="relative z-10">Chat on WhatsApp</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <CardContent className="p-6 relative">
                <h3 className="text-lg font-semibold text-white mb-2">What are your service center timings?</h3>
                <p className="text-white/80">Our service centers are open Monday to Saturday from 8:00 AM to 6:00 PM, and Sunday from 10:00 AM to 6:00 PM.</p>
              </CardContent>
            </Card>
            <Card className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <CardContent className="p-6 relative">
                <h3 className="text-lg font-semibold text-white mb-2">Do you provide loan assistance?</h3>
                <p className="text-white/80">Yes, we provide comprehensive financing solutions through our partner banks and financial institutions with competitive interest rates.</p>
              </CardContent>
            </Card>
            <Card className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <CardContent className="p-6 relative">
                <h3 className="text-lg font-semibold text-white mb-2">Can I book a test drive online?</h3>
                <p className="text-white/80">Absolutely! You can book a test drive online through our website or contact us directly. We'll arrange it at your preferred branch and time.</p>
              </CardContent>
            </Card>
            <Card className="relative bg-[#0057B8]/20 backdrop-blur-md border border-[#0057B8]/30 rounded-xl shadow-lg shadow-[#0057B8]/20 hover:shadow-[#0057B8]/40 hover:border-[#0057B8]/50 hover:bg-[#0057B8]/25 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A9E0]/10 via-transparent to-[#0057B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <CardContent className="p-6 relative">
                <h3 className="text-lg font-semibold text-white mb-2">What warranty do you provide on used cars?</h3>
                <p className="text-white/80">All our certified used cars come with comprehensive warranty coverage. The exact terms depend on the vehicle's age and condition.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

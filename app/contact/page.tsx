import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

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
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
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
                <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-colors text-center">
                  <CardContent className="p-6">
                    <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                      ))}
                    </div>
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
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
            <p className="text-gray-300">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input id="firstName" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input id="lastName" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" type="email" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input id="phone" type="tel" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="department" className="text-white">Department</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
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
                  <Input id="subject" className="bg-gray-700 border-gray-600 text-white" />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea 
                    id="message" 
                    rows={6}
                    className="bg-gray-700 border-gray-600 text-white" 
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 py-3">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WhatsApp Contact */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-green-600/10 via-gray-800/50 to-green-600/10 border-green-500/20">
            <CardContent className="p-8 text-center">
              <div className="p-4 bg-green-600/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <MessageCircle className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Quick WhatsApp Support</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                For immediate assistance, chat with us on WhatsApp. Our team is available to help you with any questions.
              </p>
              <Button className="bg-green-600 hover:bg-green-500 px-8 py-3">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat on WhatsApp
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
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">What are your service center timings?</h3>
                <p className="text-gray-300">Our service centers are open Monday to Saturday from 8:00 AM to 6:00 PM, and Sunday from 10:00 AM to 6:00 PM.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Do you provide loan assistance?</h3>
                <p className="text-gray-300">Yes, we provide comprehensive financing solutions through our partner banks and financial institutions with competitive interest rates.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Can I book a test drive online?</h3>
                <p className="text-gray-300">Absolutely! You can book a test drive online through our website or contact us directly. We'll arrange it at your preferred branch and time.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">What warranty do you provide on used cars?</h3>
                <p className="text-gray-300">All our certified used cars come with comprehensive warranty coverage. The exact terms depend on the vehicle's age and condition.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

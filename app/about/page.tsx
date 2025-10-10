import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, MapPin, Phone, Mail, Clock, Star, TrendingUp } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"

const ACHIEVEMENTS = [
  {
    year: "2013",
    title: "Started Operations",
    description: "Bharath Hyundai began its journey as an authorized Hyundai dealer"
  },
  {
    year: "2015",
    title: "Expanded to Khammam",
    description: "Opened our second branch in Khammam district"
  },
  {
    year: "2018",
    title: "10,000+ Cars Sold",
    description: "Reached a milestone of selling over 10,000 Hyundai vehicles"
  },
  {
    year: "2021",
    title: "Digital Transformation",
    description: "Launched online booking and digital services"
  },
  {
    year: "2023",
    title: "15,000+ Happy Customers",
    description: "Serving over 15,000 satisfied customers across Telangana"
  }
]

const TEAM = [
  {
    name: "Mr. Rajesh Kumar",
    position: "Managing Director",
    experience: "15+ years in automotive industry",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Mrs. Priya Sharma",
    position: "Sales Director",
    experience: "12+ years in sales and customer relations",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Mr. Amit Patel",
    position: "Service Manager",
    experience: "10+ years in automotive service",
    image: "/placeholder-user.jpg"
  }
]

const VALUES = [
  {
    icon: Users,
    title: "Customer First",
    description: "We prioritize customer satisfaction in everything we do"
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Maintaining highest standards in sales and service"
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "Embracing new technologies and digital solutions"
  },
  {
    icon: Star,
    title: "Excellence",
    description: "Striving for excellence in every interaction"
  }
]

export default function AboutPage() {
  return (
    <>
      <SiteNavigation />
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600/20 via-black to-red-600/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About Bharath Hyundai
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Your trusted Hyundai partner since 2013. Serving customers across Hyderabad and Khammam with excellence and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 mb-6">
                Bharath Hyundai has been an authorized Hyundai dealer since 2013, serving customers across Hyderabad and Khammam districts. 
                We have built our reputation on trust, quality service, and customer satisfaction.
              </p>
              <p className="text-gray-300 mb-6">
                With multiple branches and a team of experienced professionals, we offer comprehensive automotive solutions including 
                new car sales, pre-owned vehicles, genuine parts, and professional service.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">15,000+</div>
                  <div className="text-gray-300">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">8</div>
                  <div className="text-gray-300">Service Branches</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">10+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
                  <div className="text-gray-300">Customer Support</div>
                </div>
              </div>
            </div>
            <div>
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img
                  src="/hyundai-showroom-black-and-white.jpg"
                  alt="Bharath Hyundai Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="bg-gray-800/50 border-gray-700 text-center">
                  <CardContent className="p-6">
                    <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{achievement.year}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{achievement.title}</h3>
                      <p className="text-gray-300">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-red-400 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-300 text-sm">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600/10 via-gray-800/50 to-red-600/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Visit us at any of our branches or contact us for any queries about our services.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">Phone</h3>
                <p className="text-gray-300">Sales: +91 7733888999</p>
                <p className="text-gray-300">Service: +91 7997806806</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-gray-300">bharathyundaidm@gmail.com</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-red-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">Hours</h3>
                <p className="text-gray-300">Mon-Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-gray-300">Sun: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

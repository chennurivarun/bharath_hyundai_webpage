import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Headset, MapPin, Phone, Search, Tag, User, MessageCircle } from "lucide-react"
import HeroVideoLocal from "@/components/hero-video-local"
import type { Model } from "@/lib/models"
import CarAccordionSlider from "@/components/car-accordion-slider"
import NLineImageSlider from "@/components/nline-image-slider"
import TestDriveSection from "@/components/test-drive-section"
import { OffersCarousel } from "@/components/offers-carousel"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { EMICalculator } from "@/components/emi-calculator"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingActions } from "@/components/floating-actions"

type NavItem = { label: string; href: string }
type Branch = { id: string; name: string; address: string; phone: string }

const SALES_PHONE = "+91 7733888999"
const SERVICE_PHONE = "+91 7997806806"
const EMAIL = "bharathyundaidm@gmail.com"

const NAV_ITEMS: NavItem[] = [
  { label: "Models", href: "/models" },
  { label: "Service", href: "/service" },
  { label: "Book Test Drive", href: "/test-drive" },
  { label: "Accessories", href: "/accessories" },
  { label: "Insurance", href: "/insurance" },
  { label: "Used Cars", href: "/used-cars" },
]

const BRANCHES: Branch[] = [
  { id: "gachibowli", name: "Gachibowli", address: "Gachibowli, Hyderabad, Telangana 500046", phone: "7997806806" },
  { id: "gopanpally", name: "Gopanpally", address: "Gopanpally, Hyderabad (verify address)", phone: "7997582582" },
  { id: "nampally", name: "Nampally", address: "5-9-171, Chapel Rd, Abids, Hyderabad 500001", phone: "7837837777" },
  { id: "vikarabad", name: "Vikarabad", address: "2-3-98/3, Shiva Reddypet, Vikarabad 501102", phone: "6305946839" },
  { id: "khammam", name: "Khammam", address: "Sri Sri circle, Gopalapuram, Khammam 507002", phone: "7680905905" },
  {
    id: "kothagudem",
    name: "Kothagudem",
    address: "S S Complex, Near Chunchupalli, Vidya Nagar, 507101",
    phone: "7036952952",
  },
  { id: "sathupally", name: "Sathupally", address: "Near JVR Park, Sathupally 507303", phone: "7036907907" },
  {
    id: "bhadrachalam",
    name: "Bhadrachalam",
    address: "Charla Rd, beside KK Function Hall, 507111",
    phone: "9550229931",
  },
]

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {/* Fixed full-page video background */}
      <div className="fixed inset-0 z-0">
        <HeroVideoLocal videoSrc="/hero-video.mp4" />
      </div>

      <div className="relative z-10">
        <AnnouncementBar />

        <SiteHeader />

        <main id="main" className="min-h-screen space-y-16 lg:space-y-24">
          <HeroBH />

          <OffersCarousel />

          <CarAccordionSlider />

          <NLineSection />

          <TestDriveSection />

          <EMICalculator />

          <WhyBharathHyundai />

          <TestimonialsSection />

          <ServiceCTA />

          <LocationsRow branches={BRANCHES} />

          <NewsletterSection />
        </main>
      </div>

      <WhatsappFab />
      <ScrollToTop />
      <FloatingActions />
    </>
  )
}

/* Components */

function AnnouncementBar() {
  return (
    <div role="region" aria-label="Promotions" className="relative fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-2xl text-white/90 text-xs border-b border-white/20 shadow-lg shadow-black/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:via-transparent before:to-transparent before:pointer-events-none">
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Contact Info */}
          <div className="flex items-center gap-4 flex-wrap">
            <a href={`tel:${SALES_PHONE}`} className="flex items-center gap-1.5 hover:text-red-400 transition-colors group">
              <Phone className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Sales: {SALES_PHONE}</span>
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <a href={`tel:${SERVICE_PHONE}`} className="hidden sm:flex items-center gap-1.5 hover:text-red-400 transition-colors group">
              <Headset className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Service: {SERVICE_PHONE}</span>
            </a>
            <span className="hidden md:inline text-white/30">•</span>
            <a 
              href={`mailto:${EMAIL}`}
              className="hidden md:flex items-center gap-1.5 hover:text-red-400 transition-colors"
            >
              {EMAIL}
            </a>
          </div>

          {/* Quick Action Links */}
          <nav aria-label="Quick links" className="hidden lg:block">
            <ul className="flex items-center gap-3">
              <li>
                <a 
                  href="#" 
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-600 text-white/80 hover:text-white transition-all hover:scale-105 font-medium"
                >
                  Book Test Drive
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-600 text-white/80 hover:text-white transition-all hover:scale-105 font-medium"
                >
                  Book Service
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

function SiteHeader() {
  return (
    <header className="relative fixed top-[40px] left-0 right-0 z-40 border-b border-white/30 bg-gradient-to-b from-black/20 via-black/15 to-black/20 supports-[backdrop-filter]:bg-black/10 backdrop-blur-3xl shadow-2xl shadow-black/40 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/15 before:via-white/5 before:to-transparent before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:via-transparent after:to-transparent after:pointer-events-none">
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-3 font-bold text-white group transition-transform hover:scale-105"
          >
            <div className="relative">
              <span 
                aria-hidden 
                className="inline-block h-10 w-10 rounded-lg bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-all" 
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">H</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg leading-tight tracking-tight">Bharath Hyundai</span>
              <span className="text-[10px] text-white/60 uppercase tracking-wider">Authorized Dealer</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 ring-white/40 group"
                  >
                    {n.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 group-hover:w-3/4 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* CTA Button */}
            <a
              href="#"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-600/30"
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </a>

            {/* Search */}
            <button
              aria-label="Search"
              className="p-2.5 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 ring-white/40 transition-all hover:scale-110"
            >
              <Search className="h-5 w-5 text-white" />
            </button>

            {/* Account */}
            <a
              href="#"
              aria-label="Account"
              className="p-2.5 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 ring-white/40 transition-all hover:scale-110"
            >
              <User className="h-5 w-5 text-white" />
            </a>

            {/* Mobile Menu Button */}
            <button
              aria-label="Menu"
              className="lg:hidden p-2.5 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 ring-white/40 transition-all"
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function HeroBH() {
  return (
    <section aria-labelledby="hero-heading" className="relative h-screen">
      {/* Content overlay */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <p className="text-white/80 text-xs md:text-sm uppercase tracking-[0.12em] mb-3">
            Authorized Hyundai Dealer
          </p>
          <h1
            id="hero-heading"
            className="text-pretty text-3xl md:text-6xl font-extrabold leading-tight text-white"
          >
            Bharath Hyundai — Hyderabad & Khammam
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-white/80">
            Explore the latest Hyundai lineup, book a free test drive, and get service support across multiple
            branches in Telangana.
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4">
            <Button className="rounded-full bg-red-600 hover:bg-red-500 text-white px-6 py-6 text-sm md:text-base" asChild>
              <a href="/test-drive">Book Free Test Drive</a>
            </Button>
            <Button variant="secondary" className="rounded-full text-sm md:text-base" asChild>
              <a href="/models">Explore Models</a>
            </Button>
          </div>
        </div>
        <FeatureBadgesBH />
      </div>
    </section>
  )
}

function FeatureBadgesBH() {
  const items = [
    { icon: Phone, title: "Sales", desc: SALES_PHONE },
    { icon: Headset, title: "Service", desc: SERVICE_PHONE },
    { icon: Tag, title: "Offers", desc: "Seasonal deals & exchange" },
  ]
  return (
    <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
      {items.map(({ icon: Icon, title, desc }) => (
        <li key={title} className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Icon className="h-5 w-5 text-white" />
          </span>
          <div>
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="text-sm text-white/70">{desc}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function ModelCard({ model }: { model: Model }) {
  return (
    <Card className="bg-black/30 border-white/10">
      <CardContent className="p-0">
        <img
          src={model.imageSrc || "/placeholder.svg"}
          alt={model.imageAlt}
          className="h-56 w-full object-cover bw-to-color"
        />
        <div className="p-4">
          <h3 className="font-medium">{model.name}</h3>
          {model.priceBand && <p className="text-white/80 mt-1">{model.priceBand}</p>}
          <div className="mt-4 flex gap-2">
            <Button className="rounded-full" aria-label={`Enquire about ${model.name}`}>
              Enquire Now
            </Button>
            <Button variant="secondary" className="rounded-full" asChild>
              <a href={model.brochureHref || "#"} aria-label={`Download brochure for ${model.name}`}>
                Brochure
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NLineSection() {
  const nLineModels = [
    { 
      id: 'i20-nline',
      name: "i20 N Line", 
      priceBand: "₹9.98–12.06L*",
      desc: "Sporty hatchback with race-inspired styling"
    },
    { 
      id: 'venuen',
      name: "Venue N Line", 
      priceBand: "₹11.24–12.45L*",
      desc: "Performance-tuned compact SUV"
    },
    { 
      id: 'cretan',
      name: "Creta N Line", 
      priceBand: "₹16.34–20.09L*",
      desc: "Premium SUV with N Line performance"
    },
  ]

  return (
    <section
      aria-labelledby="nline-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950/40 via-black/50 to-black/60 border border-red-500/20 backdrop-blur-sm">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" aria-hidden />
        
        <div className="relative z-10 p-8 lg:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-red-500 font-bold text-4xl md:text-5xl tracking-tighter">N</span>
                <span className="text-white/60 text-sm uppercase tracking-[0.2em]">Line</span>
              </div>
              <h2 id="nline-heading" className="text-2xl md:text-3xl font-semibold text-white">
                Performance Meets Style
              </h2>
              <p className="text-white/70 mt-2 max-w-2xl">
                Experience the thrill of N Line — Hyundai's performance-oriented lineup with sporty design, enhanced handling, and race-inspired details.
              </p>
            </div>
            <a 
              href="/models?filter=nline" 
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-600/30"
            >
              Explore N Line
            </a>
          </div>

          {/* N Line Image Slider */}
          <div className="mb-8">
            <div className="relative h-96 rounded-2xl overflow-hidden border border-red-500/20">
              <NLineImageSlider />
            </div>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nLineModels.map((model) => (
              <div 
                key={model.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300"
              >
                <div className="p-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 mb-4">
                    <span className="text-red-500 font-bold text-sm">N</span>
                    <span className="text-white/80 text-xs uppercase tracking-wider">Line</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-1">{model.name}</h3>
                  <p className="text-red-400 font-medium mb-2">{model.priceBand}</p>
                  <p className="text-white/60 text-sm mb-4">{model.desc}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/70 border border-white/10">
                      Sporty Design
                    </span>
                    <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/70 border border-white/10">
                      Enhanced Performance
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors border border-white/10">
                      Enquire
                    </button>
                    <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm rounded-lg transition-colors border border-red-500/30">
                      Test Drive
                    </button>
                    <a
                      href={
                        model.id === 'venuen' ? '/venue-nline' :
                        model.id === 'cretan' ? '/creta-nline' :
                        model.id === 'i20-nline' ? '/model/i20-nline' :
                        `/model/${(model as any).id}`
                      }
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors border border-white/10"
                      aria-label={`Know more about ${model.name}`}
                    >
                      Know More
                    </a>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" aria-hidden />
              </div>
            ))}
          </div>

          {/* Performance Highlights */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Sport Tuned", desc: "Suspension" },
              { label: "N Line", desc: "Styling" },
              { label: "Red", desc: "Accents" },
              { label: "Performance", desc: "Exhaust" },
            ].map((item) => (
              <div key={item.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white font-semibold">{item.label}</p>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyBharathHyundai() {
  const bullets = [
    { title: "Authorized Dealer", desc: "Hyundai Motor India Ltd." },
    { title: "Multiple Branches", desc: "Hyderabad & Khammam regions" },
    { title: "Genuine Parts", desc: "OEM parts & accessories" },
    { title: "Finance & Insurance", desc: "EMI assistance & claims support" },
  ]
  return (
    <section
      aria-labelledby="value-heading"
      className="relative bg-black/40 backdrop-blur-sm bg-[radial-gradient(80%_60%_at_80%_50%,rgba(239,68,68,0.20),transparent)]"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 id="value-heading" className="text-3xl md:text-4xl font-semibold text-pretty">
            Why Bharath Hyundai
          </h2>
          <p className="mt-4 text-white/70 max-w-prose">
            Since 2013, we’ve served customers across Telangana with transparent pricing, professional advice, and
            reliable service.
          </p>
          <div className="mt-8 rounded-lg border border-white/10 p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bullets.map((b) => (
              <div key={b.title}>
                <p className="text-white font-medium">{b.title}</p>
                <p className="text-white/70 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Button className="rounded-full bg-red-600 hover:bg-red-500 text-white">Get Offers</Button>
            <Button variant="secondary" className="rounded-full">
              Visit a Branch
            </Button>
          </div>
        </div>
        <div className="relative group">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg ring-1 ring-white/10">
            <img
              src="/images/poster.png"
              alt="Bharath Hyundai showroom"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCTA() {
  return (
    <section aria-labelledby="service-heading" className="relative">
      <div className="relative isolate overflow-hidden bg-black/30 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" aria-hidden />
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="max-w-xl rounded-2xl glass-black p-6 md:p-8">
            <h2 id="service-heading" className="text-3xl md:text-4xl font-semibold text-pretty">
              Book Your Service Online
            </h2>
            <p className="mt-4 text-white/80 max-w-prose">
              Schedule periodic maintenance, body & paint, or quick checks at your nearest branch.
            </p>
            <div className="mt-8">
              <Button className="rounded-full bg-red-600 hover:bg-red-500 text-white">Book Service</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LocationsRow({ branches }: { branches: Branch[] }) {
  return (
    <section
      aria-labelledby="locations-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-black/40 backdrop-blur-sm rounded-3xl"
    >
      <h2 id="locations-heading" className="text-2xl md:text-3xl font-semibold mb-6">
        Our Branches
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {branches.map((b) => (
          <div key={b.id} className="rounded-lg border border-white/10 bg-black/30 p-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-white/70 mt-0.5" aria-hidden />
              <div>
                <p className="font-medium">{b.name}</p>
                <p className="text-sm text-white/70">{b.address}</p>
              </div>
            </div>
            <div className="mt-3">
              <a href={`tel:${b.phone}`} className="inline-flex items-center gap-2 text-sm text-white hover:underline">
                <Phone className="h-4 w-4" /> {b.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function WhatsappFab() {
  return (
    <a
      href="https://wa.me/917733888999"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-6 z-50 rounded-full bg-green-600 p-3 text-white shadow-lg hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 ring-white/40"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  )
}

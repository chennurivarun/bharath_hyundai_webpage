"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Headset, MapPin, Phone, Search, Tag, MessageCircle, Sparkles } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"
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

// Note: Metadata export doesn't work in client components
// Metadata should be added to a parent layout or server component wrapper

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

const HYUNDAI_COLORS = {
  primary: "#002C5F",
  secondary: "#0057B8",
  accent: "#00A9E0",
  neutral: "#F4F6F9",
  dark: "#0B1F3A",
} as const

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
        <NavigationWithScroll />

        <main id="main" className="min-h-screen space-y-16 lg:space-y-24">
          <HeroBH />

          <OffersCarousel />

          <CarAccordionSlider />

          <NLineSection />

          <TestDriveSection />

          <EMICalculator />

          <WhyBharatHyundai />

          <TestimonialsSection />

          <ServiceCTA />

          <LocationsRow branches={BRANCHES} />

          <NewsletterSection />
        </main>
      </div>

      <WhatsappFab />
      <FindPerfectCarFab />
      <ScrollToTop />
      <FloatingActions />
    </>
  )
}

/* Components */

function NavigationWithScroll() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Check if scrolled past a threshold (e.g., 50px)
      if (currentScrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Hide/show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Hide navigation when mobile menu is open
  const shouldShowNav = isVisible && !mobileMenuOpen

  return (
    <div
      className={`fixed  rounded-b-lg  flex flex-col gap-0  top-0 justify-center items-center text-center left-0 right-0 transition-transform duration-300 ${
        mobileMenuOpen ? "z-40" : "z-50"
      } ${
        shouldShowNav ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-gradient-to-r from-[#002C5F]/95 via-[#002C5F]/90 to-[#002C5F]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-[#002C5F]/40 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:via-transparent before:to-transparent before:pointer-events-none"
          : "bg-transparent backdrop-blur-none border-0 shadow-none"
      }`}
    >
      <AnnouncementBar isScrolled={isScrolled} />
      <SiteHeader isScrolled={isScrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </div>
  )
}

function AnnouncementBar({ isScrolled }: { isScrolled: boolean }) {
  return (
    <div 
      role="region" 
      aria-label="Promotions" 
      className={`relative w-fit rounded-b-lg text-white/90 text-xs transition-all duration-300`}
    >
      <div className="relative container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs">
            <a href={`tel:${SALES_PHONE}`} className="flex items-center gap-1 sm:gap-1.5 hover:text-[#00A9E0] transition-colors group whitespace-nowrap">
              <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="font-medium truncate">
                <span className="hidden sm:inline">Sales: </span>
                <span className="sm:hidden">S: </span>
                {SALES_PHONE}
              </span>
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <a href={`tel:${SERVICE_PHONE}`} className="hidden sm:flex items-center gap-1.5 hover:text-[#00A9E0] transition-colors group whitespace-nowrap">
              <Headset className="h-3.5 w-3.5 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="font-medium truncate">Service: {SERVICE_PHONE}</span>
            </a>
            <span className="hidden md:inline text-white/30">•</span>
            <a
              href={`mailto:${EMAIL}`}
              className="hidden md:flex items-center gap-1.5 hover:text-[#00A9E0] transition-colors truncate"
            >
              <span className="truncate max-w-[200px] lg:max-w-none">{EMAIL}</span>
            </a>
          </div>

          {/* Quick Action Links */}
          <nav aria-label="Quick links" className="hidden lg:flex items-center gap-2 xl:gap-3">
            <a
              href="/test-drive"
              className="px-2 xl:px-3 py-1 xl:py-1.5 rounded-full bg-white/10 hover:bg-[#0057B8] text-white/80 hover:text-white transition-all hover:scale-105 font-medium text-[10px] xl:text-xs whitespace-nowrap"
            >
              Book Test Drive
            </a>
            <a
              href="/service"
              className="px-2 xl:px-3 py-1 xl:py-1.5 rounded-full bg-white/10 hover:bg-[#0057B8] text-white/80 hover:text-white transition-all hover:scale-105 font-medium text-[10px] xl:text-xs whitespace-nowrap"
            >
              Book Service
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

function SiteHeader({ isScrolled, mobileMenuOpen, setMobileMenuOpen }: { isScrolled: boolean; mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void }) {
  return (
    <>
      <header 
        className={`relative w-fit border-t-0 border-b transition-all duration-300 `}
        style={{ marginTop: 0 }}
      >
      <div className="relative container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 gap-2 sm:gap-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-3 font-bold text-white group transition-transform hover:scale-105 flex-shrink-0 min-w-0"
          >
            <div className="relative flex-shrink-0">
              <span
                aria-hidden
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg bg-gradient-to-br from-[#002C5F] to-[#0057B8] shadow-lg shadow-[#002C5F]/40 group-hover:shadow-[#0057B8]/50 transition-all"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">H</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base md:text-lg leading-tight tracking-tight truncate">Bharat Hyundai</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/60 uppercase tracking-wider truncate">Authorized Dealer</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:flex items-center">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {NAV_ITEMS.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="relative px-2 xl:px-3 2xl:px-4 py-2 text-xs xl:text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 ring-white/40 group whitespace-nowrap"
                  >
                    {n.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#00A9E0] group-hover:w-3/4 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button */}
            <a
              href="/contact"
              className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#002C5F] hover:bg-[#0057B8] text-white text-xs sm:text-sm font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#002C5F]/30 whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden md:inline">Contact</span>
            </a>

            {/* Search */}
            <button
              aria-label="Search"
              className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 ring-white/40 transition-all hover:scale-110 flex-shrink-0"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
              className="lg:hidden p-2 sm:p-2.5 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 ring-white/40 transition-all flex-shrink-0 cursor-pointer"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      </header>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}

function HeroBH() {
  return (
    <section aria-labelledby="hero-heading" className="relative h-[100dvh] flex ">
      {/* Content overlay */}
      <div className="flex justify-center items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-3xl  p-4 mt-10 text-center">
          <p className="text-white/80 text-xs md:text-sm uppercase tracking-[0.12em] mb-3">
            Authorized Hyundai Dealer
          </p>
          <h1
            id="hero-heading"
            className="text-pretty text-3xl md:text-6xl font-extrabold leading-tight text-white"
          >
            Bharat Hyundai
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-white/80">
            Explore the latest Hyundai lineup, book a free test drive, and get service support across multiple
            branches in Telangana.
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4 justify-center">
            <Button className="rounded-full bg-[#002C5F] hover:bg-[#0057B8] text-white px-6 py-6 text-sm md:text-base" asChild>
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
            <p className="text-sm text-white/80">{desc}</p>
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F3A]/70 via-[#002C5F]/65 to-[#004081]/60 border border-[#00A9E0]/20 backdrop-blur-sm">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A9E0]/15 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0057B8]/15 rounded-full blur-3xl" aria-hidden />
        
        <div className="relative z-10 p-8 lg:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-[#D3002C] font-bold text-4xl md:text-5xl tracking-tighter">N</span>
                <span className="text-white/60 text-sm uppercase tracking-[0.2em]">Line</span>
              </div>
              <h2 id="nline-heading" className="text-2xl md:text-3xl font-semibold text-white">
                Performance Meets Style
              </h2>
              <p className="text-white/80 mt-2 max-w-2xl">
                Experience the thrill of N Line — Hyundai's performance-oriented lineup with sporty design, enhanced handling, and race-inspired details.
              </p>
            </div>
            <a
              href="/models?filter=nline"
              className="px-6 py-3 bg-[#002C5F] hover:bg-[#0057B8] text-white font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#002C5F]/30"
            >
              Explore N Line
            </a>
          </div>

          {/* N Line Image Slider */}
          <div className="mb-8">
            <div className="relative h-96 rounded-2xl overflow-hidden border border-[#00A9E0]/20">
              <NLineImageSlider />
            </div>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nLineModels.map((model) => (
              <div
                key={model.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 backdrop-blur-sm hover:border-[#00A9E0]/50 transition-all duration-300"
              >
                <div className="p-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002C5F]/20 border border-[#00A9E0]/30 mb-4">
                    <span className="text-[#D3002C] font-bold text-sm">N</span>
                    <span className="text-white/80 text-xs uppercase tracking-wider">Line</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-1">{model.name}</h3>
                  <p className="text-[#00A9E0] font-medium mb-2">{model.priceBand}</p>
                  <p className="text-white/80 text-sm mb-4">{model.desc}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/80 border border-white/10">
                      Sporty Design
                    </span>
                    <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/80 border border-white/10">
                      Enhanced Performance
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors border border-white/10 min-h-[44px]"
                      aria-label={`Enquire about ${model.name}`}
                    >
                      Enquire
                    </button>
                    <button 
                      className="px-4 py-2 bg-[#002C5F]/15 hover:bg-[#002C5F]/25 text-[#00A9E0] text-sm rounded-lg transition-colors border border-[#00A9E0]/30 min-h-[44px]"
                      aria-label={`Book test drive for ${model.name}`}
                    >
                      Test Drive
                    </button>
                    <a
                      href={
                        model.id === 'venuen' ? '/venue-nline' :
                        model.id === 'cretan' ? '/creta-nline' :
                        model.id === 'i20-nline' ? '/model/i20-nline' :
                        `/model/${(model as any).id}`
                      }
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors border border-white/10 min-h-[44px] flex items-center justify-center"
                      aria-label={`Know more about ${model.name}`}
                    >
                      Know More
                    </a>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0057B8]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" aria-hidden />
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
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyBharatHyundai() {
  const bullets = [
    { title: "Authorized Dealer", desc: "Hyundai Motor India Ltd." },
    { title: "Multiple Branches", desc: "Hyderabad & Khammam regions" },
    { title: "Genuine Parts", desc: "OEM parts & accessories" },
    { title: "Finance & Insurance", desc: "EMI assistance & claims support" },
  ]
  return (
    <section
      aria-labelledby="value-heading"
      className="relative bg-black/40 backdrop-blur-sm bg-[radial-gradient(80%_60%_at_80%_50%,rgba(0,169,224,0.18),transparent)]"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 id="value-heading" className="text-3xl md:text-4xl font-semibold text-pretty">
            Why Bharat Hyundai
          </h2>
          <p className="mt-4 text-white/80 max-w-prose">
            Since 2013, we've served customers across Telangana with transparent pricing, professional advice, and
            reliable service.
          </p>
          <div className="mt-8 rounded-lg border border-white/10 p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bullets.map((b) => (
              <div key={b.title}>
                <p className="text-white font-medium">{b.title}</p>
                <p className="text-white/80 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Button className="rounded-full bg-[#002C5F] hover:bg-[#0057B8] text-white">Get Offers</Button>
            <Button variant="secondary" className="rounded-full">
              Visit a Branch
            </Button>
          </div>
        </div>
        <div className="relative group">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg ring-1 ring-white/10">
            <img
              src="/images/poster.png"
              alt="Bharat Hyundai showroom"
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#002C5F]/90 via-[#0057B8]/60 to-transparent" aria-hidden />
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="max-w-xl rounded-2xl glass-black p-6 md:p-8">
            <h2 id="service-heading" className="text-3xl md:text-4xl font-semibold text-pretty">
              Book Your Service Online
            </h2>
            <p className="mt-4 text-white/80 max-w-prose">
              Schedule periodic maintenance, body & paint, or quick checks at your nearest branch.
            </p>
            <div className="mt-8">
              <Button className="rounded-full bg-[#002C5F] hover:bg-[#0057B8] text-white">Book Service</Button>
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
                <p className="text-sm text-white/80">{b.address}</p>
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
      className="fixed right-4 bottom-6 z-50 rounded-full bg-green-600 p-3 text-white shadow-lg hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 ring-white/40 transition-all hover:scale-110"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  )
}

function FindPerfectCarFab() {
  return (
    <a
      href="/find-perfect-car"
      aria-label="Find Your Perfect Car"
      className="fixed left-4 bottom-6 z-50 rounded-full bg-gradient-to-br from-[#002C5F] to-[#0057B8] p-4 text-white shadow-lg shadow-[#002C5F]/40 hover:shadow-[#0057B8]/60 focus-visible:outline-none focus-visible:ring-2 ring-white/40 transition-all hover:scale-110 group"
    >
      <div className="relative">
        <Sparkles className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      {/* Tooltip */}
      <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Find Your Perfect Car
      </span>
    </a>
  )
}

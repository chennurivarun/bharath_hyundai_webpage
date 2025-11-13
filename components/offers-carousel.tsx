"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Tag, Calendar, Gift, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"

const OFFERS = [
  {
    id: 1,
    icon: Gift,
    title: "Year-End Mega Sale",
    description: "Get up to ₹1,00,000 off on select models. Limited time offer!",
    discount: "Up to ₹1 Lakh",
    validUntil: "Dec 31, 2025",
    badge: "Hot Deal",
    color: "from-[#002C5F] via-[#004A99] to-[#0077C8]",
  },
  {
    id: 2,
    icon: Percent,
    title: "Festival Exchange Bonus",
    description: "Extra ₹30,000 exchange bonus on your old car. Any make, any model.",
    discount: "₹30,000 Bonus",
    validUntil: "Limited Period",
    badge: "Exchange",
    color: "from-[#004A99] via-[#0077C8] to-[#38B6FF]",
  },
  {
    id: 3,
    icon: Tag,
    title: "Corporate Discount",
    description: "Special corporate discounts for employees of partner companies.",
    discount: "Up to ₹25,000",
    validUntil: "Ongoing",
    badge: "Corporate",
    color: "from-[#005662] via-[#0097A7] to-[#5CD4E8]",
  },
  {
    id: 4,
    icon: Calendar,
    title: "Low EMI Finance",
    description: "Get finance at 7.99% interest rate with flexible tenure options.",
    discount: "7.99% Interest",
    validUntil: "Dec 2025",
    badge: "Finance",
    color: "from-yellow-600 to-orange-600",
  },
]

export function OffersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + OFFERS.length) % OFFERS.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % OFFERS.length)
  }

  const currentOffer = OFFERS[currentIndex]
  const Icon = currentOffer.icon

  return (
    <section
      aria-labelledby="offers-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16"
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-[#D6E4F5]/60 shadow-[0_24px_48px_-24px_rgba(11,31,58,0.35)] backdrop-blur-sm"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Background with animated gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentOffer.color} transition-all duration-1000`} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-[#0B1F3A]/20 to-[#0B1F3A]/60" />

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/15 rounded-full blur-3xl" aria-hidden />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/15 rounded-full blur-3xl" aria-hidden />

        <div className="relative z-10 p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch min-h-[450px] lg:min-h-[550px]">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-between min-h-[450px] lg:min-h-[550px]">
              <div className="flex flex-col space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 w-fit h-[32px]">
                  <Tag className="h-4 w-4 text-white flex-shrink-0" />
                  <span className="text-white text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                    {currentOffer.badge}
                  </span>
                </div>

                {/* Title */}
                <h2 id="offers-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight min-h-[60px] sm:min-h-[70px] md:min-h-[90px] lg:min-h-[120px] flex items-start">
                  {currentOffer.title}
                </h2>

                {/* Description */}
                <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed min-h-[48px] sm:min-h-[54px] md:min-h-[63px] lg:min-h-[72px] flex items-start">
                  {currentOffer.description}
                </p>

                {/* Discount Badge */}
                <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/40 w-fit min-h-[80px] max-h-[80px]">
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white flex-shrink-0" />
                  <div className="flex flex-col justify-center min-w-[140px]">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">{currentOffer.discount}</p>
                    <p className="text-white/80 text-xs sm:text-sm mt-1">Valid until {currentOffer.validUntil}</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-white/90 text-gray-900 rounded-full font-semibold"
                >
                  <a href="/contact">Get Offer Details</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full"
                >
                  <a href="/test-drive">Book Test Drive</a>
                </Button>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex items-center justify-center min-h-[450px] lg:min-h-[550px]">
              <div className="relative w-48 h-48 flex-shrink-0">
                {/* Large Icon */}
                <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                  <Icon className="h-24 w-24 text-white flex-shrink-0" strokeWidth={1.5} />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold text-sm">NEW</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Percent className="h-8 w-8 text-white flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-8 pt-8 border-t border-white/20">
            {/* Dots */}
            <div className="flex items-center justify-center gap-2">
              {OFFERS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  aria-label={`Go to offer ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={goToPrevious}
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-white/20 text-white"
                aria-label="Previous offer"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={goToNext}
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-white/20 text-white"
                aria-label="Next offer"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


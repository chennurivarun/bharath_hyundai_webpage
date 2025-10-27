"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Gachibowli, Hyderabad",
    model: "Creta",
    rating: 5,
    text: "Excellent service from Bharath Hyundai! The team was very professional and helped me choose the perfect Creta. The delivery was on time and the finance process was smooth.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Nampally, Hyderabad",
    model: "i20",
    rating: 5,
    text: "I purchased my i20 from the Nampally branch. The staff was incredibly helpful and patient with all my questions. After-sales service has been exceptional. Highly recommend!",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Srinivas Reddy",
    location: "Khammam",
    model: "Venue",
    rating: 5,
    text: "Best car buying experience! The test drive was arranged quickly and the sales team explained all features thoroughly. Very happy with my Venue and the service center support.",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Lakshmi Devi",
    location: "Vikarabad",
    model: "Verna",
    rating: 5,
    text: "Professional team at Bharath Hyundai. They helped me get a great finance deal on my Verna. The entire process was transparent and hassle-free. Thank you!",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Venkat Rao",
    location: "Gopanpally, Hyderabad",
    model: "Alcazar",
    rating: 5,
    text: "Purchased Alcazar for my family. Spacious, comfortable, and loaded with features. Bharath Hyundai's team made the entire buying process smooth and enjoyable.",
    date: "2 months ago",
  },
  {
    id: 6,
    name: "Anitha Reddy",
    location: "Kothagudem",
    model: "Exter",
    rating: 5,
    text: "Great experience with Bharath Hyundai! They offered competitive pricing and excellent after-sales service. My Exter is perfect for city driving. Highly satisfied!",
    date: "3 weeks ago",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 border border-white/10 backdrop-blur-sm">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" aria-hidden />

        <div className="relative z-10 p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              <span className="text-yellow-500 font-semibold uppercase tracking-wider text-sm">
                Customer Reviews
              </span>
            </div>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Hear from satisfied customers who chose Bharath Hyundai for their dream car
            </p>
          </div>

          {/* Testimonial Slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="relative min-h-[300px] flex items-center">
                {TESTIMONIALS.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === currentIndex
                        ? "opacity-100 translate-x-0"
                        : index < currentIndex
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
                      {/* Quote Icon */}
                      <Quote className="h-10 w-10 text-red-500/30 mb-6" />

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-white text-lg md:text-xl leading-relaxed mb-6">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Customer Info */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold text-lg">{testimonial.name}</p>
                          <p className="text-white/60 text-sm">{testimonial.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-red-500 font-semibold">{testimonial.model}</p>
                          <p className="text-white/60 text-sm">{testimonial.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  onClick={goToPrevious}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 hover:bg-white/10 text-white"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Dots Indicator */}
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentIndex
                          ? "w-8 h-2 bg-red-500"
                          : "w-2 h-2 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={goToNext}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/20 hover:bg-white/10 text-white"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-white mb-1">10+</p>
              <p className="text-white/60 text-sm">Years in Business</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">15,000+</p>
              <p className="text-white/60 text-sm">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">8</p>
              <p className="text-white/60 text-sm">Branches</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">4.9/5</p>
              <p className="text-white/60 text-sm">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


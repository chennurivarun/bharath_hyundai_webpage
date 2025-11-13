"use client"

import { useState } from "react"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setMessage("Thank you! You've been subscribed to our newsletter.")
      setEmail("")
    }, 1500)
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 via-[#F4F6F9]/95 to-white/95 border border-[#D6E4F5] shadow-[0_24px_48px_-24px_rgba(11,31,58,0.35)]">
        {/* Decorative elements */}
        <div className="absolute top-[-3rem] right-[-4rem] w-64 h-64 bg-[#C8D9F2]/60 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-[-3rem] left-[-4rem] w-64 h-64 bg-[#A8DBF5]/50 rounded-full blur-3xl" aria-hidden />

        <div className="relative z-10 p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0057B8]/10 border border-[#0057B8]/30 mb-4">
                <Mail className="h-4 w-4 text-[#0057B8]" />
                <span className="text-[#0057B8] text-sm font-semibold uppercase tracking-wider">
                  Newsletter
                </span>
              </div>

              <h2 id="newsletter-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1F3A] mb-4">
                Stay Updated with Latest Offers
              </h2>

              <p className="text-[#4A6076] text-base sm:text-lg mb-6">
                Subscribe to our newsletter and get exclusive deals, new model launches, and special promotions delivered to your inbox.
              </p>

              {/* Benefits List */}
              <ul className="space-y-3">
                {[
                  "Exclusive pre-launch offers",
                  "Latest model updates",
                  "Special financing deals",
                  "Service reminders & tips",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-[#1C2A3A]">
                    <CheckCircle className="h-5 w-5 text-[#0057B8] flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side - Form */}
            <div>
              <div className="bg-white/90 border border-[#D6E4F5] rounded-2xl p-6 md:p-8 shadow-[0_18px_32px_-24px_rgba(11,31,58,0.35)]">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7C92]" />
                      <Input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setStatus("idle")
                          setMessage("")
                        }}
                        placeholder="Enter your email address"
                        className="pl-12 h-14 bg-white border border-[#D6E4F5] text-[#0B1F3A] placeholder:text-[#90A1B7] text-base focus-visible:ring-0 focus-visible:border-[#0057B8]"
                        disabled={status === "loading" || status === "success"}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 bg-[#0057B8] hover:bg-[#00458A] text-white font-semibold text-base rounded-full shadow-[0_14px_28px_-20px_rgba(0,69,138,0.8)]"
                    disabled={status === "loading" || status === "success"}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Subscribed!
                      </>
                    ) : (
                      "Subscribe to Newsletter"
                    )}
                  </Button>

                  {/* Status Messages */}
                  {message && (
                    <div
                      className={`flex items-start gap-2 p-3 rounded-lg ${
                        status === "success"
                          ? "bg-[#E3F9ED] border border-[#8BD9AA]"
                          : "bg-[#FDE7E7] border border-[#F5A3A3]"
                      }`}
                    >
                      {status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-[#2F9D6F] flex-shrink-0 mt-0.5" />
                      ) : (
                      <AlertCircle className="h-5 w-5 text-[#D64545] flex-shrink-0 mt-0.5" />
                      )}
                    <p className="text-[#1C2A3A] text-sm">{message}</p>
                    </div>
                  )}

                  <p className="text-[#6B7C92] text-xs text-center">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 text-center">
                <p className="text-[#4A6076] text-sm">
                  Join <span className="font-semibold text-[#0B1F3A]">5,000+</span> subscribers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-red-800 border border-red-500/20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" aria-hidden />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl" aria-hidden />

        <div className="relative z-10 p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
                <Mail className="h-4 w-4 text-white" />
                <span className="text-white text-sm font-semibold uppercase tracking-wider">
                  Newsletter
                </span>
              </div>

              <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated with Latest Offers
              </h2>

              <p className="text-white/90 text-lg mb-6">
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
                  <li key={benefit} className="flex items-center gap-2 text-white/90">
                    <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side - Form */}
            <div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
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
                        className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-base focus-visible:ring-white/50"
                        disabled={status === "loading" || status === "success"}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 bg-white hover:bg-white/90 text-red-600 font-semibold text-base rounded-full"
                    disabled={status === "loading" || status === "success"}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
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
                          ? "bg-green-500/20 border border-green-500/30"
                          : "bg-red-500/20 border border-red-500/30"
                      }`}
                    >
                      {status === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-white text-sm">{message}</p>
                    </div>
                  )}

                  <p className="text-white/70 text-xs text-center">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 text-center">
                <p className="text-white/60 text-sm">
                  Join <span className="font-semibold text-white">5,000+</span> subscribers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


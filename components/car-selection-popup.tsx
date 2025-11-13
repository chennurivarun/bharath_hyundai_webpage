"use client"

import { useState, useEffect } from "react"
import { X, Car, Sparkles, ArrowRight, CheckCircle2, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CarSelectionPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has already dismissed the popup in this session
    const dismissed = sessionStorage.getItem('car-selection-popup-dismissed')
    if (dismissed) return

    // Show popup after 1 minute (60000 milliseconds)
    const timer = setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => setShowPopup(true), 50)
    }, 60000) // 1 minute

    return () => clearTimeout(timer)
  }, [])

  const handleFindCar = () => {
    setShowPopup(false)
    sessionStorage.setItem('car-selection-popup-dismissed', 'true')
    router.push('/find-perfect-car')
  }

  const handleDismiss = () => {
    setShowPopup(false)
    sessionStorage.setItem('car-selection-popup-dismissed', 'true')
  }

  if (!showPopup && !isAnimating) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-500 ${
        showPopup ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(17,24,39,0.9) 50%, rgba(0,0,0,0.85) 100%)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div 
        className={`relative bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 border border-white/10 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transition-all duration-500 ${
          showPopup ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 60px rgba(220, 38, 38, 0.15)',
        }}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-red-600/20 via-red-500/30 to-red-600/20 opacity-50">
          <div className="h-full w-full rounded-3xl bg-transparent"></div>
        </div>

        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

        <div className="relative p-8">
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 transition-all duration-200 text-white/60 hover:text-white group"
            aria-label="Close popup"
          >
            <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Icon with enhanced animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 bg-red-600/20 rounded-full blur-2xl animate-ping opacity-75"></div>
              <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl"></div>
              
              {/* Main icon container */}
              <div className="relative p-5 bg-gradient-to-br from-red-600/30 via-red-600/20 to-red-700/20 rounded-2xl border border-red-500/40 backdrop-blur-sm shadow-lg shadow-red-600/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                <Car className="h-10 w-10 text-red-400 relative z-10 drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 mb-4">
              <Zap className="h-4 w-4 text-red-400" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Smart Recommendation</span>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
              Confused to Choose a Car?
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-md mx-auto">
              Let our AI-powered tool help you find the perfect Hyundai car that matches your needs, budget, and lifestyle in just 2 minutes.
            </p>
          </div>

          {/* Enhanced Features List */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group">
              <div className="p-1.5 rounded-lg bg-red-600/20 border border-red-500/30 group-hover:scale-110 transition-transform">
                <Target className="h-4 w-4 text-red-400" />
              </div>
              <div className="flex-1">
                <span className="text-white font-medium text-sm block">Personalized Recommendations</span>
                <span className="text-white/60 text-xs">Based on your unique preferences</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group">
              <div className="p-1.5 rounded-lg bg-red-600/20 border border-red-500/30 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-4 w-4 text-red-400" />
              </div>
              <div className="flex-1">
                <span className="text-white font-medium text-sm block">Budget & Preference Matching</span>
                <span className="text-white/60 text-xs">Find cars that fit your requirements</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group">
              <div className="p-1.5 rounded-lg bg-red-600/20 border border-red-500/30 group-hover:scale-110 transition-transform">
                <Sparkles className="h-4 w-4 text-red-400" />
              </div>
              <div className="flex-1">
                <span className="text-white font-medium text-sm block">Quick & Easy Process</span>
                <span className="text-white/60 text-xs">Just 2 minutes to get your perfect match</span>
              </div>
            </div>
          </div>

          {/* Enhanced Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleFindCar}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-6 text-base rounded-xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Find My Perfect Car
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Button>
            
            <button
              onClick={handleDismiss}
              className="w-full py-4 text-white/60 hover:text-white text-sm font-medium transition-all duration-200 hover:bg-white/5 rounded-xl min-h-[44px]"
              aria-label="Dismiss popup and show later"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-6 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                <span>No spam</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


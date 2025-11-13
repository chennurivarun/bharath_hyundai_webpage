"use client"

import { useState, useEffect } from "react"
import { SiteNavigation } from "@/components/site-navigation"
import { ModelRecommendation } from "@/components/model-recommendation"
import type { Model } from "@/lib/models"
import { useRouter } from "next/navigation"

interface Particle {
  left: string
  top: string
  duration: string
  delay: string
}

export default function FindPerfectCarPage() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const router = useRouter()

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 5}s`,
      delay: `${Math.random() * 2}s`,
    }))
    setParticles(generatedParticles)
  }, [])

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model)
    // Navigate to the model page
    const modelRoutes: Record<string, string> = {
      'alcazar': '/alcazar',
      'exter': '/exter',
      'cretan': '/creta-nline',
      'venuen': '/venue-nline',
      'tucson': '/tucson',
      'ioniq5': '/ioniq5',
    }
    
    const route = modelRoutes[model.id] || `/model/${model.id}`
    router.push(route)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Enhanced Background with Animated Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#0057B8]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00A9E0]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0057B8]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* 3D Question Mark Symbol - Right Side */}
      <div className="fixed top-1/2 right-10 -translate-y-1/2 z-0 pointer-events-none hidden lg:block">
        <div className="relative perspective-1000">
          <div className="question-mark-3d animate-rotate3d">
            <div 
              className="text-[200px] font-black text-[#0057B8]/30 select-none"
              style={{
                textShadow: `
                  10px 10px 0px rgba(0, 87, 184, 0.25),
                  20px 20px 0px rgba(0, 87, 184, 0.2),
                  30px 30px 0px rgba(0, 87, 184, 0.15),
                  40px 40px 0px rgba(0, 87, 184, 0.1),
                  50px 50px 0px rgba(0, 87, 184, 0.05)
                `,
                transform: 'translateZ(50px)',
              }}
            >
              ?
            </div>
          </div>
        </div>
      </div>

      {/* 3D Question Mark Symbol - Left Side */}
      <div className="fixed top-1/2 left-10 -translate-y-1/2 z-0 pointer-events-none hidden lg:block">
        <div className="relative perspective-1000">
          <div className="question-mark-3d animate-rotate3d" style={{ animationDelay: '1s' }}>
            <div 
              className="text-[200px] font-black text-[#0057B8]/30 select-none"
              style={{
                textShadow: `
                  10px 10px 0px rgba(0, 87, 184, 0.25),
                  20px 20px 0px rgba(0, 87, 184, 0.2),
                  30px 30px 0px rgba(0, 87, 184, 0.15),
                  40px 40px 0px rgba(0, 87, 184, 0.1),
                  50px 50px 0px rgba(0, 87, 184, 0.05)
                `,
                transform: 'translateZ(50px)',
              }}
            >
              ?
            </div>
          </div>
        </div>
      </div>

      {/* Additional smaller 3D question marks for depth - Right Side */}
      <div className="fixed top-20 right-20 z-0 pointer-events-none hidden xl:block">
        <div 
          className="text-[80px] font-black text-[#0057B8]/20 select-none animate-float3d"
          style={{
            animationDuration: '8s',
            animationDelay: '1s',
            transform: 'translateZ(30px) rotateY(15deg)',
          }}
        >
          ?
        </div>
      </div>

      <div className="fixed bottom-32 right-32 z-0 pointer-events-none hidden xl:block">
        <div 
          className="text-[60px] font-black text-[#00A9E0]/20 select-none animate-float3d"
          style={{
            animationDuration: '7s',
            animationDelay: '2s',
            transform: 'translateZ(20px) rotateY(-15deg)',
          }}
        >
          ?
        </div>
      </div>

      {/* Additional smaller 3D question marks for depth - Left Side */}
      <div className="fixed top-20 left-20 z-0 pointer-events-none hidden xl:block">
        <div 
          className="text-[80px] font-black text-[#0057B8]/20 select-none animate-float3d"
          style={{
            animationDuration: '8s',
            animationDelay: '2s',
            transform: 'translateZ(30px) rotateY(-15deg)',
          }}
        >
          ?
        </div>
      </div>

      <div className="fixed bottom-32 left-32 z-0 pointer-events-none hidden xl:block">
        <div 
          className="text-[60px] font-black text-[#00A9E0]/20 select-none animate-float3d"
          style={{
            animationDuration: '7s',
            animationDelay: '1.5s',
            transform: 'translateZ(20px) rotateY(15deg)',
          }}
        >
          ?
        </div>
      </div>

      <SiteNavigation />
      
      <main className="relative z-10 pt-[140px] container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">
            Find Your Perfect Car
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto relative z-10">
            Answer a few simple questions and we'll recommend the perfect Hyundai car that matches your needs, budget, and lifestyle.
          </p>
        </div>

        {/* Model Recommendation Component */}
        <div className="max-w-4xl mx-auto relative z-10">
          <ModelRecommendation onModelSelect={handleModelSelect} />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/80 backdrop-blur-sm text-white py-8 mt-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Bharat Hyundai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}


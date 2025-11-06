"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X, ChevronRight, Phone, Mail, MapPin, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"

const SALES_PHONE = "+91 7733888999"
const SERVICE_PHONE = "+91 7997806806"
const EMAIL = "bharathyundaidm@gmail.com"

const NAV_ITEMS = [
  { label: "Models", href: "/models", icon: "🚗" },
  { label: "Compare Models", href: "/compare", icon: "⚖️" },
  { label: "Service", href: "/service", icon: "🔧" },
  { label: "Accessories", href: "/accessories", icon: "🛠️" },
  { label: "Insurance", href: "/insurance", icon: "🛡️" },
  { label: "Used Cars", href: "/used-cars", icon: "🚙" },
  { label: "About Us", href: "/about", icon: "ℹ️" },
  { label: "Locations", href: "/locations", icon: "📍" },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!isOpen || !mounted) return null

  const sidebarContent = (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
          pointerEvents: 'auto',
          zIndex: 10000
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div 
        style={{ 
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '24rem',
          height: '100dvh',
          minHeight: '100dvh',
          maxHeight: '100dvh',
          margin: 0,
          padding: 0,
          backgroundColor: 'transparent',
          backgroundImage: 'linear-gradient(to bottom, #000000, #111827, #000000)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          pointerEvents: 'auto',
          zIndex: 10001,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100%', overflow: 'hidden' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
                <span className="text-white text-sm font-bold">H</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm leading-tight">Bharath Hyundai</span>
                <span className="text-white/60 text-[10px] uppercase tracking-wider">Menu</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/10 transition-all duration-200 hover:translate-x-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-red-500 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Quick Contact */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-red-600/10 via-black/50 to-red-600/10 border border-red-500/20 space-y-3">
              <p className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-500" />
                Quick Contact
              </p>
              <a
                href={`tel:${SALES_PHONE.replace(/\s/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/30 transition-all group"
              >
                <Phone className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <p className="text-white/60 text-xs">Sales</p>
                  <p className="text-white font-medium text-sm">{SALES_PHONE}</p>
                </div>
              </a>
              <a
                href={`tel:${SERVICE_PHONE.replace(/\s/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/30 transition-all group"
              >
                <Headset className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <p className="text-white/60 text-xs">Service</p>
                  <p className="text-white font-medium text-sm">{SERVICE_PHONE}</p>
                </div>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/30 transition-all group"
              >
                <Mail className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs">Email</p>
                  <p className="text-white font-medium text-sm truncate">{EMAIL}</p>
                </div>
              </a>
              <a
                href="/locations"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/30 transition-all group"
              >
                <MapPin className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <p className="text-white/60 text-xs">Locations</p>
                  <p className="text-white font-medium text-sm">8 Branches</p>
                </div>
              </a>
            </div>
          </nav>

          {/* Footer CTAs */}
          <div className="p-6 border-t border-white/10 space-y-3 bg-gradient-to-t from-black/50 to-transparent">
            <Button
              asChild
              className="w-full bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold py-6 text-base shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all"
            >
              <a href="/test-drive" className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                Book Test Drive
              </a>
            </Button>
            <Button
              asChild
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-full font-semibold py-6 text-base transition-all"
            >
              <a href="/service" className="flex items-center justify-center gap-2">
                <Headset className="h-5 w-5" />
                Book Service
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 rounded-full font-medium py-5"
            >
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(sidebarContent, document.body)
}


"use client"

import { useState } from "react"
import { X, ChevronRight, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { label: "Models", href: "/models", icon: "🚗" },
  { label: "Compare Models", href: "/compare", icon: "⚖️" },
  { label: "Service", href: "/service", icon: "🔧" },
  { label: "Book Test Drive", href: "/test-drive", icon: "🏁" },
  { label: "Accessories", href: "/accessories", icon: "🛠️" },
  { label: "Insurance", href: "/insurance", icon: "🛡️" },
  { label: "Used Cars", href: "/used-cars", icon: "🚙" },
  { label: "About Us", href: "/about", icon: "ℹ️" },
  { label: "Locations", href: "/locations", icon: "📍" },
  { label: "Contact", href: "/contact", icon: "📧" },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gradient-to-b from-gray-900 to-black border-l border-white/10 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
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
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <p className="text-white font-semibold text-sm mb-3">Quick Contact</p>
              <a
                href="tel:+917733888999"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-sm">+91 7733888999</span>
              </a>
              <a
                href="mailto:bharathyundaidm@gmail.com"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-red-500" />
                <span className="text-sm">bharathyundaidm@gmail.com</span>
              </a>
              <a
                href="/locations"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-sm">8 Branches</span>
              </a>
            </div>
          </nav>

          {/* Footer CTAs */}
          <div className="p-6 border-t border-white/10 space-y-3">
            <Button
              asChild
              className="w-full bg-red-600 hover:bg-red-500 text-white rounded-full"
            >
              <a href="/test-drive">Book Test Drive</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 rounded-full"
            >
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}


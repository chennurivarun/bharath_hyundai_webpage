"use client"

import { useState } from "react"
import { Phone, Headset, Search, User } from "lucide-react"
import { MobileMenu } from "./mobile-menu"
import { SearchDialog } from "./search-dialog"

const SALES_PHONE = "+91 7733888999"
const SERVICE_PHONE = "+91 7997806806"
const EMAIL = "bharathyundaidm@gmail.com"

const NAV_ITEMS = [
  { label: "Models", href: "/models" },
  { label: "Compare", href: "/compare" },
  { label: "Service", href: "/service" },
  { label: "Book Test Drive", href: "/test-drive" },
  { label: "Accessories", href: "/accessories" },
  { label: "Insurance", href: "/insurance" },
]

export function AnnouncementBar() {
  return (
    <div role="region" aria-label="Promotions" className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black/70 via-black/60 to-black/70 backdrop-blur-xl text-white/90 text-xs border-b border-white/10 shadow-sm shadow-black/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
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
                  href="/test-drive" 
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-600 text-white/80 hover:text-white transition-all hover:scale-105 font-medium"
                >
                  Book Test Drive
                </a>
              </li>
              <li>
                <a 
                  href="/service" 
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

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="fixed top-[40px] left-0 right-0 z-40 border-b border-white/20 bg-gradient-to-b from-black/30 via-black/20 to-black/30 supports-[backdrop-filter]:bg-black/20 backdrop-blur-2xl shadow-xl shadow-black/30 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:via-transparent before:to-transparent before:pointer-events-none">
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="/" 
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
                href="/contact"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-600/30"
              >
                <Phone className="h-4 w-4" />
                <span>Contact</span>
              </a>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
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
                onClick={() => setMobileMenuOpen(true)}
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
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export function SiteNavigation() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
    </>
  )
}

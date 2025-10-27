"use client"

import { useState, useEffect } from "react"
import { Phone, Calendar, MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  const actions = [
    {
      icon: Phone,
      label: "Call Now",
      href: "tel:+917733888999",
      color: "bg-green-600 hover:bg-green-500",
    },
    {
      icon: Calendar,
      label: "Test Drive",
      href: "/test-drive",
      color: "bg-blue-600 hover:bg-blue-500",
    },
    {
      icon: MessageSquare,
      label: "Get Quote",
      href: "/contact",
      color: "bg-purple-600 hover:bg-purple-500",
    },
  ]

  return (
    <div className="fixed left-4 bottom-24 z-50 md:hidden">
      <div className="relative">
        {/* Main Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="icon"
          className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
            isExpanded
              ? "bg-gray-800 hover:bg-gray-700 rotate-180"
              : "bg-red-600 hover:bg-red-500 animate-pulse-glow"
          }`}
        >
          {isExpanded ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Phone className="h-6 w-6 text-white" />
          )}
        </Button>

        {/* Expanded Actions */}
        {isExpanded && (
          <div className="absolute bottom-16 left-0 space-y-2 animate-in slide-in-from-bottom-5 fade-in duration-300">
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <a
                  key={index}
                  href={action.href}
                  className={`flex items-center gap-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium text-sm whitespace-nowrap">{action.label}</span>
                </a>
              )
            })}
          </div>
        )}
      </div>

      {/* Background overlay */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 -z-10 bg-black/20 animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}
    </div>
  )
}


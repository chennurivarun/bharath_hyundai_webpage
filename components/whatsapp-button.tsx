"use client"

import { useMemo } from "react"
import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { MODELS } from "@/lib/models"

function getModelNameFromPath(pathname: string): string | null {
  // Expecting paths like /model/[id]
  if (!pathname) return null
  const parts = pathname.split("/").filter(Boolean)
  if (parts[0] === "model" && parts[1]) {
    const id = parts[1]
    const m = MODELS.find((m) => m.id === id)
    return m?.name ?? id
  }
  return null
}

export default function WhatsAppButton() {
  const pathname = usePathname()

  const message = useMemo(() => {
    const modelName = getModelNameFromPath(pathname || "")
    if (!pathname || pathname === "/" || pathname.startsWith("/models")) {
      return "hey i am intered in konowing more details about hyundai cars"
    }
    if (modelName) {
      return `hey am intersted in knowing more details about the car(${modelName})`
    }
    return "hey i am intered in konowing more details about hyundai cars"
  }, [pathname])

  const phone = "+917733888999" // update if needed
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-lg md:right-6 md:bottom-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}



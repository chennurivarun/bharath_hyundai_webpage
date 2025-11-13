"use client"

import { useState } from "react"
import { X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AccessoryEnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  accessoryName: string
  carModel: string
  accessoryPrice?: string
  accessoryImage?: string
}

export function AccessoryEnquiryModal({
  isOpen,
  onClose,
  accessoryName,
  carModel,
  accessoryPrice,
  accessoryImage,
}: AccessoryEnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", phone: "", email: "", message: "" })
      onClose()
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#0057B8]/20 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-[#00A9E0]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Enquire About Accessory</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Fill in your details and we'll get back to you soon
          </p>
        </div>

        {/* Accessory Info */}
        <div className="p-6 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center gap-4">
            {accessoryImage && (
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                <img
                  src={accessoryImage}
                  alt={accessoryName}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-400 mb-1">Accessory</p>
              <p className="text-lg font-semibold text-white truncate">{accessoryName}</p>
              <p className="text-sm text-gray-400 mt-1">For: <span className="text-[#00A9E0]">{carModel}</span></p>
              {accessoryPrice && (
                <p className="text-sm text-[#00A9E0] font-medium mt-1">{accessoryPrice}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">
                  Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#0057B8] focus:ring-[#0057B8]"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white mb-2 block">
                  Phone Number <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#0057B8] focus:ring-[#0057B8]"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                Email Address <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#0057B8] focus:ring-[#0057B8]"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-white mb-2 block">
                Additional Message (Optional)
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#0057B8] focus:ring-[#0057B8] resize-none"
                placeholder="Any additional information or questions..."
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#0057B8] hover:bg-[#00458A] text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0057B8]/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#00A9E0]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Enquiry Submitted!</h3>
            <p className="text-gray-400">
              Thank you for your enquiry. We'll get back to you soon.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


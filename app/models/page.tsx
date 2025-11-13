import type { Metadata } from "next"
import { SiteNavigation } from "@/components/site-navigation"
import { ModelsShowcase } from "@/components/models-showcase"

export const metadata: Metadata = {
  title: "Hyundai Models | Explore All Cars | Bharat Hyundai",
  description: "Explore the complete range of Hyundai cars including hatchbacks, sedans, SUVs, and electric vehicles. Compare features, prices, and book a test drive at Bharat Hyundai.",
  keywords: ["Hyundai models", "Hyundai cars", "Hyundai hatchback", "Hyundai SUV", "Hyundai sedan", "Hyundai electric", "car models", "car prices"],
  openGraph: {
    title: "Hyundai Models | Bharat Hyundai",
    description: "Explore the complete range of Hyundai cars. Compare models and book a test drive.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai Models | Bharat Hyundai",
    description: "Explore the complete range of Hyundai cars.",
  },
}

export default function ModelsOverviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0057B8]/5 via-white to-[#00A9E0]/5">
      <SiteNavigation />
      {/* Spacer to prevent content from going under fixed navigation */}
      <div className="h-[140px]"></div>
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <ModelsShowcase />
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-white/60">
            © {new Date().getFullYear()} Bharat Hyundai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

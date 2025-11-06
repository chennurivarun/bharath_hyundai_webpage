import type { Metadata } from "next"
import { ModelComparison } from "@/components/model-comparison"
import { SiteNavigation } from "@/components/site-navigation"

export const metadata: Metadata = {
  title: "Compare Hyundai Cars | Side-by-Side Comparison | Bharath Hyundai",
  description: "Compare Hyundai car models side-by-side. Compare features, specifications, prices, and more. Find the perfect Hyundai car for your needs.",
  keywords: ["compare cars", "Hyundai comparison", "car comparison", "compare car models", "Hyundai vs Hyundai", "car specs comparison"],
  openGraph: {
    title: "Compare Hyundai Cars | Bharath Hyundai",
    description: "Compare Hyundai car models side-by-side. Find the perfect car for your needs.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Compare Hyundai Cars | Bharath Hyundai",
    description: "Compare Hyundai car models side-by-side.",
  },
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavigation />
      
      <main className="pt-[120px] py-16">
        <ModelComparison />
      </main>

      <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Bharath Hyundai. All rights reserved.
        </div>
      </footer>
    </div>
  )
}


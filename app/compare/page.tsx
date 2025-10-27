import { ModelComparison } from "@/components/model-comparison"
import { SiteNavigation } from "@/components/site-navigation"

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavigation />
      
      <main className="py-16">
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


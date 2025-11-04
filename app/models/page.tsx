import { SiteNavigation } from "@/components/site-navigation"
import { ModelsShowcase } from "@/components/models-showcase"

export default function ModelsOverviewPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavigation />
      <main className="pt-[120px] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <ModelsShowcase />
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Bharath Hyundai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

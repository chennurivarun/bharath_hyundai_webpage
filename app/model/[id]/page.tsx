import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { MODELS, type Model } from "@/lib/models"
import Ioniq5Page from "@/components/ioniq5-page"
import CretaEVPage from "@/components/creta-ev-page"
import VernaPage from "@/components/verna-page"
import AuraPage from "@/components/aura-page"
import NiosPage from "@/components/nios-page"
import I20Page from "@/components/i20-page"
import I20NLineRedesign from "@/components/i20-nline-page"
import VenueFullRedesign from "@/components/venue-page"
import CretaRedesignedPage from "@/components/creta-page"
import CretaNLinePage from "@/components/creta-nline-page"
import VenuePageWithVideo from "@/components/venue-page-with-video"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params
  const model = MODELS.find((m) => m.id === id)
  
  if (!model) {
    return {
      title: "Model Not Found | Bharath Hyundai",
      description: "The requested Hyundai model could not be found.",
    }
  }

  const segmentLabel = model.segment === "hatchback" ? "Hatchback" 
    : model.segment === "sedan" ? "Sedan" 
    : model.segment === "suv" ? "SUV" 
    : "Electric"

  return {
    title: `${model.name} | ${segmentLabel} | Bharath Hyundai`,
    description: `Explore the ${model.name} - ${segmentLabel}. ${model.priceBand ? `Starting at ${model.priceBand}. ` : ""}Book a test drive, view specifications, and get the best price at Bharath Hyundai.`,
    keywords: [`${model.name}`, `Hyundai ${model.name}`, `${model.name} price`, `${model.name} specifications`, `${segmentLabel}`, "Hyundai car"],
    openGraph: {
      title: `${model.name} | Bharath Hyundai`,
      description: `Explore the ${model.name} - ${segmentLabel}. ${model.priceBand ? `Starting at ${model.priceBand}.` : ""}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${model.name} | Bharath Hyundai`,
      description: `Explore the ${model.name} - ${segmentLabel}.`,
    },
  }
}

export default function ModelDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  if (id === "ioniq5") {
    return <Ioniq5Page />
  }

  if (id === "creta-ev") {
    return <CretaEVPage />
  }

  if (id === "verna") {
    return <VernaPage />
  }

  if (id === "aura") {
    return <AuraPage />
  }

  if (id === "nios") {
    return <NiosPage />
  }
  
  if (id === "i20") {
    return <I20Page />
  }

  if (id === "i20-nline") {
    return <I20NLineRedesign />
  }

  if (id === "venue") {
    return <VenuePageWithVideo />
  }

  if (id === "creta") {
    return <CretaRedesignedPage />
  }

  if (id === "cretan" || id === "creta-nline") {
    return <CretaNLinePage />
  }

  const model: Model | undefined = MODELS.find((m) => m.id === id)

  if (!model) return notFound()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500">Hyundai</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-3">{model.name}</h1>
            {model.priceBand && (
              <p className="text-lg text-gray-700 mb-6">Starting at <span className="font-semibold">{model.priceBand}</span></p>
            )}
            <div className="flex flex-wrap gap-3">
              <a href="/test-drive" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Book a Test Drive</a>
              <a href="/contact" className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition">Contact Us</a>
              {model.brochureHref && (
                <a href={model.brochureHref} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition">Download Brochure</a>
              )}
            </div>
          </div>
          <div className="relative aspect-[16/9] w-full rounded-2xl bg-gray-100 overflow-hidden ring-1 ring-gray-200">
            <Image fill priority sizes="100vw" src={model.imageSrc} alt={model.imageAlt} className="object-contain" />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Stylish exteriors", desc: "Parametric design, signature DRLs and bold stance for commanding road presence." },
            { title: "Stunning interiors", desc: "Premium cabin, advanced infotainment and comfort-first ergonomics." },
            { title: "Smart technology", desc: "Connected features, safety tech and efficient powertrains for everyday convenience." }
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Gallery</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[model.imageSrc, model.imageSrc, model.imageSrc].map((src, i) => (
              <div key={i} className="relative aspect-video w-full rounded-xl bg-white overflow-hidden ring-1 ring-gray-200">
                <Image fill sizes="50vw" src={src} alt={`${model.name} image ${i + 1}`} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications (placeholder) */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Key Specifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Seating", value: "5 Seats" },
            { label: "Fuel", value: model.segment === "electric" ? "Electric" : "Petrol / Diesel" },
            { label: "Transmission", value: "Manual / Automatic" },
            { label: "Safety", value: "6 Airbags, ABS, ESC" }
          ].map((spec) => (
            <div key={spec.label} className="rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500">{spec.label}</p>
              <p className="text-lg font-semibold text-gray-900">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 p-8 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Ready to experience {model.name}?</h3>
              <p className="text-gray-600">Book a test drive or talk to our experts for a personalized quote.</p>
            </div>
            <div className="flex gap-3">
              <a href="/test-drive" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Book Test Drive</a>
              <a href="/contact" className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition">Contact</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



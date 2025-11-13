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
import VenueAllNewPage from "@/components/venue-all-new-page"
import VenueNLinePage from "@/components/venue-nline-page"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const model = MODELS.find((m) => m.id === id)
  
  if (!model) {
    return {
      title: "Model Not Found | Bharat Hyundai",
      description: "The requested Hyundai model could not be found.",
    }
  }

  const segmentLabel = model.segment === "hatchback" ? "Hatchback" 
    : model.segment === "sedan" ? "Sedan" 
    : model.segment === "suv" ? "SUV" 
    : "Electric"

  return {
    title: `${model.name} | ${segmentLabel} | Bharat Hyundai`,
    description: `Explore the ${model.name} - ${segmentLabel}. ${model.priceBand ? `Starting at ${model.priceBand}. ` : ""}Book a test drive, view specifications, and get the best price at Bharat Hyundai.`,
    keywords: [`${model.name}`, `Hyundai ${model.name}`, `${model.name} price`, `${model.name} specifications`, `${segmentLabel}`, "Hyundai car"],
    openGraph: {
      title: `${model.name} | Bharat Hyundai`,
      description: `Explore the ${model.name} - ${segmentLabel}. ${model.priceBand ? `Starting at ${model.priceBand}.` : ""}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${model.name} | Bharat Hyundai`,
      description: `Explore the ${model.name} - ${segmentLabel}.`,
    },
  }
}

export default async function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

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

  if (id === "venue-all-new" || id === "venue-allnew") {
    return <VenueAllNewPage />
  }

  if (id === "venue-nline" || id === "venue-n-line" || id === "venuen") {
    return <VenueNLinePage />
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0057B8]/5 via-white to-[#00A9E0]/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-[#0057B8] font-semibold">Hyundai</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0B1F3A] mb-3">{model.name}</h1>
            {model.priceBand && (
              <p className="text-lg text-[#0B1F3A]/80 mb-6">Starting at <span className="font-semibold text-[#0057B8]">{model.priceBand}</span></p>
            )}
            <div className="flex flex-wrap gap-3">
              <a href="/test-drive" className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white font-semibold shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Book a Test Drive</span>
              </a>
              <a href="/contact" className="px-6 py-3 rounded-lg border border-[#0057B8]/40 text-[#0057B8] font-semibold hover:bg-[#0057B8]/10 hover:border-[#0057B8]/60 transition-all">Contact Us</a>
              {model.brochureHref && (
                <a href={model.brochureHref} className="px-6 py-3 rounded-lg border border-[#0057B8]/40 text-[#0057B8] font-semibold hover:bg-[#0057B8]/10 hover:border-[#0057B8]/60 transition-all">Download Brochure</a>
              )}
            </div>
          </div>
          <div className="relative aspect-[16/9] w-full rounded-2xl bg-white overflow-hidden ring-1 ring-[#D6E4F5] shadow-lg hover:ring-[#0057B8]/30 transition-all duration-300">
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
            <div key={item.title} className="rounded-xl border border-[#D6E4F5] p-6 hover:shadow-lg hover:border-[#0057B8]/30 bg-white/70 backdrop-blur-md transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0057B8]/5 via-transparent to-[#00A9E0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <h3 className="text-lg font-semibold text-[#0B1F3A] mb-2 relative z-10">{item.title}</h3>
              <p className="text-[#0B1F3A]/80 text-sm leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gradient-to-br from-[#0057B8]/5 via-white to-[#00A9E0]/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-6">Gallery</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[model.imageSrc, model.imageSrc, model.imageSrc].map((src, i) => (
              <div key={i} className="relative aspect-video w-full rounded-xl bg-white overflow-hidden ring-1 ring-[#D6E4F5] hover:ring-[#0057B8]/30 transition-all duration-300 shadow-md hover:shadow-lg">
                <Image fill sizes="50vw" src={src} alt={`${model.name} image ${i + 1}`} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications (placeholder) */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-6">Key Specifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Seating", value: "5 Seats" },
            { label: "Fuel", value: model.segment === "electric" ? "Electric" : "Petrol / Diesel" },
            { label: "Transmission", value: "Manual / Automatic" },
            { label: "Safety", value: "6 Airbags, ABS, ESC" }
          ].map((spec) => (
            <div key={spec.label} className="rounded-xl border border-[#D6E4F5] p-6 bg-white/70 backdrop-blur-md hover:border-[#0057B8]/30 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0057B8]/5 via-transparent to-[#00A9E0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <p className="text-sm text-[#0B1F3A]/60 relative z-10">{spec.label}</p>
              <p className="text-lg font-semibold text-[#0057B8] relative z-10">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#D6E4F5] p-8 bg-white/70 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-[#0057B8]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0057B8]/10 via-transparent to-[#00A9E0]/10 opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#0B1F3A]">Ready to experience {model.name}?</h3>
              <p className="text-[#0B1F3A]/80">Book a test drive or talk to our experts for a personalized quote.</p>
            </div>
            <div className="flex gap-3 relative z-10">
              <a href="/test-drive" className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#0057B8] to-[#00A9E0] hover:from-[#00458A] hover:to-[#0057B8] text-white font-semibold shadow-lg shadow-[#0057B8]/40 hover:shadow-[#0057B8]/60 transition-all duration-300 border border-[#00A9E0]/30 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Book Test Drive</span>
              </a>
              <a href="/contact" className="px-6 py-3 rounded-lg border border-[#0057B8]/40 text-[#0057B8] font-semibold hover:bg-[#0057B8]/10 hover:border-[#0057B8]/60 transition-all">Contact</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



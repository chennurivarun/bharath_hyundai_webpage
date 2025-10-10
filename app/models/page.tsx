import Link from "next/link"
import { segmentLabel, segmentHeroImage, MODELS, type Segment } from "@/lib/models"

const segments: Segment[] = ["hatchback", "sedan", "suv", "electric"]

export default function ModelsOverviewPage() {
  const counts = {
    hatchback: MODELS.filter((m) => m.segment === "hatchback").length,
    sedan: MODELS.filter((m) => m.segment === "sedan").length,
    suv: MODELS.filter((m) => m.segment === "suv").length,
    electric: MODELS.filter((m) => m.segment === "electric").length,
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8">Hyundai Lineup</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {segments.map((s) => (
          <Link
            key={s}
            href={`/models/${s}`}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md"
            aria-label={`Explore ${segmentLabel(s)} models`}
          >
            <img
              src={segmentHeroImage(s) || "/placeholder.svg"}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" aria-hidden />
            <div className="relative z-10 p-5">
              <p className="text-sm text-white/80">Category</p>
              <h2 className="text-2xl font-semibold">{segmentLabel(s)}</h2>
              <p className="text-white/80">{counts[s]} models</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

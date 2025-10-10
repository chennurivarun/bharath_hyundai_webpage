import type { Segment } from "@/lib/models"
import { MODELS, segmentLabel } from "@/lib/models"
import { Button } from "@/components/ui/button"

export default function SegmentPage({ params }: { params: { segment: Segment } }) {
  const segment = params.segment
  const models = MODELS.filter((m) => m.segment === segment)

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
        <a href="/models" className="hover:text-white">
          Models
        </a>{" "}
        / <span className="text-white">{segmentLabel(segment)}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-semibold mb-8">{segmentLabel(segment)} Models</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {models.map((m) => (
          <article
            key={m.id}
            className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md overflow-hidden"
          >
            <img src={m.imageSrc || "/placeholder.svg"} alt={m.imageAlt} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-lg font-semibold">{m.name}</h2>
              {m.priceBand && <p className="text-white/80 mt-1">{m.priceBand}</p>}
              <div className="mt-4 flex gap-2">
                <Button className="rounded-full">Enquire</Button>
                <Button variant="secondary" className="rounded-full" asChild>
                  <a href={m.brochureHref || "#"}>Brochure</a>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

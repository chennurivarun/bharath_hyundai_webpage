import type { Metadata } from "next"
import type { Segment } from "@/lib/models"
import { segmentLabel } from "@/lib/models"

export async function generateMetadata({ params }: { params: { segment: Segment } }): Promise<Metadata> {
  const { segment } = params
  const label = segmentLabel(segment)

  return {
    title: `${label} Cars | Hyundai ${label} Models | Bharath Hyundai`,
    description: `Explore Hyundai ${label.toLowerCase()} cars. Browse models, compare prices, specifications, and book a test drive at Bharath Hyundai.`,
    keywords: [`Hyundai ${label}`, `${label} cars`, `${label} models`, `Hyundai ${label} price`, `${label} comparison`],
    openGraph: {
      title: `${label} Cars | Bharath Hyundai`,
      description: `Explore Hyundai ${label.toLowerCase()} cars. Browse models and book a test drive.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${label} Cars | Bharath Hyundai`,
      description: `Explore Hyundai ${label.toLowerCase()} cars.`,
    },
  }
}

export default function SegmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


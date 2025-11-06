import type { Metadata } from "next"
import CretaRedesignedPage from "@/components/creta-page"

export const metadata: Metadata = {
  title: "Hyundai Creta | SUV | Price, Features, Specs | Bharath Hyundai",
  description: "Explore the Hyundai Creta SUV. Starting at ₹10.72 Lakh. Features, specifications, colors, variants, and more. Book a test drive at Bharath Hyundai.",
  keywords: ["Hyundai Creta", "Creta SUV", "Hyundai Creta price", "Creta specifications", "Creta features", "Creta variants", "SUV"],
  openGraph: {
    title: "Hyundai Creta | Bharath Hyundai",
    description: "Explore the Hyundai Creta SUV. Starting at ₹10.72 Lakh. Book a test drive.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai Creta | Bharath Hyundai",
    description: "Explore the Hyundai Creta SUV.",
  },
}

export default function CretaPage() {
  return <CretaRedesignedPage />;
}

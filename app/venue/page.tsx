import type { Metadata } from "next"
import VenueFullRedesign from "@/components/venue-page"

export const metadata: Metadata = {
  title: "Hyundai Venue | Compact SUV | Price, Features, Specs | Bharat Hyundai",
  description: "Explore the Hyundai Venue compact SUV. Starting at ₹7.26 Lakh. Smart features, safety, and performance. Book a test drive at Bharat Hyundai.",
  keywords: ["Hyundai Venue", "Venue SUV", "compact SUV", "Hyundai Venue price", "Venue specifications", "Venue features"],
  openGraph: {
    title: "Hyundai Venue | Bharat Hyundai",
    description: "Explore the Hyundai Venue compact SUV. Starting at ₹7.26 Lakh.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai Venue | Bharat Hyundai",
    description: "Explore the Hyundai Venue compact SUV.",
  },
}

export default function VenuePage() {
  return <VenueFullRedesign />;
}

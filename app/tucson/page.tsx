import type { Metadata } from "next"
import TucsonFullImageSync from "@/components/tucson-page"

export const metadata: Metadata = {
  title: "Hyundai Tucson | Premium SUV | Price, Features, Specs | Bharat Hyundai",
  description: "Explore the Hyundai Tucson premium SUV. Starting at ₹27.31 Lakh. Advanced features, safety, performance, and luxury. Book a test drive at Bharat Hyundai.",
  keywords: ["Hyundai Tucson", "Tucson SUV", "Hyundai Tucson price", "Tucson specifications", "premium SUV", "Tucson features"],
  openGraph: {
    title: "Hyundai Tucson | Bharat Hyundai",
    description: "Explore the Hyundai Tucson premium SUV. Starting at ₹27.31 Lakh.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai Tucson | Bharat Hyundai",
    description: "Explore the Hyundai Tucson premium SUV.",
  },
}

export default function TucsonPageRoute() {
  return <TucsonFullImageSync />;
}



import type { Metadata } from "next"
import AlcazarPage from "@/components/alcazar-page"

export const metadata: Metadata = {
  title: "Hyundai Alcazar | 6 & 7 Seater SUV | Price, Features | Bharath Hyundai",
  description: "Explore the Hyundai Alcazar 6 & 7 seater SUV. Starting at ₹14.47 Lakh. Spacious interiors, premium features, and powerful performance. Book a test drive.",
  keywords: ["Hyundai Alcazar", "Alcazar SUV", "7 seater SUV", "6 seater SUV", "Alcazar price", "Alcazar specifications"],
  openGraph: {
    title: "Hyundai Alcazar | Bharath Hyundai",
    description: "Explore the Hyundai Alcazar 6 & 7 seater SUV. Starting at ₹14.47 Lakh.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai Alcazar | Bharath Hyundai",
    description: "Explore the Hyundai Alcazar 6 & 7 seater SUV.",
  },
}

export default function Page() {
  return <AlcazarPage />;
}
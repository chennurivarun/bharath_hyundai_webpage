import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hyundai Venue N Line | Sporty Compact SUV | Price, Features | Bharat Hyundai",
  description: "Explore the Hyundai Venue N Line sporty compact SUV. Starting at ₹11.24 Lakh. Performance styling, enhanced features, and sporty design. Book a test drive.",
  keywords: ["Hyundai Venue N Line", "Venue N Line", "sporty compact SUV", "N Line", "Venue N Line price", "performance compact SUV"],
  openGraph: {
    title: "Hyundai Venue N Line | Bharat Hyundai",
    description: "Explore the Hyundai Venue N Line sporty compact SUV. Starting at ₹11.24 Lakh.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai Venue N Line | Bharat Hyundai",
    description: "Explore the Hyundai Venue N Line sporty compact SUV.",
  },
}

export default function VenueNLineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Venue Accessories | Genuine Hyundai Accessories | Bharath Hyundai",
  description: "Explore genuine Hyundai Venue accessories. Enhance your compact SUV with premium interior, exterior, and electrical accessories. Free installation and warranty included.",
  keywords: [
    "Venue accessories",
    "Hyundai Venue accessories",
    "Venue body cover",
    "Venue seat covers",
    "Venue dash cam",
    "Hyundai genuine accessories",
    "Venue exterior accessories",
    "Venue interior accessories",
  ],
  openGraph: {
    title: "Venue Accessories | Bharath Hyundai",
    description: "Genuine Hyundai Venue accessories for style, comfort, and safety.",
    type: "website",
  },
}

export default function VenueAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


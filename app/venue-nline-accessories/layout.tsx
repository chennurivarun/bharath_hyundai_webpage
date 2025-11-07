import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Venue N Line Accessories | Genuine Hyundai Accessories | Bharath Hyundai",
  description: "Explore genuine Hyundai Venue N Line accessories. Enhance your sporty compact SUV with premium interior, exterior, and electrical accessories. Free installation and warranty included.",
  keywords: [
    "Venue N Line accessories",
    "Hyundai Venue N Line accessories",
    "Venue N Line body cover",
    "Venue N Line seat covers",
    "Venue N Line dash cam",
    "Hyundai genuine accessories",
    "Venue N Line exterior accessories",
    "Venue N Line interior accessories",
  ],
  openGraph: {
    title: "Venue N Line Accessories | Bharath Hyundai",
    description: "Genuine Hyundai Venue N Line accessories for style, comfort, and safety.",
    type: "website",
  },
}

export default function VenueNLineAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


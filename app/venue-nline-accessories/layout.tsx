import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Venue N Line Accessories | Genuine Hyundai Accessories | Bharat Hyundai",
  description:
    "Explore genuine Hyundai Venue N Line accessories. Enhance your sporty compact SUV with premium interior, exterior, and electronics accessories from Bharat Hyundai.",
  keywords: [
    "Venue N Line accessories",
    "Hyundai Venue N Line parts",
    "Venue N Line interior accessories",
    "Venue N Line exterior accessories",
    "genuine Hyundai accessories"
  ],
  openGraph: {
    title: "Venue N Line Accessories | Bharath Hyundai",
    description: "Genuine Hyundai Venue N Line accessories curated for performance, comfort, and style.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Venue N Line Accessories | Bharat Hyundai",
    description: "Discover Hyundai Venue N Line accessories with Bharat Hyundai."
  }
}

export default function VenueNLineAccessoriesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tucson Accessories | Genuine Hyundai Accessories | Bharat Hyundai",
  description: "Explore genuine Hyundai Tucson accessories. Enhance your SUV with premium interior, exterior, and electrical accessories. Free installation and warranty included.",
  keywords: [
    "Tucson accessories",
    "Hyundai Tucson accessories",
    "Tucson body cover",
    "Tucson seat covers",
    "Tucson dash cam",
    "Hyundai genuine accessories",
    "Tucson exterior accessories",
    "Tucson interior accessories",
  ],
  openGraph: {
    title: "Tucson Accessories | Bharat Hyundai",
    description: "Genuine Hyundai Tucson accessories for style, comfort, and safety.",
    type: "website",
  },
}

export default function TucsonAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


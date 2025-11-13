import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IONIQ 5 Accessories | Genuine Hyundai Accessories | Bharat Hyundai",
  description: "Explore genuine Hyundai IONIQ 5 accessories. Enhance your electric SUV with premium interior, exterior, and electrical accessories. Free installation and warranty included.",
  keywords: [
    "IONIQ 5 accessories",
    "Hyundai IONIQ 5 accessories",
    "IONIQ 5 body cover",
    "IONIQ 5 seat covers",
    "IONIQ 5 dash cam",
    "Hyundai genuine accessories",
    "IONIQ 5 exterior accessories",
    "IONIQ 5 interior accessories",
  ],
  openGraph: {
    title: "IONIQ 5 Accessories | Bharat Hyundai",
    description: "Genuine Hyundai IONIQ 5 accessories for style, comfort, and safety.",
    type: "website",
  },
}

export default function Ioniq5AccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


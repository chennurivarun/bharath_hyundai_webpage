import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Creta EV Accessories | Genuine Hyundai Accessories | Bharath Hyundai",
  description: "Explore genuine Hyundai Creta EV accessories. Enhance your electric SUV with premium interior, exterior, and electrical accessories. Free installation available.",
  keywords: ["Creta EV accessories", "Hyundai Creta EV parts", "electric SUV accessories", "genuine Hyundai accessories", "Creta EV interior accessories", "Creta EV exterior accessories"],
  openGraph: {
    title: "Creta EV Accessories | Bharath Hyundai",
    description: "Genuine Hyundai Creta EV accessories for your electric SUV.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creta EV Accessories | Bharath Hyundai",
    description: "Genuine Hyundai Creta EV accessories.",
  },
}

export default function CretaEvAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


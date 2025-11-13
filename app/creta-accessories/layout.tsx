import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Creta Accessories | Genuine Hyundai Accessories | Bharat Hyundai",
  description: "Explore genuine Hyundai Creta accessories. Enhance your SUV with premium interior, exterior, and electrical accessories. Free installation available.",
  keywords: ["Creta accessories", "Hyundai Creta parts", "SUV accessories", "genuine Hyundai accessories", "Creta interior accessories", "Creta exterior accessories"],
  openGraph: {
    title: "Creta Accessories | Bharat Hyundai",
    description: "Genuine Hyundai Creta accessories for your SUV.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creta Accessories | Bharat Hyundai",
    description: "Genuine Hyundai Creta accessories.",
  },
}

export default function CretaAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "i20 Accessories | Genuine Hyundai Accessories | Bharath Hyundai",
  description: "Explore genuine Hyundai i20 accessories. Enhance your hatchback with premium interior, exterior, and electrical accessories. Free installation available.",
  keywords: ["i20 accessories", "Hyundai i20 parts", "hatchback accessories", "genuine Hyundai accessories", "i20 interior accessories", "i20 exterior accessories"],
  openGraph: {
    title: "i20 Accessories | Bharath Hyundai",
    description: "Genuine Hyundai i20 accessories for your hatchback.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "i20 Accessories | Bharath Hyundai",
    description: "Genuine Hyundai i20 accessories.",
  },
}

export default function I20AccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


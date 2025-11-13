import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Creta N Line Accessories | Genuine Hyundai Accessories | Bharat Hyundai",
  description: "Explore genuine Hyundai Creta N Line accessories. Enhance your sporty SUV with premium interior, exterior, and electronics accessories. Free installation available.",
  keywords: ["Creta N Line accessories", "Hyundai Creta N Line parts", "N Line accessories", "genuine Hyundai accessories", "Creta N Line interior accessories", "Creta N Line exterior accessories"],
  openGraph: {
    title: "Creta N Line Accessories | Bharat Hyundai",
    description: "Genuine Hyundai Creta N Line accessories for your sporty SUV.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creta N Line Accessories | Bharat Hyundai",
    description: "Genuine Hyundai Creta N Line accessories.",
  },
}

export default function CretaNLineAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


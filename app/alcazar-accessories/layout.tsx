import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alcazar Accessories | Genuine Hyundai Accessories | Bharat Hyundai",
  description: "Explore genuine Hyundai Alcazar accessories. Enhance your 7-seater SUV with premium interior, exterior, and electrical accessories. Free installation available.",
  keywords: ["Alcazar accessories", "Hyundai Alcazar parts", "SUV accessories", "genuine Hyundai accessories", "Alcazar interior accessories", "Alcazar exterior accessories"],
  openGraph: {
    title: "Alcazar Accessories | Bharat Hyundai",
    description: "Genuine Hyundai Alcazar accessories for your 7-seater SUV.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alcazar Accessories | Bharat Hyundai",
    description: "Genuine Hyundai Alcazar accessories.",
  },
}

export default function AlcazarAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


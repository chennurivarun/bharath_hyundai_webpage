import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verna Accessories | Genuine Hyundai Accessories | Bharath Hyundai",
  description: "Explore genuine Hyundai Verna accessories. Enhance your sedan with premium interior, exterior, and electrical accessories. Free installation available.",
  keywords: ["Verna accessories", "Hyundai Verna parts", "sedan accessories", "genuine Hyundai accessories", "Verna interior accessories", "Verna exterior accessories"],
  openGraph: {
    title: "Verna Accessories | Bharath Hyundai",
    description: "Genuine Hyundai Verna accessories for your sedan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verna Accessories | Bharath Hyundai",
    description: "Genuine Hyundai Verna accessories.",
  },
}

export default function VernaAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


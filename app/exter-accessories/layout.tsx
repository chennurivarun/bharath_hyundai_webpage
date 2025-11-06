import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Exter Accessories | Genuine Hyundai Accessories | Bharath Hyundai",
  description: "Explore genuine Hyundai Exter accessories. Enhance your SUV with premium interior, exterior, and electrical accessories. Free installation available.",
  keywords: ["Exter accessories", "Hyundai Exter parts", "SUV accessories", "genuine Hyundai accessories", "Exter interior accessories", "Exter exterior accessories"],
  openGraph: {
    title: "Exter Accessories | Bharath Hyundai",
    description: "Genuine Hyundai Exter accessories for your SUV.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exter Accessories | Bharath Hyundai",
    description: "Genuine Hyundai Exter accessories.",
  },
}

export default function ExterAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


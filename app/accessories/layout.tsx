import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Car Accessories | Genuine Hyundai Parts & Accessories | Bharat Hyundai",
  description: "Shop genuine Hyundai car accessories and parts. Floor mats, seat covers, dash cams, alloy wheels, and more. OEM quality accessories for all Hyundai models.",
  keywords: ["Hyundai accessories", "car accessories", "Hyundai parts", "car parts", "Hyundai OEM accessories", "car accessories online", "genuine parts"],
  openGraph: {
    title: "Car Accessories | Bharat Hyundai",
    description: "Shop genuine Hyundai car accessories and parts. OEM quality for all models.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Accessories | Bharat Hyundai",
    description: "Shop genuine Hyundai car accessories and parts.",
  },
}

export default function AccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


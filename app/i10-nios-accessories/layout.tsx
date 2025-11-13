import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grand i10 Nios Accessories | Genuine Hyundai Accessories | Bharat Hyundai",
  description: "Explore genuine Hyundai Grand i10 Nios accessories. Enhance your hatchback with premium interior, exterior, and electrical accessories. Free installation and warranty included.",
  keywords: [
    "Grand i10 Nios accessories",
    "Hyundai i10 Nios accessories",
    "i10 Nios body cover",
    "i10 Nios seat covers",
    "i10 Nios dash cam",
    "Hyundai genuine accessories",
    "i10 Nios exterior accessories",
    "i10 Nios interior accessories",
  ],
  openGraph: {
    title: "Grand i10 Nios Accessories | Bharat Hyundai",
    description: "Genuine Hyundai Grand i10 Nios accessories for style, comfort, and safety.",
    type: "website",
  },
}

export default function I10NiosAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


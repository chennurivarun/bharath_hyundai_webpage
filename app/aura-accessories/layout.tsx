import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aura Accessories | Genuine Hyundai Accessories | Bharat Hyundai",
  description: "Explore genuine Hyundai Aura accessories. Enhance your sedan with premium interior, exterior, and electrical accessories. Free installation and warranty included.",
  keywords: [
    "Aura accessories",
    "Hyundai Aura accessories",
    "Aura body cover",
    "Aura seat covers",
    "Aura dash cam",
    "Hyundai genuine accessories",
    "Aura exterior accessories",
    "Aura interior accessories",
  ],
  openGraph: {
    title: "Aura Accessories | Bharat Hyundai",
    description: "Genuine Hyundai Aura accessories for style, comfort, and safety.",
    type: "website",
  },
}

export default function AuraAccessoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


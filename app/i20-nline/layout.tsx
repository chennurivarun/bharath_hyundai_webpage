import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hyundai i20 N Line | Sporty Hatchback | Price, Features | Bharath Hyundai",
  description: "Explore the Hyundai i20 N Line sporty hatchback. Starting at ₹9.14 Lakh. Race-inspired design, enhanced performance, and sporty features. Book a test drive.",
  keywords: ["Hyundai i20 N Line", "i20 N Line", "sporty hatchback", "N Line", "i20 N Line price", "performance hatchback"],
  openGraph: {
    title: "Hyundai i20 N Line | Bharath Hyundai",
    description: "Explore the Hyundai i20 N Line sporty hatchback. Starting at ₹9.14 Lakh.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai i20 N Line | Bharath Hyundai",
    description: "Explore the Hyundai i20 N Line sporty hatchback.",
  },
}

export default function I20NLineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


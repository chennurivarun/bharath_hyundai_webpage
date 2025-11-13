import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hyundai Creta N Line | Sporty SUV | Price, Features | Bharat Hyundai",
  description: "Explore the Hyundai Creta N Line sporty SUV. Starting at ₹16.34 Lakh. Performance-tuned, sporty design, and premium features. Book a test drive.",
  keywords: ["Hyundai Creta N Line", "Creta N Line", "sporty SUV", "N Line SUV", "Creta N Line price", "performance SUV"],
  openGraph: {
    title: "Hyundai Creta N Line | Bharat Hyundai",
    description: "Explore the Hyundai Creta N Line sporty SUV. Starting at ₹16.34 Lakh.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai Creta N Line | Bharat Hyundai",
    description: "Explore the Hyundai Creta N Line sporty SUV.",
  },
}

export default function CretaNLineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


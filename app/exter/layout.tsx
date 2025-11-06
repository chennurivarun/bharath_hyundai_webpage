import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hyundai Exter | Compact SUV | Price, Features, Specs | Bharath Hyundai",
  description: "Explore the Hyundai Exter compact SUV. Starting at ₹8.46 Lakh. Modern design, advanced features, and safety. Book a test drive at Bharath Hyundai.",
  keywords: ["Hyundai Exter", "Exter SUV", "compact SUV", "Hyundai Exter price", "Exter specifications", "Exter features"],
  openGraph: {
    title: "Hyundai Exter | Bharath Hyundai",
    description: "Explore the Hyundai Exter compact SUV. Starting at ₹8.46 Lakh.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai Exter | Bharath Hyundai",
    description: "Explore the Hyundai Exter compact SUV.",
  },
}

export default function ExterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


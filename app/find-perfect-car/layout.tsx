import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find Your Perfect Car | Car Recommendation Tool | Bharath Hyundai",
  description: "Answer a few simple questions and get personalized Hyundai car recommendations based on your budget, needs, and lifestyle. Find your perfect match in minutes.",
  keywords: ["car recommendation", "find perfect car", "car selector", "Hyundai car finder", "car matching tool", "personalized car recommendations"],
  openGraph: {
    title: "Find Your Perfect Car | Bharath Hyundai",
    description: "Get personalized Hyundai car recommendations based on your preferences. Find your perfect match in minutes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Perfect Car | Bharath Hyundai",
    description: "Get personalized Hyundai car recommendations.",
  },
}

export default function FindPerfectCarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

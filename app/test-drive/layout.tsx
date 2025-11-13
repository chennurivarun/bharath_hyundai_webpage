import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Free Test Drive | Bharat Hyundai | Hyderabad & Khammam",
  description: "Book a free test drive for your favorite Hyundai car. Experience i20, Verna, Creta, Tucson, and more. Available at multiple branches in Telangana.",
  keywords: ["test drive", "book test drive", "Hyundai test drive", "free test drive", "car test drive", "Hyundai cars test drive"],
  openGraph: {
    title: "Book Free Test Drive | Bharat Hyundai",
    description: "Book a free test drive for your favorite Hyundai car. Experience before you buy.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Book Free Test Drive | Bharat Hyundai",
    description: "Book a free test drive for your favorite Hyundai car.",
  },
}

export default function TestDriveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


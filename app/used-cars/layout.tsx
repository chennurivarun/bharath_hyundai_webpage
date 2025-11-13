import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Used Cars | Pre-Owned Hyundai Cars | Bharat Hyundai",
  description: "Buy certified pre-owned Hyundai cars. Quality inspected used cars with warranty. Best prices on i20, Verna, Creta, Tucson, and more. Exchange your old car.",
  keywords: ["used cars", "pre-owned cars", "second hand cars", "used Hyundai", "certified used cars", "car exchange", "buy used car"],
  openGraph: {
    title: "Used Cars | Bharat Hyundai",
    description: "Buy certified pre-owned Hyundai cars. Quality inspected with warranty.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Cars | Bharat Hyundai",
    description: "Buy certified pre-owned Hyundai cars.",
  },
}

export default function UsedCarsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


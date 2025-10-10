export type Segment = "hatchback" | "sedan" | "suv" | "electric"

export type Model = {
  id: string
  name: string
  priceBand?: string
  imageSrc: string
  imageAlt: string
  brochureHref?: string
  segment: Segment
}

export const MODELS: Model[] = [
  {
    id: "nios",
    name: "Grand i10 Nios",
    priceBand: "₹5.47–7.91L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Grand i10 Nios",
    brochureHref: "#",
    segment: "hatchback",
  },
  {
    id: "i20",
    name: "i20",
    priceBand: "₹6.86–11.25L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai i20",
    brochureHref: "#",
    segment: "hatchback",
  },
  {
    id: "aura",
    name: "Aura",
    priceBand: "₹5.98–8.18L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Aura sedan",
    brochureHref: "#",
    segment: "sedan",
  },
  {
    id: "verna",
    name: "Verna",
    priceBand: "₹10.69–16.97L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Verna sedan",
    brochureHref: "#",
    segment: "sedan",
  },
  {
    id: "exter",
    name: "Exter",
    priceBand: "₹5.68–9.56L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Exter SUV",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "venue",
    name: "Venue",
    priceBand: "₹7.26–12.45L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Venue SUV",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "venuen",
    name: "Venue N Line",
    priceBand: "₹11.24–12.45L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Venue N Line",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "creta",
    name: "Creta",
    priceBand: "₹10.72–20.09L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Creta SUV",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "cretan",
    name: "Creta N Line",
    priceBand: "₹16.34–20.09L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Creta N Line SUV",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "alcazar",
    name: "Alcazar",
    priceBand: "₹14.47–21.05L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Alcazar SUV",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "tucson",
    name: "Tucson",
    priceBand: "₹27.31–33.63L*",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai Tucson SUV",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "ioniq5",
    name: "IONIQ 5",
    priceBand: "Range 631 km/charge",
    imageSrc: "/placeholder.svg?height=320&width=480",
    imageAlt: "Hyundai IONIQ 5 EV",
    brochureHref: "#",
    segment: "electric",
  },
]

export const segmentLabel = (s: Segment) =>
  s === "hatchback" ? "Hatchback" : s === "sedan" ? "Sedan" : s === "suv" ? "SUV" : "Electric"

export const segmentHeroImage = (s: Segment) => {
  switch (s) {
    case "hatchback":
      return "/images/hatchback1.jpg" // Using actual hatchback asset photo
    case "sedan":
      return "/images/sedan1.avif" // Using actual sedan asset photo
    case "suv":
      return "/images/exter.avif" // Using actual SUV asset photo
    case "electric":
      return "/images/lineup-ev.jpg" // Keep electric as is since no specific asset
    default:
      return "/images/sedan1.avif"
  }
}

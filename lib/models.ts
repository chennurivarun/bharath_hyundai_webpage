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
    imageSrc: "/images/hatchback1.jpg",
    imageAlt: "Hyundai Grand i10 Nios",
    brochureHref: "#",
    segment: "hatchback",
  },
  {
    id: "i20",
    name: "i20",
    priceBand: "₹7,04,400",
    imageSrc: "/images/hatchback2.jpg",
    imageAlt: "Hyundai i20",
    brochureHref: "#",
    segment: "hatchback",
  },
  {
    id: "i20-nline",
    name: "i20 N Line",
    priceBand: "₹9.14–11.60L*",
    imageSrc: "/images/i20-nline.avif",
    imageAlt: "Hyundai i20 N Line",
    brochureHref: "/i20-nline",
    segment: "hatchback",
  },
  {
    id: "aura",
    name: "Aura",
    priceBand: "₹5.98–8.18L*",
    imageSrc: "/images/sedan1.avif",
    imageAlt: "Hyundai Aura sedan",
    brochureHref: "#",
    segment: "sedan",
  },
  {
    id: "verna",
    name: "Verna",
    priceBand: "₹10.69–16.97L*",
    imageSrc: "/images/sedan2.avif",
    imageAlt: "Hyundai Verna sedan",
    brochureHref: "#",
    segment: "sedan",
  },
  {
    id: "exter",
    name: "Exter",
    priceBand: "₹8,46,100",
    imageSrc: "/images/exter.avif",
    imageAlt: "Hyundai Exter SUV",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "venue",
    name: "Venue",
    priceBand: "₹7.26–12.45L*",
    imageSrc: "/images/venue-nline.avif",
    imageAlt: "Hyundai Venue SUV",
    brochureHref: "/venue",
    segment: "suv",
  },
  {
    id: "venuen",
    name: "Venue N Line",
    priceBand: "₹11.24–12.45L*",
    imageSrc: "/images/venue-nline.avif",
    imageAlt: "Hyundai Venue N Line",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "creta",
    name: "Creta",
    priceBand: "₹10.72–20.09L*",
    imageSrc: "/images/creata.avif",
    imageAlt: "Hyundai Creta SUV",
    brochureHref: "/creta",
    segment: "suv",
  },
  {
    id: "cretan",
    name: "Creta N Line",
    priceBand: "₹16.34–20.09L*",
    imageSrc: "/images/creta-nline.avif",
    imageAlt: "Hyundai Creta N Line SUV",
    brochureHref: "/creta-nline",
    segment: "suv",
  },
  {
    id: "alcazar",
    name: "Alcazar",
    priceBand: "₹14.47–21.05L*",
    imageSrc: "/images/alcazar.avif",
    imageAlt: "Hyundai Alcazar SUV",
    brochureHref: "#",
    segment: "suv",
  },
  {
    id: "tucson",
    name: "Tucson",
    priceBand: "₹27.31–33.63L*",
    imageSrc: "/images/tucson.avif",
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
  {
    id: "creta-ev",
    name: "Creta Electric",
    priceBand: "Range TBD",
    imageSrc: "/images/lineup-ev.jpg",
    imageAlt: "Hyundai Creta Electric",
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

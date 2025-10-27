"use client";

import React from "react";

// -----------------------------
// HYUNDAI VENUE — FULL REDESIGN (ALL SUBPAGES)
// Tech stack: React + TailwindCSS (no external deps)
// Notes:
// 1) Replace image URLs below with your locally hosted copies (e.g., /assets/venue/..)
// 2) Copy is paraphrased from Hyundai India (Venue: Highlights, Exterior, Interior, Performance, Safety, Convenience, Specification, Features, e‑Brochure).
// 3) Sections covered: Highlights • Exterior • Interior • Performance • Safety • Convenience • Specifications • Features • e‑Brochure
// -----------------------------

// If you plan to self-host images, drop them in /public/assets/venue and switch to those paths.
const ASSETS = {
  hero: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-knight-big.jpg",
  // HIGHLIGHTS (already had a subset)
  knight: {
    interior: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-knight-small-interior.jpg",
    seats: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-knight-small-seating.jpg",
    irvm: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-knight-small-iRVM.jpg",
    grille: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-knight-small-Grille.jpg",
    alloys: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-knight-small-Tyre.jpg",
    dashcam: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-knight-small-dashcam.jpg",
  },
  tech: {
    alexa: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue-exteriormid-2.jpg",
    ambientSounds: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue-suv-exteriormid-5.jpg",
    bluelink: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue-suv-exteriormid-3.jpg",
    regionalLanguages: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue-suv-exteriormid-4.jpg",
    tailLamps: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue_exterior_2_1120x600.jpg",
  },
  comfort: {
    driveModes: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/Hyundai-venue-suv-highlight-small-pc-544x360_1.jpg",
    sunroof: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue_highlights_544x360.jpg",
    ambientLighting: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/Hyundai-venue-suv-highlight-small-pc-544x360_3.jpg",
    purifier: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/Hyundai-venue-suv-highlight-small-pc-544x360_4.jpg",
  },
  gallery: [
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-gallery-12.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue_highlights_gallery_1120x600.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue_exterior_1120x600.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-gallery-1.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue_exterior_3_1120x600.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue-gallery-6.jpg"
  ],
  // EXTERIOR
  exterior: {
    front: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue_exterior_1120x600.jpg",
    headlampClose: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/tab/Hyundai-venue-suv-exterior-middle-1120x600-15-revised.jpg",
    side1: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/exterior/venue-exterior-side%202.jpg",
    rear: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/exterior/venue-exterior-rear%203.jpg",
    tailLamps: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue_exterior_2_1120x600.jpg",
    sharkFin: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/exterior/venue-exterior-rear%203.jpg",
    puddle: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/Hyundai-venue-suv-exterior-bottom-2.jpg",
    alloys: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/tab/Hyundai-venue-suv-exterior-bottom-10-revised.jpg",
    cornering: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue-safety-mid-2.jpg",
    ledProjector: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/tab/Hyundai-venue-suv-exterior-bottom-10-revised.jpg",
  },
  // INTERIOR
  interior: {
    powerSeat: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/interior-bottom4.jpg",
    recline: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue_interiorsaf.jpg",
    digitalCluster: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/interior/venue-suv-interior-bottom-3.jpg",
    airPurifier: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/convenience/venue-convenience-bottom-a5.jpg",
    ambient: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/interior/venue-suv-interior-bottom-2.jpg",
    seatbackScoop: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/interior/Hyundai-venue-suv-interior-middle-873x500-2_800x530.jpg",
  },
  // PERFORMANCE
  performance: {
    diesel15: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/venue_performance_1120x600.jpg",
    turbo10: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/venue_turbo2.jpg",
    petrol12: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/performance/kappa%201.2%20petrol.jpg",
    driveModes: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/Hyundai-venue-suv-performance-top-1120x600-1-revised.jpg",
    aero: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/performance/venue-performance-1.jpg",
    rearDeflector: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/performance/venue-performance-5.jpg",
  },
  // SAFETY (incl. ADAS imagery from VENUE / N Line pages)
  safety: {
    banner: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safetypc.png",
    sixAirbags: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue-safety-top-2.jpg",
    ahss: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue-safety-mid-1.jpg",
    camera: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue-safety-mid-4.jpg",
    cornering: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue-safety-mid-2.jpg",
    autoHeadlamps: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue-safety-mid-5.jpg",
    vsm: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue-safety-mid-6.jpg",
    hac: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue-suv-safety-mid-7.jpg",
    tpms: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue-suv-safety-mid-7.jpg",
    adas: {
      fcw: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-image-1.jpg",
      ldw: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-image-2.jpg",
      fcaCar: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-image-3.jpg",
      fcaPed: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-image-4.jpg",
      fcaCycle: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-image-5.jpg",
      hba: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/vneu-image-6.jpg",
      lka: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-image-7.jpg",
      lfa: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-image-8.jpg",
      daw: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/vneue-image-9.jpg",
      lvda: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-image-10.jpg",
    },
  },
  // CONVENIENCE
  convenience: {
    h2cAlexa: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue-exteriormid-2.jpg",
    bluelink: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue-suv-exteriormid-3.jpg",
    languages10: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue-suv-exteriormid-4.jpg",
    ambientSounds: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue-suv-exteriormid-5.jpg",
    splitSeat: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/highlights/venue_interiorsaf1.png",
    recline2Step: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venue_interiorsaf.jpg",
    wirelessCharger: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/convenience/venue-convenience-bottom-a10.jpg",
    smartKeyStart: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/convenience/venue-convenience-bottom-a7.jpg",
    gloveboxCooling: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/convenience/venue-convenience-bottom-a8.jpg",
    rearACVents: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/convenience/venue-convenience-bottom-a9.jpg",
  },
  // E‑BROCHURE (PDF)
  brochurePDF: "https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/VenuedigitalBrochure.pdf",
};

// Quick tags & common UI bits
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
    {children}
  </span>
);

const Section = ({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mb-8">
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-3xl text-sm text-white/70">{subtitle}</p>}
    </div>
    {children}
  </section>
);

const FeatureCard = ({ img, title, desc }: { img?: string; title: string; desc?: string }) => (
  <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm transition hover:bg-white/10">
    {img && (
      <div className="relative h-44 w-full overflow-hidden bg-black/40">
        <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
    )}
    <div className="space-y-1 p-4">
      <h3 className="text-base font-medium text-white">{title}</h3>
      {desc && <p className="text-sm text-white/70">{desc}</p>}
    </div>
  </div>
);

const StickyNav = () => (
  <nav className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 text-sm sm:px-6 lg:px-8">
      {[ 
        ["Highlights", "#highlights"],
        ["Exterior", "#exterior"],
        ["Interior", "#interior"],
        ["Performance", "#performance"],
        ["Safety", "#safety"],
        ["Convenience", "#convenience"],
        ["Specifications", "#specifications"],
        ["Features", "#features"],
        ["Variants & Pricing", "#variants"],
      ].map(([label, href]) => (
        <a key={label} href={href} className="shrink-0 rounded-xl border border-white/15 px-3 py-1.5 text-white/90 hover:bg-white/10">
          {label}
        </a>
      ))}
    </div>
  </nav>
);

// ——— SPEC DATA (from brochure/spec page) ———
const DIMENSIONS = [
  { label: "Overall length (mm)", value: "3,995" },
  { label: "Overall width (mm)", value: "1,770" },
  { label: "Overall height (mm)", value: "1,617^" },
  { label: "Wheelbase (mm)", value: "2,500" },
  { label: "Fuel tank (L)", value: "45" },
];

const ENGINES = [
  {
    name: "Kappa 1.2 l MPi petrol",
    power: "61 kW (83 PS) @ 6,000 rpm",
    torque: "113.8 Nm @ 4,000 rpm",
    transmissions: ["5‑speed MT"],
  },
  {
    name: "Kappa 1.0 l Turbo GDi petrol",
    power: "88.3 kW (120 PS) @ 6,000 rpm",
    torque: "172 Nm @ 1,500–4,000 rpm",
    transmissions: ["6‑speed MT", "7‑speed DCT"],
  },
  {
    name: "U2 1.5 l CRDi VGT diesel",
    power: "85 kW (116 PS) @ 4,000 rpm",
    torque: "250 Nm @ 1,500–2,750 rpm",
    transmissions: ["6‑speed MT"],
  },
];

// ——— VARIANTS (Ex‑showroom, indicative; CarWale Oct 2025) ———
const VARIANTS = [
  { name: "Venue E 1.2 Petrol", price: 7.26, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue E Plus 1.2 Petrol", price: 7.61, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue S 1.2 Petrol", price: 8.49, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue S Plus 1.2 Petrol MT", price: 8.72, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue S (O) Plus 1.2 Petrol", price: 9.15, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue S (O) 1.2 Petrol", price: 9.15, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue Executive 1.0 Turbo Petrol MT", price: 9.15, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "MT" },
  { name: "Venue S (O) 1.2 Petrol Knight Edition", price: 9.46, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue S (O) Plus 1.2 Petrol Adventure Edition", price: 9.48, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue S Plus 1.5 Diesel", price: 9.73, fuel: "Diesel", engine: "1.5 CRDi", transmission: "MT" },
  { name: "Venue SX Executive 1.2 Petrol MT", price: 9.87, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue S (O) 1.0 Turbo Petrol MT", price: 9.92, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "MT" },
  { name: "Venue SX 1.2 Petrol", price: 10.22, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue SX 1.2 Petrol Dual Tone", price: 10.33, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue SX 1.2 Petrol Adventure Edition", price: 10.34, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue SX 1.2 Petrol Adventure Edition Dual Tone", price: 10.48, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue SX 1.2 Petrol MT Knight Edition", price: 10.52, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue SX 1.2 Petrol MT Knight Edition Dual Tone", price: 10.63, fuel: "Petrol", engine: "1.2 MPi", transmission: "MT" },
  { name: "Venue S (O) 1.0 Turbo Petrol DCT", price: 10.93, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "DCT" },
  { name: "Venue SX 1.5 Diesel", price: 11.22, fuel: "Diesel", engine: "1.5 CRDi", transmission: "MT" },
  { name: "Venue SX 1.5 Diesel Dual Tone", price: 11.36, fuel: "Diesel", engine: "1.5 CRDi", transmission: "MT" },
  { name: "Venue SX (O) MT 1.0 Turbo Petrol", price: 11.49, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "MT" },
  { name: "Venue SX (O) MT 1.0 Turbo Petrol Dual Tone", price: 11.60, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "MT" },
  { name: "Venue SX (O) 1.0 Turbo Petrol MT Knight Edition", price: 11.65, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "MT" },
  { name: "Venue SX (O) 1.0 Turbo Petrol MT Knight Edition Dual Tone", price: 11.79, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "MT" },
  { name: "Venue SX (O) MT 1.5 Diesel", price: 12.05, fuel: "Diesel", engine: "1.5 CRDi", transmission: "MT" },
  { name: "Venue SX (O) MT 1.5 Diesel Dual Tone", price: 12.18, fuel: "Diesel", engine: "1.5 CRDi", transmission: "MT" },
  { name: "Venue SX (O) 1.0 Turbo Petrol DCT", price: 12.21, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "DCT" },
  { name: "Venue SX (O) 1.0 Turbo Petrol DCT Knight Edition", price: 12.31, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "DCT" },
  { name: "Venue SX (O) 1.0 Turbo Petrol DCT Adventure Edition", price: 12.32, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "DCT" },
  { name: "Venue SX (O) 1.0 Turbo Petrol DCT Dual Tone", price: 12.32, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "DCT" },
  { name: "Venue SX (O) 1.0 Turbo Petrol DCT Knight Edition Dual Tone", price: 12.41, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "DCT" },
  { name: "Venue SX (O) 1.0 Turbo Petrol DCT Adventure Edition Dual Tone", price: 12.46, fuel: "Petrol", engine: "1.0 Turbo GDi", transmission: "DCT" },
];

export default function VenueFullRedesign() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white">
      <StickyNav />
      {/* HERO */}
      <header className="relative isolate" id="highlights">
        <div className="mx-auto flex h-[60vh] max-w-7xl items-end px-4 pb-10 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Tag>Hyundai</Tag>
              <Tag>VENUE</Tag>
              <Tag>Live the Lit Life</Tag>
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">The lit SUV that blends advanced tech, incredible connectivity & new‑age style.</h1>
            <p className="max-w-2xl text-white/80">Ex‑showroom price starts at <strong>₹7,26,381</strong>. Experience cutting‑edge technology and sleek design at a great price.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://clicktobuy.hyundai.co.in/" className="rounded-xl bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/90">Click to Buy</a>
              <a href="#gallery" className="rounded-xl border border-white/20 px-5 py-2 text-sm font-medium text-white/90 hover:bg-white/10">Gallery</a>
            </div>
          </div>
        </div>
      </header>

      

      {/* HIGHLIGHTS — Knight Edition / Tech / Comfort */}
      <Section id="knight" title="The Knight trends." subtitle="Sleek, glamorous and stylish — a powerful stance, dynamic lines, alloy wheels and elite badging.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard img={ASSETS.knight.interior} title="All‑black interiors with brass coloured inserts" />
          <FeatureCard img={ASSETS.knight.seats} title="Exclusive black seat upholstery with brass highlights" />
          <FeatureCard img={ASSETS.knight.irvm} title="Electrochromic mirror — IRVM" />
          <FeatureCard img={ASSETS.knight.grille} title="Black painted front grille & Hyundai logo" />
          <FeatureCard img={ASSETS.knight.alloys} title="Black painted alloy wheels with red front brake calipers" />
          <FeatureCard img={ASSETS.knight.dashcam} title="Dashcam with dual camera" />
        </div>
      </Section>

      <Section id="tech" title="Tech & Connectivity">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard img={ASSETS.tech.alexa} title="Home‑to‑Car (H2C) with Alexa*" desc="Control multiple vehicle functions and check status from home, with voice support for English & Hindi." />
          <FeatureCard img={ASSETS.tech.ambientSounds} title="Ambient sounds of nature" desc="Soothing soundscapes for a serene driving experience." />
          <FeatureCard img={ASSETS.tech.bluelink} title="60+ Bluelink connected features" desc="A connected‑car suite for convenience, comfort and security." />
          <FeatureCard img={ASSETS.tech.regionalLanguages} title="10 regional languages infotainment" desc="AVNT supports 12 languages including 10 regional languages." />
          <FeatureCard img={ASSETS.tech.tailLamps} title="Connecting LED tail lamps" desc="Distinctive, futuristic rear design with hexagonal crystal elements." />
        </div>
        <p className="mt-4 text-xs text-white/60">*Alexa device not included; features depend on compatibility & network availability.</p>
      </Section>

      <Section id="comfort" title="Comfort & Convenience (highlights)">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard img={ASSETS.comfort.driveModes} title="Drive Mode Select" desc="Normal, Eco or Sport." />
          <FeatureCard img={ASSETS.comfort.sunroof} title="Smart electric sunroof" />
          <FeatureCard img={ASSETS.comfort.ambientLighting} title="Ambient lighting" />
          <FeatureCard img={ASSETS.comfort.purifier} title="Auto healthy air purifier" />
        </div>
      </Section>

      {/* EXTERIOR */}
      <Section id="exterior" title="Exterior — style that grabs attention" subtitle="Dark chrome grille, bold stance, and connecting LED tail lamps.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard img={ASSETS.exterior.front} title="Bold front fascia" desc="Parametric grille and strong skid plate design." />
          <FeatureCard img={ASSETS.exterior.headlampClose} title="Projection headlamps with LED positioning" />
          <FeatureCard img={ASSETS.exterior.side1} title="Sporty profile" desc="Bridge‑type roof rails and sharp character lines." />
          <FeatureCard img={ASSETS.exterior.tailLamps} title="Connecting LED tail lamps" />
          <FeatureCard img={ASSETS.exterior.sharkFin} title="Shark fin antenna" />
          <FeatureCard img={ASSETS.exterior.alloys} title="Puddle lamps" />
          <FeatureCard img={ASSETS.exterior.puddle} title="R16 Diamond‑cut alloys" />
          <FeatureCard img={ASSETS.exterior.cornering} title="Cornering lamps" />
          <FeatureCard img={ASSETS.exterior.ledProjector} title="LED projector headlamps" />
        </div>
      </Section>

      {/* INTERIOR */}
      <Section id="interior" title="Interior — enter the lit zone" subtitle="Stylish, refined and focused on comfort for every passenger.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard img={ASSETS.interior.powerSeat} title="Power driver seat (4‑way)" />
          <FeatureCard img={ASSETS.interior.recline} title="2‑step rear reclining seat" />
          <FeatureCard img={ASSETS.interior.digitalCluster} title="Digital cluster with colour TFT MID" />
          <FeatureCard img={ASSETS.interior.airPurifier} title="Auto healthy air purifier" />
          <FeatureCard img={ASSETS.interior.ambient} title="Ambient lighting" />
          <FeatureCard img={ASSETS.interior.seatbackScoop} title="Front seatback scoop" />
        </div>
      </Section>

      {/* PERFORMANCE */}
      <Section id="performance" title="Performance — an exhilarating drive">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard img={ASSETS.performance.diesel15} title="U2 1.5 l CRDi VGT diesel" desc="116 PS • 250 Nm • 6‑MT" />
          <FeatureCard img={ASSETS.performance.turbo10} title="Kappa 1.0 l Turbo GDi petrol" desc="120 PS • 172 Nm • 6‑MT / 7‑DCT" />
          <FeatureCard img={ASSETS.performance.petrol12} title="Kappa 1.2 l MPi petrol" desc="83 PS • 113.8 Nm • 5‑MT" />
          <FeatureCard img={ASSETS.performance.driveModes} title="Drive Mode Select" desc="Eco • Normal • Sport with themed cluster" />
          <FeatureCard img={ASSETS.performance.aero} title="Optimized aerodynamics" />
          <FeatureCard img={ASSETS.performance.rearDeflector} title="Rear wheel deflector" />
        </div>
      </Section>

      {/* SAFETY */}
      <Section id="safety" title="Safety comes first" subtitle="Strong AHSS body, 6 airbags standard & Hyundai SmartSense (Level 1 ADAS).">
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/10">
          <img src={ASSETS.safety.banner} alt="VENUE Safety" className="h-64 w-full object-cover" />
        </div>
        <h3 className="mb-3 text-lg font-medium">Standard & active safety</h3>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           <FeatureCard img={ASSETS.safety.banner} title="6 Airbags (standard)" />
           <FeatureCard img={ASSETS.safety.sixAirbags} title="Strong body structure with AHSS" />
           <FeatureCard img={ASSETS.safety.ahss} title="Rear camera with dynamic guidelines" />
           <FeatureCard img={ASSETS.safety.camera} title="Rear camera with dynamic guidelines" />
           <FeatureCard img={ASSETS.safety.cornering} title="Cornering lamps" />
           <FeatureCard img={ASSETS.safety.autoHeadlamps} title="Automatic headlamps & escort" />
           <FeatureCard img={ASSETS.safety.vsm} title="Hill‑assist control (HAC)" />
           <FeatureCard img={ASSETS.safety.tpms} title="Tyre pressure monitoring system (Highline)" />
         </div>

        <h3 className="mt-10 mb-3 text-lg font-medium">Hyundai SmartSense — Level 1 ADAS</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <FeatureCard img={ASSETS.safety.adas.fcw} title="Forward Collision Warning (FCW)" />
          <FeatureCard img={ASSETS.safety.adas.fcaCar} title="FCA — Car" />
          <FeatureCard img={ASSETS.safety.adas.fcaPed} title="FCA — Pedestrian" />
          <FeatureCard img={ASSETS.safety.adas.fcaCycle} title="FCA — Cycle" />
          <FeatureCard img={ASSETS.safety.adas.hba} title="High Beam Assist (HBA)" />
          <FeatureCard img={ASSETS.safety.adas.ldw} title="Lane Departure Warning (LDW)" />
          <FeatureCard img={ASSETS.safety.adas.lka} title="Lane Keeping Assist (LKA)" />
          <FeatureCard img={ASSETS.safety.adas.lfa} title="Lane Following Assist (LFA)" />
          <FeatureCard img={ASSETS.safety.adas.daw} title="Driver Attention Warning (DAW)" />
          <FeatureCard img={ASSETS.safety.adas.lvda} title="Leading Vehicle Departure Alert (LVDA)" />
        </div>
      </Section>

      {/* CONVENIENCE */}
      <Section id="convenience" title="Convenience — stay connected to the lit life">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard img={ASSETS.convenience.h2cAlexa} title="Home‑to‑Car (H2C) with Alexa*" />
          <FeatureCard img={ASSETS.convenience.bluelink} title="60+ Bluelink connected features" />
          <FeatureCard img={ASSETS.convenience.languages10} title="10 regional languages infotainment" />
          <FeatureCard img={ASSETS.convenience.ambientSounds} title="Ambient sounds of nature" />
          <FeatureCard img={ASSETS.convenience.splitSeat} title="60:40 split rear seat" />
          <FeatureCard img={ASSETS.convenience.recline2Step} title="2‑step rear reclining seat" />
          <FeatureCard img={ASSETS.convenience.wirelessCharger} title="Wireless phone charger" />
          <FeatureCard img={ASSETS.convenience.smartKeyStart} title="Smart key & push button start/stop" />
          <FeatureCard img={ASSETS.convenience.gloveboxCooling} title="Glovebox cooling" />
          <FeatureCard img={ASSETS.convenience.rearACVents} title="Rear AC vents" />
        </div>
        <p className="mt-4 text-xs text-white/60">*Alexa device not included; feature availability varies by trim.</p>
      </Section>

      {/* SPECIFICATIONS */}
      <Section id="specifications" title="Specifications" subtitle="Key dimensions and powertrains (see e‑brochure for full technical sheet).">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-medium">Dimensions</h3>
            <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
              {DIMENSIONS.map((row) => (
                <li key={row.label} className="flex items-center justify-between bg-white/5 px-4 py-3">
                  <span className="text-sm text-white/80">{row.label}</span>
                  <span className="text-sm font-medium text-white">{row.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-white/60">^With roof rails.</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-medium">Engines & Transmissions</h3>
            <div className="grid gap-4">
              {ENGINES.map((e) => (
                <div key={e.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">{e.name}</p>
                  <p className="text-sm text-white/80">Power: {e.power}</p>
                  <p className="text-sm text-white/80">Torque: {e.torque}</p>
                  <p className="text-sm text-white/80">Transmission: {e.transmissions.join(" • ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FEATURES — compact summary (full matrix in brochure / website) */}
      <Section id="features" title="Features" subtitle="Highlights across safety, exterior, interior, seating and connectivity. For the full variant‑wise matrix, refer to the e‑brochure.">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 text-base font-medium">Safety</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
              <li>6 airbags standard; ABS with EBD; ESC, VSM & HAC</li>
              <li>TPMS (Highline), rear parking camera with dynamic guidelines</li>
              <li>Hyundai SmartSense Level‑1 ADAS (FCW, FCA‑Car/Ped/Cycle, LKA, LDW, LFA, HBA, DAW, LVDA)</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 text-base font-medium">Exterior</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
              <li>Dark chrome grille, connecting LED tail lamps</li>
              <li>LED projector headlamps, cornering lamps, puddle lamps</li>
              <li>R16 diamond‑cut alloys, shark fin antenna, roof rails</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 text-base font-medium">Interior & Seating</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
              <li>Power driver seat (4‑way), ambient lighting, digital cluster</li>
              <li>2‑step rear reclining seat, 60:40 split rear seat</li>
              <li>Auto healthy air purifier, front seatback scoop</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 text-base font-medium">Connectivity & Convenience</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
              <li>60+ Bluelink connected features; OTA updates</li>
              <li>Home‑to‑Car with Alexa*; 10 regional languages infotainment</li>
              <li>Wireless phone charger, glovebox cooling, rear AC vents</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 text-base font-medium">Knight Edition add‑ons</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-white/80">
              <li>All‑black cabin with brass inserts; exclusive upholstery</li>
              <li>Black painted grille, alloys with red calipers; dashcam; ECM iRVM</li>
              <li>Brass accents on bumpers & roof rails; sporty metal pedals; 3D mats</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" title="Gallery">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ASSETS.gallery.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img src={src} alt={`VENUE gallery ${i + 1}`} className="h-56 w-full object-cover" />
            </div>
          ))}
        </div>
      </Section>

      {/* VARIANTS & PRICING */}
      <Section id="variants" title="Variants & Pricing (Ex‑showroom)" subtitle="Indicative ex‑showroom prices. City‑wise prices vary; confirm on Hyundai's Prices page.">
        <div className="rounded-2xl border border-white/10 bg-white/5">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/10 text-white/80">
                <tr>
                  <th className="px-4 py-3 font-medium">Variant</th>
                  <th className="px-4 py-3 font-medium">Fuel</th>
                  <th className="px-4 py-3 font-medium">Engine</th>
                  <th className="px-4 py-3 font-medium">Transmission</th>
                  <th className="px-4 py-3 font-medium">Ex‑showroom (₹ Lakh)</th>
                </tr>
              </thead>
              <tbody>
                {VARIANTS.map((v, i) => (
                  <tr key={i} className="border-t border-white/10 even:bg-white/5">
                    <td className="px-4 py-3 text-white">{v.name}</td>
                    <td className="px-4 py-3 text-white/80">{v.fuel}</td>
                    <td className="px-4 py-3 text-white/80">{v.engine}</td>
                    <td className="px-4 py-3 text-white/80">{v.transmission}</td>
                    <td className="px-4 py-3 font-medium text-white">{v.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-xs text-white/70">
            <span>Source: CarWale (list & prices). Official pricing tool: Hyundai &ldquo;Prices&rdquo; page.</span>
            <div className="flex gap-2">
              <a href="https://www.hyundai.com/in/en/find-a-car/venue/price" className="rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white/10">Hyundai Prices</a>
              <a href="https://www.carwale.com/hyundai-cars/venue/" className="rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white/10">CarWale Listing</a>
            </div>
          </div>
        </div>
      </Section>

      {/* E‑BROCHURE */}
      

      {/* Moved former hero image to the bottom */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img src={ASSETS.hero} alt="Hyundai VENUE Knight Edition" className="h-[60vh] w-full object-cover object-center" />
        </div>
      </div>

		{/* Knight images slow slider (same images & size as Knight cards) */}
		<div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
			<div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
				<div className="relative">
					<div className="flex gap-4 animate-scroll-slow">
						{[
							ASSETS.knight.interior,
							ASSETS.knight.seats,
							ASSETS.knight.irvm,
							ASSETS.knight.grille,
							ASSETS.knight.alloys,
							ASSETS.knight.dashcam,
							ASSETS.knight.interior,
							ASSETS.knight.seats,
							ASSETS.knight.irvm,
							ASSETS.knight.grille,
							ASSETS.knight.alloys,
							ASSETS.knight.dashcam,
						].map((src, i) => (
							<div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
								<img src={src} alt={`VENUE Knight ${i + 1}`} className="h-full w-full object-cover" />
							</div>
						))}
					</div>
				</div>
			</div>
			<style jsx>{`
				.animate-scroll-slow {
					animation: scrollX 40s linear infinite;
					width: max-content;
				}
				@keyframes scrollX {
					0% { transform: translateX(0); }
					100% { transform: translateX(-50%); }
				}
			`}</style>
		</div>

      

      {/* FOOTER NOTES */}
      <footer className="mx-auto max-w-7xl px-4 py-10 text-xs text-white/60 sm:px-6 lg:px-8">
        <p>Disclaimers: Connected features & Alexa depend on device compatibility, software & network. Feature availability varies by trim. Prices are indicative and may vary by city/variant.</p>
      </footer>
    </div>
  );
}
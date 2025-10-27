"use client"
import React, { useEffect, useState } from "react";

// CRETA N Line Showcase — built from Hyundai India reference pages
// Sections: Highlights, Exterior, Interior, Performance, Safety, Convenience, Specifications, Features
// TailwindCSS required. Drop this component into a React/Next.js project with Tailwind configured.
// All images are pulled directly from Hyundai India public CDN (reference pages).

const EXTERIOR_IMAGES = [
  {
    src:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-tyre.jpg",
    caption: "R18 diamond cut alloys with N logo & red caliper",
  },
  {
    src:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-frontsideview.jpg",
    caption: "Quad beam LED headlamps with horizon LED positioning lamp & DRLs",
  },
  {
    src:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-rightsideview-1.jpg",
    caption: "Sporty black radiator grille & bold stance",
  },
  {
    src:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small.jpg",
    caption: "Side sill with red inserts",
  },
  {
    src:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-1.jpg",
    caption: "Twin-tip muffler & rear bumper with red inserts",
  },
  {
    src:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinediffuserdesign.jpg",
    caption: "Sporty tailgate spoiler & aero diffuser",
  },
];

const INTERIOR_IMAGES = [
  {
    src:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/CRETA%20N%20Line%20-%20interior%20-top%20big%20image.jpg",
    caption: "All-black sporty cockpit with red accents",
  },
  {
    src:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/creta-n-line-interior-seatdesign.jpg",
    caption: "Front row ventilated seats",
  },
  {
    src:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/creta-n-line-interior-seatdesign1.jpg",
    caption: "Leatherette upholstery seats with N logo",
  },
];

// Hero slider images
const HERO_IMAGES = [
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-frontsideview.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-rightsideview-1.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinediffuserdesign.jpg",
];

const SPEC_TABLE = [
  { label: "Engine", value: "1.5L Turbo GDi Petrol (1482 cc)" },
  { label: "Power", value: "160 PS (approx. 158 bhp) @ 5,500 rpm" },
  { label: "Torque", value: "253 Nm @ 1,500–3,500 rpm" },
  { label: "Transmission", value: "6MT / 7DCT (varies by variant)" },
  { label: "Drive", value: "Front Wheel Drive" },
  { label: "Fuel Tank", value: "50 L" },
  { label: "Dimensions (L×W×WB)", value: "4330 × 1790 × 2610 mm" },
  { label: "Seating", value: "5" },
];

const FEATURES = {
  tech: [
    "26.03 cm (10.25”) HD infotainment",
    "26.03 cm (10.25”) digital cluster",
    "Bluelink connected features",
    "Bose premium sound system",
    "Wireless phone charger",
    "Alexa Home-to-Car",
  ],
  comfort: [
    "Dual-zone automatic climate control",
    "Front ventilated seats",
    "8-way powered driver seat (select variants)",
    "Panoramic sunroof (voice-enabled)",
    "Rear AC vents",
    "Large boot space",
  ],
  safety: [
    "6 airbags (standard)",
    "ESC, VSM, Hill Assist Control",
    "EPB with Auto Hold",
    "TPMS",
    "Hyundai SmartSense Level 2 ADAS (select variants)",
    "BVM / SVM (select variants)",
  ],
};

// Images for cards pulled from official Hyundai CDN (reference pages)
const HIGHLIGHTS_CARDS = [
  {
    title: "Dual 10.25″ displays",
    body: "Curvilinear 26.03 cm infotainment + 26.03 cm digital cluster.",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience-display.jpg",
  },
  {
    title: "Sporty N Line identity",
    body: "Black theme with red accents and N badging.",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/CRETA%20N%20Line%20-%20interior%20-top%20big%20image.jpg",
  },
  {
    title: "Voice‑enabled sunroof",
    body: "Smart panoramic sunroof with voice control.",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/Convenience%20-%204%20-%20sunroof.jpg",
  },
  {
    title: "Connected car tech",
    body: "Bluelink, Alexa Home‑to‑Car, and more.",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience.jpg",
  },
  {
    title: "Safety suite",
    body: "6 airbags standard, ESC, EPB (Auto Hold), TPMS.",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety.jpg",
  },
  {
    title: "Level 2 ADAS*",
    body: "On select variants, SmartSense assistance features.",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/Big-image-1st.jpg",
  },
];

const CONVENIENCE_CARDS = [
  {
    title: "Home to car (H2C) with Alexa",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience.jpg",
  },
  {
    title: "26.03cm (10.25”) multi display digital cluster",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience-display.jpg",
  },
  {
    title: "Bose premium sound system (8 speakers)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience-bosemusicsystem.jpg",
  },
  {
    title: "Traction control modes (Snow, Mud, Sand)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience-topview.jpg",
  },
  {
    title: "Dual zone automatic temperature control (DATC)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinedatc.jpg",
  },
  {
    title: "Exciting red ambient lighting",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/mob/creta-n-line-suv-convenience-dashboard.jpg",
  },
  {
    title: "Wireless phone charger",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/mob/creta-n-line-suv-convenience-wirelesscharger.jpg",
  },
  {
    title: "Voice enabled smart panoramic sunroof",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/Convenience%20-%204%20-%20sunroof.jpg",
  },
  {
    title: "USB charger (C type)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/mob/creta-n-line-suv-convenience-poweroutlet.jpg",
  },
];

const SAFETY_CARDS = [
  {
    title: "SVM & BVM",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/Big-image-1st.jpg",
  },
  {
    title: "Six airbags (standard)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/Big-image-2.jpg",
  },
  {
    title: "Electric parking brake with Auto Hold",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-ABS.jpg",
  },
  {
    title: "Tyre Pressure Monitoring System (Highline)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-display.jpg",
  },
  {
    title: "Hill Start Assist Control",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety.jpg",
  },
  {
    title: "Electronic Stability Control & VSM",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/ESC.jpg",
  },
  {
    title: "Automatic headlamps",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlineheadlamp.jpg",
  },
  {
    title: "Emergency stop signal",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-headlamp.jpg",
  },
  {
    title: "Front parking sensors",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinefrontparkingsensors.jpg",
  },
];

// Performance images (using official Hyundai images that reflect powertrain/handling cues)
const PERFORMANCE_CARDS = [
  {
    title: "1.5l Turbo GDi petrol engine",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/pc/creta-n-line%20suv%20performance-dieselengine-1.jpg",
    caption: "Turbocharged GDi engine (official page hero image)",
  },
  {
    title: "7‑speed DCT (Dual clutch transmission)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance-automatictransmission.jpg",
    caption: "Quick, seamless gear shifts",
  },
  {
    title: "6‑speed MT (Manual transmission)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance-manualtransmission.jpg",
    caption: "Engaging stick-shift control",
  },
  {
    title: "Paddle shifters (DCT only)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance.jpg",
    caption: "Manual override on the fly",
  },
  {
    title: "Traction control modes (Snow, Mud, Sand)",
    img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance-topview.jpg",
    caption: "Adapt grip for varying surfaces",
  },
];

// FIX: Remove duplicated/destructured param redeclaration that caused syntax error
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-lg">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 shadow-lg">{subtitle}</p>}
    </div>
  );
}

function ImageGrid({ items }: { items: { src: string; caption?: string }[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((img, i) => (
        <figure key={i} className="group relative overflow-hidden rounded-2xl shadow hover:shadow-xl transition">
          <img
            src={img.src}
            alt={img.caption || "CRETA N Line"}
            className="w-full h-64 object-cover group-hover:scale-[1.03] transition"
            loading="lazy"
          />
          {img.caption && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-sm p-3">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function KeyValueTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl shadow">
        <table className="w-full">
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={`text-sm md:text-base ${i % 2 ? "bg-gray-50" : "bg-white"}`}>
                <td className="font-medium p-4 w-1/3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">{r.label}</td>
                <td className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm bg-white/10 backdrop-blur-md border-white/20 shadow-lg">
      {children}
    </span>
  );
}

// Optional smoke tests: flip to true to render test blocks in-page
const __DEV_TESTS__ = false;

export default function CretaNLinePage() {

  return (
    <div className="min-h-screen bg-transparent text-gray-900">
      {/* Fixed background video */}
      <div className="fixed inset-0 -z-10">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/creta-nline-bg.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Sticky sub‑nav */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight">CRETA N Line</a>
          <div className="hidden md:flex gap-4 text-sm">
            {[
              "Highlights",
              "Exterior",
              "Interior",
              "Performance",
              "Safety",
              "Convenience",
              "Specifications",
              "Features",
            ].map((t) => (
              <a key={t} href={`#${t.toLowerCase()}`} className="hover:text-black/80">
                {t}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-lg">
                Exhilarating outside. Inside the beast.
              </h1>
              <p className="mt-4 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 shadow-lg">
                Based on WRC‑inspired design, the CRETA N Line blends an aggressive stance with a
                feature‑rich cockpit. 1.5L Turbo GDi, 26.03 cm dual screens, Bose audio, Level 2 ADAS on select
                variants, and 42+ standard safety features.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>1.5L Turbo GDi</Pill>
                <Pill>7‑Speed DCT / 6MT</Pill>
                <Pill>Level 2 ADAS*</Pill>
                <Pill>6 Airbags Std.</Pill>
                <Pill>R18 Alloys</Pill>
              </div>
              <p className="text-xs bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 mt-2 shadow-lg">*Availability varies by variant.</p>
              <div className="mt-8 flex gap-3">
                <a
                  href="https://www.hyundai.com/in/en/find-a-car/creta-n-line/highlights"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl border shadow hover:shadow-md"
                >
                  Official highlights
                </a>
                <a
                  href="https://www.hyundai.com/in/en/find-a-car/creta-n-line/exterior"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl border shadow hover:shadow-md"
                >
                  Exterior page
                </a>
            </div>
          </div>
          <div className="relative">
              {/* Hero section now has no images - clean text-only design */}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights">
        <SectionHeading title="Highlights" subtitle="What stands out at a glance" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {HIGHLIGHTS_CARDS.map((c, i) => (
            <div key={i} className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
              {c.img && (
                <img src={c.img} alt={c.title} className="w-full h-40 object-cover" loading="lazy" />
              )}
              <div className="p-5">
                <h3 className="font-semibold mb-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{c.title}</h3>
                <p className="text-sm text-gray-600 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{c.body}</p>
        </div>
          </div>
          ))}
        </div>
      </section>

      {/* Exterior */}
      <section id="exterior">
        <SectionHeading title="Exterior" subtitle="Aggressive stance, red inserts, R18 alloys" />
        <ImageGrid items={EXTERIOR_IMAGES} />
      </section>

      {/* Interior */}
      <section id="interior">
        <SectionHeading title="Interior" subtitle="All‑black sporty cabin with red accents" />
        <ImageGrid items={INTERIOR_IMAGES} />
      </section>

      {/* Performance */}
      <section id="performance">
        <SectionHeading title="Performance" subtitle="Turbocharged power with choice of MT/DCT" />
        {/* Performance image cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {PERFORMANCE_CARDS.map((p, i) => (
            <figure key={i} className="rounded-2xl border bg-white overflow-hidden shadow-sm">
              <img src={p.img} alt={p.title} className="w-full h-40 object-cover" loading="lazy" />
              <figcaption className="p-5">
                <div className="font-semibold text-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{p.title}</div>
                {p.caption && <div className="text-xs text-gray-600 mt-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{p.caption}</div>}
              </figcaption>
            </figure>
          ))}
            </div>
        {/* Key performance specs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6 mt-6">
          {[
            {
              k: "Engine",
              v: "1.5L Turbo GDi (1482 cc)",
            },
            { k: "Power", v: "~160 PS (approx. 158 bhp)" },
            { k: "Torque", v: "253 Nm" },
            { k: "Gearboxes", v: "6‑speed MT / 7‑speed DCT (variant dependent)" },
            { k: "Drive", v: "FWD" },
            { k: "Suspension", v: "MacPherson Strut front / Twist Beam rear" },
          ].map((it, i) => (
            <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-xs uppercase text-gray-500 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{it.k}</div>
              <div className="font-semibold bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{it.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section id="safety">
        <SectionHeading title="Safety" subtitle="42+ standard features, 6 airbags, Level 2 ADAS*" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {SAFETY_CARDS.map((s, i) => (
            <div key={i} className="rounded-2xl border bg-white overflow-hidden shadow-sm">
              <img src={s.img} alt={s.title} className="w-full h-40 object-cover" loading="lazy" />
              <div className="p-5">
                <p className="text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{s.title}</p>
        </div>
            </div>
          ))}
        </div>
        <p className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 shadow-lg">*Feature availability varies by variant. Always refer to official specification.</p>
      </section>

      {/* Convenience */}
      <section id="convenience">
        <SectionHeading title="Convenience" subtitle="Comfort & everyday usability" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {CONVENIENCE_CARDS.map((s, i) => (
            <div key={i} className="rounded-2xl border bg-white overflow-hidden shadow-sm">
              <img src={s.img} alt={s.title} className="w-full h-40 object-cover" loading="lazy" />
              <div className="p-5">
                <p className="text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{s.title}</p>
        </div>
          </div>
        ))}
      </div>
      </section>

      {/* Specifications */}
      <section id="specifications">
        <SectionHeading title="Specifications" subtitle="Key technical details" />
        <KeyValueTable rows={SPEC_TABLE} />
      </section>

      {/* Features */}
      <section id="features">
        <SectionHeading title="Features" subtitle="Tech, comfort & connectivity" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold mb-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">Technology</h3>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {FEATURES.tech.map((f, i) => (
                <li key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{f}</li>
              ))}
            </ul>
                  </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold mb-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">Comfort</h3>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {FEATURES.comfort.map((f, i) => (
                <li key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">{f}</li>
              ))}
            </ul>
        </div>
      </div>
      </section>

      {/* Developer Smoke Tests (hidden by default) */}
      {__DEV_TESTS__ && (
        <section id="__tests__" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h3 className="text-sm uppercase text-gray-500 mb-2">Dev Smoke Tests</h3>
          {/* Test 1: SectionHeading with subtitle */}
          <SectionHeading title="Test: SectionHeading" subtitle="Should render without syntax error" />
          {/* Test 2: SectionHeading w/o subtitle */}
          <SectionHeading title="Heading without subtitle" />
          {/* Test 3: ImageGrid minimal */}
          <ImageGrid items={[EXTERIOR_IMAGES[0]]} />
          {/* Test 4: KeyValueTable minimal */}
          <KeyValueTable rows={[{ label: "Sample", value: "Value" }]} />
        </section>
      )}

      {/* Front view above strip */}
      <section className="max-w-7xl mx-auto px-4 mb-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img src="https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinebig4.jpg" alt="Creta N Line front view" className="h-[50vh] w-full object-cover" />
        </div>
      </section>

      {/* Bottom slow-scrolling strip - All page images */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="relative">
            <div className="flex gap-4 animate-scroll-slow">
              {[
                // Highlights images
                ...HIGHLIGHTS_CARDS.map(card => card.img),
                // Exterior images
                ...EXTERIOR_IMAGES.map(img => img.src),
                // Interior images
                ...INTERIOR_IMAGES.map(img => img.src),
                // Convenience images
                ...CONVENIENCE_CARDS.map(card => card.img),
                // Safety images
                ...SAFETY_CARDS.map(card => card.img),
                // Duplicate for continuous scroll
                ...HIGHLIGHTS_CARDS.map(card => card.img),
                ...EXTERIOR_IMAGES.map(img => img.src),
                ...INTERIOR_IMAGES.map(img => img.src),
                ...CONVENIENCE_CARDS.map(card => card.img),
                ...SAFETY_CARDS.map(card => card.img),
              ].map((src, i) => (
                <div key={`${src}-${i}`} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                  <img src={src} alt={`Creta N Line ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
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
      </section>

      {/* Footer note */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-gray-500">
        <p className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 shadow-lg">
          Image & information credit: Hyundai Motor India official pages. Some features vary by
          variant. For the latest details, please refer to Hyundai India.
        </p>
      </footer>
    </div>
  );
}

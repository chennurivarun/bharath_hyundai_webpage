"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
// Use static path from public to avoid bundler loaders for media
const VenueNLineVideoSrc = "/assets1/Hyundai N Line _ It s time to play.mp4";

type CardItem = { src: string; name: string };

export default function VenueNLineSinglePage() {
  const toId = (label: string) =>
    label.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

  // Fallback data (using actual venue images)
  const FALLBACK = {
    highlights: [
      { src: "/images/cars/venue/venue_highlights_544x360.jpg", name: "N Line Highlights" },
      { src: "/images/cars/venue/Hyundai-venue-suv-highlight-small-pc-544x360_1.jpg", name: "Sporty Design" },
      { src: "/images/cars/venue/Hyundai-venue-suv-highlight-small-pc-544x360_3.jpg", name: "Performance Features" },
      { src: "/images/cars/venue/Hyundai-venue-suv-highlight-small-pc-544x360_4.jpg", name: "Technology Integration" },
      { src: "/images/cars/venue/venue_highlights_gallery_1120x600.jpg", name: "N Line Styling" },
      { src: "/images/cars/venue/venue-knight-big.jpg", name: "Premium Features" },
    ] as CardItem[],
    exterior: [
      { src: "/images/cars/venue/venue_exterior_1120x600.jpg", name: "Front Design" },
      { src: "/images/cars/venue/venue_exterior_2_1120x600.jpg", name: "Side Profile" },
      { src: "/images/cars/venue/venue_exterior_3_1120x600.jpg", name: "Rear Design" },
      { src: "/images/cars/venue/venue-knight-small-Grille.jpg", name: "N Line Grille" },
      { src: "/images/cars/venue/Hyundai-venue-suv-exterior-middle-1120x600-15-revised.jpg", name: "LED Headlamps" },
      { src: "/images/cars/venue/venue-knight-small-Tyre.jpg", name: "Alloy Wheels" },
      { src: "/images/cars/venue/venue-exterior-rear 3.jpg", name: "Sporty Bumper" },
      { src: "/images/cars/venue/venue-exterior-side 2.jpg", name: "Red Accents" },
      { src: "/images/cars/venue/venue-exteriormid-2.jpg", name: "N Line Badging" },
      { src: "/images/cars/venue/venue-suv-exteriormid-3.jpg", name: "Exterior Details" },
    ] as CardItem[],
    interior: [
      { src: "/images/cars/venue/venue_interiorsaf.jpg", name: "N Line Interior" },
      { src: "/images/cars/venue/venue-knight-small-seating.jpg", name: "Sport Seats" },
      { src: "/images/cars/venue/venue-knight-small-interior.jpg", name: "Dashboard Design" },
      { src: "/images/cars/venue/interior-bottom4.jpg", name: "Cabin Layout" },
      { src: "/images/cars/venue/venue-suv-interior-bottom-2.jpg", name: "Steering Wheel" },
      { src: "/images/cars/venue/venue-suv-interior-bottom-3.jpg", name: "Interior Details" },
      { src: "/images/cars/venue/venue_interiorsaf1.png", name: "Premium Interior" },
    ] as CardItem[],
    performance: [
      { src: "/images/cars/venue/venue_turbo2.jpg", name: "Turbo Engine" },
      { src: "/images/cars/venue/venue-performance-1.jpg", name: "Performance Features" },
      { src: "/images/cars/venue/venue-performance-5.jpg", name: "Engine Technology" },
      { src: "/images/cars/venue/venue_performance_1120x600.jpg", name: "Transmission" },
      { src: "/images/cars/venue/Hyundai-venue-suv-performance-top-1120x600-1-revised.jpg", name: "Drive Modes" },
    ] as CardItem[],
    safety: [
      { src: "/images/cars/venue/venue_safetypc.png", name: "Safety Overview" },
      { src: "/images/cars/venue/venue-safety-mid-1.jpg", name: "Airbag System" },
      { src: "/images/cars/venue/venue-safety-mid-2.jpg", name: "ESC System" },
      { src: "/images/cars/venue/venue-safety-mid-4.jpg", name: "Safety Features" },
      { src: "/images/cars/venue/venue-safety-mid-5.jpg", name: "Advanced Safety" },
      { src: "/images/cars/venue/venue-safety-mid-6.jpg", name: "Safety Technology" },
      { src: "/images/cars/venue/venue-safety-top-2.jpg", name: "Driver Assistance" },
      { src: "/images/cars/venue/venue-knight-small-dashcam.jpg", name: "Dashcam System" },
      { src: "/images/cars/venue/venue-knight-small-iRVM.jpg", name: "Integrated IRVM" },
      { src: "/images/cars/venue/venue-suv-safety-mid-7.jpg", name: "Blind Spot Monitor" },
      { src: "/images/cars/venue/venue-image-7.jpg", name: "Collision Avoidance" },
      { src: "/images/cars/venue/venue-image-8.jpg", name: "Safety Alert System" },
      { src: "/images/cars/venue/venue-image-10.jpg", name: "Driver Attention" },
      { src: "/images/cars/venue/vneu-image-6.jpg", name: "Advanced Safety Tech" },
      { src: "/images/cars/venue/vneue-image-9.jpg", name: "Safety Technology" },
    ] as CardItem[],
    convenience: [
      { src: "/images/cars/venue/venue-convenience-bottom-a5.jpg", name: "Convenience Overview" },
      { src: "/images/cars/venue/venue-convenience-bottom-a7.jpg", name: "Smart Features" },
      { src: "/images/cars/venue/venue-convenience-bottom-a8.jpg", name: "Connectivity" },
      { src: "/images/cars/venue/venue-convenience-bottom-a9.jpg", name: "Infotainment" },
      { src: "/images/cars/venue/venue-convenience-bottom-a10.jpg", name: "Bluelink Features" },
      { src: "/images/cars/venue/venue-image-1.jpg", name: "Wireless Charging" },
      { src: "/images/cars/venue/venue-image-2.jpg", name: "Climate Control" },
      { src: "/images/cars/venue/venue-image-3.jpg", name: "Convenience & Safety" },
      { src: "/images/cars/venue/venue-image-4.jpg", name: "Storage Solutions" },
      { src: "/images/cars/venue/venue-image-5.jpg", name: "Premium Convenience" },
    ] as CardItem[],
  } as const;

  const [highlights, setHighlights] = useState<CardItem[]>(FALLBACK.highlights);
  const [exterior, setExterior] = useState<CardItem[]>(FALLBACK.exterior);
  const [interior, setInterior] = useState<CardItem[]>(FALLBACK.interior);
  const [performance, setPerformance] = useState<CardItem[]>(FALLBACK.performance);
  const [safety, setSafety] = useState<CardItem[]>(FALLBACK.safety);
  const [convenience, setConvenience] = useState<CardItem[]>(FALLBACK.convenience);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/images/cars/venue-nline/manifest.json', { cache: 'no-store' });
        if (!res.ok) return;
        const m = await res.json();
        const cats = m?.categories || {};
        const map = (key: string): CardItem[] =>
          Array.isArray(cats[key]) ? cats[key].map((it: any) => ({ src: it.src, name: it.title || it.file })) : [];
        const hl = map('highlights');
        const ex = map('exterior');
        const inn = map('interior');
        const pf = map('performance');
        const sf = map('safety');
        const cv = map('convenience');
        if (hl.length) setHighlights(hl);
        if (ex.length) setExterior(ex);
        if (inn.length) setInterior(inn);
        if (pf.length) setPerformance(pf);
        if (sf.length) setSafety(sf);
        if (cv.length) setConvenience(cv);
      } catch {}
    };
    load();
  }, []);

  return (
    <div className="bg-transparent text-white font-sans">
      {/* Sticky Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src={VenueNLineVideoSrc}
      />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50 border-b border-neutral-800 flex justify-between items-center px-10 py-4">
        <h1 className="text-2xl font-bold text-white tracking-wider bg-white/10 backdrop-blur-md rounded-md px-3 py-1 shadow-lg border border-white/10">VENUE N LINE</h1>
        <div className="flex gap-6 text-gray-300 text-sm font-medium">
          {["Highlights","Exterior","Interior","Performance","Safety","Convenience","Specifications","Variants & Pricing","Variant Comparison","Features"].map((item) => (
            <a key={item} href={`#${toId(item)}`} className="hover:text-red-500 transition-colors bg-white/10 backdrop-blur-md rounded-md px-3 py-1 border border-white/10">{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 bg-black/60" />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-6xl font-extrabold z-10 text-white tracking-tight bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 shadow-2xl border border-white/10">Hyundai VENUE N LINE</motion.h1>
        <p className="z-10 mt-4 text-lg text-gray-300 max-w-2xl bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">Playful design meets sporty performance. Get set. Play.</p>
        <div className="z-10 flex gap-4 mt-8">
          <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold">Request Test Drive</Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">Download Brochure</Button>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Highlights</h2>
        <div className="mx-auto max-w-3xl bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 text-gray-200 text-center mb-8">
          <p className="leading-relaxed">
            Get set, play: VENUE N Line amplifies everyday drives with playful N Line design,
            red accents, and tech that keeps you connected and entertained.
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-gray-100">
            <li className="bg-white/10 rounded-md px-3 py-2 border border-white/10">Home-to-Car with Alexa</li>
            <li className="bg-white/10 rounded-md px-3 py-2 border border-white/10">Ambient Sounds of Nature</li>
            <li className="bg-white/10 rounded-md px-3 py-2 border border-white/10">60+ Bluelink connected features</li>
            <li className="bg-white/10 rounded-md px-3 py-2 border border-white/10">8" HD infotainment with Bluelink</li>
            <li className="bg-white/10 rounded-md px-3 py-2 border border-white/10">Dashcam with dual camera</li>
          </ul>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item,i)=>(
            <div key={i} className="rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-white/10 backdrop-blur-md border border-white/10">
              <img src={item.src} alt={item.name} className="w-full h-64 object-cover"/>
              <div className="p-4">
                <h3 className="text-white font-medium text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exterior Section */}
      <section id="exterior" className="max-w-7xl mx-auto px-6 py-24 bg-transparent">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Exterior</h2>
        <div className="mx-auto max-w-3xl bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 text-gray-200 text-center mb-8">
          <p className="leading-relaxed">
            A bold, athletic stance with signature N Line touches—dark chrome grille, red accents,
            and sporty design cues built to stand out.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {exterior.map((item,i)=>(
            <div key={i} className="rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-white/10 backdrop-blur-md border border-white/10">
              <img src={item.src} alt={item.name} className="w-full h-64 object-cover"/>
              <div className="p-4">
                <h3 className="text-white font-medium text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interior Section */}
      <section id="interior" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Interior</h2>
        <div className="mx-auto max-w-3xl bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 text-gray-200 text-center mb-8">
          <p className="leading-relaxed">
            Step into the N Line cabin: leatherette seats with N logos, red ambient lighting,
            a digital cluster, and an N-branded steering wheel that feels ready to play.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {interior.map((item,i)=>(
            <div key={i} className="rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-white/10 backdrop-blur-md border border-white/10">
              <img src={item.src} alt={item.name} className="w-full h-64 object-cover"/>
              <div className="p-4">
                <h3 className="text-white font-medium text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="max-w-7xl mx-auto px-6 py-24 bg-transparent">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Performance</h2>
        <div className="mx-auto max-w-3xl bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 text-gray-200 text-center mb-8">
          <p className="leading-relaxed">
            1.0 Turbo GDi pairs with 6MT or 7DCT for eager performance.
            Tuned exhaust note and dynamic calibration deliver a sportier feel.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {performance.map((item,i)=>(
            <div key={i} className="rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-white/10 backdrop-blur-md border border-white/10">
              <img src={item.src} alt={item.name} className="w-full h-64 object-cover"/>
              <div className="p-4">
                <h3 className="text-white font-medium text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Safety</h2>
        <div className="mx-auto max-w-3xl bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 text-gray-200 text-center mb-8">
          <p className="leading-relaxed">
            Peace of mind standard: six airbags, ESC, rear camera, and driver-assistance
            features designed to inspire confidence.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {safety.map((item,i)=>(
            <div key={i} className="rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-white/10 backdrop-blur-md border border-white/10">
              <img src={item.src} alt={item.name} className="w-full h-64 object-cover"/>
              <div className="p-4">
                <h3 className="text-white font-medium text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Convenience Section */}
      <section id="convenience" className="max-w-7xl mx-auto px-6 py-24 bg-transparent">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Convenience</h2>
        <div className="mx-auto max-w-3xl bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 text-gray-200 text-center mb-8">
          <p className="leading-relaxed">
            Smart electric sunroof, wireless charging and connected features make
            every trip effortless and entertaining.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {convenience.map((item,i)=>(
            <div key={i} className="rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-white/10 backdrop-blur-md border border-white/10">
              <img src={item.src} alt={item.name} className="w-full h-64 object-cover"/>
              <div className="p-4">
                <h3 className="text-white font-medium text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specifications" className="max-w-7xl mx-auto px-6 py-24 bg-transparent">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Specifications</h2>
        <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <table className="w-full table-auto text-left border-collapse text-gray-300">
            <tbody>
              <tr><th className="pr-4 pb-2 font-medium text-white">Engine Type</th><td className="pb-2">Kappa 1.0 Turbo GDi (Petrol)</td></tr>
              <tr><th className="pr-4 pb-2 font-medium text-white">Displacement</th><td className="pb-2">998 cc</td></tr>
              <tr><th className="pr-4 pb-2 font-medium text-white">Max Power</th><td className="pb-2">120 PS @ 6,000 rpm</td></tr>
              <tr><th className="pr-4 pb-2 font-medium text-white">Max Torque</th><td className="pb-2">172 Nm @ 1,500–4,000 rpm</td></tr>
              <tr><th className="pr-4 pb-2 font-medium text-white">Transmission</th><td className="pb-2">6-speed MT / 7-speed DCT</td></tr>
              <tr><th className="pr-4 pb-2 font-medium text-white">Fuel Type</th><td className="pb-2">Petrol</td></tr>
              <tr><th className="pr-4 pb-2 font-medium text-white">Mileage (ARAI)</th><td className="pb-2">18 km/l</td></tr>
              <tr><th className="pr-4 pb-2 font-medium text-white">Fuel Tank Capacity</th><td className="pb-2">45 litres</td></tr>
              <tr><th className="pr-4 pb-2 font-medium text-white">Dimensions (LxWxH)</th><td className="pb-2">3995 x 1770 x 1617 mm</td></tr>
              <tr><th className="pr-4 pb-2 font-medium text-white">Boot Space</th><td className="pb-2">350 litres</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Variants & Pricing Section */}
      <section id="variants-pricing" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Variants & Price List</h2>
        <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <table className="w-full table-auto text-left border-collapse text-gray-300">
            <thead>
              <tr className="text-white border-b border-neutral-700">
                <th className="py-3 px-4">Variant</th>
                <th className="py-3 px-4">Transmission</th>
                <th className="py-3 px-4">Ex-Showroom Price*</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="py-3 px-4">N6 Turbo (MT)</td><td className="px-4">Manual</td><td className="px-4">₹11.11 Lakh</td></tr>
              <tr><td className="py-3 px-4">N6 Turbo DCT</td><td className="px-4">Automatic</td><td className="px-4">₹11.84 Lakh</td></tr>
              <tr><td className="py-3 px-4">N8 Turbo (MT)</td><td className="px-4">Manual</td><td className="px-4">₹11.95 Lakh</td></tr>
              <tr><td className="py-3 px-4">N8 Turbo DCT</td><td className="px-4">Automatic</td><td className="px-4">₹12.67 Lakh</td></tr>
              <tr><td className="py-3 px-4">N8 Turbo Dual Tone (MT)</td><td className="px-4">Manual</td><td className="px-4">₹12.08 Lakh</td></tr>
              <tr><td className="py-3 px-4">N8 Turbo DCT Dual Tone</td><td className="px-4">Automatic</td><td className="px-4">₹12.81 Lakh</td></tr>
            </tbody>
          </table>
          <p className="mt-4 text-sm text-gray-500 text-center">*Ex-showroom prices. May vary by city.</p>
        </div>
      </section>

      {/* Variant Comparison Section */}
      <section id="variant-comparison" className="max-w-7xl mx-auto px-6 py-24 bg-transparent">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Variant Comparison</h2>
        <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <table className="w-full table-auto text-left border-collapse text-gray-300">
            <thead>
              <tr className="text-white border-b border-neutral-700">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4">N6</th>
                <th className="py-3 px-4">N8</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="py-3 px-4">Transmission Options</td><td className="px-4">6MT / 7DCT</td><td className="px-4">6MT / 7DCT</td></tr>
              <tr><td className="py-3 px-4">Electric Sunroof</td><td className="px-4">—</td><td className="px-4">✔</td></tr>
              <tr><td className="py-3 px-4">Wireless Charger</td><td className="px-4">✔</td><td className="px-4">✔</td></tr>
              <tr><td className="py-3 px-4">Bluelink Connected Features</td><td className="px-4">Limited</td><td className="px-4">Full Suite</td></tr>
              <tr><td className="py-3 px-4">Seat Upholstery</td><td className="px-4">Fabric + Leatherette</td><td className="px-4">Full Leatherette with N Logo</td></tr>
              <tr><td className="py-3 px-4">Sound System</td><td className="px-4">Standard 4 Speaker</td><td className="px-4">Arkamys Premium 6 Speaker</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-red-500 mb-10 text-center bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/10 inline-block">Key Features</h2>
        <ul className="grid md:grid-cols-2 gap-4 text-gray-300 list-disc list-inside">
          <li className="bg-white/10 backdrop-blur-md rounded-md px-4 py-2 border border-white/10">Sporty metal pedals and N Line branding</li>
          <li className="bg-white/10 backdrop-blur-md rounded-md px-4 py-2 border border-white/10">8” HD touchscreen infotainment system</li>
          <li className="bg-white/10 backdrop-blur-md rounded-md px-4 py-2 border border-white/10">Wireless Android Auto & Apple CarPlay</li>
          <li className="bg-white/10 backdrop-blur-md rounded-md px-4 py-2 border border-white/10">Six airbags and advanced ESC system</li>
          <li className="bg-white/10 backdrop-blur-md rounded-md px-4 py-2 border border-white/10">Smart electric sunroof (N8 only)</li>
          <li className="bg-white/10 backdrop-blur-md rounded-md px-4 py-2 border border-white/10">Multiple drive modes – Eco, Normal, Sport</li>
          <li className="bg-white/10 backdrop-blur-md rounded-md px-4 py-2 border border-white/10">Hill-start assist and rear parking camera</li>
          <li className="bg-white/10 backdrop-blur-md rounded-md px-4 py-2 border border-white/10">Ambient lighting with customizable colors</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md text-center py-10 text-gray-500 border-t border-white/10">
        <p>© 2025 Hyundai Motor India. All rights reserved.</p>
      </footer>
    </div>
  );
}



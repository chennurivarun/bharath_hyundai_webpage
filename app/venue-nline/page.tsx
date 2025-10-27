"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
// Use static path from public to avoid bundler loaders for media
const VenueNLineVideoSrc = "/assets1/Hyundai N Line _ It s time to play.mp4";

export default function VenueNLineSinglePage() {
  const toId = (label: string) =>
    label.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');

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
          {[
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/venue_n_line_highlights_544x360.jpg", name: "N Line Highlights" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/highlight_small_800x530_2.jpg", name: "Sporty Design" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/highlight_small_800x530_3.jpg", name: "Performance Features" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/highlight_small_800x530_4.jpg", name: "Technology Integration" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/venue_n_line_highlights_1_544x360.jpg", name: "N Line Styling" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/Hyundai-venue-N-line-highlight-big-image-PC-1120x600-1.jpg", name: "Premium Features" },
          ].map((item,i)=>(
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
          {[
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_2_1600x580.jpg", name: "Front Design" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_1_1120x600_1.jpg", name: "Side Profile" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_1_1120x600_2.jpg", name: "Rear Design" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_1_1120x600_3.jpg", name: "N Line Grille" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_1_1120x600_5.jpg", name: "LED Headlamps" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_1_1120x600_6.jpg", name: "Alloy Wheels" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_1_1120x600_7.jpg", name: "Sporty Bumper" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_1_1120x600_8.jpg", name: "Red Accents" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_1_1120x600_9.jpg", name: "N Line Badging" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior_1_1120x600_10.jpg", name: "Exterior Details" },
          ].map((item,i)=>(
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
          {[
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/venue_n_line_highlights_1_544x360.jpg", name: "N Line Interior" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/interior_4_800x530_2.jpg", name: "Sport Seats" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/interior_4_800x530_3.jpg", name: "Dashboard Design" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/venue_n_line_highlights_544x360.jpg", name: "Cabin Layout" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/interior_4_800x530_5.jpg", name: "Steering Wheel" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/interior_4_800x530_6.jpg", name: "Interior Details" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/venuenlineinteriorinnerkv-pc.jpg", name: "Premium Interior" },
          ].map((item,i)=>(
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
          {[
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/venue_turbo1.jpg", name: "Turbo Engine" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/per_1_1120x600_2.jpg", name: "Performance Features" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/per_1_1120x600_2.jpg", name: "Engine Technology" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/per_3_800x530_1.jpg", name: "Transmission" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/per_3_800x530_2.jpg", name: "Drive Modes" },
          ].map((item,i)=>(
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
          {[
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/venue_n_line_safety.png", name: "Safety Overview" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/safety_1_1120x600_2.jpg", name: "Airbag System" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/safety_1_1120x600_3.jpg", name: "ESC System" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/safety_3_800x530_1.jpg", name: "Safety Features" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/safety_3_800x530_2.jpg", name: "Advanced Safety" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised-mid-image.jpg", name: "Safety Technology" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-n-line-10.jpg", name: "Driver Assistance" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-n-line-first-image.jpg", name: "Collision Avoidance" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-n-line-second.jpg", name: "Lane Keeping" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-n-line-3.jpg", name: "Blind Spot Monitor" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-n-line-4.jpg", name: "Rear Cross Traffic" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-n-line-5.jpg", name: "High Beam Assist" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-n-line-6.jpg", name: "Driver Attention" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-n-line-7.jpg", name: "Lane Following" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/revised/venue-n-line-8.jpg", name: "Forward Collision" },
          ].map((item,i)=>(
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
          {[
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venue_n_line_convenience_1120x600.jpg", name: "Convenience Overview" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/convenience/conv_1_1120x600_2.jpg", name: "Smart Features" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/convenience/conv_1_1120x600_2.jpg", name: "Connectivity" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/convenience/conv_1_1120x600_3.jpg", name: "Infotainment" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/convenience/conv_1_1120x600_4.jpg", name: "Bluelink Features" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/convenience/conv_4_800x530_1.jpg", name: "Wireless Charging" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/convenience/conv_4_800x530_3.jpg", name: "Climate Control" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/highlights/venue_n_line_consaf.png", name: "Convenience & Safety" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/convenience/conv_4_800x530_5.jpg", name: "Storage Solutions" },
            { src: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/convenience/conv_4_800x530_6.jpg", name: "Premium Convenience" },
          ].map((item,i)=>(
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



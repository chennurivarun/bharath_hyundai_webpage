"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Car,
  Image as ImageIcon,
  Gauge,
  Shield,
  Settings,
  ListChecks,
  Activity,
  ChevronRight,
} from "lucide-react";

const brand = { primary: "#002c5f" } as const;
const cn = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");
const isHttps = (url: string) => /^https:\/\//.test(url);

const Section = ({ id, title, icon, children }: { id: string; title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 py-12">
    <div className="flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2">
      <div className="p-2 rounded-xl bg-white/10 text-[color:var(--brand-primary)] border border-white/10">{icon}</div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
    {children}
  </section>
);

const Card = ({ title, img, desc }: { title: string; img: string; desc?: string }) => (
  <motion.figure
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35 }}
    className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm"
  >
    <div className="relative aspect-[16/9]">
      <img
        src={img}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <figcaption className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2">
          <div className="text-base md:text-lg font-semibold drop-shadow">{title}</div>
          {desc && <p className="mt-1 text-xs md:text-sm text-white/90 max-w-prose">{desc}</p>}
        </div>
      </figcaption>
    </div>
  </motion.figure>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-white/15 bg-white/10 backdrop-blur-md">
    {children}
  </span>
);

// CRETA Data Arrays
const HL = [
  { title: "CRETA King Limited Edition", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cretalimitedkingbig1.jpg", desc: "A legend crowned with exclusive touches" },
  { title: "CRETA Knight", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/pc/cretaknightkingalloy.jpg", desc: "All-black presence with red accents" },
  { title: "New CRETA", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-rear-2.jpg", desc: "Sharper, modern, and progressive design" },
  { title: "Horizon LED DRLs", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-front-3.jpg", desc: "Bold & futuristic front design" },
  { title: "Connecting LED Tail Lamps", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-rear-3-rev_LED%20rear%20turn%20signal%20with%20sequential%20function.jpg", desc: "Hi-tech & sporty rear design" },
  { title: "10.25\" Digital Cluster", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-big-1120x600-2.jpg", desc: "26.03 cm digital cluster" },
];

// CRETA Knight Section
const KNIGHT = [
  { title: "King Limited Emblem", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cretakinglimitedemblem.jpg" },
  { title: "King Limited Seat Belt Cover", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cretakinglimtedseatbelt.jpg" },
  { title: "King Limited Seat Cushion", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cetakinglimitedkingseat.jpg" },
  { title: "King Limited Key Fob", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cretakinglimitedkeyfob.jpg" },
  { title: "King Limited Dashcam", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cretakinglimiteddashcam.jpg" },
  { title: "King Limited Headlamp", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingheadlamp.jpg" },
];

const EX = [
  { title: "CRETA Knight Mountain View", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingmountain.jpg" },
  { title: "Front Design", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-front-2.jpg" },
  { title: "Side Profile 1", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-side-1.jpg" },
  { title: "Side Profile 2", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-side-2.jpg" },
  { title: "Exterior Detail 1", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-small-800x530-1.jpg" },
  { title: "Exterior Detail 2", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-small-800x530-2.jpg" },
  { title: "Exterior Detail 3", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-small-800x530-3.jpg" },
  { title: "Exterior Detail 4", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-small-800x530-4.jpg" },
];

const IN = [
  { title: "CRETA King Interior", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/cretakinginterior.jpg" },
  { title: "Dashboard & Cockpit", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-big-1120x600-1.jpg" },
  { title: "Premium Seats with Piping", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-big-1120x600-2.jpg" },
  { title: "Large Boot Space", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-small-830x530-2.jpg" },
  { title: "Power Driver Seat (8-way)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-small-830x530-3.jpg" },
  { title: "Interior Detail 4", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-small-830x530-4.jpg" },
  { title: "Interior Detail 7", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-small-830x530-7.jpg" },
  { title: "ISOFIX Child Seat Anchors", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/isofix-small.jpg" },
  { title: "Interior Row 1", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/cretasuvinteriorr1.jpg" },
  { title: "Interior Row 2", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/cretasuvinteriorr2.jpg" },
  { title: "Chromic Mirror", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretachromicmirror.jpg" },
];

const PF = [
  { title: "1.5l Petrol Turbo [7DCT]", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Performance/Hyundai-creta-suv-performance-big-1120x600-1-Turbo_1.5l-Petrol-Turbo-7DCT.jpg", desc: "Exhilarating drive experience" },
  { title: "1.5l Diesel [6MT • 6AT]", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Performance/pc/Hyundai-creta-suv-performance-big-1120x600-2-diesel.jpg", desc: "Balanced performance and mileage" },
  { title: "1.5l Petrol [6MT • IVT]", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Performance/pc/Hyundai-creta-suv-performance-big-1120x600-3-petrol.jpg", desc: "115 ps @ 6,300 rpm" },
  { title: "Normal Drive Mode", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Performance/pc/Hyundai-creta-suv-performance-small-512x340-1-Normal.jpg" },
  { title: "ECO Drive Mode", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Performance/pc/Hyundai-creta-suv-performance-small-512x340-2-Eco.jpg" },
  { title: "Sport Drive Mode", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Performance/pc/Hyundai-creta-suv-performance-small-512x340-3-Sports.jpg" },
  { title: "Leather Gear Knob", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingleathergear.jpg" },
  { title: "Gear Knob Detail", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakinggearknob.jpg" },
  { title: "Paddle Shifters", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Performance/pc/Hyundai-creta-suv-performance-small2-512x340-4-paddelshifter.jpg" },
];

const SF = [
  { title: "King Safety System", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/cretakingsafety1.jpg" },
  { title: "Hyundai SmartSense (19 ADAS features)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-safety-big.jpg" },
  { title: "Six Airbags Standard", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-safety-big-1120x600-3-six%20airbag.jpg" },
  { title: "Electronic Parking Brake with Auto-hold", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-safety-small-512x340-1-Electricbrake.jpg" },
  { title: "Tyre Pressure Monitoring System", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-safety-small-512x340-2-TPMS.jpg" },
  { title: "Hill-start Assist Control", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-safety-small-512x340-3-HAC.jpg" },
  { title: "Electronic Stability Control & VSM", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-safety-small-512x340-4-ESC.jpg" },
  { title: "Automatic Headlamps", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-safety-small-512x340-5-Autoheadlamp.jpg" },
  { title: "Emergency Stop Signal", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/revised/Hyundai-creta-suv-safety-small-512x340-6-emergency%20stop%20signal.jpg" },
  { title: "Front Parking Sensors", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingfrontparking.jpg" },
  { title: "ADAS Feature 1", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-1.jpg" },
  { title: "ADAS Feature 2", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-2.jpg" },
  { title: "Forward Collision Warning", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingfcw.jpg" },
  { title: "ADAS Feature 4", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-4.jpg" },
  { title: "ADAS Feature 5", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-5.jpg" },
  { title: "ADAS Feature 6", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-6.jpg" },
  { title: "ADAS Feature 7", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-7.jpg" },
  { title: "ADAS Feature 8", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-8.jpg" },
  { title: "ADAS Feature 9", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-9.jpg" },
  { title: "ADAS Feature 10", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-10.jpg" },
  { title: "King ADAS System", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingadas.jpg" },
  { title: "Smart Cruise Control", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingsmartcrusie.jpg" },
  { title: "Safe Exit Assist", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingadas-safeexist.jpg" },
  { title: "ADAS Feature 14", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-ADAS-800x530-14.jpg" },
  { title: "ISOFIX Child Seat Anchors", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/isofix-small.jpg" },
];

const CON = [
  { title: "Home-to-Car with Alexa", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-big-1120x600-1-Home2car.jpg" },
  { title: "26.03 cm (10.25\") Digital Cluster", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-big-1120x600-2.jpg" },
  { title: "Bose Premium Sound (8 speakers)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-big-1120x600-3-bose.jpg" },
  { title: "Traction Control Modes", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-big-1120x600-4-traction%20control.jpg" },
  { title: "Wireless Charger", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingbaselesscharger.jpg" },
  { title: "C-Type USB Ports", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingusbcharger.jpg" },
  { title: "Dual-zone Automatic Temperature Control", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingtemperaturecontrol.jpg" },
  { title: "Voice-enabled Smart Panoramic Sunroof", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-small-800x530-4-%20sunroof.jpg" },
  { title: "Soothing Amber Ambient Light", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-small-800x530-5-%20ambient%20lighting.jpg" },
];

const FEATURES = [
  "10.25\" infotainment with wireless Android Auto & Apple CarPlay~ (via adaptor)",
  "Digital key & Bluelink connected features",
  "Voice-enabled smart panoramic sunroof",
  "BOSE 8-speaker premium audio",
  "Dual-zone automatic temperature control",
  "ADAS Level 2 (SmartSense): FCW/FCA, SVM/BVM, and more (19 features)",
  "6 airbags standard; ESC, VSM, HAC, TPMS Highline",
  "60:40 split rear seat, rear AC vents, ISOFIX",
  "Wireless charger, USB-C ports",
  "R17 diamond-cut alloys, connected LED tail lamps",
];

const SPECS = [
  { category: "Engine", details: "1.5 Turbo GDi Petrol / 1.5 Diesel / 1.5 MPi Petrol" },
  { category: "Transmission", details: "MT • AT • DCT • IVT" },
  { category: "Power", details: "Up to 115 ps (MPi) — more on turbo" },
  { category: "Drive Modes", details: "Normal • Eco • Sport" },
  { category: "Key Safety", details: "6 Airbags, ADAS L2, ESC, HAC, TPMS" },
];

const BOTTOM_STRIP_IMAGES = [
  // Knight images
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cretakinglimitedemblem.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cretakinglimtedseatbelt.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cetakinglimitedkingseat.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cretakinglimitedkeyfob.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/kinglimited/cretakinglimiteddashcam.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingheadlamp.jpg",
  // Exterior images
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingmountain.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-front-2.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-side-1.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-side-2.jpg",
  // Interior images
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/cretakinginterior.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-big-1120x600-1.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-big-1120x600-2.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretachromicmirror.jpg",
  // Performance images
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Performance/Hyundai-creta-suv-performance-big-1120x600-1-Turbo_1.5l-Petrol-Turbo-7DCT.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingleathergear.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakinggearknob.jpg",
  // Safety images
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Safety/pc/Hyundai-creta-suv-safety-big.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingadas.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingsmartcrusie.jpg",
  // Convenience images
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-big-1120x600-1-Home2car.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-big-1120x600-2.jpg",
  "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-big-1120x600-3-bose.jpg"
];

export default function CretaPage() {
  const [activeSection, setActiveSection] = useState("highlights");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["highlights", "knight", "exterior", "interior", "performance", "safety", "convenience", "specs", "features"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/creta-interior.mp4"
      />
      <div className="absolute inset-0 bg-black/20 -z-10" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-[color:var(--brand-primary)] border border-white/10">
                <Car className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold">CRETA</h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {[
                { id: "highlights", label: "Highlights" },
                { id: "knight", label: "Knight" },
                { id: "exterior", label: "Exterior" },
                { id: "interior", label: "Interior" },
                { id: "performance", label: "Performance" },
                { id: "safety", label: "Safety" },
                { id: "convenience", label: "Convenience" },
                { id: "specs", label: "Specs" },
                { id: "features", label: "Features" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
            </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-2">
              <Chip>Hyundai</Chip>
              <Chip>CRETA</Chip>
              <Chip>King • Knight • New</Chip>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              KING. KNIGHT. CRETA.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
              A decade of leadership distilled into three distinct personalities — 
              <span className="font-semibold text-white"> CRETA King Limited Edition</span>, 
              <span className="font-semibold text-white"> CRETA Knight</span>, and the 
              <span className="font-semibold text-white"> New CRETA</span>.
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Sharper design, connected tech, and safety that looks out for you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a
                href="#highlights"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                Explore Highlights
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#exterior"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                See Gallery
                <ImageIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4">
        {/* Highlights Section */}
        <Section id="highlights" title="Highlights" icon={<Sparkles className="h-6 w-6" />}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HL.map((item, i) => (
              <Card key={i} title={item.title} img={item.img} desc={item.desc} />
            ))}
          </div>
        </Section>

        {/* Knight Section */}
        <Section id="knight" title="CRETA Knight" icon={<Car className="h-6 w-6" />}>
          <div className="mb-8">
            <p className="text-white/80 text-lg max-w-3xl">
              Exclusive King Limited Edition features with premium accessories and unique styling elements.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KNIGHT.map((item, i) => (
              <Card key={i} title={item.title} img={item.img} />
            ))}
          </div>
        </Section>

        {/* Exterior Section */}
        <Section id="exterior" title="Exterior" icon={<Car className="h-6 w-6" />}>
          <div className="mb-8">
            <p className="text-white/80 text-lg max-w-3xl">
              Black chrome parametric grille, horizon LED DRLs, sequential turn signals, 
              R17 diamond‑cut alloys, integrated roof rails, connected LED tail‑lamps.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EX.map((item, i) => (
              <Card key={i} title={item.title} img={item.img} />
            ))}
          </div>
        </Section>

        {/* Interior Section */}
        <Section id="interior" title="Interior" icon={<Settings className="h-6 w-6" />}>
          <div className="mb-8">
            <p className="text-white/80 text-lg max-w-3xl">
              Premium cabin with new seats & piping, refined cockpit, generous second row.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IN.map((item, i) => (
              <Card key={i} title={item.title} img={item.img} />
            ))}
        </div>
        </Section>

        {/* Performance Section */}
        <Section id="performance" title="Performance" icon={<Gauge className="h-6 w-6" />}>
          <div className="mb-8">
            <p className="text-white/80 text-lg max-w-3xl">
              Three refined powertrains. Multiple drive modes. Your pick of transmissions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PF.map((item, i) => (
              <Card key={i} title={item.title} img={item.img} desc={item.desc} />
            ))}
          </div>
        </Section>

        {/* Safety Section */}
        <Section id="safety" title="Safety" icon={<Shield className="h-6 w-6" />}>
          <div className="mb-8">
            <p className="text-white/80 text-lg max-w-3xl">
              70+ safety features with <span className="font-semibold text-white">6 airbags standard</span>. 
              Level 2 ADAS with SmartSense.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SF.map((item, i) => (
              <Card key={i} title={item.title} img={item.img} />
            ))}
        </div>
        </Section>

        {/* Convenience Section */}
        <Section id="convenience" title="Convenience & Connectivity" icon={<Activity className="h-6 w-6" />}>
          <div className="mb-8">
            <p className="text-white/80 text-lg max-w-3xl">
              Bluelink with Alexa H2C, 10.25" digital cluster, Bose 8‑speaker system, 
              traction control modes and more.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CON.map((item, i) => (
              <Card key={i} title={item.title} img={item.img} />
            ))}
          </div>
        </Section>

        {/* Specifications Section */}
        <Section id="specs" title="Specifications" icon={<ListChecks className="h-6 w-6" />}>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SPECS.map((spec, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">{spec.category}</h3>
                  <p className="text-white/80 text-sm">{spec.details}</p>
              </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Features Section */}
        <Section id="features" title="Key Features" icon={<ListChecks className="h-6 w-6" />}>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-white/90 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>

      {/* Hero Section Image Above Sliding Toggle */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img 
            src="https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-front-2.jpg" 
            alt="CRETA Front View" 
            className="h-[60vh] w-full object-cover" 
          />
        </div>
      </section>

      {/* Bottom Image Strip */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="relative">
            <div className="flex gap-4 animate-scroll-slow">
              {BOTTOM_STRIP_IMAGES.concat(BOTTOM_STRIP_IMAGES).map((src, i) => (
                <div key={`${src}-${i}`} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                  <img src={src} alt={`CRETA ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
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

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm">
            All information & images referenced from Hyundai India's official CRETA pages.
          </p>
        </div>
      </footer>
    </div>
  );
}
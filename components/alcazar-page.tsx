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

// All existing images organized by section
const HL = [
  { title: "Convenience Features", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Convenience/pc/alcazarconvenience1120x600_2.jpg" },
  { title: "ADAS Technology", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/adasalcazar.jpg" },
  { title: "IT Device Holder", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/ITdeviceholderandretractablecupholder.jpg" },
  { title: "Magnetic Pad", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/Magneticpad.jpg" },
  { title: "Technology Features", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/Tech512X340_4.jpg" },
  { title: "Tech Integration", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/tech-alcazar.jpg" },
  { title: "Passenger Seat Walk-in", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/tech-passenger-seat-walk-in.jpg" },
  { title: "Paddle Shifters", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/paddleshifters.jpg" },
  { title: "Traction Mode", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/transactionmodealcazar.jpg" },
  { title: "MT/AT Choice", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/choiceMTAT.jpg" },
  { title: "1.5 Turbo Engine", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/choice1.5turbo.jpg" }
];

const EX = [
  { title: "Exterior Design 1", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Teaser/512X340_1.jpg" },
  { title: "Exterior Design 2", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Teaser/512X340_2.jpg" },
  { title: "Exterior Design 3", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Teaser/512X340_3.jpg" },
  { title: "Exterior Design 4", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Teaser/512X340_4.jpg" },
  { title: "Exterior Design 5", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Teaser/512X340_5.jpg" },
  { title: "Exterior Design 6", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Teaser/512X340_6.jpg" }
];

const IN = [
  { title: "Interior Feature", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Interior/pc/smriti_feature.jpg" },
  { title: "Interior Overview", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/interiorsmall_v2.jpg" },
  { title: "Interior Detail", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/512X340_7.jpg" },
  { title: "2nd Row Seats", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/2ndrowseats.jpg" },
  { title: "Ventilated Seats", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/1stand2ndventilatedseats.jpg" },
  { title: "Power Seats", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/powerdriverpassengerseat.jpg" },
  { title: "IT Device Holder", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/ITdeviceholderandretractablecupholder.jpg" },
  { title: "Ambient Lighting", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/ambientlight.jpg" },
  { title: "Memory Seats", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/Memoryseats.jpg" },
  { title: "Wireless Charging", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/1strowand2ndrowcharge.jpg" },
  { title: "AC Vents", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/ACvents.jpg" },
  { title: "Magnetic Pad", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/Magneticpad.jpg" }
];

const PF = [
  { title: "Engine Performance 1", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Performance/pc/alcazarperformance1120x600_engine_1.jpg" },
  { title: "Engine Performance 2", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Performance/pc/alcazarperformance1120x600_engine_2.jpg" },
  { title: "Performance Feature 1", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Performance/mob/alcazarperformance512X340_1.jpg" },
  { title: "Performance Feature 2", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Performance/mob/alcazarperformance512X340_2.jpg" },
  { title: "Performance Overview", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Performance/mob/alcazarperformance.jpg" },
  { title: "Performance Feature 4", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Performance/mob/alcazarperformance512X340_4.jpg" },
  { title: "Performance Feature 7", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Performance/mob/alcazarperformance512X340_7.jpg" },
  { title: "Performance Feature 6", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Performance/mob/alcazarperformance512X340_6.jpg" }
];

const SF = [
  { title: "Safety Overview", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/pc/alcazarsafety1120x600.jpg" },
  { title: "Safety System 1", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/pc/alcazarsafety512X340_1.jpg" },
  { title: "Safety System 2", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/pc/alcazarsafety512X340_2.jpg" },
  { title: "Safety System 3", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/pc/alcazarsafety512X340_3.jpg" },
  { title: "Safety System 4", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/pc/alcazarsafety512X340_4.jpg" },
  { title: "Safety System 5", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/pc/alcazarsafety512X340_5.jpg" },
  { title: "Safety System 6", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/pc/alcazarsafety512X340_6.jpg" },
  { title: "Safety System 7", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/pc/alcazarsafety512X340_7.jpg" },
  { title: "Safety System 8", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/pc/alcazarsafety512X340_8.jpg" },
  { title: "Rear Cross Traffic Alert", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/rear-cross.jpg" },
  { title: "Forward Collision Avoidance - Car", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/forward-collision-fca-car.jpg" },
  { title: "Forward Collision Avoidance - Pedestrian", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/forward-collision-fca-ped.jpg" },
  { title: "Forward Collision Avoidance - Cycle", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/forward-collision-fca-cyl.jpg" },
  { title: "Forward Collision Avoidance - Junction Turning", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/forward-collision-fca-jt.jpg" },
  { title: "Blind Spot Collision Avoidance", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/blind-spot-collision-bca-bcw.jpg" },
  { title: "Lane Keeping Assist", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/lane-keeping-assist.jpg" },
  { title: "Lane Departure Warning", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/lane-departure-warning.jpg" },
  { title: "Driver Attention Warning", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/driver-attention-warning.jpg" },
  { title: "Safe Exit Warning", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/safe-exit-warning.jpg" },
  { title: "Smart Cruise Control", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/smart-cruise-control.jpg" },
  { title: "Lane Following Assist", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/lane-following-assist.jpg" },
  { title: "High Beam Assist", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/high-beam-assist.jpg" },
  { title: "Leading Vehicle Departure Alert", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Safety/leading-vehicle-departure-alert.jpg" },
  { title: "Convenience Feature 1", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Convenience/mob/alcazarconvenience512X340_1.jpg" },
  { title: "Convenience Feature 2", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Convenience/mob/alcazarconvenience512X340_2.jpg" },
  { title: "Convenience Feature 3", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Convenience/mob/alcazarconvenience512X340_3.jpg" },
  { title: "Convenience Feature 11", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Convenience/mob/alcazarconvenience512X340_11.jpg" }
];

const CON = [
  { title: "Features Table", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Features/mob/alcazar_features_table_512x340.jpg" }
];

const KNIGHT = [
  { title: "Knight Emblem", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazarknightemblembig.jpg" },
  { title: "Knight Skid Plate Bumper", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazar-skidplatebumper.jpg" },
  { title: "Knight Bridge Tyre", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazar-knightbridgetyre.jpg" },
  { title: "Knight Front Seat", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazarknightfrontseat.jpg" },
  { title: "Knight Dashboard", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazarknightdashboard.jpg" },
  { title: "Knight Alloy Wheels", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazar-alloy.jpg" }
];

const SPECS = [
  { k: 'Dimensions (mm)', v: '4560 × 1800 × 1710' },
  { k: 'Wheelbase (mm)', v: '2760' },
  { k: 'Tyres/Wheels', v: 'R18 alloys' },
  { k: 'Fuel', v: 'Petrol / Diesel' },
  { k: 'Transmission', v: '6MT/7DCT (Petrol), 6MT/6AT (Diesel)' },
];

const PRICING: Array<{ variant: string; powertrain: string; price: string }> = [
  { variant: 'Executive', powertrain: '1.5 Petrol 6MT', price: '₹ TBD*' },
  { variant: 'Prestige', powertrain: '1.5 Petrol 6MT', price: '₹ TBD*' },
  { variant: 'Corporate', powertrain: '1.5 Petrol 6MT', price: '₹ TBD*' },
  { variant: 'Platinum', powertrain: '1.5 Petrol 6MT', price: '₹ TBD*' },
  { variant: 'Signature', powertrain: '1.5 Petrol 6MT', price: '₹ TBD*' },
  { variant: 'Knight', powertrain: '1.5 Petrol 6MT', price: '₹ TBD*' },
];

export default function AlcazarPage() {
  const [activeTab, setActiveTab] = useState('highlights');
  const exteriorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', brand.primary);
  }, []);

  useEffect(() => {
    const handler = () => {
      const ids = ['highlights', 'exterior', 'interior', 'performance', 'safety', 'convenience', 'features', 'pricing', 'specs'];
      const offsets = ids.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, d: Infinity };
        return { id, d: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      offsets.sort((a, b) => a.d - b.d);
      setActiveTab(offsets[0]?.id ?? 'highlights');
    };

    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Auto-slide Exterior scroller without any cursor interaction
  useEffect(() => {
    const container = exteriorRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const el = exteriorRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const step = Math.max(240, Math.floor(el.clientWidth * 0.8));
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'highlights', label: 'Highlights', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'exterior', label: 'Exterior', icon: <Car className="w-4 h-4" /> },
    { id: 'interior', label: 'Interior', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Gauge className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" /> },
    { id: 'convenience', label: 'Convenience', icon: <Settings className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <Activity className="w-4 h-4" /> },
    { id: 'specs', label: 'Specs', icon: <Activity className="w-4 h-4" /> },
  ];

  useEffect(() => {
    try {
      console.assert(HL.length >= 4, 'HL should contain at least 4 highlight images');
      console.assert(EX.length >= 1, 'EX should contain exterior images');
      console.assert(IN.length >= 3, 'IN should contain interior images');
      console.assert(PF.length >= 3, 'PF should contain performance images');
      console.assert(SF.length >= 3, 'SF should contain safety images');
      console.assert(CON.length >= 1, 'CON should contain convenience images');
      console.assert(PRICING.length >= 4, 'PRICING should contain at least 4 rows');
      [...HL, ...EX, ...IN, ...PF, ...SF, ...CON, ...KNIGHT].forEach((item, idx) => {
        console.assert(Boolean(item.title && item.title.trim().length > 0), `Title must be non-empty (index ${idx})`);
        console.assert(isHttps(item.img), `Image URL must be https (index ${idx})`);
      });
      const tabIds = tabs.map(t => t.id);
      const uniq = new Set(tabIds);
      console.assert(uniq.size === tabIds.length, 'Tabs should have unique ids');
      console.assert(tabIds.includes('pricing'), 'Tabs should include pricing');
    } catch (e) {
      console.warn('Runtime tests encountered an issue:', e);
    }
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-transparent text-gray-900 dark:text-white">
        {/* Sticky Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10"
          src="/alcazar.mp4"
        />
        <header className="relative">
          {/* Top sticky nav */}
          <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:supports-[backdrop-filter]:bg-black/30 border-b border-gray-200 dark:border-white/10">
            <nav className="max-w-7xl mx-auto px-4 overflow-x-auto flex gap-2 py-2 no-scrollbar">
              {tabs.map((t) => (
                <a key={t.id} href={`#${t.id}`} className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border', activeTab === t.id ? 'bg-[color:var(--brand-primary)] text-white border-transparent' : 'hover:bg-gray-50 dark:hover:bg-white/10')}>
                  {t.icon}
                  <span>{t.label}</span>
                </a>
              ))}
            </nav>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[color:var(--brand-primary)] to-transparent" />
          </div>
          <div className="relative aspect-[21/9] overflow-hidden bg-transparent">
            <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white max-w-2xl">
              <div>
                <div className="text-xs uppercase tracking-widest mb-3 opacity-90">Bold & Versatile</div>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Hyundai ALCAZAR</h1>
                <p className="mt-3 text-base md:text-lg text-white/90">6/7‑seater SUV with premium interiors, SmartSense ADAS and refined powertrains.</p>
                <div className="mt-3 flex flex-wrap gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 inline-flex">
                  <Chip>6/7‑seater</Chip>
                  <Chip>SmartSense ADAS</Chip>
                  <Chip>1.5L Turbo</Chip>
                  <Chip>Knight Edition</Chip>
                </div>
                <div className="mt-6 flex gap-2">
                  <a href="#highlights" className="inline-flex items-center gap-2 rounded-2xl bg-[color:var(--brand-primary)] px-5 py-2 text-sm font-medium text-white shadow-lg shadow-[color:var(--brand-primary)]/30">
                    Explore <ChevronRight className="w-4 h-4" />
                  </a>
                  <a href="#specs" className="inline-flex items-center gap-2 rounded-2xl border px-5 py-2 text-sm font-medium bg-white/10 backdrop-blur">
                    Specs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 pb-28">
          <Section id="highlights" title="Highlights" icon={<Sparkles className="w-5 h-5" />}> 
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {HL.map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="exterior" title="Exterior" icon={<Car className="w-5 h-5" />}>
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-x-auto snap-x snap-mandatory no-scrollbar flex gap-4 pb-2"
              ref={exteriorRef}
            >
              {EX.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
                  className="min-w-[85%] sm:min-w-[55%] lg:min-w-[35%] snap-start"
                >
                  <Card title={c.title} img={c.img} />
                </motion.div>
              ))}
            </motion.div>
          </Section>

          <Section id="interior" title="Interior" icon={<ImageIcon className="w-5 h-5" />}>
            <div className="mb-6 overflow-hidden rounded-3xl border border-gray-200 dark:border:white/10">
              <div className="relative aspect-[21/9] bg-gray-100">
                <img src="https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Interior/pc/smriti_feature.jpg" alt="Interior main view" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {IN.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="performance" title="Performance" icon={<Gauge className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {PF.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-white/70">1.5L Turbo GDi petrol (MT/DCT) and 1.5L U2 CRDi diesel (MT/AT). Drive Modes and Traction Modes.</p>
          </Section>

          <Section id="safety" title="Safety & ADAS" icon={<Shield className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {SF.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="convenience" title="Convenience" icon={<Settings className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {CON.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="features" title="Knight Edition" icon={<ListChecks className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {KNIGHT.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="pricing" title="Pricing" icon={<Activity className="w-5 h-5" />}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PRICING.map((p, i) => (
                <div key={i} className="p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm">
                  <div className="text-sm opacity-80">{p.variant}</div>
                  <div className="text-lg font-medium">{p.powertrain}</div>
                  <div className="text-2xl font-bold text-[color:var(--brand-primary)]">{p.price}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="specs" title="Specifications" icon={<Activity className="w-5 h-5" />}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SPECS.map((s, i) => (
                <div key={i} className="p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm">
                  <div className="text-sm opacity-80">{s.k}</div>
                  <div className="text-lg font-medium">{s.v}</div>
                </div>
              ))}
            </div>
          </Section>
        </main>

        {/* Hero image at bottom */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img 
              src="https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Teaser/AlcazarBanner1600X580_3.jpg" 
              alt="Hyundai ALCAZAR" 
              className="h-[50vh] w-full object-cover" 
            />
          </div>
        </div>

        {/* Bottom slow-scrolling strip */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-24">
            <div className="relative">
              <div className="flex gap-4 animate-scroll-slow">
                {[...HL, ...EX, ...IN, ...PF, ...SF, ...CON, ...KNIGHT, ...HL, ...EX].map((c, i) => (
                  <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                    <img src={c.img} alt={`Alcazar ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style jsx>{`
            .animate-scroll-slow { animation: scrollX 40s linear infinite; width: max-content; }
            @keyframes scrollX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          `}</style>
        </div>
      </div>
    </div>
  );
}

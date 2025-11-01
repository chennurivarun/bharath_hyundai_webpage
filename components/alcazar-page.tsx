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
  { title: "Convenience Features", img: "/images/cars/alcazar/convenience/alcazarconvenience1120x600_2.jpg" },
  { title: "ADAS Technology", img: "/images/cars/alcazar/safety/adasalcazar.jpg" },
  { title: "IT Device Holder", img: "/images/cars/alcazar/ITdeviceholderandretractablecupholder.jpg" },
  { title: "Magnetic Pad", img: "/images/cars/alcazar/Magneticpad.jpg" },
  { title: "Technology Features", img: "/images/cars/alcazar/convenience/Tech512X340_4.jpg" },
  { title: "Tech Integration", img: "/images/cars/alcazar/convenience/tech-alcazar.jpg" },
  { title: "Passenger Seat Walk-in", img: "/images/cars/alcazar/interior/tech-passenger-seat-walk-in.jpg" },
  { title: "Paddle Shifters", img: "/images/cars/alcazar/paddleshifters.jpg" },
  { title: "Traction Mode", img: "/images/cars/alcazar/transactionmodealcazar.jpg" },
  { title: "MT/AT Choice", img: "/images/cars/alcazar/choiceMTAT.jpg" },
  { title: "1.5 Turbo Engine", img: "/images/cars/alcazar/performance/choice1.5turbo.jpg" }
];

const EX = [
  { title: "Exterior Design 1", img: "/images/cars/alcazar/exterior/512X340_1.jpg" },
  { title: "Exterior Design 2", img: "/images/cars/alcazar/exterior/512X340_2.jpg" },
  { title: "Exterior Design 3", img: "/images/cars/alcazar/exterior/512X340_3.jpg" },
  { title: "Exterior Design 4", img: "/images/cars/alcazar/exterior/512X340_4.jpg" },
  { title: "Exterior Design 5", img: "/images/cars/alcazar/exterior/512X340_5.jpg" },
  { title: "Exterior Design 6", img: "/images/cars/alcazar/exterior/512X340_6.jpg" }
];

const IN = [
  { title: "Interior Feature", img: "/images/cars/alcazar/interior/smriti_feature.jpg" },
  { title: "Interior Overview", img: "/images/cars/alcazar/interior/interiorsmall_v2.jpg" },
  { title: "Interior Detail", img: "/images/cars/alcazar/interior/512X340_7.jpg" },
  { title: "2nd Row Seats", img: "/images/cars/alcazar/interior/2ndrowseats.jpg" },
  { title: "Ventilated Seats", img: "/images/cars/alcazar/interior/1stand2ndventilatedseats.jpg" },
  { title: "Power Seats", img: "/images/cars/alcazar/interior/powerdriverpassengerseat.jpg" },
  { title: "IT Device Holder", img: "/images/cars/alcazar/ITdeviceholderandretractablecupholder.jpg" },
  { title: "Ambient Lighting", img: "/images/cars/alcazar/ambientlight.jpg" },
  { title: "Memory Seats", img: "/images/cars/alcazar/interior/Memoryseats.jpg" },
  { title: "Wireless Charging", img: "/images/cars/alcazar/1strowand2ndrowcharge.jpg" },
  { title: "AC Vents", img: "/images/cars/alcazar/ACvents.jpg" },
  { title: "Magnetic Pad", img: "/images/cars/alcazar/Magneticpad.jpg" }
];

const PF = [
  { title: "Engine Performance 1", img: "/images/cars/alcazar/performance/alcazarperformance1120x600_engine_1.jpg" },
  { title: "Engine Performance 2", img: "/images/cars/alcazar/performance/alcazarperformance1120x600_engine_2.jpg" },
  { title: "Performance Feature 1", img: "/images/cars/alcazar/performance/alcazarperformance512X340_1.jpg" },
  { title: "Performance Feature 2", img: "/images/cars/alcazar/performance/alcazarperformance512X340_2.jpg" },
  { title: "Performance Overview", img: "/images/cars/alcazar/performance/alcazarperformance.jpg" },
  { title: "Performance Feature 4", img: "/images/cars/alcazar/performance/alcazarperformance512X340_4.jpg" },
  { title: "Performance Feature 7", img: "/images/cars/alcazar/performance/alcazarperformance512X340_7.jpg" },
  { title: "Performance Feature 6", img: "/images/cars/alcazar/performance/alcazarperformance512X340_6.jpg" }
];

const SF = [
  { title: "Safety Overview", img: "/images/cars/alcazar/safety/alcazarsafety1120x600.jpg" },
  { title: "Safety System 1", img: "/images/cars/alcazar/safety/alcazarsafety512X340_1.jpg" },
  { title: "Safety System 2", img: "/images/cars/alcazar/safety/alcazarsafety512X340_2.jpg" },
  { title: "Safety System 3", img: "/images/cars/alcazar/safety/alcazarsafety512X340_3.jpg" },
  { title: "Safety System 4", img: "/images/cars/alcazar/safety/alcazarsafety512X340_4.jpg" },
  { title: "Safety System 5", img: "/images/cars/alcazar/safety/alcazarsafety512X340_5.jpg" },
  { title: "Safety System 6", img: "/images/cars/alcazar/safety/alcazarsafety512X340_6.jpg" },
  { title: "Safety System 7", img: "/images/cars/alcazar/safety/alcazarsafety512X340_7.jpg" },
  { title: "Safety System 8", img: "/images/cars/alcazar/safety/alcazarsafety512X340_8.jpg" },
  { title: "Rear Cross Traffic Alert", img: "/images/cars/alcazar/exterior/rear-cross.jpg" },
  { title: "Forward Collision Avoidance - Car", img: "/images/cars/alcazar/forward-collision-fca-car.jpg" },
  { title: "Forward Collision Avoidance - Pedestrian", img: "/images/cars/alcazar/forward-collision-fca-ped.jpg" },
  { title: "Forward Collision Avoidance - Cycle", img: "/images/cars/alcazar/forward-collision-fca-cyl.jpg" },
  { title: "Forward Collision Avoidance - Junction Turning", img: "/images/cars/alcazar/forward-collision-fca-jt.jpg" },
  { title: "Blind Spot Collision Avoidance", img: "/images/cars/alcazar/blind-spot-collision-bca-bcw.jpg" },
  { title: "Lane Keeping Assist", img: "/images/cars/alcazar/lane-keeping-assist.jpg" },
  { title: "Lane Departure Warning", img: "/images/cars/alcazar/lane-departure-warning.jpg" },
  { title: "Driver Attention Warning", img: "/images/cars/alcazar/driver-attention-warning.jpg" },
  { title: "Safe Exit Warning", img: "/images/cars/alcazar/safe-exit-warning.jpg" },
  { title: "Smart Cruise Control", img: "/images/cars/alcazar/smart-cruise-control.jpg" },
  { title: "Lane Following Assist", img: "/images/cars/alcazar/lane-following-assist.jpg" },
  { title: "High Beam Assist", img: "/images/cars/alcazar/high-beam-assist.jpg" },
  { title: "Leading Vehicle Departure Alert", img: "/images/cars/alcazar/leading-vehicle-departure-alert.jpg" },
  { title: "Convenience Feature 1", img: "/images/cars/alcazar/convenience/alcazarconvenience512X340_1.jpg" },
  { title: "Convenience Feature 2", img: "/images/cars/alcazar/convenience/alcazarconvenience512X340_2.jpg" },
  { title: "Convenience Feature 3", img: "/images/cars/alcazar/convenience/alcazarconvenience512X340_3.jpg" },
  { title: "Convenience Feature 11", img: "/images/cars/alcazar/convenience/alcazarconvenience512X340_11.jpg" }
];

const CON = [
  { title: "Features Table", img: "/images/cars/alcazar/alcazar_features_table_512x340.jpg" }
];

const KNIGHT = [
  { title: "Knight Emblem", img: "/images/cars/alcazar/knight/alcazarknightemblembig.jpg" },
  { title: "Knight Skid Plate Bumper", img: "/images/cars/alcazar/knight/alcazar-skidplatebumper.jpg" },
  { title: "Knight Bridge Tyre", img: "/images/cars/alcazar/knight/alcazar-knightbridgetyre.jpg" },
  { title: "Knight Front Seat", img: "/images/cars/alcazar/exterior/alcazarknightfrontseat.jpg" },
  { title: "Knight Dashboard", img: "/images/cars/alcazar/interior/alcazarknightdashboard.jpg" },
  { title: "Knight Alloy Wheels", img: "/images/cars/alcazar/knight/alcazar-alloy.jpg" }
];

const SPECS = [
  { k: 'Dimensions (mm)', v: '4560 × 1800 × 1710' },
  { k: 'Wheelbase (mm)', v: '2760' },
  { k: 'Tyres/Wheels', v: 'R18 alloys' },
  { k: 'Fuel', v: 'Petrol / Diesel' },
  { k: 'Transmission', v: '6MT/7DCT (Petrol), 6MT/6AT (Diesel)' },
];

const PRICING: Array<{ variant: string; powertrain: string; price: string }> = [
  { variant: 'Executive', powertrain: '1.5L Petrol 6MT', price: '₹ 16.77 Lakh*' },
  { variant: 'Executive', powertrain: '1.5L Diesel 6MT', price: '₹ 18.07 Lakh*' },
  { variant: 'Prestige', powertrain: '1.5L Petrol 6MT', price: '₹ 18.67 Lakh*' },
  { variant: 'Prestige', powertrain: '1.5L Petrol 7DCT', price: '₹ 20.67 Lakh*' },
  { variant: 'Prestige', powertrain: '1.5L Diesel 6MT', price: '₹ 19.97 Lakh*' },
  { variant: 'Prestige', powertrain: '1.5L Diesel 6AT', price: '₹ 21.97 Lakh*' },
  { variant: 'Corporate', powertrain: '1.5L Petrol 6MT', price: '₹ 19.87 Lakh*' },
  { variant: 'Corporate', powertrain: '1.5L Petrol 7DCT', price: '₹ 21.87 Lakh*' },
  { variant: 'Corporate', powertrain: '1.5L Diesel 6MT', price: '₹ 21.17 Lakh*' },
  { variant: 'Corporate', powertrain: '1.5L Diesel 6AT', price: '₹ 23.17 Lakh*' },
  { variant: 'Platinum', powertrain: '1.5L Petrol 6MT', price: '₹ 21.27 Lakh*' },
  { variant: 'Platinum', powertrain: '1.5L Petrol 7DCT', price: '₹ 23.27 Lakh*' },
  { variant: 'Platinum', powertrain: '1.5L Diesel 6MT', price: '₹ 22.57 Lakh*' },
  { variant: 'Platinum', powertrain: '1.5L Diesel 6AT', price: '₹ 24.57 Lakh*' },
  { variant: 'Signature', powertrain: '1.5L Petrol 7DCT', price: '₹ 24.47 Lakh*' },
  { variant: 'Signature', powertrain: '1.5L Diesel 6AT', price: '₹ 25.77 Lakh*' },
  { variant: 'Knight', powertrain: '1.5L Petrol 7DCT', price: '₹ 25.47 Lakh*' },
  { variant: 'Knight', powertrain: '1.5L Diesel 6AT', price: '₹ 26.77 Lakh*' },
];

// Collapsible Variants & Pricing Component
function VariantsPricingSection() {
  const [expandedVariants, setExpandedVariants] = useState<Set<string>>(new Set());

  const toggleVariant = (variant: string) => {
    setExpandedVariants((prev) => {
      const next = new Set(prev);
      if (next.has(variant)) {
        next.delete(variant);
      } else {
        next.add(variant);
      }
      return next;
    });
  };

  const groupedPricing = PRICING.reduce((acc, item) => {
    if (!acc[item.variant]) {
      acc[item.variant] = [];
    }
    acc[item.variant].push(item);
    return acc;
  }, {} as Record<string, typeof PRICING>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedPricing).map(([variant, items]) => (
        <div
          key={variant}
          className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggleVariant(variant)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{variant}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {items.length} powertrain option{items.length > 1 ? 's' : ''}
              </p>
            </div>
            <motion.div
              animate={{ rotate: expandedVariants.has(variant) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-600 dark:text-gray-400"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.div>
          </button>
          
          <motion.div
            initial={false}
            animate={{
              height: expandedVariants.has(variant) ? 'auto' : 0,
              opacity: expandedVariants.has(variant) ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 space-y-3 border-t border-gray-200 dark:border-white/10">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.powertrain}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Powertrain</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[color:var(--brand-primary)]">{item.price}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ex-showroom*</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
      
      <div className="mt-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/30 dark:bg-white/5 text-sm text-gray-600 dark:text-gray-400 text-center">
        *Ex-showroom prices. May vary by city. Please contact your nearest dealer for accurate pricing and availability.
      </div>
    </div>
  );
}

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

  // Manifest-backed state with graceful fallback to existing arrays
  const [hl, setHl] = useState(HL);
  const [ex, setEx] = useState(EX);
  const [inn, setInn] = useState(IN);
  const [pf, setPf] = useState(PF);
  const [sf, setSf] = useState(SF);
  const [con, setCon] = useState(CON);
  const [knight, setKnight] = useState(KNIGHT);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/images/cars/alcazar/manifest.json', { cache: 'no-store' });
        if (!res.ok) return;
        const m = await res.json();
        const pick = (key: string) => Array.isArray(m?.categories?.[key]) ? m.categories[key].map((it: any) => ({ title: it.title || it.file, img: it.src })) : [];
        const hlM = pick('highlights');
        const exM = pick('exterior');
        const inM = pick('interior');
        const pfM = pick('performance');
        const sfM = pick('safety');
        const cvM = pick('convenience');
        if (hlM.length) setHl(hlM);
        if (exM.length) setEx(exM);
        if (inM.length) setInn(inM);
        if (pfM.length) setPf(pfM);
        if (sfM.length) setSf(sfM);
        if (cvM.length) setCon(cvM);
      } catch {}
    };
    load();
  }, []);

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
          {hl.map((c, i) => (
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
          {ex.map((c, i) => (
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
                <img src="/images/cars/alcazar/interior/smriti_feature.jpg" alt="Interior main view" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {inn.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="performance" title="Performance" icon={<Gauge className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pf.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-white/70">1.5L Turbo GDi petrol (MT/DCT) and 1.5L U2 CRDi diesel (MT/AT). Drive Modes and Traction Modes.</p>
          </Section>

          <Section id="safety" title="Safety & ADAS" icon={<Shield className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sf.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="convenience" title="Convenience" icon={<Settings className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {con.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="features" title="Knight Edition" icon={<ListChecks className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {knight.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="pricing" title="Variants & Pricing" icon={<Activity className="w-5 h-5" />}>
            <VariantsPricingSection />
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
              src="/images/cars/alcazar/AlcazarBanner1600X580_3.jpg" 
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
                {[...hl, ...ex, ...inn, ...pf, ...sf, ...con, ...knight, ...hl, ...ex].map((c, i) => (
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

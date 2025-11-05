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
  Phone,
  TestTube,
} from "lucide-react";

const brand = { primary: "#dc2626" } as const;
const cn = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");
const isHttps = (url: string) => /^https:\/\//.test(url);

const Section = ({ id, title, icon, children }: { id: string; title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 py-12">
    <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
      <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">{icon}</div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{title}</h2>
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

// i20 specific data (fallbacks used if manifest not present)
const HL = [
  { title: "Bold & Magnetic Design", img: "/images/i20/i20-hatchback.png" },
  { title: "Premium Interiors", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "Smart Connectivity", img: "/images/i20/i20-hatchback2.jpg" },
  { title: "Advanced Safety", img: "/images/i20/i20-hatchback.png" },
  { title: "Sporty Performance", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "Knight Edition", img: "/images/cars/i20/knight/i20knightbig.jpg" },
];

const EX = [
  { title: "Front Design", img: "/images/i20/i20-hatchback.png" },
  { title: "Side Profile", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "Rear Design", img: "/images/i20/i20-hatchback2.jpg" },
  { title: "LED Headlamps", img: "/images/i20/i20-hatchback.png" },
  { title: "Alloy Wheels", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "LED Tail Lamps", img: "/images/i20/i20-hatchback2.jpg" },
];

const IN = [
  { title: "Dashboard Design", img: "/images/i20/i20-hatchback.png" },
  { title: "Premium Seats", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "Touchscreen Display", img: "/images/i20/i20-hatchback2.jpg" },
  { title: "Steering Wheel", img: "/images/i20/i20-hatchback.png" },
  { title: "Climate Control", img: "/images/i20/i20-hatchback1.jpg" },
];

const PF = [
  { title: "1.2 Kappa Petrol", img: "/images/i20/i20-hatchback.png" },
  { title: "1.0 Turbo GDi", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "CVT Transmission", img: "/images/i20/i20-hatchback2.jpg" },
  { title: "Drive Modes", img: "/images/i20/i20-hatchback.png" },
];

const SF = [
  { title: "6 Airbags", img: "/images/i20/i20-hatchback.png" },
  { title: "ABS with EBD", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "ESC & VSM", img: "/images/i20/i20-hatchback2.jpg" },
  { title: "Hill Start Assist", img: "/images/i20/i20-hatchback.png" },
  { title: "TPMS", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "Rear Camera", img: "/images/i20/i20-hatchback2.jpg" },
];

const CON = [
  { title: "Wireless Charging", img: "/images/i20/i20-hatchback.png" },
  { title: "Push Button Start", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "Smart Trunk", img: "/images/i20/i20-hatchback2.jpg" },
  { title: "Cruise Control", img: "/images/i20/i20-hatchback.png" },
  { title: "Auto AC", img: "/images/i20/i20-hatchback1.jpg" },
  { title: "Bluetooth", img: "/images/i20/i20-hatchback2.jpg" },
];

const KNIGHT = [
  { title: "Knight Edition", img: "/images/cars/i20/knight/i20knightbig.jpg" },
  { title: "All Black Inserts", img: "/images/cars/i20/knight/i20knightallblackinserts.jpg" },
  { title: "All Black Seats", img: "/images/cars/i20/knight/i20knightallblackseats.jpg" },
];

const FEATURES: Record<string, { magna: boolean; sportz: boolean; asta: boolean }> = {
  "6 Airbags": { magna: false, sportz: true, asta: true },
  "Touchscreen Infotainment": { magna: true, sportz: true, asta: true },
  "Rear Camera": { magna: false, sportz: true, asta: true },
  "Alloy Wheels": { magna: false, sportz: true, asta: true },
  "Push Button Start": { magna: false, sportz: true, asta: true },
  "Wireless Charger": { magna: false, sportz: false, asta: true },
};

const SPECS = [
  { k: 'Dimensions (mm)', v: '3995 × 1775 × 1505' },
  { k: 'Wheelbase (mm)', v: '2580' },
  { k: 'Tyres/Wheels', v: 'R15/R16 alloys' },
  { k: 'Fuel', v: 'Petrol' },
  { k: 'Transmission', v: '5MT / CVT' },
];

type PricingGroups = Record<string, Array<{ variant: string; price: string }>>;

const PRICING_GROUPS: PricingGroups = {
  'Manual (1.2 Petrol)': [
    { variant: 'Magna Executive', price: '₹6.87 lakh' },
    { variant: 'Magna', price: '₹7.12 lakh' },
    { variant: 'Sportz', price: '₹7.74 lakh' },
    { variant: 'Sportz DT (Dual Tone)', price: '₹7.84 lakh' },
    { variant: 'Sportz Opt', price: '₹8.28 lakh' },
    { variant: 'Sportz Opt Knight', price: '₹8.37 lakh' },
    { variant: 'Asta', price: '₹8.61 lakh' },
    { variant: 'Asta Opt', price: '₹9.15 lakh' },
    { variant: 'Asta Opt DT (Dual Tone)', price: '₹9.31 lakh' },
  ],
  'IVT (Automatic, 1.2 Petrol)': [
    { variant: 'Magna IVT', price: '₹8.13 lakh' },
    { variant: 'Sportz IVT', price: '₹8.70 lakh' },
    { variant: 'Sportz Opt IVT', price: '₹9.15 lakh' },
    { variant: 'Asta Opt IVT', price: '₹10.29 lakh' },
    { variant: 'Asta Opt iVT Knight', price: '₹10.38 lakh' },
    { variant: 'Asta Opt IVT DT (Top Model)', price: '₹10.43 lakh' },
  ],
};

export default function I20Page() {
  const [activeTab, setActiveTab] = useState('highlights');
  const exteriorRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [manifest, setManifest] = useState<null | { categories: Record<string, { src: string; title?: string }[]> }>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const CAPTION_MAP: Record<string, string> = {
    // Knight
    'i20knightbig.jpg': 'Knight — hero view',
    'i20knightallblackinserts.jpg': 'All black inserts',
    'i20knightallblackseats.jpg': 'All black seats',
    'i20-metalpedals.jpg': 'Metal pedals',
    'i20knightalloywheel.jpg': 'Alloy wheel',
    'i20-emblem.jpg': 'i20 emblem',
    'i20-knight-frontmattelogo-highres-final.jpg': 'Knight front matte logo',

    // Highlights
    'i20highlight_tab1.jpg': 'Highlight overview',
    'i20interiordashbig1.jpg': 'Interior dashboard',
    'i20dashcam.jpg': 'Dashcam',
    'i20sportytailgate.jpg': 'Sporty tailgate',
    'i20knightsunproof.jpg': 'Sunroof',
    'i20highlight_small1.jpg': 'Highlight',
    'i20highsmall2.jpg': 'Highlight',

    // Exterior
    'i20pe_exttab11.jpg': 'Exterior detail',
    'i20pe_exttab1.jpg': 'Front design',
    'i20pe_exttab2.jpg': 'Exterior detail',
    'i20sidestudiobig.jpg': 'Side studio view',
    'i20pe_exttab5.jpg': 'Exterior detail',
    'i20pe_exttab6.jpg': 'Exterior detail',
    'i20pe_exttab7.jpg': 'Exterior detail',
    'i20finbig.jpg': 'Exterior — fin detail',
    'i20pe1_ext.jpg': 'Exterior view',
    'i20pe2_ext.jpg': 'Exterior view',
    'i20pe3_ext.jpg': 'Exterior view',
    'i20pe4_ext.jpg': 'Exterior view',

    // Interior
    'big-image1.jpg': 'Interior — hero',
    'i20peint2.jpg': 'Interior view',
    'smart_entry_with_push_button_startstop.jpg': 'Smart entry with push button',
    'front_rear_usb_charger.jpg': 'Front & rear USB charger',
    'fully_automatic_temperature_control.jpg': 'Fully automatic temperature control',
    'leather_wrapped_steering_wheel.jpg': 'Leather wrapped steering wheel',
    'i20_rearseats.jpg': 'Rear seats',

    // Performance
    'engine_1120x600_01.jpg': 'Engine',
    'i20pe_per2.jpg': 'Performance',
    'i20pe_per1.jpg': 'Performance',
    'performance_544x360_01.jpg': 'Performance',
    'performance_544x360_02.jpg': 'Performance',
    'performance_544x360_03.jpg': 'Performance',

    // Safety
    'i20safetybig1.jpg': 'Safety overview',
    'i20safetybig2.jpg': 'Safety overview',
    'i20hacbig.jpg': 'Hill Assist Control',
    'safety_airbags.jpg': 'Airbags',
    'safety-bottom1.jpg': 'Safety',
    'safety_isofix.jpg': 'ISOFIX',
    'i20highsmall4.jpg': 'Safety highlight',

    // Convenience
    '1120x600_interior_3.jpg': 'Interior — feature',
    'i20highsmall3.jpg': 'Convenience highlight',
    'convenience_electric_sunroof_544x360.jpg': 'Electric sunroof',
    'convenience_start_stop_544x360.jpg': 'Start/Stop',
    'convenience_cruise_control_544x360.jpg': 'Cruise control',
    'hyundai-i20-premium-hatchback-convenience-page-bottom-7.jpg': 'Convenience overview',
    '544x360_interior_12.jpg': 'Interior — feature',
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/images/cars/i20/manifest.json', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setManifest(json);
      } catch {}
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const mapFromManifest = (key: string, fallback: Array<{ title: string; img: string }>) => {
    const arr = manifest?.categories?.[key] as { src: string; title?: string }[] | undefined;
    if (!arr || arr.length === 0) return fallback;
    return arr.map((it) => {
      const file = (it.src || '').split('/').pop() || '';
      const title = CAPTION_MAP[file.toLowerCase()] || it.title || file;
      return { title, img: it.src };
    });
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', brand.primary);
  }, []);

  useEffect(() => {
    const handler = () => {
      const ids = ['highlights', 'exterior', 'interior', 'performance', 'safety', 'convenience', 'knight', 'features', 'pricing', 'specs'];
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

  // Control video to skip last 4 seconds
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 4) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const tabs = [
    { id: 'highlights', label: 'Highlights', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'exterior', label: 'Exterior', icon: <Car className="w-4 h-4" /> },
    { id: 'interior', label: 'Interior', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Gauge className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" /> },
    { id: 'convenience', label: 'Convenience', icon: <Settings className="w-4 h-4" /> },
    { id: 'knight', label: 'Knight Edition', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <Activity className="w-4 h-4" /> },
    { id: 'specs', label: 'Specs', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div>
      <div className="min-h-screen bg-transparent text-gray-900 dark:text-white">
        {/* Sticky Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10"
          src="/videos/i20.mp4"
        />
        <header className="relative">
          {/* Top fixed nav */}
          <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:supports-[backdrop-filter]:bg-black/30 border-b border-gray-200 dark:border-white/10">
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
          <div className="h-[60px]"></div>
          <div className="relative aspect-[21/9] overflow-hidden">
            <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white max-w-2xl">
              <div>
                <div className="text-xs uppercase tracking-widest mb-3 opacity-90">Born Magnetic</div>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Hyundai i20</h1>
                <p className="mt-3 text-base md:text-lg text-white/90">Premium hatchback with bold design, advanced features and sporty performance.</p>
                <div className="mt-3 flex flex-wrap gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 inline-flex">
                  <Chip>Magna</Chip>
                  <Chip>Sportz</Chip>
                  <Chip>Asta</Chip>
                  <Chip>1.2 Kappa Petrol</Chip>
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
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('highlights', HL).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="exterior" title="Exterior" icon={<Car className="w-5 h-5" />}>
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
                  Hyundai i20 Car Exteriors: All Eyes on You
                </h3>
                <p className="text-lg text-red-800 dark:text-red-200 mb-4">
                  The new Hyundai i20 has it all. A sensuous sporty design, a majestic new grille and lights that are a showstopper. Turn heads as you whizz by on those alloy wheels and make an impression with the chrome lines. It's simply stunning from tip to toe.
                </p>
              </div>
            </div>
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-x-auto snap-x snap-mandatory no-scrollbar flex gap-4 pb-2"
              ref={exteriorRef}
            >
              {mapFromManifest('exterior', EX).map((c, i) => (
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
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
                  Hyundai i20 Car Interior: Magnetic space.
                </h3>
                <p className="text-lg text-red-800 dark:text-red-200 mb-4">
                  The interiors of the new Hyundai i20 mesmerize. Dual tone seats that look fabulous and enough space to lounge out in comfort. Ambient lighting that uplifts your mood and sliding front armrest that provides a more convenient way to relax.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('interior', IN).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="performance" title="Performance" icon={<Gauge className="w-5 h-5" />}>
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
                  Hyundai i20 Car Performance: Power on.
                </h3>
                <p className="text-lg text-red-800 dark:text-red-200 mb-4">
                  Great looks come with great power. The new Hyundai i20 comes with a powerful petrol engine and 2 driving modes that enhance your drive.
                </p>
                <p className="text-lg text-red-800 dark:text-red-200 mb-4">
                  The thrilling performance is supplemented with great drivability in the form of two transmission options IVT & MT. Power on. Drive on.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('performance', PF).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="safety" title="Safety & ADAS" icon={<Shield className="w-5 h-5" />}>
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
                  Hyundai i20 Car Safety: Go safe.
                </h3>
                <p className="text-lg text-red-800 dark:text-red-200 mb-4">
                  The new Hyundai i20 ensures you drive safe wherever you go. It comes equipped with advanced safety features that are a cut above the rest. 6 airbags for maximum protection. Electronic stability control (ESC) with vehicle stability management (VSM) and emergency stop signal (ESS) ensure that you always drive stress free.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('safety', SF).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="convenience" title="Convenience" icon={<Settings className="w-5 h-5" />}>
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
                  Hyundai i20 Car Convenience: Smart. Connected.
                </h3>
                <p className="text-lg text-red-800 dark:text-red-200 mb-4">
                  Cutting edge technology is at the core of the new Hyundai i20. From Bluelink connectivity to Home-to-car (H2C), our smart tech ensures you're connected to your car and your world all the time. What's more, the voice recognition technology with multi-lingual capabilities add convenience to everything you do. All in all, it's one smart car.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('convenience', CON).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="knight" title="Knight Edition" icon={<Sparkles className="w-5 h-5" />}>
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
                  i20 Knight. Born head-turner
                </h3>
                <p className="text-lg text-red-800 dark:text-red-200 mb-4">
                  There are cars, and then, there is the i20 Knight. Sleek, black, mystical. A stylish way to stand out among the ordinary. Designed to turn heads with its uber cool looks, blacked-out elements, and exclusive badging.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('knight', KNIGHT).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="features" title="Features" icon={<ListChecks className="w-5 h-5" />}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
            <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Feature</th>
                    <th className="text-center py-3 px-4 font-medium">Magna</th>
                    <th className="text-center py-3 px-4 font-medium">Sportz</th>
                    <th className="text-center py-3 px-4 font-medium">Asta</th>
              </tr>
            </thead>
            <tbody>
                  {Object.entries(FEATURES).map(([feature, availability]) => (
                    <tr key={feature} className="border-b">
                      <td className="py-3 px-4">{feature}</td>
                      <td className="text-center py-3 px-4">{availability.magna ? '✓' : '—'}</td>
                      <td className="text-center py-3 px-4">{availability.sportz ? '✓' : '—'}</td>
                      <td className="text-center py-3 px-4">{availability.asta ? '✓' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </Section>

          <Section id="pricing" title="Pricing" icon={<Activity className="w-5 h-5" />}>
            <div className="space-y-4">
              {Object.entries(PRICING_GROUPS).map(([group, items]) => {
                const isOpen = expandedGroups.has(group);
                return (
                  <div key={group} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        setExpandedGroups((prev) => {
                          const next = new Set(prev);
                          if (next.has(group)) next.delete(group); else next.add(group);
                          return next;
                        });
                      }}
                      className="w-full flex items-center justify-between px-5 py-4"
                    >
                      <div className="text-base md:text-lg font-semibold text-left">{group}</div>
                      <ChevronRight className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-90')} />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-200 dark:border-white/10 divide-y divide-gray-200 dark:divide-white/10">
                        {items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between px-5 py-4">
                            <div className="text-sm md:text-base font-medium">{it.variant}</div>
                            <div className="text-base md:text-lg font-bold text-[color:var(--brand-primary)]">{it.price}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
              <p className="text-xs text-gray-600 dark:text-white/70 text-center">*Ex‑showroom prices. May vary by city and dealer.</p>
            </div>
          </Section>

          <Section id="specs" title="Specifications" icon={<Activity className="w-5 h-5" />}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SPECS.map((s, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6">
                  <div className="text-sm text-gray-600 dark:text-white/70 mb-1">{s.k}</div>
                  <div className="text-lg font-semibold">{s.v}</div>
                </div>
              ))}
            </div>
          </Section>
        </main>

        {/* Knight hero image above strip */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src={(mapFromManifest('knight', KNIGHT)[0] || KNIGHT[0]).img} alt="i20 Knight Edition hero" className="h-[50vh] w-full object-cover" />
          </div>
        </div>

        {/* Bottom slow-scrolling strip */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-24">
            <div className="relative">
              <div className="flex gap-4 animate-scroll-slow">
                {[...mapFromManifest('highlights', HL), ...mapFromManifest('exterior', EX), ...mapFromManifest('interior', IN), ...mapFromManifest('performance', PF), ...mapFromManifest('safety', SF), ...mapFromManifest('convenience', CON), ...mapFromManifest('knight', KNIGHT), ...mapFromManifest('highlights', HL), ...mapFromManifest('exterior', EX)].map((c, i) => (
                  <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                    <img src={c.img} alt={`i20 ${i + 1}`} className="h-full w-full object-cover" />
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
        {/* Quick Actions */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <a 
            href="/test-drive"
            className="flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-500 text-white px-6 py-3 shadow-lg font-medium text-base"
          >
            <TestTube className="h-5 w-5" />
            Test Drive
          </a>
          <a 
            href="tel:+917733888999"
            className="flex items-center gap-2 rounded-full bg-white/5 border border-white/20 text-white hover:bg-white/10 px-6 py-3 shadow-lg font-medium text-base backdrop-blur-sm"
          >
            <Phone className="h-5 w-5" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}

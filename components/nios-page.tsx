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

// Nios specific data
const HL = [
  { title: "Bold & Stylish Design", img: "/images/cars/nios/Ext_512x340_1.jpg" },
  { title: "20.25 cm Touchscreen", img: "/images/cars/nios/high_1_512x340_2.jpg" },
  { title: "Hy-CNG Dual Cylinder", img: "/images/cars/nios/big-image.jpg" },
  { title: "Premium Cabin", img: "/images/cars/nios/niosafetypc1.jpg" },
  { title: "Smart Connectivity", img: "/images/cars/nios/high_1_512x340_2.jpg" },
  { title: "City-Friendly Performance", img: "/images/cars/nios/big-image-new.jpg" },
];

const EX = [
  { title: "Front Design", img: "/images/cars/nios/Ext_1120x600.jpg" },
  { title: "Rear Design", img: "/images/cars/nios/Ext_1120x600_7.jpg" },
  { title: "Alloy Wheels", img: "/images/cars/nios/Exterior_1120x600_Diamond%20cut%20alloy%20wheels.jpg" },
  { title: "Lighting", img: "/images/cars/nios/Ext_1120x600_1.jpg" },
  { title: "Grille & Bumper", img: "/images/cars/nios/Exterior_Front_1120x600.jpg" },
  { title: "Roof Rails", img: "/images/cars/nios/Ext_512x340_4.jpg" },
];

const IN = [
  { title: "Dashboard Design", img: "/images/cars/nios/nios_intpc_01.jpg" },
  { title: "Seats & Upholstery", img: "/images/cars/nios/niosafetypc1.jpg" },
  { title: "Rear AC Vents", img: "/images/cars/nios/NIOS-Rear-AC-Vent.jpg" },
  { title: "Door Map Pocket", img: "/images/cars/nios/nios_intpc_01.jpg" },
  { title: "Steering & Controls", img: "/images/cars/nios/niosafetypc1.jpg" },
];

const PF = [
  { title: "1.2 Kappa Petrol Engine", img: "/images/cars/nios/big-image-new.jpg" },
  { title: "Factory-fitted CNG", img: "/images/cars/nios/big-image.jpg" },
  { title: "AMT/Manual Options", img: "/images/cars/nios/small-image.jpg" },
  { title: "City-Optimized Performance", img: "/images/cars/nios/small-image-new.jpg" },
];

const SF = [
  { title: "6 Airbags (select variants)", img: "/images/cars/nios/niosafetypc.jpg" },
  { title: "ABS with EBD", img: "/images/cars/nios/Exterior_1120x600_Electronic%20Stability%20control%20(ESC).jpg" },
  { title: "ESC / VSM", img: "/images/cars/nios/Exterior_1120x600_Electronic%20Stability%20control%20(ESC).jpg" },
  { title: "Hill Hold Assist", img: "/images/cars/nios/Exterior_1120x600_Hill%20assist%20control.jpg" },
  { title: "TPMS (Highline)", img: "/images/cars/nios/niosafetypc_1.jpg" },
  { title: "Rear Parking Camera", img: "/images/cars/nios/niosafetypc_1.jpg" },
];

const CON = [
  { title: "Smartphone Connectivity", img: "/images/cars/nios/high_1_512x340_2.jpg" },
  { title: "Push-button Start", img: "/images/cars/nios/niosconvpc_04.jpg" },
  { title: "Wireless Charger", img: "/images/cars/nios/Exterior_1120x600_Wireless%20phone%20charger.jpg" },
  { title: "Fast USB-C", img: "/images/cars/nios/Convenience_512x340_USB%20Charger.jpg" },
  { title: "Rear AC Vents", img: "/images/cars/nios/NIOS-Rear-AC-Vent.jpg" },
  { title: "Cruise Control", img: "/images/cars/nios/niosconvpc_04.jpg" },
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
  { k: 'Dimensions (mm)', v: '3815 × 1680 × 1520' },
  { k: 'Wheelbase (mm)', v: '2450' },
  { k: 'Tyres/Wheels', v: 'R14/R15 alloys' },
  { k: 'Fuel', v: 'Petrol / CNG' },
  { k: 'Transmission', v: '5MT / AMT' },
];

type PricingGroups = Record<string, Array<{ variant: string; price: string }>>;

const PRICING_GROUPS: PricingGroups = {
  'Petrol • Manual (MT)': [
    { variant: 'Era', price: '₹5.47 lakh' },
    { variant: 'Magna', price: '₹6.26 lakh' },
    { variant: 'Corporate', price: '₹6.49 lakh' },
    { variant: 'Sportz', price: '₹6.79 lakh' },
    { variant: 'Sportz DT (Dual Tone)', price: '₹7.01 lakh' },
    { variant: 'Sportz Opt', price: '₹7.06 lakh' },
    { variant: 'Asta', price: '₹7.40 lakh' },
  ],
  'Petrol • AMT': [
    { variant: 'Magna AMT', price: '₹6.85 lakh' },
    { variant: 'Corporate AMT', price: '₹7.08 lakh' },
    { variant: 'Sportz AMT', price: '₹7.31 lakh' },
    { variant: 'Sportz Opt AMT', price: '₹7.58 lakh' },
    { variant: 'Asta AMT (Top Model)', price: '₹7.92 lakh' },
  ],
  'Hy-CNG Duo (MT)': [
    { variant: 'Magna CNG', price: '₹7.17 lakh' },
    { variant: 'Sportz CNG', price: '₹7.59 lakh' },
    { variant: 'Sportz Duo CNG', price: '₹7.67 lakh' },
  ],
};

export default function NiosPage() {
  const [activeTab, setActiveTab] = useState('highlights');
  const exteriorRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [manifest, setManifest] = useState<null | { categories: Record<string, { src: string; title?: string }[]> }>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const CAPTION_MAP: Record<string, string> = {
    // Highlights
    'ext_512x340_1.jpg': 'Projector headlamps',
    'high_1_512x340_2.jpg': '20.25 cm touchscreen',
    'cngsmall-1.jpg': 'Factory-fitted CNG — cylinder 1',
    'cngsmall-2.jpg': 'Factory-fitted CNG — cylinder 2',
    'cngsmall-3.jpg': 'Factory-fitted CNG — cylinder 3',
    // Exterior
    'ext_1120x600.jpg': 'Front design',
    'ext_1120x600_1.jpg': 'Lighting signature',
    'exterior_front_1120x600.jpg': 'Radiator grille & bumper',
    'ext_1120x600_3.jpg': 'Side profile',
    'ext_1120x600_7.jpg': 'Rear design',
    'exterior_1120x600_rear.jpg': 'Rear bumper & lamps',
    'ext_1120x600_8.jpg': 'Alloy wheels detail',
    'ext_512x340_4.jpg': 'Roof rails',
    // Interior
    'niosafetypc1.jpg': 'Premium cabin',
    'nios-rear-ac-vent.jpg': 'Rear AC vents',
    'nios_intpc_06.jpg': 'Interior detail',
    'nios_intpc_01.jpg': 'Dashboard layout',
    // Performance
    'big-image-new.jpg': '1.2 l Kappa petrol engine',
    'big-image.jpg': 'Refined performance',
    'small-image.jpg': 'City-friendly efficiency',
    'small-image-new.jpg': 'Performance highlight',
    // Safety
    'niosafetypc.jpg': 'Safety highlights',
    'niosafetypc_1.jpg': 'TPMS / rear camera',
    // Convenience
    'niosconvpc_04.jpg': 'Cruise control / push start',
    'niosconvpc_05.jpg': 'USB charger',
    'niosconvpc_07.jpg': 'Wireless charger',
    'rdwconv_1.jpg': 'Multi information display',
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/images/cars/nios/manifest.json', { cache: 'no-store' });
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

  // Control video playback to restart 3 seconds before the end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 3) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
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
          src="/hyundai-nios.mp4"
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.6),rgba(0,0,0,.1)_60%,transparent)]" />
            <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white max-w-2xl">
            <div>
                <div className="text-xs uppercase tracking-widest mb-3 opacity-90">Bold. Techy. Made for the city.</div>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Grand i10 NIOS</h1>
                <p className="mt-3 text-base md:text-lg text-white/90">A new‑age, feature‑rich hatchback crafted for everyday city life — spacious cabin, smart tech and refined performance.</p>
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
            <div className="mb-8 max-w-4xl mx-auto backdrop-blur-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-900 dark:text-red-100">Add more to life with the new Hyundai GRAND i10 NIOS Car</h3>
              <p className="text-red-800 dark:text-red-200 leading-relaxed">Grand i10 NIOS seamlessly combined exuberant design with advanced technology to enhance your daily life.</p>
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {mapFromManifest('highlights', HL).map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} />
              </div>
            ))}
          </div>
          </Section>

          <Section id="exterior" title="Exterior" icon={<Car className="w-5 h-5" />}>
            <div className="mb-8 max-w-4xl mx-auto backdrop-blur-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-900 dark:text-red-100">Hyundai GRAND i10 NIOS Car Exteriors: Experience Beauty in Boldness</h3>
              <p className="text-red-800 dark:text-red-200 leading-relaxed">Admire it from any angle, and The All New Hyundai Grand i10 NIOS car will catch your eye with its bold stance and contemporary design.  The new painted black radiator grille and LED daytime running lamps (DRLs) give it that refreshing new look. The new R15 diamond cut alloy wheels project an agile stance. And its new tail gate design with LED taillamp defines its sharp rear profile, giving it an unmistakable identity.</p>
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
            <div className="mb-8 max-w-4xl mx-auto backdrop-blur-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-900 dark:text-red-100">Hyundai GRAND i10 NIOS Car Interior: Crafted for Comfort</h3>
            </div>
            <div className="mb-6 overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10">
              <div className="relative aspect-[21/9] bg-gray-100">
                <img src={(mapFromManifest('interior', IN)[0] || IN[0]).img} alt="Interior main view" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('interior', IN).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
          ))}
        </div>
          </Section>

          <Section id="performance" title="Performance" icon={<Gauge className="w-5 h-5" />}>
            <div className="mb-8 max-w-4xl mx-auto backdrop-blur-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-900 dark:text-red-100">Hyundai GRAND i10 NIOS Car Performance: Fun to Drive</h3>
              <p className="text-red-800 dark:text-red-200 leading-relaxed">Optimized chassis setting provides enhanced ride, handling, and steering feedback. And the new Grand i10 NIOS powertrains enable you to make the most of every drive.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('performance', PF).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
          </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-white/70">Transmission options: 5MT · AMT. City-optimized performance with efficient fuel economy.</p>
          </Section>

          <Section id="safety" title="Safety & ADAS" icon={<Shield className="w-5 h-5" />}>
            <div className="mb-8 max-w-4xl mx-auto backdrop-blur-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-900 dark:text-red-100">Hyundai GRAND i10 NIOS Car Safety: Your safe place</h3>
              <p className="text-red-800 dark:text-red-200 leading-relaxed">The new Grand i10 NIOS offers 30+ safety features and make it one of the safest cars. It features 6 airbags with side and curtain for added safety of the occupants. DVRM (Driver rear view monitor), Electronic Stability Control (ESC) and Vehicle Stability Management (VSM) give you the confidence to drive freely.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('safety', SF).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
                  ))}
                </div>
          </Section>

          <Section id="convenience" title="Convenience" icon={<Settings className="w-5 h-5" />}>
            <div className="mb-8 max-w-4xl mx-auto backdrop-blur-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-900 dark:text-red-100">Hyundai GRAND i10 NIOS Car Convenience: Absolute Comfort</h3>
              <p className="text-red-800 dark:text-red-200 leading-relaxed">Enjoy comfort, control and elegance with driver-focused technological features that will make you enjoy a unique driving experience.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mapFromManifest('convenience', CON).map((c, i) => (
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

        {/* Hero image above strip */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src="/images/cars/nios/1120x600_2.jpg" alt="Hyundai Grand i10 NIOS hero" className="h-[50vh] w-full object-cover" />
            </div>
          </div>

        {/* Bottom slow-scrolling strip */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-24">
            <div className="relative">
              <div className="flex gap-4 animate-scroll-slow">
                {[...HL, ...EX, ...IN, ...PF, ...SF, ...CON, ...HL, ...EX].map((c, i) => (
                  <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                    <img src={c.img} alt={`Nios ${i + 1}`} className="h-full w-full object-cover" />
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









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

// Aura specific data
const HL = [
  { title: "Premium Sedan Design", img: "/images/cars/nios/big-image-new.jpg" },
  { title: "Comfortable Interiors", img: "/images/cars/nios/interior/niosafetypc1.jpg" },
  { title: "Smart Connectivity", img: "/images/cars/nios/convenience/high_1_512x340_2.jpg" },
  { title: "Advanced Safety", img: "/images/cars/nios/safety/niosafetypc.jpg" },
  { title: "Efficient Performance", img: "/images/cars/nios/performance/big-image.jpg" },
  { title: "Premium Features", img: "/images/cars/nios/small-image.jpg" },
];

const EX = [
  { title: "Front Design", img: "/images/cars/nios/exterior/Ext_1120x600.jpg" },
  { title: "Side Profile", img: "/images/cars/nios/exterior/Ext_1120x600_7.jpg" },
  { title: "Rear Design", img: "/images/cars/nios/exterior/Exterior_1120x600_Diamond cut alloy wheels.jpg" },
  { title: "LED Headlamps", img: "/images/cars/nios/Ext_1120x600_1.jpg" },
  { title: "Alloy Wheels", img: "/images/cars/nios/exterior/Exterior_Front_1120x600.jpg" },
  { title: "LED Tail Lamps", img: "/images/cars/nios/Ext_512x340_4.jpg" },
];

const IN = [
  { title: "Dashboard Design", img: "/images/cars/nios/interior/nios_intpc_01.jpg" },
  { title: "Premium Seats", img: "/images/cars/nios/interior/niosafetypc1.jpg" },
  { title: "Touchscreen Display", img: "/images/cars/nios/convenience/high_1_512x340_2.jpg" },
  { title: "Steering Wheel", img: "/images/cars/nios/interior/niosafetypc1.jpg" },
  { title: "Climate Control", img: "/images/cars/nios/NIOS-Rear-AC-Vent.jpg" },
];

const PF = [
  { title: "1.2 Kappa Petrol", img: "/images/cars/nios/big-image-new.jpg" },
  { title: "1.0 Turbo GDi", img: "/images/cars/nios/performance/big-image.jpg" },
  { title: "CVT Transmission", img: "/images/cars/nios/small-image.jpg" },
  { title: "Drive Modes", img: "/images/cars/nios/small-image-new.jpg" },
];

const SF = [
  { title: "6 Airbags", img: "/images/cars/nios/safety/niosafetypc.jpg" },
  { title: "ABS with EBD", img: "/images/cars/nios/exterior/Exterior_1120x600_Electronic%20Stability%20control%20(ESC).jpg" },
  { title: "ESC & VSM", img: "/images/cars/nios/exterior/Exterior_1120x600_Electronic%20Stability%20control%20(ESC).jpg" },
  { title: "Hill Start Assist", img: "/images/cars/nios/exterior/Exterior_1120x600_Hill%20assist%20control.jpg" },
  { title: "TPMS", img: "/images/cars/nios/safety/niosafetypc_1.jpg" },
  { title: "Rear Camera", img: "/images/cars/nios/safety/niosafetypc_1.jpg" },
];

const CON = [
  { title: "Wireless Charging", img: "/images/cars/nios/exterior/Exterior_1120x600_Wireless%20phone%20charger.jpg" },
  { title: "Push Button Start", img: "/images/cars/nios/niosconvpc_04.jpg" },
  { title: "Smart Trunk", img: "/images/cars/nios/convenience/Convenience_512x340_USB%20Charger.jpg" },
  { title: "Cruise Control", img: "/images/cars/nios/convenience/Convenience_512x340_USB%20Charger.jpg" },
  { title: "Auto AC", img: "/images/cars/nios/NIOS-Rear-AC-Vent.jpg" },
  { title: "Bluetooth", img: "/images/cars/nios/convenience/high_1_512x340_2.jpg" },
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

const PRICING: Array<{ variant: string; powertrain: string; price: string }> = [
  { variant: 'E', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 5.98 Lakh*' },
  { variant: 'EX', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 6.48 Lakh*' },
  { variant: 'EX', powertrain: '1.2L Kappa Petrol CNG 5MT', price: '₹ 7.48 Lakh*' },
  { variant: 'S (Sportz)', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 7.18 Lakh*' },
  { variant: 'S (Sportz)', powertrain: '1.2L Kappa Petrol CVT', price: '₹ 7.98 Lakh*' },
  { variant: 'S (Sportz)', powertrain: '1.2L Kappa Petrol CNG 5MT', price: '₹ 8.18 Lakh*' },
  { variant: 'SX', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 8.18 Lakh*' },
  { variant: 'SX', powertrain: '1.2L Kappa Petrol CVT', price: '₹ 8.98 Lakh*' },
  { variant: 'SX', powertrain: '1.2L Kappa Petrol CNG 5MT', price: '₹ 9.18 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 8.78 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.2L Kappa Petrol CVT', price: '₹ 9.58 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.2L Kappa Petrol CNG 5MT', price: '₹ 9.78 Lakh*' },
  { variant: 'Asta', powertrain: '1.0L Turbo Petrol CVT', price: '₹ 10.18 Lakh*' },
  { variant: 'Asta (O)', powertrain: '1.0L Turbo Petrol CVT', price: '₹ 10.58 Lakh*' },
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

export default function AuraPage() {
  const [activeTab, setActiveTab] = useState('highlights');
  const exteriorRef = useRef<HTMLDivElement | null>(null);
  const [manifest, setManifest] = useState<null | { categories: Record<string, { src: string; title?: string }[]> }>(null);

  const CAPTION_MAP: Record<string, string> = {
    // Highlights
    'aurahighlight_2_pc_1.jpg': 'LED DRLs and projector headlamps',
    'aurahighlight_2_pc2.jpg': 'Parametric front grille',
    'tyre-revised.jpg': 'Diamond-cut alloy wheels',
    // Exterior (labels inferred from filenames)
    'aura-front.jpg': 'Front fascia — Aura',
    '1120x600_1.jpg': 'Exterior view — front angle',
    '1120x600_3.jpg': 'Exterior view — rear angle',
    '1120x600_4.jpg': 'Projector headlamps',
    '1120x600_5.jpg': 'Chrome outside door handles',
    '1120x600_6.jpg': 'Shark fin antenna',
    '1120x600_7.jpg': 'LED tail lamps',
    '1120x600_8.jpg': 'R15 alloy wheels',
    '1120x600_9.jpg': 'Black radiator grille',
    '1120x600_10.jpg': 'Body color outside mirrors',
    '1120x600_11.jpg': 'Rear bumper garnish',
    'exterior-image-1.jpg': 'Exterior profile',
    '512x340.jpg': 'Exterior detail',
    // Interior
    'interior_pc1.jpg': 'Interior — dual tone cabin',
    'interior-aura-page.jpg': 'Dashboard and infotainment',
    'interior_1120x600_1.jpg': 'Seat upholstery and theme',
    'interior_mid_2pc.jpg': 'Rear AC vents',
    'interior_mid_3pc.jpg': 'Steering wheel and cluster',
    'interior_mid_0pc.jpg': 'Center console & storage',
    'auraint_3.jpg': 'Seat back pocket',
    'auraint_04.jpg': 'Wireless phone charger',
    'auraint_6.jpg': 'Adjustable rear headrests',
    'auraint_5.jpg': '60:40 split rear seats',
    'aurainterior_1.jpg': 'Cabin space overview',
    'auraint_8.jpg': 'Driver armrest',
    // Performance
    'aurarevised-performance-aura-two.png': '1.2 l Kappa petrol engine',
    'auraperf_3.jpg': 'Suspension & handling',
    'highlight_2_512x340.jpg': 'Fuel efficiency highlight',
    'highlight_2_512x340_1.jpg': 'Low NVH performance',
    // Safety
    'aurasafetypc.jpg': 'Safety highlights — Aura',
    '512x340_1.jpg': 'Dual airbags',
    '512x340_2.jpg': 'Rear parking sensors',
    '512x340_3.jpg': 'ISOFIX child seat anchors',
    // Convenience
    'auraconve_.jpg': '8-inch touchscreen infotainment',
    'auracovpc_6.jpg': 'Cruise control',
    'auracovpc_2.jpg': 'Smart key with push button start',
    'auravent.jpg': 'Rear AC vents',
    'auraconven_1.jpg': 'Wireless charger',
  };

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

  // Load manifest
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/images/cars/aura/manifest.json', { cache: 'no-store' });
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
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10"
          src="/hyundai-aura.mp4"
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
          <div className="relative aspect-[21/9] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.6),rgba(0,0,0,.1)_60%,transparent)]" />
            <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white max-w-2xl">
              <div>
                <div className="text-xs uppercase tracking-widest mb-3 opacity-90">Premium Sedan</div>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Hyundai Aura</h1>
                <p className="mt-3 text-base md:text-lg text-white/90">Premium sedan with comfortable interiors, advanced features and efficient performance.</p>
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
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {mapFromManifest('highlights', HL).map((c, i) => (
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
            <div className="mb-6 overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10">
              <div className="relative aspect-[21/9] bg-gray-100">
                <img src={(mapFromManifest('interior', IN)[0] || IN[0]).img} alt="Interior main view" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {mapFromManifest('interior', IN).map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="performance" title="Performance" icon={<Gauge className="w-5 h-5" />}>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {mapFromManifest('performance', []).map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-white/70">Transmission options: 5MT · CVT. Efficient performance with excellent fuel economy.</p>
          </Section>

          <Section id="safety" title="Safety & ADAS" icon={<Shield className="w-5 h-5" />}>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {mapFromManifest('safety', []).map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="convenience" title="Convenience" icon={<Settings className="w-5 h-5" />}>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {mapFromManifest('convenience', []).map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} />
                </div>
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

          <Section id="pricing" title="Variants & Pricing" icon={<Activity className="w-5 h-5" />}>
            <VariantsPricingSection />
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

        {/* Front view image above strip */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src={(mapFromManifest('exterior', EX)[0] || EX[0]).img} alt="Aura front view" className="h-[50vh] w-full object-cover" />
          </div>
        </div>

        {/* Bottom slow-scrolling strip */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-24">
            <div className="relative">
              <div className="flex gap-4 animate-scroll-slow">
                {[...mapFromManifest('highlights', HL), ...mapFromManifest('exterior', EX), ...mapFromManifest('interior', IN), ...mapFromManifest('performance', []), ...mapFromManifest('safety', []), ...mapFromManifest('convenience', []), ...mapFromManifest('highlights', HL), ...mapFromManifest('exterior', EX)].map((c, i) => (
                  <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                    <img src={c.img} alt={`Aura ${i + 1}`} className="h-full w-full object-cover" />
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
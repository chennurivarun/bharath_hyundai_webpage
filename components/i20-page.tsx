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

// i20 specific data
const HL = [
  { title: "Bold & Magnetic Design", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-1.jpg" },
  { title: "Premium Interiors", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-2.jpg" },
  { title: "Smart Connectivity", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-3.jpg" },
  { title: "Advanced Safety", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-4.jpg" },
  { title: "Sporty Performance", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-5.jpg" },
  { title: "Knight Edition", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightbig.jpg" },
];

const EX = [
  { title: "Front Design", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-1.jpg" },
  { title: "Side Profile", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-2.jpg" },
  { title: "Rear Design", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-3.jpg" },
  { title: "LED Headlamps", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-4.jpg" },
  { title: "Alloy Wheels", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-5.jpg" },
  { title: "LED Tail Lamps", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-6.jpg" },
];

const IN = [
  { title: "Dashboard Design", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-1.jpg" },
  { title: "Premium Seats", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-2.jpg" },
  { title: "Touchscreen Display", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-3.jpg" },
  { title: "Steering Wheel", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-4.jpg" },
  { title: "Climate Control", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-5.jpg" },
];

const PF = [
  { title: "1.2 Kappa Petrol", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20-performance-1.jpg" },
  { title: "1.0 Turbo GDi", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20-performance-2.jpg" },
  { title: "CVT Transmission", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20-performance-3.jpg" },
  { title: "Drive Modes", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20-performance-4.jpg" },
];

const SF = [
  { title: "6 Airbags", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-1.jpg" },
  { title: "ABS with EBD", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-2.jpg" },
  { title: "ESC & VSM", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-3.jpg" },
  { title: "Hill Start Assist", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-4.jpg" },
  { title: "TPMS", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-5.jpg" },
  { title: "Rear Camera", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-6.jpg" },
];

const CON = [
  { title: "Wireless Charging", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-1.jpg" },
  { title: "Push Button Start", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-2.jpg" },
  { title: "Smart Trunk", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-3.jpg" },
  { title: "Cruise Control", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-4.jpg" },
  { title: "Auto AC", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-5.jpg" },
  { title: "Bluetooth", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-6.jpg" },
];

const KNIGHT = [
  { title: "Knight Edition", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightbig.jpg" },
  { title: "All Black Inserts", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightallblackinserts.jpg" },
  { title: "All Black Seats", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightallblackseats.jpg" },
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
  { variant: 'Magna', powertrain: '1.2 Petrol 5MT', price: '₹ TBD*' },
  { variant: 'Sportz', powertrain: '1.2 Petrol 5MT/CVT', price: '₹ TBD*' },
  { variant: 'Asta', powertrain: '1.0 Turbo CVT', price: '₹ TBD*' },
];

export default function I20Page() {
  const [activeTab, setActiveTab] = useState('highlights');
  const exteriorRef = useRef<HTMLDivElement | null>(null);

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
        autoPlay
        loop
        muted
        playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10"
          src="/assets1/Hyundai i20 _ Born magnetic.mp4"
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
            <img
              src="https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-banner.jpg"
              alt="Hyundai i20 hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.6),rgba(0,0,0,.1)_60%,transparent)]" />
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
                <img src="https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-main.jpg" alt="Interior main view" className="absolute inset-0 h-full w-full object-cover" />
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
            <p className="mt-4 text-sm text-gray-600 dark:text-white/70">Transmission options: 5MT · CVT. Sporty performance with efficient fuel economy.</p>
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

          <Section id="knight" title="Knight Edition" icon={<Sparkles className="w-5 h-5" />}>
            <div className="grid md:grid-cols-3 gap-6">
              {KNIGHT.map((c, i) => (
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
            <div className="grid md:grid-cols-3 gap-6">
              {PRICING.map((p, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6">
                  <div className="text-lg font-semibold mb-2">{p.variant}</div>
                  <div className="text-sm text-gray-600 dark:text-white/70 mb-4">{p.powertrain}</div>
                  <div className="text-2xl font-bold text-[color:var(--brand-primary)]">{p.price}</div>
                </div>
              ))}
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

        {/* Front view image above strip */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src={(EX.find(e=>e.title.toLowerCase().includes('front'))||EX[0]).img} alt="i20 front view" className="h-[50vh] w-full object-cover" />
          </div>
        </div>

        {/* Bottom slow-scrolling strip */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-24">
            <div className="relative">
              <div className="flex gap-4 animate-scroll-slow">
                {[...HL, ...EX, ...IN, ...PF, ...SF, ...CON, ...KNIGHT, ...HL, ...EX].map((c, i) => (
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
      </div>
    </div>
  );
}

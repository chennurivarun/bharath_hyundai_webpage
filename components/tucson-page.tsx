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

const Card = ({ title, img, desc }: { title: string; img: string; desc?: string }) => {
  const [imageError, setImageError] = React.useState(false);
  
  // Fix URL encoding for filenames with %20 - need to double-encode or use exact match
  // If filename contains %20, we need %2520 in URL so browser decodes to %20
  let imgSrc = img.startsWith('/') ? img : `/${img}`;
  
  // Handle filenames that literally contain %20 (not spaces)
  // The actual filenames are: tucson-R%202.0-image-2-pc.jpg and tucson-Nu%202.0-image-2-pc.jpg
  // So we need %2520 in the URL path so browser decodes it to %20 which matches the filename
  if (imgSrc.includes('tucson-R%202.0') || imgSrc.includes('tucson-Nu%202.0')) {
    imgSrc = imgSrc.replace(/%20/g, '%2520');
  }
  
  return (
    <motion.figure
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm"
    >
      <div className="relative aspect-[16/9]">
        {!imageError ? (
          <img
            src={imgSrc}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Image not available</span>
          </div>
        )}
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
};

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-white/15 bg-white/10 backdrop-blur-md">
    {children}
  </span>
);

const HL = [
  { title: "Dark chrome parametric front grille with hidden DRLs & LED headlamps", img: "/images/cars/tucson/highlights/Hyundai-tucson-suv-highlight-bottom-800x530_1-dark-chrome-front-grille.jpg" },
  { title: "Connecting LED tail lamps", img: "/images/cars/tucson/highlights/Hyundai-tucson-suv-highlight-bottom-800x530_2-connected-LED-tail-lamps.jpg" },
  { title: "Virtual cockpit", img: "/images/cars/tucson/highlights/Hyundai-tucson-suv-highlight-bottom-800x530_3-virtual-cockpit.jpg" },
  { title: "Premium black & light grey dual tone interiors", img: "/images/cars/tucson/highlights/Hyundai-tucson-suv-highlight-bottom-800x530_4-dual-tone-interior.jpg" },
  { title: '26.03 cm (10.25") HD audio video navigation system', img: "/images/cars/tucson/convenience/tucson-suv-convenience-small-2.jpg" },
  { title: "Hyundai Bluelink connected car technology", img: "/images/cars/tucson/convenience/tucson-suv-convenience-small-5.jpg" },
];

const EX = [
  { title: "Connecting LED tail lamps", img: "/images/cars/tucson/highlights/Hyundai-tucson-suv-highlight-bottom-800x530_2-connected-LED-tail-lamps.jpg" },
  { title: "Front", img: "/images/cars/tucson/exterior/tucson-suv-exterior-top-2-image01.jpg" },
  { title: "Side", img: "/images/cars/tucson/exterior/tucson-suv-exterior-top-2-image02.jpg" },
  { title: "Rear", img: "/images/cars/tucson/exterior/tucson-suv-exterior-top-2-image03.jpg" },
  { title: "Panoramic sunroof", img: "/images/cars/tucson/exterior/tucson-suv-exterior-top-2-image04.jpg" },
  { title: "Alloys", img: "/images/cars/tucson/exterior/tucson-suv-exterior-top-2-image05.jpg" },
  { title: "Tail lamps", img: "/images/cars/tucson/exterior/tucson-suv-exterior-top-2-image06.jpg" },
];

const IN = [
  { title: "Front ventilated & heated seats", img: "/images/cars/tucson/exterior/Hyundai-tucson-suv-interior-small-image-800x530-1.jpg" },
  { title: "10-way power driver seat with lumbar & memory", img: "/images/cars/tucson/interior/Hyundai-tucson-suv-interior-small-image-800x530-2.jpg" },
  { title: "Multi air mode", img: "/images/cars/tucson/convenience/tucson-suv-convenience-top-5.jpg" },
  { title: '26.03 cm (10.25") Floating type digital cluster', img: "/images/cars/tucson/interior/Hyundai-tucson-suv-interior-small-image-800x530-4.jpg" },
  { title: "Premium dual-tone interiors (wide)", img: "/images/cars/tucson/highlights/Hyundai-tucson-suv-highlight-bottom-800x530_4-dual-tone-interior.jpg" },
];

const PF = [
  { title: "R 2.0 l diesel engine", img: "/images/cars/tucson/performance/tucson-R%202.0-image-2-pc.jpg" },
  { title: "Nu 2.0 l petrol engine", img: "/images/cars/tucson/performance/tucson-Nu%202.0-image-2-pc.jpg" },
  { title: "Drive mode select – Eco", img: "/images/cars/tucson/performance/Hyundai-tucson-suv-performance-small-image-800x530-1.jpg" },
  { title: "Drive mode select – Normal", img: "/images/cars/tucson/performance/Hyundai-tucson-suv-performance-small-image-800x530-2.jpg" },
  { title: "Drive mode select – Sport", img: "/images/cars/tucson/performance/Hyundai-tucson-suv-performance-small-image-800x530-3.jpg" },
  { title: "Drive mode select – Smart (HTRAC)", img: "/images/cars/tucson/performance/Hyundai-tucson-suv-performance-small-image-800x530-4.jpg" },
];

const SF = [
  { title: "Six airbags - driver, passenger, side & curtain", img: "/images/cars/tucson/exterior/Hyundai-tucson-suv-safety-top-image-1120x600-1.jpg" },
  { title: "Vehicle stability management (VSM)", img: "/images/cars/tucson/safety/tucson-suv-safety-top-image1.jpg" },
  { title: "Electric parking brake & front parking sensors", img: "/images/cars/tucson/exterior/Hyundai-tucson-suv-safety-top-image-1120x600-3.jpg" },
  { title: "Electronic stability control (ESC)", img: "/images/cars/tucson/safety/Hyundai-tucson-suv-safety-top-image-1120x600-4.jpg" },
  { title: "Hill-start Assist Control (HAC)", img: "/images/cars/tucson/safety/Hyundai-tucson-suv-safety-small-image-800x530-2.jpg" },
  { title: "TPMS (Highline)", img: "/images/cars/tucson/safety/Hyundai-tucson-suv-safety-small-image-800x530-3.jpg" },
  { title: "All four disc brakes", img: "/images/cars/tucson/safety/Hyundai-tucson-suv-safety-small-image-800x530-4.jpg" },
  { title: "Forward collision-avoidance assist (FCA)", img: "/images/cars/tucson/safety/Safety-first.jpg" },
  { title: "Blind-spot view monitor (BVM)", img: "/images/cars/tucson/safety/Safety-second.jpg" },
  { title: "Driver attention warning (DAW)", img: "/images/cars/tucson/safety/Safety-third.jpg" },
  { title: "360° Surround View Monitor (SVM)", img: "/images/cars/tucson/safety/Safety-twelve.jpg" },
];

const CON = [
  { title: "60+ Bluelink connected features", img: "/images/cars/tucson/convenience/Hyundai-tucson-suv-convenience1.jpg" },
  { title: "Passenger seat walk-in device", img: "/images/cars/tucson/interior/tucson-suv-convenience-top-2.jpg" },
  { title: "2nd row seat folding – boot lever", img: "/images/cars/tucson/interior/Hyundai-tucson-suv-convenience-top-image-1120x600-3.jpg" },
  { title: "Bose premium sound – 8 speakers", img: "/images/cars/tucson/convenience/tucson-suv-convenience-top-4.jpg" },
  { title: "Wireless phone charger", img: "/images/cars/tucson/convenience/tucson-suv-convenience-small-1.jpg" },
  { title: "Longest wheelbase in the segment", img: "/images/cars/tucson/convenience/Hyundai-tucson-suv-convenience-small-image-800x530-2.jpg" },
  { title: "Embedded voice commands", img: "/images/cars/tucson/convenience/tucson-suv-convenience-small-image3.jpg" },
  { title: "10 regional languages infotainment", img: "/images/cars/tucson/convenience/tucson-suv-convenience-small-image5.jpg" },
  { title: "Ambient sounds of nature", img: "/images/cars/tucson/convenience/tucson-suv-convenience-small-image6.jpg" },
  { title: "Smart power tailgate (height adjustable)", img: "/images/cars/tucson/convenience/tucson-convenience-smart-tailgate.jpg" },
  { title: "Wireless charger & auto-dimming IRVM", img: "/images/cars/tucson/convenience/tucson-convenience-wireless-charging.jpg" },
  { title: "Remote engine start & ORVM controls", img: "/images/cars/tucson/performance/tucson-convenience-remote-start.jpg" },
  { title: "Door pocket lighting (illustrative)", img: "/images/cars/tucson/convenience/tucson-convenience-door-light.jpg" },
];

const FEATURES: Record<string, { platinum: boolean; signature: boolean }> = {
  "Ventilated & heated front seats": { platinum: false, signature: true },
  '10-way power driver seat + memory': { platinum: false, signature: true },
  '8-way passenger + Walk-in device': { platinum: false, signature: true },
  'Panoramic sunroof (voice)': { platinum: true, signature: true },
  '10.25" HD AVN + Bluelink': { platinum: true, signature: true },
  'All-wheel disc brakes + EPB': { platinum: true, signature: true },
  '6 Airbags, ESC, VSM, TPMS': { platinum: true, signature: true },
};

const SPECS = [
  { k: 'Dimensions (mm)', v: '4630 × 1865 × 1665' },
  { k: 'Wheelbase (mm)', v: '2755' },
  { k: 'Tyres/Wheels', v: 'R18 alloys' },
  { k: 'Fuel', v: 'Petrol / Diesel' },
  { k: 'Transmission', v: '6AT (Petrol) / 8AT (Diesel)' },
];

const PRICING: Array<{ variant: string; powertrain: string; price: string }> = [
  { variant: 'Platinum', powertrain: '2.0 Petrol 6AT', price: '₹ TBD*' },
  { variant: 'Platinum', powertrain: '2.0 Diesel 8AT', price: '₹ TBD*' },
  { variant: 'Signature', powertrain: '2.0 Petrol 6AT', price: '₹ TBD*' },
  { variant: 'Signature', powertrain: '2.0 Diesel 8AT', price: '₹ TBD*' },
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
        *Ex-showroom prices. May vary by city. Please contact your nearest dealer for accurate pricing.
      </div>
    </div>
  );
}

export default function TucsonFullImageSync() {
  const [activeTab, setActiveTab] = useState('highlights');
  const exteriorRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', brand.primary);
  }, []);

  useEffect(() => {
    const handler = () => {
      const ids = ['highlet', 'exterior', 'interior', 'performance', 'safety', 'convenience', 'features', 'pricing', 'specs'];
      const offsets = ids.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, d: Infinity };
        return { id, d: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      offsets.sort((a, b) => a.d - b.d);
      setActiveTab(offsets[0]?.id ?? 'highlet');
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

  // Video playback control - skip last 4 seconds
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // If video is within 4 seconds of the end, restart it
      if (video.duration - video.currentTime <= 4) {
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const tabs = [
    { id: 'highlet', label: 'Highlights', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'exterior', label: 'Exterior', icon: <Car className="w-4 h-4" /> },
    { id: 'interior', label: 'Interior', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Gauge className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" /> },
    { id: 'convenience', label: 'Convenience', icon: <Settings className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <Activity className="w-4 h-4" /> },
    { id: 'specs', label: 'Specs', icon: <Activity className="w-4 h-4" /> },
  ];

  // Manifest-backed state (fallback to constants)
  const [hl, setHl] = useState(HL);
  const [ex, setEx] = useState(EX);
  const [inn, setInn] = useState(IN);
  const [pf, setPf] = useState(PF);
  const [sf, setSf] = useState(SF);
  const [con, setCon] = useState(CON);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/images/cars/tucson/manifest.json', { cache: 'no-store' });
        if (!res.ok) return;
        const m = await res.json();
        const pick = (k: string) => Array.isArray(m?.categories?.[k]) ? m.categories[k].map((it: any) => ({ title: it.title || it.file, img: it.src })) : [];
        const hlM = pick('highlights');
        const exM = pick('exterior');
        const inM = pick('interior');
        const pfM = pick('performance');
        const sfM = pick('safety');
        const cvM = pick('convenience');
        // Only update if manifest has items AND has at least as many as fallback (prevents incomplete replacements)
        // For performance, require at least 6 images (current PF array length) to prevent missing images
        if (hlM.length >= 4) setHl(hlM);
        if (exM.length >= 1) setEx(exM);
        if (inM.length >= 3) setInn(inM);
        if (pfM.length >= 6) setPf(pfM); // Only replace if manifest has at least 6 performance images
        if (sfM.length >= 3) setSf(sfM);
        if (cvM.length >= 5) setCon(cvM);
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
      console.assert(CON.length >= 5, 'CON should contain convenience images');
      console.assert(PRICING.length >= 4, 'PRICING should contain at least 4 rows');
      [...HL, ...EX, ...IN, ...PF, ...SF, ...CON].forEach((item, idx) => {
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
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10"
          src="/assets1/Hyundai TUCSON _ Wrap doors.mp4"
        />
        {/* Premium Light Black Overlay */}
        <div className="fixed inset-0 bg-black/20 -z-10" />
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
              src="/images/cars/tucson/highlights/Hyundai-tucson-suv-highlight-banner-1920x720.jpg"
              alt="Hyundai TUCSON hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.6),rgba(0,0,0,.1)_60%,transparent)]" />
            <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white max-w-2xl">
              <div>
                <div className="text-xs uppercase tracking-widest mb-3 opacity-90">Parametric & Progressive</div>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Hyundai TUCSON</h1>
                <p className="mt-3 text-base md:text-lg text-white/90">Premium SUV with virtual cockpit, SmartSense ADAS and refined powertrains.</p>
                <div className="mt-3 flex flex-wrap gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 inline-flex">
                  <Chip>Platinum</Chip>
                  <Chip>Signature</Chip>
                  <Chip>2.0 Petrol 6AT</Chip>
                  <Chip>2.0 Diesel 8AT</Chip>
                </div>
                <div className="mt-6 flex gap-2">
                  <a href="#highlet" className="inline-flex items-center gap-2 rounded-2xl bg-[color:var(--brand-primary)] px-5 py-2 text-sm font-medium text-white shadow-lg shadow-[color:var(--brand-primary)]/30">
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
          <Section id="highlet" title="Highlights" icon={<Sparkles className="w-5 h-5" />}>
            {/* Description Text */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai TUCSON Car - Parametric, Progressive Design.
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                The all-new Hyundai TUCSON is a revolution in design. Sophisticated and progressive, it's the SUV taking modern aesthetics to the next level.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Truly, the cutting-edge SUV design with advanced technology.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  Hyundai TUCSON Car starts at an ex-showroom price of just ₹.27.31* Lakh.
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  Experience cutting-edge technology and sleek design at a good price.
                </p>
              </div>
            </div>

            {/* Combined Highlights Gallery */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {hl.map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="exterior" title="Exterior" icon={<Car className="w-5 h-5" />}>
            {/* Exterior Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai TUCSON Car Exteriors: Next Drives Now
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                For some, success is not a finishing line but a starting point. The all-new Hyundai TUCSON is their SUV of choice. With looks that redefine elegance and are complimented with state-of-the-art technology that stands apart.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Add the unique Hyundai SmartSense features and it is virtually intuition on wheels. Truly, the next gen of SUVs.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  Experience the Hyundai TUCSON exterior with a futuristic design that turns heads.
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  Look at the 360° view of TUCSON and explore stunning TUCSON images that redefine elegance and innovation!
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
            {/* Interior Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai TUCSON Interior: Exquisite in Every Way
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Step into the all-new Hyundai TUCSON and experience sheer luxury. The driver side houses a 26.03 cm (10.25") floating type digital cluster which builds on the SUVs advanced and modern design characteristics.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Hit the right spot in your driving position with 10-way power adjustable ventilated & heated driver seat with memory function. The epitome of comfort, the embodiment of elegance.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  Explore Hyundai TUCSON interior images and explore every angle with the stunning TUCSON 360 view
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  —where innovation meets elegance!
                </p>
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-3xl border border-gray-200 dark:border:white/10">
              <div className="relative aspect-[21/9] bg-gray-100">
                <img src="/images/cars/tucson/interior/tucsoninteriorinnerkv-pc.jpg" alt="Interior main view" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {inn.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="performance" title="Performance" icon={<Gauge className="w-5 h-5" />}>
            {/* Performance Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                A Supreme Performance: Hyundai TUCSON Car's Outstanding Driving Experience
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                The all-new Hyundai TUCSON is ready for everything. HTRAC empowers you to take on challenging roads while different modes ensure all your journeys go smooth.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  The Hyundai TUCSON offers smooth performance with instant power and efficiency.
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  With impressive TUCSON mileage, it lets you drive longer with fewer stops for charging.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pf.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-white/70">Automatic transmissions: 6AT (Petrol) · 8AT (Diesel). Drive & Traction modes per variant.</p>
          </Section>

          <Section id="safety" title="Safety & ADAS" icon={<Shield className="w-5 h-5" />}>
            {/* Safety Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                The all-new Hyundai TUCSON is loaded with advanced tech that ensures a better driving experience and a range of features to ensure your safety.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800 mb-4">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  Hyundai TUCSON petrol has been awarded with 5 star BNCAP safety for adult and child occupants both which make it more safer than before.
                </p>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  The Hyundai TUCSON car Safety Features ensure ultimate protection with 6 airbags, Hill-Start Assist, and more.
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  Drive confidently with the Hyundai TUCSON car Safety Features, designed for your peace of mind.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sf.map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="convenience" title="Convenience" icon={<Settings className="w-5 h-5" />}>
            {/* Convenience Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai TUCSON Car Convenience: Leading-edge Technology
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Connections go beyond in the all-new Hyundai TUCSON. The 26.03 cm (10.25") HD audio video navigation system will always get an encore. The home to car (H2C) with Alexa allows you to stay connected with your car from home, while 60+ Bluelink connected features ensure you're connected with the world while on the move.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  The Hyundai TUCSON car comfort & convenience Features redefine every drive with a spacious cabin, advanced climate control, and smart connectivity.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {con.slice(0, -4).map((c, i) => (
                <Card key={i} title={c.title} img={c.img} />
              ))}
            </div>
          </Section>

          <Section id="specs" title="Specifications" icon={<Activity className="w-5 h-5" />}>
            <div className="space-y-8">
              {/* Performance Specifications */}
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Performance</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Engine Options</div>
                    <div className="text-base font-medium">2.0 Petrol / 2.0 Diesel</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Transmission</div>
                    <div className="text-base font-medium">6AT (Petrol) / 8AT (Diesel)</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Drive Modes</div>
                    <div className="text-base font-medium">Eco • Normal • Sport • Smart (HTRAC)</div>
                  </div>
                </div>
              </div>

              {/* Dimension Specifications */}
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Dimension</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Length × Width × Height</div>
                    <div className="text-base font-medium">4630 × 1865 × 1665 mm</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Wheelbase</div>
                    <div className="text-base font-medium">2755 mm</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Ground Clearance</div>
                    <div className="text-base font-medium">N/A</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Boot Space</div>
                    <div className="text-base font-medium">N/A</div>
                  </div>
                </div>
              </div>

              {/* Wheels Specifications */}
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Wheels</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Tyres/Wheels</div>
                    <div className="text-base font-medium">R18 alloys</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Brakes</div>
                    <div className="text-base font-medium">All-wheel disc brakes</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">EPB</div>
                    <div className="text-base font-medium">Electric Parking Brake</div>
                  </div>
                </div>
              </div>

              {/* Quick Specifications Table */}
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-white/10">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Overview</h3>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {SPECS.map((spec, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white/30 dark:bg-white/5">
                        <span className="text-sm opacity-80">{spec.k}</span>
                        <span className="text-base font-medium text-right">{spec.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="pricing" title="Variants & Pricing" icon={<Activity className="w-5 h-5" />}>
            <VariantsPricingSection />
          </Section>

          
        </main>

        {/* Front view image above strip */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src={(ex.find(e=>e.title.toLowerCase().includes('front'))||ex[0]).img} alt="Tucson front view" className="h-[50vh] w-full object-cover" />
          </div>
        </div>

        {/* Bottom slow-scrolling strip */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-24">
            <div className="relative">
              <div className="flex gap-4 animate-scroll-slow">
                {[...hl, ...ex, ...inn, ...pf, ...sf, ...con, ...hl, ...ex].map((c, i) => (
                  <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                    <img src={c.img} alt={`Tucson ${i + 1}`} className="h-full w-full object-cover" />
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



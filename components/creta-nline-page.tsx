"use client"
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

// CRETA N Line Showcase — built from Hyundai India reference pages
// Sections: Highlights, Exterior, Interior, Performance, Safety, Convenience, Specifications, Features
// TailwindCSS required. Drop this component into a React/Next.js project with Tailwind configured.
// Images will be served locally via manifest when available; falls back to existing local paths.

const brand = { primary: "#0057B8", accent: "#00A9E0", dark: "#0B1F3A" } as const;
const cn = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

const EXTERIOR_IMAGES = [
  {
    src:
      "/images/cars/creta-nline/creta-n-line-exterior-small-tyre.jpg",
    caption: "R18 diamond cut alloys with N logo & red caliper",
  },
  {
    src:
      "/images/cars/creta-nline/creta-n-line-exterior-small-frontsideview.jpg",
    caption: "Quad beam LED headlamps with horizon LED positioning lamp & DRLs",
  },
  {
    src:
      "/images/cars/creta-nline/creta-n-line-exterior-small-rightsideview-1.jpg",
    caption: "Sporty black radiator grille & bold stance",
  },
  {
    src:
      "/images/cars/creta-nline/creta-n-line-exterior-small.jpg",
    caption: "Side sill with red inserts",
  },
  {
    src:
      "/images/cars/creta-nline/creta-n-line-exterior-small-1.jpg",
    caption: "Twin-tip muffler & rear bumper with red inserts",
  },
  {
    src:
      "/images/cars/creta-nline/cretanlinediffuserdesign.jpg",
    caption: "Sporty tailgate spoiler & aero diffuser",
  },
];

const INTERIOR_IMAGES = [
  {
    src:
      "/images/cars/creta-nline/creta-n-line-interior-seatdesign.jpg",
    caption: "Front row ventilated seats",
  },
  {
    src:
      "/images/cars/creta-nline/creta-n-line-interior-seatdesign1.jpg",
    caption: "Leatherette upholstery seats with N logo",
  },
];

// Hero slider images
const HERO_IMAGES = [
  "/images/cars/creta-nline/creta-n-line-exterior-small-frontsideview.jpg",
  "/images/cars/creta-nline/creta-n-line-exterior-small-rightsideview-1.jpg",
  "/images/cars/creta-nline/cretanlinediffuserdesign.jpg",
];

const SPEC_TABLE = [
  { label: "Engine", value: "1.5L Turbo GDi Petrol (1482 cc)" },
  { label: "Power", value: "160 PS (approx. 158 bhp) @ 5,500 rpm" },
  { label: "Torque", value: "253 Nm @ 1,500–3,500 rpm" },
  { label: "Transmission", value: "6MT / 7DCT (varies by variant)" },
  { label: "Drive", value: "Front Wheel Drive" },
  { label: "Fuel Tank", value: "50 L" },
  { label: "Dimensions (L×W×WB)", value: "4330 × 1790 × 2610 mm" },
  { label: "Seating", value: "5" },
];

const FEATURES = {
  tech: [
    "26.03 cm (10.25”) HD infotainment",
    "26.03 cm (10.25”) digital cluster",
    "Bluelink connected features",
    "Bose premium sound system",
    "Wireless phone charger",
    "Alexa Home-to-Car",
  ],
  comfort: [
    "Dual-zone automatic climate control",
    "Front ventilated seats",
    "8-way powered driver seat (select variants)",
    "Panoramic sunroof (voice-enabled)",
    "Rear AC vents",
    "Large boot space",
  ],
  safety: [
    "6 airbags (standard)",
    "ESC, VSM, Hill Assist Control",
    "EPB with Auto Hold",
    "TPMS",
    "Hyundai SmartSense Level 2 ADAS (select variants)",
    "BVM / SVM (select variants)",
  ],
};

// Images for cards pulled from official Hyundai CDN (reference pages)
const HIGHLIGHTS_CARDS = [
  {
    title: "Dual 10.25″ displays",
    body: "Curvilinear 26.03 cm infotainment + 26.03 cm digital cluster.",
    img: "/images/cars/creta-nline/creta-n-line-suv-convenience-display.jpg",
  },
  {
    title: "Sporty N Line identity",
    body: "Black theme with red accents and N badging.",
    img: "/images/cars/creta-nline/CRETA N Line - interior -top big image.jpg",
  },
  {
    title: "Voice‑enabled sunroof",
    body: "Smart panoramic sunroof with voice control.",
    img: "/images/cars/creta-nline/Convenience - 4 - sunroof.jpg",
  },
  {
    title: "Connected car tech",
    body: "Bluelink, Alexa Home‑to‑Car, and more.",
    img: "/images/cars/creta-nline/creta-n-line-suv-convenience.jpg",
  },
  {
    title: "Safety suite",
    body: "6 airbags standard, ESC, EPB (Auto Hold), TPMS.",
    img: "/images/cars/creta-nline/creta-n-line-suv-safety.jpg",
  },
  {
    title: "Level 2 ADAS*",
    body: "On select variants, SmartSense assistance features.",
    img: "/images/cars/creta-nline/Big-image-1st.jpg",
  },
];

const CONVENIENCE_CARDS = [
  {
    title: "Home to car (H2C) with Alexa",
    img: "/images/cars/creta-nline/creta-n-line-suv-convenience.jpg",
  },
  {
    title: "26.03cm (10.25”) multi display digital cluster",
    img: "/images/cars/creta-nline/creta-n-line-suv-convenience-display.jpg",
  },
  {
    title: "Bose premium sound system (8 speakers)",
    img: "/images/cars/creta-nline/creta-n-line-suv-convenience-bosemusicsystem.jpg",
  },
  {
    title: "Traction control modes (Snow, Mud, Sand)",
    img: "/images/cars/creta-nline/creta-n-line-suv-convenience-topview.jpg",
  },
  {
    title: "Dual zone automatic temperature control (DATC)",
    img: "/images/cars/creta-nline/cretanlinedatc.jpg",
  },
  {
    title: "Exciting red ambient lighting",
    img: "/images/cars/creta-nline/creta-n-line-suv-convenience-dashboard.jpg",
  },
  {
    title: "Wireless phone charger",
    img: "/images/cars/creta-nline/creta-n-line-suv-convenience-wirelesscharger.jpg",
  },
  {
    title: "Voice enabled smart panoramic sunroof",
    img: "/images/cars/creta-nline/Convenience - 4 - sunroof.jpg",
  },
  {
    title: "USB charger (C type)",
    img: "/images/cars/creta-nline/creta-n-line-suv-convenience-poweroutlet.jpg",
  },
];

const SAFETY_CARDS = [
  {
    title: "SVM & BVM",
    img: "/images/cars/creta-nline/Big-image-1st.jpg",
  },
  {
    title: "Six airbags (standard)",
    img: "/images/cars/creta-nline/Big-image-2.jpg",
  },
  {
    title: "Electric parking brake with Auto Hold",
    img: "/images/cars/creta-nline/creta-n-line-suv-safety-ABS.jpg",
  },
  {
    title: "Tyre Pressure Monitoring System (Highline)",
    img: "/images/cars/creta-nline/creta-n-line-suv-safety-display.jpg",
  },
  {
    title: "Hill Start Assist Control",
    img: "/images/cars/creta-nline/creta-n-line-suv-safety.jpg",
  },
  {
    title: "Electronic Stability Control & VSM",
    img: "/images/cars/creta-nline/ESC.jpg",
  },
  {
    title: "Automatic headlamps",
    img: "/images/cars/creta-nline/cretanlineheadlamp.jpg",
  },
  {
    title: "Emergency stop signal",
    img: "/images/cars/creta-nline/creta-n-line-suv-safety-headlamp.jpg",
  },
  {
    title: "Front parking sensors",
    img: "/images/cars/creta-nline/cretanlinefrontparkingsensors.jpg",
  },
];

// Performance images (using official Hyundai images that reflect powertrain/handling cues)
const PERFORMANCE_CARDS = [
  {
    title: "1.5l Turbo GDi petrol engine",
    img: "/images/cars/creta-nline/creta-n-line suv performance-dieselengine-1.jpg",
    caption: "Turbocharged GDi engine (official page hero image)",
  },
  {
    title: "7‑speed DCT (Dual clutch transmission)",
    img: "/images/cars/creta-nline/creta-n-line-suv-performance-automatictransmission.jpg",
    caption: "Quick, seamless gear shifts",
  },
  {
    title: "6‑speed MT (Manual transmission)",
    img: "/images/cars/creta-nline/creta-n-line-suv-performance-manualtransmission.jpg",
    caption: "Engaging stick-shift control",
  },
  {
    title: "Paddle shifters (DCT only)",
    img: "/images/cars/creta-nline/creta-n-line-suv-performance.jpg",
    caption: "Manual override on the fly",
  },
  {
    title: "Traction control modes (Snow, Mud, Sand)",
    img: "/images/cars/creta-nline/creta-n-line-suv-performance-topview.jpg",
    caption: "Adapt grip for varying surfaces",
  },
];

// FIX: Remove duplicated/destructured param redeclaration that caused syntax error
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
      <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-md border border-[#D6E4F5] rounded-xl px-3 py-2 shadow-[0_10px_30px_-20px_rgba(11,31,58,0.45)]">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1F3A]">{title}</h2>
      </div>
      {subtitle && <p className="text-gray-700 dark:text-gray-300 mt-2">{subtitle}</p>}
    </div>
  );
}

function ImageGrid({ items }: { items: { src: string; caption?: string }[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((img, i) => (
        <figure key={i} className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm hover:shadow-lg transition">
          <img
            src={img.src}
            alt={img.caption || "CRETA N Line"}
            className="w-full h-64 object-cover group-hover:scale-[1.03] transition"
            loading="lazy"
          />
          {img.caption && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-sm p-3">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function KeyValueTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm">
        <table className="w-full">
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={`text-sm md:text-base ${i % 2 ? "bg-white/50 dark:bg-white/5" : "bg-white/80 dark:bg-white/5"}`}>
                <td className="font-medium p-4 w-1/3 text-gray-900 dark:text-white border-r border-gray-200 dark:border-white/10">{r.label}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm bg-white/10 backdrop-blur-md border-white/20 shadow-lg">
      {children}
    </span>
  );
}

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-white/15 bg-white/10 backdrop-blur-md">
    {children}
  </span>
);

// Optional smoke tests: flip to true to render test blocks in-page
const __DEV_TESTS__ = false;

// CRETA N Line Variants & Pricing Data
const CRETA_NLINE_PRICING: Array<{ variant: string; powertrain: string; price: string }> = [
  { variant: 'N6', powertrain: '1.5L Turbo Petrol 6MT', price: '₹ 15.99 Lakh*' },
  { variant: 'N8', powertrain: '1.5L Turbo Petrol 6MT', price: '₹ 17.99 Lakh*' },
  { variant: 'N8', powertrain: '1.5L Turbo Petrol 7DCT', price: '₹ 19.99 Lakh*' },
  { variant: 'N8(O)', powertrain: '1.5L Turbo Petrol 6MT', price: '₹ 19.99 Lakh*' },
  { variant: 'N8(O)', powertrain: '1.5L Turbo Petrol 7DCT', price: '₹ 21.99 Lakh*' },
  { variant: 'N8(O) Connect', powertrain: '1.5L Turbo Petrol 6MT', price: '₹ 21.99 Lakh*' },
  { variant: 'N8(O) Connect', powertrain: '1.5L Turbo Petrol 7DCT', price: '₹ 23.99 Lakh*' },
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

  const groupedPricing = CRETA_NLINE_PRICING.reduce((acc, item) => {
    if (!acc[item.variant]) {
      acc[item.variant] = [];
    }
    acc[item.variant].push(item);
    return acc;
  }, {} as Record<string, typeof CRETA_NLINE_PRICING>);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        {Object.entries(groupedPricing).map(([variant, items]) => (
          <div
            key={variant}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleVariant(variant)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/10 dark:hover:bg-white/5 transition-colors text-gray-900 dark:text-white"
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
                      <div className="text-xl font-bold text-[#0057B8] dark:text-[#00A9E0]">{item.price}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ex-showroom*</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
        
        <div className="mt-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-sm text-gray-600 dark:text-gray-400 text-center">
          *Ex-showroom prices. May vary by city. Please contact your nearest dealer for accurate pricing and availability.
        </div>
      </div>
    </div>
  );
}

export default function CretaNLinePage() {
  const [activeTab, setActiveTab] = useState('exterior');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [manifestData, setManifestData] = useState<null | {
    categories: Record<string, { title?: string; src: string }[]>;
  }>(null);

  // Curated captions keyed by filename to show precise names
  const CAPTION_MAP: Record<string, string> = {
    // Highlights (Knight)
    "cretanlinebig2.jpg": "N Line Knight – hero view",
    "cretanlinefrontgrilsplitter.jpg": "Front grille with splitter",
    "cretanlinebatch.jpg": "N Line badge",
    "cretanlinedashcam.jpg": "Dashcam",
    "cretanlinedatc.jpg": "Dual zone automatic temperature control (DATC)",
    "cretanlinemood.jpg": "Ambient mood lighting",
    "cretanlinetailight.jpg": "Distinctive tail lamps",
    "cretanlinediffuser.jpg": "Rear diffuser",
    "cretanlinehorizonlamp.jpg": "Horizon LED positioning lamp",
    "cretanlinescoopseats.jpg": "Sporty seat design",

    // Exterior
    "cretanlinebig3.jpg": "Exterior – dynamic stance",
    "side.jpg": "Side profile",
    "creta-n-line-exterior-small-rightsideview.jpg": "Right side view",
    "creta-n-line-exterior-small-frontsideview.jpg": "Front side view",
    "creta-n-line-exterior-small-rightsideview-1.jpg": "Right side view (alt)",
    "creta-n-line-exterior-small.jpg": "Exterior detail",
    "creta-n-line-exterior-small-tyre.jpg": "R18 diamond cut alloys with N logo",
    "cretanlinediffuserdesign.jpg": "Aero diffuser design",
    "creta-n-line-exterior-small-1.jpg": "Rear bumper with red inserts",

    // Interior
    "creta-n-line-interior-seatdesign.jpg": "Front row ventilated seats",
    "creta-n-line-interior-seatdesign1.jpg": "Leatherette upholstery with N logo",
    "creta-n-line-interior-airbag.jpg": "6 airbags (image)",
    "creta-n-line-interior-seatcompactdesign.jpg": "Compact seat design",
    "creta-n-line-compact-bootspace.jpg": "Boot space",
    "creta-n-line-interior-flexibleseat.jpg": "Flexible seating",
    "creta-n-line-interior.jpg": "Interior overview",
    "creta-n-line-interior-mirror.jpg": "Interior mirror",
    "creta-n-line-interior-babyseat.jpg": "Child seat compatibility",
    "creta-n-line-interior-acvent.jpg": "AC vent detail",

    // Performance
    "creta-n-line-suv-performance-automatictransmission.jpg": "7‑speed DCT",
    "creta-n-line-suv-performance-manualtransmission.jpg": "6‑speed MT",
    "creta-n-line-suv-performance.jpg": "Paddle shifters",
    "creta-n-line-suv-performance-topview.jpg": "Traction control modes (Snow/Mud/Sand)",

    // Safety
    "big-image-1st.jpg": "SVM & BVM",
    "big-image-2.jpg": "Six airbags (standard)",
    "creta-n-line-suv-safety-abs.jpg": "EPB with Auto Hold",
    "creta-n-line-suv-safety-display.jpg": "TPMS Highline",
    "creta-n-line-suv-safety.jpg": "ESC & VSM",
    "esc.jpg": "Electronic Stability Control",
    "cretanlineheadlamp.jpg": "Automatic headlamps",
    "creta-n-line-suv-safety-headlamp.jpg": "Emergency stop signal",
    "cretanlinefrontparkingsensors.jpg": "Front parking sensors",
    "cretanlinefwdcollcar.jpg": "Forward Collision Avoidance (car)",
    "cretanlinefwdcollman.jpg": "Forward Collision Avoidance (pedestrian)",
    "creta-n-line-suv-safety-6.jpg": "Safety feature",
    "fwcolljunctwarning.jpg": "Forward Collision Junction Warning",
    "creta-n-line-suv-safety-3.jpg": "Safety feature",
    "creta-n-line-suv-safety-11.jpg": "Safety feature",
    "creta-n-line-suv-safety-10.jpg": "Safety feature",
    "creta-n-line-suv-safety-2.jpg": "Safety feature",
    "creta-n-line-suv-safety-12.jpg": "Safety feature",
    "creta-n-line-suv-safety-14.jpg": "Safety feature",
    "cretanlinelfa.jpg": "Lane Following Assist (LFA)",
    "cretanlinescc.jpg": "Smart Cruise Control (SCC)",
    "ctanlinesafeexist.jpg": "Safe Exit Warning",
    "creta-n-line-suv-safety-display-1.jpg": "Cluster safety display",

    // Convenience
    "creta-n-line-suv-convenience.jpg": "Home‑to‑Car with Alexa",
    "creta-n-line-suv-convenience-display.jpg": "Dual 10.25″ displays",
    "creta-n-line-suv-convenience-bosemusicsystem.jpg": "Bose premium sound system",
    "creta-n-line-suv-convenience-topview.jpg": "Traction control modes",
    "creta-n-line-suv-convenience-dashboard.jpg": "Ambient lighting",
    "creta-n-line-suv-convenience-wirelesscharger.jpg": "Wireless phone charger",
    "convenience-4-sunroof.jpg": "Voice enabled smart panoramic sunroof",
    "creta-n-line-suv-convenience-poweroutlet.jpg": "USB charger (C type)",
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', brand.primary);
  }, []);

  useEffect(() => {
    const handler = () => {
      const ids = ['exterior', 'interior', 'performance', 'safety', 'convenience', 'specifications', 'pricing', 'features'];
      const offsets = ids.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, d: Infinity };
        return { id, d: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      offsets.sort((a, b) => a.d - b.d);
      setActiveTab(offsets[0]?.id ?? 'exterior');
    };

    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Video playback control - skip last 5 seconds
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime <= 5) {
        video.currentTime = 0;
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const tabs = [
    { id: 'exterior', label: 'Exterior', icon: <Car className="w-4 h-4" /> },
    { id: 'interior', label: 'Interior', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Gauge className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" /> },
    { id: 'convenience', label: 'Convenience', icon: <Settings className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <Activity className="w-4 h-4" /> },
    { id: 'specifications', label: 'Specifications', icon: <Activity className="w-4 h-4" /> },
  ];

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/images/cars/creta-nline/manifest.json', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setManifestData(json);
      } catch {}
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const getItems = (key: string, fallback: { src: string; caption?: string }[]) => {
    const arr = manifestData?.categories?.[key] as { title?: string; src: string }[] | undefined;
    if (!arr || arr.length === 0) return fallback;
    return arr.map((it) => {
      const file = (it.src || '').split('/').pop() || '';
      const caption = CAPTION_MAP[file.toLowerCase()] || it.title || file;
      return { src: it.src, caption };
    });
  };
  return (
    <div className="min-h-screen bg-transparent text-gray-900">
      {/* Fixed background video */}
      <div className="fixed inset-0 -z-10">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/creta-nline-bg.mp4" type="video/mp4" />
        </video>
        <div className="fixed inset-0 bg-black/40 -z-10" />
      </div>
      <header className="relative">
        {/* Top fixed nav */}
        <div className="fixed top-0 left-0 right-0 z-40 border-b border-white/20 bg-gradient-to-b from-[#0B1F3A]/70 via-[#002C5F]/55 to-[#0B1F3A]/70 backdrop-blur-2xl shadow-xl shadow-[#0B1F3A]/40 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:via-transparent before:to-transparent before:pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 py-2">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 sm:gap-3 font-bold text-white group transition-transform hover:scale-105 flex-shrink-0 min-w-0"
            >
              <div className="relative flex-shrink-0">
                <span
                  aria-hidden
                  className="inline-block h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg bg-gradient-to-br from-[#002C5F] to-[#0057B8] shadow-lg shadow-[#002C5F]/40 group-hover:shadow-[#0057B8]/50 transition-all"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">H</span>
              </div>
              <div className="flex flex-col min-w-0 hidden sm:flex">
                <span className="text-sm sm:text-base md:text-lg leading-tight tracking-tight truncate">Bharat Hyundai</span>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/60 uppercase tracking-wider truncate">Authorized Dealer</span>
              </div>
            </a>
            <nav className="flex-1 overflow-x-auto flex gap-2 no-scrollbar relative">
              {tabs.map((t) => (
                <a key={t.id} href={`#${t.id}`} className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border text-white/80 hover:text-white border-white/20 hover:bg-white/10 whitespace-nowrap', activeTab === t.id ? 'bg-[#0057B8] text-white border-transparent' : '')}>
                  {t.icon}
                  <span>{t.label}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#0057B8] to-transparent" />
        </div>
        <div className="h-[60px]"></div>

        {/* Hero */}
        <div className="relative py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-2xl text-white">
              <div className="text-xs uppercase tracking-widest mb-3 opacity-90">WRC‑Inspired Performance</div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Hyundai CRETA N Line</h1>
              <p className="mt-3 text-base md:text-lg text-white/90">Based on WRC‑inspired design, the CRETA N Line blends an aggressive stance with a feature‑rich cockpit.</p>
              <div className="mt-3 flex flex-wrap gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 inline-flex">
                <Chip>1.5L Turbo GDi</Chip>
                <Chip>7‑Speed DCT / 6MT</Chip>
                <Chip>Level 2 ADAS*</Chip>
                <Chip>6 Airbags</Chip>
              </div>
              <div className="mt-6 flex gap-2">
                <a href="#highlights" className="inline-flex items-center gap-2 rounded-2xl bg-[#0057B8] px-5 py-2 text-sm font-medium text-white shadow-lg shadow-[#0057B8]/30 hover:bg-[#00458A]">
                  Explore <ChevronRight className="w-4 h-4" />
                </a>
                <a href="#specifications" className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-5 py-2 text-sm font-medium bg-white/10 backdrop-blur text-white hover:bg-white/20">
                  Specs
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Highlights */}
      <section id="highlights">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-md border border-[#D6E4F5] rounded-xl px-3 py-2 shadow-[0_10px_30px_-20px_rgba(11,31,58,0.45)]">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1F3A]">Highlights</h2>
          </div>
          <div className="mb-8 max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hyundai CRETA N Line.
            </h3>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Live Unleashed.
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Unchain from the ordinary with Hyundai CRETA N Line. Powered by a spirited 1.5l turbo petrol engine that complements its furiously independent streak,
            </p>
            <div className="bg-[#0057B8]/20 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/30 shadow-lg shadow-[#0057B8]/20">
              <p className="text-xl font-semibold text-white">
                Hyundai CRETA N Line is designed for your adventures.
              </p>
              <p className="text-base text-white/90 mt-2">
                Experience the perfect blend of style, comfort, and technology at competitive prices.
              </p>
            </div>
          </div>
        </div>
        <ImageGrid items={getItems('highlights', HIGHLIGHTS_CARDS.map((c) => ({ src: c.img, caption: c.title })))} />
      </section>

      {/* Exterior */}
      <section id="exterior">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-md border border-[#D6E4F5] rounded-xl px-3 py-2 shadow-[0_10px_30px_-20px_rgba(11,31,58,0.45)]">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1F3A]">Exterior</h2>
          </div>
          <div className="mb-8 max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hyundai Creta N Line Car Exterior - Exhilarating outside.
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Heads will turn, hearts will race. Hyundai CRETA N Line isn't just an SUV; it's an adrenaline shot on four wheels, and its design screams it as loud and clear as the roar of the engine. From the road gripping R18 (D=462 mm) diamond cut alloys with N logo, to the sleek aerodynamics, every detail exudes performance. Feast your eyes on the sleek, horizon LED positioning lamp & DRLs and rear horizon LED tail lamp flowing seamlessly into the unique design. They aren't just for aesthetics; they're a declaration of dominance.
            </p>
            <div className="bg-[#0057B8]/20 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/30 shadow-lg shadow-[#0057B8]/20">
              <p className="text-xl font-semibold text-white">
                Experience the Hyundai CRETA N Line exterior with bold and dynamic design.
              </p>
              <p className="text-base text-white/90 mt-2">
                Explore stunning CRETA N Line images that redefine SUV aesthetics!
              </p>
            </div>
          </div>
        </div>
        <ImageGrid items={getItems('exterior', EXTERIOR_IMAGES)} />
      </section>

      {/* Interior */}
      <section id="interior">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-lg">Interior</h2>
          <div className="mb-8 max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hyundai Creta N Line Car Interior - Inside the beast.
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Step inside the cockpit of the Hyundai CRETA N Line and lose yourself in the fusion of performance and precision. The exclusive sporty black interiors with athletic red inserts courses through every angle inside. Feel the command centre at your fingertips, the steering wheel, gear knob and seats sporting the iconic N logo.
            </p>
            <div className="bg-[#0057B8]/20 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/30 shadow-lg shadow-[#0057B8]/20">
              <p className="text-xl font-semibold text-white">
                Explore Hyundai CRETA N Line interior images and experience performance like never before.
              </p>
              <p className="text-base text-white/90 mt-2">
                —where comfort meets adventure!
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-md border border-[#D6E4F5] rounded-xl px-3 py-2 shadow-[0_10px_30px_-20px_rgba(11,31,58,0.45)]">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1F3A]">Interior</h2>
          </div>
        </div>
        <ImageGrid items={getItems('interior', INTERIOR_IMAGES)} />
      </section>

      {/* Performance */}
      <section id="performance">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-md border border-[#D6E4F5] rounded-xl px-3 py-2 shadow-[0_10px_30px_-20px_rgba(11,31,58,0.45)]">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1F3A]">Performance</h2>
          </div>
          <div className="mb-8 max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hyundai Creta N Line Car Performance unleashed.
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Feel the pulse-quickening surge of the 1.5l turbocharged engine, its raw horsepower clawing at the asphalt from the moment you hit the accelerator. Each shift providing a new level of exhilaration. But there's more than just power, Hyundai CRETA N Line
            </p>
            <div className="bg-[#0057B8]/20 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/30 shadow-lg shadow-[#0057B8]/20">
              <p className="text-xl font-semibold text-white">
                The Hyundai CRETA N Line offers smooth performance with power and efficiency.
              </p>
              <p className="text-base text-white/90 mt-2">
                With impressive fuel economy, it lets you drive longer with fewer fuel stops.
              </p>
            </div>
          </div>
        </div>
        {/* Performance image cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {getItems('performance', PERFORMANCE_CARDS.map((p) => ({ src: p.img, caption: p.title }))).map((p, i) => (
            <figure key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 overflow-hidden shadow-sm">
              <img src={p.src} alt={p.caption || 'Performance'} className="w-full h-40 object-cover" loading="lazy" />
              <figcaption className="p-5">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">{p.caption || 'Performance'}</div>
              </figcaption>
            </figure>
          ))}
            </div>
        {/* Key performance specs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6 mt-6">
          {[
            {
              k: "Engine",
              v: "1.5L Turbo GDi (1482 cc)",
            },
            { k: "Power", v: "~160 PS (approx. 158 bhp)" },
            { k: "Torque", v: "253 Nm" },
            { k: "Gearboxes", v: "6‑speed MT / 7‑speed DCT (variant dependent)" },
            { k: "Drive", v: "FWD" },
            { k: "Suspension", v: "MacPherson Strut front / Twist Beam rear" },
          ].map((it, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5 shadow-sm">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-400 mb-2">{it.k}</div>
              <div className="font-semibold text-gray-900 dark:text-white">{it.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section id="safety">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-md border border-[#D6E4F5] rounded-xl px-3 py-2 shadow-[0_10px_30px_-20px_rgba(11,31,58,0.45)]">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1F3A]">Safety</h2>
          </div>
          <div className="mb-8 max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hyundai Creta N Line Car Safety: Unleash responsibly.
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              True dominance isn't just about power, it's also about control. The Hyundai CRETA N Line empowers you to conquer the asphalt while staying safe. Armoured with 6 airbags, Electronic Parking Brake (EPB), and disc brakes with red caliper that work behind the scenes for unwavering stability and safety.
            </p>
            <div className="bg-[#0057B8]/20 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/30 shadow-lg shadow-[#0057B8]/20">
              <p className="text-xl font-semibold text-white">
                The Hyundai CRETA N Line car Safety Features ensure ultimate protection with 6 airbags, Hill-Start Assist, and more.
              </p>
              <p className="text-base text-white/90 mt-2">
                Drive confidently with the Hyundai CRETA N Line car Safety Features, designed for your peace of mind!
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {getItems('safety', SAFETY_CARDS).map((s, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 overflow-hidden shadow-sm">
              <img src={s.src || (s as any).img} alt={s.caption || (s as any).title} className="w-full h-40 object-cover" loading="lazy" />
              <div className="p-5">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{s.caption || (s as any).title}</p>
        </div>
            </div>
          ))}
        </div>
        <p className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-600 dark:text-gray-400 mt-2">*Feature availability varies by variant. Always refer to official specification.</p>
      </section>

      {/* Convenience */}
      <section id="convenience">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-md border border-[#D6E4F5] rounded-xl px-3 py-2 shadow-[0_10px_30px_-20px_rgba(11,31,58,0.45)]">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1F3A]">Convenience</h2>
          </div>
          <div className="mb-8 max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Unleash Connect Dominate with Hyundai Creta N Line
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Hyundai CRETA N Line is a technologically advanced haven designed to keep you connected, informed and comfortable as you push the limits. Helping you navigate, access entertainment, and monitor performance data, all with intuitive ease.
            </p>
            <div className="bg-[#0057B8]/20 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/30 shadow-lg shadow-[#0057B8]/20">
              <p className="text-xl font-semibold text-white">
                The Hyundai CRETA N Line car convenience features redefine every drive with smart connectivity and advanced infotainment.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {getItems('convenience', CONVENIENCE_CARDS.map((c) => ({ src: c.img, caption: c.title }))).map((s, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 overflow-hidden shadow-sm">
              <img src={s.src} alt={s.caption} className="w-full h-40 object-cover" loading="lazy" />
              <div className="p-5">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{s.caption}</p>
        </div>
          </div>
        ))}
      </div>
      </section>

      {/* Specifications */}
      <section id="specifications">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
          <div className="flex items-center gap-3 mb-6 bg-white/70 backdrop-blur-md border border-[#D6E4F5] rounded-xl px-3 py-2 shadow-[0_10px_30px_-20px_rgba(11,31,58,0.45)]">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1F3A]">Specifications</h2>
          </div>
          <div className="mb-8 max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explore specifications of the Hyundai CRETA N LINE Car
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Explore specifications of the Hyundai CRETA N LINE Car, from its powerful engine options to boot space, precise dimensions, suspension, brakes, and fuel capacity etc.
            </p>
            <div className="bg-[#0057B8]/20 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/30 shadow-lg shadow-[#0057B8]/20">
              <p className="text-xl font-semibold text-white">
                Detailed technical specifications for the Hyundai CRETA N LINE.
              </p>
            </div>
          </div>
        </div>
        <KeyValueTable rows={SPEC_TABLE} />
      </section>

      {/* Variants & Pricing */}
      <section id="pricing">
        <SectionHeading title="Variants & Pricing" subtitle="Explore all CRETA N Line variants with powertrain options" />
        <VariantsPricingSection />
      </section>

      {/* Features */}
      <section id="features">
        <SectionHeading title="Features" subtitle="Tech, comfort & connectivity" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5 shadow-sm">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Technology</h3>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {FEATURES.tech.map((f, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-300">{f}</li>
              ))}
            </ul>
                  </div>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5 shadow-sm">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Comfort</h3>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {FEATURES.comfort.map((f, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-300">{f}</li>
              ))}
            </ul>
        </div>
      </div>
      </section>

      {/* Developer Smoke Tests (hidden by default) */}
      {__DEV_TESTS__ && (
        <section id="__tests__" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h3 className="text-sm uppercase text-gray-500 mb-2">Dev Smoke Tests</h3>
          {/* Test 1: SectionHeading with subtitle */}
          <SectionHeading title="Test: SectionHeading" subtitle="Should render without syntax error" />
          {/* Test 2: SectionHeading w/o subtitle */}
          <SectionHeading title="Heading without subtitle" />
          {/* Test 3: ImageGrid minimal */}
          <ImageGrid items={[EXTERIOR_IMAGES[0]]} />
          {/* Test 4: KeyValueTable minimal */}
          <KeyValueTable rows={[{ label: "Sample", value: "Value" }]} />
        </section>
      )}

      {/* Front view above strip */}
      <section className="max-w-7xl mx-auto px-4 mb-6">
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
          <img src="/images/cars/creta-nline/creata-nline.avif" alt="Creta N Line front view" className="h-[50vh] w-full object-cover" />
        </div>
      </section>

      {/* Bottom slow-scrolling strip - All page images */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
          <div className="relative">
            <div className="flex gap-4 animate-scroll-slow">
              {[
                // Highlights images
                ...HIGHLIGHTS_CARDS.map(card => card.img),
                // Exterior images
                ...EXTERIOR_IMAGES.map(img => img.src),
                // Interior images
                ...INTERIOR_IMAGES.map(img => img.src),
                // Convenience images
                ...CONVENIENCE_CARDS.map(card => card.img),
                // Safety images
                ...SAFETY_CARDS.map(card => card.img),
                // Duplicate for continuous scroll
                ...HIGHLIGHTS_CARDS.map(card => card.img),
                ...EXTERIOR_IMAGES.map(img => img.src),
                ...INTERIOR_IMAGES.map(img => img.src),
                ...CONVENIENCE_CARDS.map(card => card.img),
                ...SAFETY_CARDS.map(card => card.img),
              ].map((src, i) => (
                <div key={`${src}-${i}`} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                  <img src={src} alt={`Creta N Line ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
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

      {/* Footer note */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-gray-500">
        <p className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 shadow-lg">
          Image & information credit: Hyundai Motor India official pages. Some features vary by
          variant. For the latest details, please refer to Hyundai India.
        </p>
      </footer>

      {/* Accessories CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-red-600/10 via-black to-red-600/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Explore Creta N Line Accessories</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Elevate your Creta N Line's sporty appeal with genuine accessories designed to enhance performance, comfort, and style.
          </p>
          <a 
            href="/creta-nline-accessories" 
            className="inline-block px-6 py-3 rounded-lg bg-red-600/20 text-red-200 ring-1 ring-white/10 hover:bg-red-600/30 transition-colors font-semibold"
          >
            View All Accessories
          </a>
        </div>
      </section>

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
  );
}

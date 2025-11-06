"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Phone, TestTube, Sparkles, Car, Image as ImageIcon, Gauge, Shield, Settings, Activity, ListChecks } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 }
};

const Section: React.FC<React.PropsWithChildren<{ id: string; title: string; subtitle?: string; icon?: React.ReactNode }>> = ({ id, title, subtitle, icon, children }) => (
  <section id={id} className="scroll-mt-24 py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
        {icon && <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">{icon}</div>}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{title}</h2>
      </div>
      <div className="mt-6 md:mt-8">{children}</div>
    </div>
  </section>
);

const SafeImg: React.FC<{ src?: string; alt: string; fallback?: string }> = ({ src, alt, fallback }) => {
  const [err, setErr] = React.useState(false);
  const srcToUse = !err && src ? src : (fallback || IMGS.hero);
  return (
    <img
      src={srcToUse}
      alt={alt}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
      onError={() => setErr(true)}
    />
  );
};

const Card: React.FC<React.PropsWithChildren<{ img?: string; title: string; k?: string; }>> = ({ img, title, k, children }) => (
  <motion.article {...fadeUp} className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-zinc-700 transition">
    {img && (
      <div className="relative aspect-[16/9] overflow-hidden">
        <SafeImg src={img} alt={title} fallback={IMGS.hero} />
        {k && (
          <span className="absolute bottom-2 right-2 text-[10px] font-mono uppercase tracking-wider bg-black/60 px-1.5 py-0.5 rounded">{k}</span>
        )}
      </div>
    )}
    <div className="p-4 md:p-5">
      <h3 className="text-base md:text-lg font-semibold">{title}</h3>
      {children && <p className="text-sm/6 text-zinc-400 mt-2">{children}</p>}
    </div>
  </motion.article>
);

const SpecRow: React.FC<{ k: string; v: string }> = ({ k, v }) => (
  <div className="grid grid-cols-[1fr_auto] md:grid-cols-[240px_1fr] gap-3 py-2 border-b border-zinc-800 text-sm">
    <span className="text-zinc-400">{k}</span>
    <span className="font-medium text-zinc-100">{v}</span>
  </div>
);

const ColorCard: React.FC<{ name: string; swatch: string; tone: 'Dual tone' | 'Mono tone' }> = ({ name, swatch, tone }) => (
  <motion.article {...fadeUp} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
    <div className="relative aspect-[16/9]">
      <div className="absolute inset-0" style={{ background: swatch }} />
      <span className="absolute bottom-2 right-2 text-[10px] font-mono uppercase tracking-wider bg-black/60 px-1.5 py-0.5 rounded">
        {tone}
      </span>
    </div>
    <div className="p-4 md:p-5">
      <h3 className="text-base md:text-lg font-semibold">{name}</h3>
    </div>
  </motion.article>
);

const IMGS = {
  hero: "/images/i20-nline/i20 nline.avif",
  highlight_wireless: "/images/i20-nline/i20-nline.avif",
  highlight_grille: "/images/i20-nline/i20 nline.avif",
  highlight_foglamp: "/images/i20-nline/i20-nline.avif",
  highlight_seats: "/images/i20-nline/i20 nline.avif",
  exterior_front_discs: "/images/i20-nline/i20-nline.avif",
  exterior_headlamps: "/images/i20-nline/i20 nline.avif",
  exterior_ovrm_indicators: "/images/i20-nline/i20-nline.avif",
  exterior_spoiler: "/images/i20-nline/i20 nline.avif",
  exterior_foglamp: "/images/i20-nline/i20-nline.avif",
  exterior_tail_lamps: "/images/i20-nline/i20 nline.avif",
  interior_dashboard: "/images/i20-nline/i20-nline.avif",
  interior_cluster: "/images/i20-nline/i20 nline.avif",
  interior_armrest: "/images/i20-nline/i20-nline.avif",
  interior_auto_ac: "/images/i20-nline/i20 nline.avif",
  interior_rear_ac: "/images/i20-nline/i20-nline.avif",
  interior_door_pockets: "/images/i20-nline/i20 nline.avif",
  interior_steering: "/images/i20-nline/i20-nline.avif",
  interior_seats: "/images/i20-nline/i20 nline.avif",
  perf_engine: "/images/i20-nline/i20-nline.avif",
  perf_dct: "/images/i20-nline/i20 nline.avif",
  perf_mt: "/images/i20-nline/i20-nline.avif",
  perf_modes: "/images/i20-nline/i20 nline.avif",
  safety6AB: "/images/i20-nline/i20-nline.avif",
  safetyDRVM: "/images/i20-nline/i20 nline.avif",
  safetyHAC: "/images/i20-nline/i20-nline.avif",
  safetyTPMS: "/images/i20-nline/i20 nline.avif",
  safetyESC: "/images/i20-nline/i20-nline.avif",
  safetyAutoHL: "/images/i20-nline/i20-nline.avif",
  safetyBrakes: "/images/i20-nline/i20 nline.avif",
  convBose: "/images/i20-nline/i20-nline.avif",
  conv1025: "/images/i20-nline/i20 nline.avif",
  convAlexa: "/images/i20-nline/i20-nline.avif",
  convWireless: "/images/i20-nline/i20 nline.avif",
  convSunroof: "/images/i20-nline/i20-nline.avif",
  convPushStart: "/images/i20-nline/i20 nline.avif",
  convGlovebox: "/images/i20-nline/i20-nline.avif",
  convPuddle: "/images/i20-nline/i20 nline.avif",
} as const;

const variants = [
  { name: "N6 1.0 Turbo MT", trans: "MT", tone: "Mono", price: "₹9.14 Lakh*" },
  { name: "N6 1.0 Turbo MT Dual Tone", trans: "MT", tone: "Dual", price: "₹9.32 Lakh*" },
  { name: "N6 1.0 Turbo DCT", trans: "DCT", tone: "Mono", price: "₹10.23 Lakh*" },
  { name: "N6 1.0 Turbo DCT Dual Tone", trans: "DCT", tone: "Dual", price: "₹10.37 Lakh*" },
  { name: "N8 1.0 Turbo MT", trans: "MT", tone: "Mono", price: "₹10.45 Lakh*" },
  { name: "N8 1.0 Turbo MT Dual Tone", trans: "MT", tone: "Dual", price: "₹10.59 Lakh*" },
  { name: "N8 1.0 Turbo DCT", trans: "DCT", tone: "Mono", price: "₹11.46 Lakh*" },
  { name: "N8 1.0 Turbo DCT Dual Tone", trans: "DCT", tone: "Dual", price: "₹11.60 Lakh*" },
];

const colours = [
  { name: "Thunder blue with Abyss black roof", tone: "Dual tone" as const, swatch: "linear-gradient(135deg,#0B0B0C 50%, #274394 50%)" },
  { name: "Atlas white with Abyss black roof", tone: "Dual tone" as const, swatch: "linear-gradient(135deg,#0B0B0C 50%, #F5F6F7 50%)" },
  { name: "Thunder blue", tone: "Mono tone" as const, swatch: "#274394" },
  { name: "Abyss black", tone: "Mono tone" as const, swatch: "#0B0B0C" },
  { name: "Atlas white", tone: "Mono tone" as const, swatch: "#F5F6F7" },
  { name: "Starry night", tone: "Mono tone" as const, swatch: "#253A58" },
  { name: "Titan grey", tone: "Mono tone" as const, swatch: "#8A8E93" },
];

const highlights = [
  {
    title: "It's time to play.",
    text: "Created to maximise driving fun with motorsport styling + innovative tech. Ex‑showroom price starts at just ₹9.14* lakh.",
    img: IMGS.hero,
    k: "Highlights"
  },
  { title: "Wireless charger", text: "Cord‑free charging pad keeps your phone topped up on the go.", img: IMGS.highlight_wireless, k: "Highlights" },
  { title: "Sporty black radiator grille", text: "Signature N Line grille with dark finish and N badging.", img: IMGS.highlight_grille, k: "Exterior" },
  { title: "Front fog lamp chrome garnish", text: "Polished accents frame the projector fog lamps.", img: IMGS.highlight_foglamp, k: "Exterior" },
  { title: "Chequered flag seats with N logo", text: "All‑black interior with red inserts and N branding.", img: IMGS.highlight_seats, k: "Interior" },
];

const exterior = [
  { title: "Playful stance", text: "WRC-inspired athletic design and playful details.", img: IMGS.hero },
  { title: "Front disc brakes (red caliper)", text: "Confident stopping power; front calipers in red.", img: IMGS.exterior_front_discs },
  { title: "LED headlamps with signature DRLs", text: "Sharp illumination and a distinctive light signature.", img: IMGS.exterior_headlamps },
  { title: "Turn indicators on outside mirrors", text: "Integrated indicators on ORVMs for added visibility.", img: IMGS.exterior_ovrm_indicators },
  { title: "Sporty tailgate spoiler with side wings", text: "Aerodynamic finish that completes the rear stance.", img: IMGS.exterior_spoiler },
  { title: "Front fog lamp chrome garnish", text: "Complements the projector fog lamps for a premium look.", img: IMGS.exterior_foglamp },
  { title: "Z-shaped LED tail lamps", text: "Signature Z-shaped design at the rear.", img: IMGS.exterior_tail_lamps },
];

const interior = [
  { title: "Digital cluster with TFT MID", text: "Clear, informative driving data in your line of sight.", img: IMGS.interior_cluster },
  { title: "3‑spoke steering with N logo", text: "Leather‑wrapped steering with N branding and sporty grip.", img: IMGS.interior_steering },
  { title: "Front centre armrest & storage", text: "Extra comfort and practicality between the front seats.", img: IMGS.interior_armrest },
  { title: "Fully automatic air‑conditioning", text: "Set and forget – cabin comfort, always.", img: IMGS.interior_auto_ac },
  { title: "Rear AC vents", text: "Comfort for rear passengers too.", img: IMGS.interior_rear_ac },
  { title: "Front & rear door map pockets", text: "Convenient storage for everyday carry.", img: IMGS.interior_door_pockets },
];

const performance = [
  { title: "1.0 l Turbo GDi petrol", text: "Punchy 998 cc turbocharged engine for daily thrills (120 PS).", img: IMGS.perf_engine },
  { title: "7‑speed DCT", text: "Dual‑clutch gearbox for quick, smooth shifts.", img: IMGS.perf_dct },
  { title: "6‑speed MT", text: "Classic manual control for enthusiasts.", img: IMGS.perf_mt },
  { title: "Drive modes: Eco / Normal / Sport", text: "Adjust throttle and logic for your mood.", img: IMGS.perf_modes },
];

const safety = [
  { title: "6 airbags standard", text: "Driver, passenger, side & curtain airbags across variants.", img: IMGS.safety6AB },
  { title: "ESC & VSM", text: "Electronic stability control and vehicle stability management.", img: IMGS.safetyESC },
  { title: "Hill‑start assist control (HAC)", text: "Prevents rollback on inclines for fuss‑free getaways.", img: IMGS.safetyHAC },
  { title: "Automatic headlamps", text: "Lights come on automatically in low‑light conditions.", img: IMGS.safetyAutoHL },
  { title: "Front & rear disc brakes", text: "Strong, consistent braking performance at all four wheels.", img: IMGS.safetyBrakes },
  { title: "Tyre pressure monitoring system (Highline)", text: "Live tyre pressure readouts help maintain safety & efficiency.", img: IMGS.safetyTPMS },
  { title: "Driver rear view monitor (DRVM)", text: "See the rear view on the screen while driving forward.", img: IMGS.safetyDRVM },
];

const convenience = [
  { title: "Bose 7‑speaker system", text: "Immersive cabin audio tuned for clarity.", img: IMGS.convBose },
  { title: "26.03 cm (10.25\") HD touchscreen", text: "Navigation and media, beautifully rendered.", img: IMGS.conv1025 },
  { title: "Home‑to‑Car (H2C) with Alexa", text: "Issue commands from home; step into a ready car.", img: IMGS.convAlexa },
  { title: "Wireless charging", text: "Drop your phone, charge begins.", img: IMGS.convWireless },
];

const specs = [
  { k: "Engine type", v: "1.0 l Turbo GDi (Petrol)" },
  { k: "Displacement", v: "998 cc" },
  { k: "Max power", v: "88.3 kW (120 PS) @ 6,000 rpm" },
  { k: "Transmissions", v: "7‑speed DCT / 6‑speed MT" },
  { k: "Drive modes", v: "Eco / Normal / Sport" },
  { k: "Brakes", v: "Front & rear disc" },
  { k: "Dimensions (L×W×H)", v: "3995 × 1775 × 1505 mm" },
  { k: "Wheelbase", v: "2580 mm" },
  { k: "Seating capacity", v: "5" },
];

const featureMatrix = [
  { feature: "Front disc brakes (red caliper)", n6: "S", n8: "S" },
  { feature: "Rear disc brakes", n6: "S", n8: "S" },
  { feature: "Rear parking sensors", n6: "S", n8: "S" },
  { feature: "Rear camera w/ dynamic guidelines", n6: "S", n8: "S" },
  { feature: "Driver rear view monitor (DRVM)", n6: "S", n8: "S" },
  { feature: "Front projector fog lamps", n6: "S", n8: "S" },
  { feature: "Automatic headlamps", n6: "S", n8: "S" },
  { feature: "Emergency stop signal (ESS)", n6: "S", n8: "S" },
  { feature: "IRVM", n6: "Day & Night", n8: "ECM + Bluelink buttons" },
];

const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a href={href} className="px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-sm whitespace-nowrap">
    {label}
  </a>
);

const Diagnostics: React.FC = () => {
  const requiredImgKeys = [
    'hero', 'highlight_wireless', 'highlight_grille', 'highlight_foglamp', 'highlight_seats',
    'exterior_front_discs', 'exterior_headlamps', 'exterior_ovrm_indicators', 'exterior_spoiler', 'exterior_foglamp', 'exterior_tail_lamps',
    'interior_dashboard', 'interior_cluster', 'interior_armrest', 'interior_auto_ac', 'interior_rear_ac', 'interior_door_pockets', 'interior_steering',
    'perf_engine', 'perf_dct', 'perf_mt', 'perf_modes',
    'safety6AB', 'safetyESC', 'safetyHAC', 'safetyAutoHL', 'safetyBrakes', 'safetyTPMS', 'safetyDRVM',
    'convBose', 'conv1025', 'convAlexa', 'convWireless'
  ] as const;

  const missing = requiredImgKeys.filter(k => !(IMGS as any)[k]);
  const tests = [
    { name: 'IMGS defined', pass: typeof IMGS === 'object' },
    { name: 'All required image keys present', pass: missing.length === 0 },
    { name: 'Safety cards (7)', pass: Array.isArray(safety) && safety.length === 7 },
    { name: 'Variants table (8 rows)', pass: Array.isArray(variants) && variants.length === 8 },
  ];
  
  if (typeof window !== 'undefined' && console && console.table) console.table(tests);
  if (missing.length && console && console.warn) console.warn('Missing IMGS keys:', missing);

  return (
    <details className="mx-4 mt-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
      <summary className="cursor-pointer px-4 py-2 text-xs font-medium text-zinc-300">Dev diagnostics (IMGS & data)</summary>
      <div className="px-4 py-3 text-xs text-zinc-400 space-y-2">
        <div>IMGS keys missing: {missing.length ? missing.join(', ') : 'none'}</div>
        <div>Total highlights: {highlights.length}, exterior: {exterior.length}, interior: {interior.length}, performance: {performance.length}, safety: {safety.length}, convenience: {convenience.length}</div>
      </div>
    </details>
  );
};

export default function I20NLineRedesign() {
  const [manifest, setManifest] = React.useState<null | { categories: Record<string, { src: string; title?: string }[]> }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const CAPTION_MAP: Record<string, string> = {
    // Highlights
    'i20nlineradiogrille.jpg': 'Radiator grille with N Line logo',
    'i20nlinezshapeline.jpg': 'Z‑shaped LED tail lamps',
    'i20-nline-highlight-big-section-pc3.jpg': 'N Line highlight',
    'i20nlinefrontgrille.jpg': 'Front grille — N Line',
    'i20-nline-highlight-small-section-pc3.jpg': 'Highlight',
    'i20-nline-highlight-small-section-pc4.jpg': 'Highlight',
    // Exterior
    'hyundai-i20-nline-exterior-small-section-pc-800x530-1.jpg': 'Exterior — front angle',
    'hyundai-i20-nline-exterior-small-section-pc-800x530-3.jpg': 'Exterior detail',
    'hyundai-i20-nline-exterior-small-section-pc-800x530-4.jpg': 'Exterior detail',
    'hyundai-i20-nline-exterior-small-section-pc-800x530-5.jpg': 'Exterior detail',
    'hyundai-i20-nline-exterior-small-section-pc-800x530-6.jpg': 'Exterior rear angle',
    // Interior
    'i20-nline-interior-big1.jpg': 'Interior — hero',
    'i20-nline-interior-big2.jpg': 'Interior — seats & trim',
    'hyundai-i20-nline-interior-small-section-pc-800x530-1-r.jpg': 'Interior detail',
    'hyundai-i20nline-interior-bottom-pc-512x340-2.jpg': 'Interior controls',
    'hyundai-i20-nline-interior-small-section-pc-800x530-3.jpg': 'Interior detail',
    'hyundai-i20nline-interior-bottom-pc-512x340-5.jpg': 'Interior detail',
    'hyundai-i20nline-interior-bottom-pc-512x340-6.jpg': 'Interior detail',
    'hyundai-i20-nline-interior-small-section-pc-800x530-6.jpg': 'Interior detail',
    // Performance
    'i20-nlinebig-pc.jpg': '1.0 l Turbo GDi petrol',
    'i20-nlineperfsmall-pc1.jpg': '7‑speed DCT',
    'i20-nlineperfsmall-pc2.jpg': '6‑speed MT',
    'i20-nlineperfsmall-pc3.jpg': 'Drive modes',
    'i20-nlineperfsmall-pc5.jpg': 'Performance highlight',
    'i20-nlineperfsmall-pc6.jpg': 'Performance highlight',
    // Safety
    'hyundai-i20-nline-safety-big-section-pc-1120x600-2.jpg': 'Safety overview',
    'i20nlineshutterestock.jpg': 'Safety feature image',
    'hyundai-i20-nline-safety-big-section-pc-1120x600-3.jpg': 'Safety systems',
    'hyundai-i20-nline-safety-small-section-pc-512x340-1.jpg': 'TPMS Highline',
    'hyundai-i20-nline-safety-small-section-pc-512x340-2.jpg': 'ESC / VSM',
    'hyundai-i20-nline-safety-small-section-pc-512x340-3.jpg': 'HAC',
    'hyundai-i20-nline-safety-small-section-pc-512x340-4.jpg': 'Rear camera',
    // Convenience
    'i20-nline-convbig-pc-1.jpg': 'Bose 7‑speaker system',
    'i20-nline-convbig-pc-2.jpg': '10.25″ HD touchscreen',
    'i20nlinealexa.jpg': 'Home‑to‑Car with Alexa',
    'hyundai-i20nline-conveniance-middle-mob-tab-800x530-1.jpg': 'Convenience highlight',
    'i20-nline-convsmall-pc-2.jpg': 'Wireless charger',
    'hyundai-i20nline-conveniance-middle-mob-tab-800x530-4.jpg': 'Convenience highlight',
    'hyundai-i20nline-conveniance-middle-mob-tab-800x530-5.jpg': 'Convenience highlight',
    'i20nlinepuddlelamps.jpg': 'Puddle lamps',
    // Spec
    'i20nlineinnerkv-pc.jpg': 'Specification key visual',
  };

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/images/cars/i20-nline/manifest.json', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setManifest(json);
      } catch {}
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Control video playback to restart 3 seconds before the end
  React.useEffect(() => {
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

  const mapFromManifest = (key: string, fallback: Array<{ title: string; img: string; text?: string }>) => {
    const arr = manifest?.categories?.[key] as { src: string; title?: string }[] | undefined;
    if (!arr || arr.length === 0) return fallback;
    return arr.map((it) => {
      const file = (it.src || '').split('/').pop() || '';
      const title = CAPTION_MAP[file.toLowerCase()] || it.title || file;
      return { title, img: it.src };
    });
  };

  const mappedHighlights = mapFromManifest('highlights', highlights.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedExterior = mapFromManifest('exterior', exterior.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedInterior = mapFromManifest('interior', interior.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedPerformance = mapFromManifest('performance', performance.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedSafety = mapFromManifest('safety', safety.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedConvenience = mapFromManifest('convenience', convenience.map(h => ({ title: h.title, img: h.img, text: h.text })));

  const allImages = Array.from(new Set([
    ...mappedHighlights, ...mappedExterior, ...mappedInterior, ...mappedPerformance, ...mappedSafety, ...mappedConvenience,
  ].map(i => i.img).filter(Boolean))) as string[];

  return (
    <main className="min-h-screen bg-transparent text-zinc-100">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/assets1/Hyundai N Line _ It s time to play.mp4"
      />
      <div className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-black/60">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 h-14">
          <span className="text-xs font-medium tracking-wider text-red-600">i20 N Line</span>
          <div className="hidden md:flex items-center gap-2 overflow-x-auto">
            <NavLink href="#highlights" label="Highlights" />
            <NavLink href="#exterior" label="Exterior" />
            <NavLink href="#colours" label="Colours" />
            <NavLink href="#interior" label="Interior" />
            <NavLink href="#performance" label="Performance" />
            <NavLink href="#safety" label="Safety" />
            <NavLink href="#convenience" label="Convenience" />
            <NavLink href="#prices" label="Prices" />
            <NavLink href="#specs" label="Specifications" />
            <NavLink href="#features" label="Features" />
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      </div>

      <header className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_20%,rgba(100,200,255,0.12),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]"/>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-28 lg:py-32 relative">
          <motion.h1 {...fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hyundai i20 N Line — <span className="text-red-600">It's time to play</span>
          </motion.h1>
          <motion.p {...fadeUp} className="max-w-3xl text-zinc-300 mt-5 md:text-lg">
            A sportier take on the i20 with N Line design, tech and tuned performance. Built for everyday fun.
          </motion.p>
          <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
            <a href="#specs" className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500">View Specs</a>
            <a href="#features" className="px-4 py-2 rounded-xl border border-zinc-700">Trim matrix</a>
          </div>
        </div>
      </header>

      <Section id="highlights" title="Highlights" icon={<Sparkles className="w-5 h-5" />}>
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Get set to play.
            </h3>
            <p className="text-lg text-red-800 dark:text-red-200 mb-4">
            Created to maximise driving fun every time you hit the road, the new Hyundai i20 N Line delivers a sporty experience that will make you want to play. Featuring the perfect balance of motorsport styling and innovative technology, this car is built for every day fun, with an ex-showroom price starting at just Rs. 9.14* Lakh.
          </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mappedHighlights.map((h, i) => (
            <Card key={i} img={h.img} title={h.title}>{h.text}</Card>
          ))}
        </div>
      </Section>

      <Section id="exterior" title="Exterior" icon={<Car className="w-5 h-5" />}>
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Hyundai i20 N Line Car Exteriors: Built to Entice.
            </h3>
            <p className="text-lg text-red-800 dark:text-red-200 mb-4">
            Athletically aesthetic, the new Hyundai i20 N Line is built to command attention, all the way from the subtle chrome garnish on the foglamps to the tailgate spoiler with side wings. The sporty red highlights accentuate the performance inspired design, ensuring that all eyes are always on you.
          </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mappedExterior.map((h, i) => (
            <Card key={i} img={h.img} title={h.title}>{h.text}</Card>
          ))}
        </div>
      </Section>

      <Section id="colours" title="Colours" icon={<Activity className="w-5 h-5" />}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {colours.map((c, i) => (
            <ColorCard key={i} name={c.name} tone={c.tone} swatch={c.swatch} />
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-3">* Dual tone = body colour with Abyss Black roof. Colours and availability may vary by trim/production month.</p>
      </Section>

      <Section id="interior" title="Interior" icon={<ImageIcon className="w-5 h-5" />}>
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Hyundai i20 N Line Interior: Always in Style on the Inside
            </h3>
            <p className="text-lg text-red-800 dark:text-red-200 mb-4">
            As you step into the cockpit of the you're graced by the sleek design that's packed with technology. The iconic N badging on the steering wheel, leather wrapped gear knob, and the seats, along with the all black interiors with red inserts add to the sporty appeal.
          </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mappedInterior.map((h, i) => (
            <Card key={i} img={h.img} title={h.title}>{h.text}</Card>
          ))}
        </div>
      </Section>

      <Section id="performance" title="Performance" icon={<Gauge className="w-5 h-5" />}>
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Hyundai i20 N Line Car Performance: Play anywhere.
            </h3>
            <p className="text-lg text-red-800 dark:text-red-200 mb-4">
            The distinctive roar of the exhaust sets the new Hyundai i20 N Line apart. It's the perfect blend of a finely tuned engine and highly responsive suspension and handling that delivers a smooth ride.
          </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mappedPerformance.map((h, i) => (
            <Card key={i} img={h.img} title={h.title}>{h.text}</Card>
          ))}
        </div>
      </Section>

      <Section id="safety" title="Safety" icon={<Shield className="w-5 h-5" />}>
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Hyundai i20 N Line Car Safety: Always play safe.
            </h3>
            <p className="text-lg text-red-800 dark:text-red-200 mb-4">
            Packed with Hyundai's most advanced safety systems, the is built to keep you in total comfort and peace of mind.
          </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mappedSafety.map((h, i) => (
            <Card key={i} img={h.img} title={h.title}>{h.text}</Card>
          ))}
        </div>
      </Section>

      <Section id="convenience" title="Convenience & Connectivity" icon={<Settings className="w-5 h-5" />}>
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Hyundai i20 N Line Car Convenience: Just press play.
            </h3>
            <p className="text-lg text-red-800 dark:text-red-200 mb-4">
            Connectivity comes easy in the Equipped with cutting edge technology like home-to-car (H2C) with Alexa, fully automated temperature control, advanced infotainment with multilingual user interface, you've got the world at your fingertips.
          </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mappedConvenience.map((h, i) => (
            <Card key={i} img={h.img} title={h.title}>{h.text}</Card>
          ))}
        </div>
      </Section>

      <Section id="prices" title="Variants & Prices" icon={<Activity className="w-5 h-5" />}>
        <div className="overflow-x-auto rounded-2xl border border-zinc-800">
          <table className="min-w-[720px] w-full text-sm">
            <thead className="bg-zinc-900/60">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">Variant</th>
                <th className="px-4 py-3 font-semibold">Transmission</th>
                <th className="px-4 py-3 font-semibold">Tone</th>
                <th className="px-4 py-3 font-semibold text-right">Ex‑showroom</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v, i) => (
                <tr key={i} className="border-t border-zinc-800">
                  <td className="px-4 py-3 text-zinc-200">{v.name}</td>
                  <td className="px-4 py-3">{v.trans}</td>
                  <td className="px-4 py-3">{v.tone}</td>
                  <td className="px-4 py-3 text-right font-semibold">{v.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 mt-3">* Sources: Public price listings; confirm with Hyundai dealer for your city. Prices on this page reflect averages as of Oct 14, 2025.</p>
      </Section>

      <Section id="specs" title="Specifications" icon={<Activity className="w-5 h-5" />}>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-800 p-4 md:p-6 bg-zinc-900/60">
            {specs.map((s, idx) => <SpecRow key={idx} k={s.k} v={s.v} />)}
            <p className="text-xs text-zinc-500 mt-3">* Figures are indicative and may vary by variant; please verify with the official brochure/dealer.</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
            <img src={IMGS.interior_dashboard} alt="Cabin" className="w-full h-full object-cover"/>
          </div>
        </div>
      </Section>

      <Section id="features" title="Features by Trim" icon={<ListChecks className="w-5 h-5" />}>
        <div className="overflow-x-auto rounded-2xl border border-zinc-800">
          <table className="min-w-[720px] w-full text-sm">
            <thead className="bg-zinc-900/60">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold text-center">N6</th>
                <th className="px-4 py-3 font-semibold text-center">N8</th>
              </tr>
            </thead>
            <tbody>
              {featureMatrix.map((r, i) => (
                <tr key={i} className="border-t border-zinc-800">
                  <td className="px-4 py-3 text-zinc-200">{r.feature}</td>
                  <td className="px-4 py-3 text-center font-medium">{r.n6}</td>
                  <td className="px-4 py-3 text-center font-medium">{r.n8}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 mt-3">Feature availability can vary by production month and region; please verify on the official Features page and brochure.</p>
      </Section>

      {/* Moved former hero image to the bottom */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
          <img src={IMGS.hero} alt="i20 N Line hero" className="h-[60vh] w-full object-cover object-center"/>
        </div>
      </div>

      {/* All images slow slider (same size as Venue Knight slider) */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
          <div className="relative">
            <div className="flex gap-4 animate-scroll-slow">
              {allImages.map((src, i) => (
                <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                  <img src={src} alt={`i20 N Line ${i + 1}`} className="h-full w-full object-cover" />
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
      </div>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10 text-xs text-zinc-400">
          <p className="mb-2 font-medium text-zinc-300">Image & Info Sources</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Hyundai India — i20 N Line pages: Highlights, Exterior, Interior, Performance, Safety, Convenience, Specification, Features.</li>
            <li>Editorial/press imagery where noted; replace with official assets for production use. CC BY credits: DriveSpark (via Kiddle) — include attribution if used.</li>
          </ul>
        </div>
      </footer>

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
    </main>
  );
}

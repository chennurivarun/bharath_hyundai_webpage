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

const brand = { primary: "#0057B8", accent: "#00A9E0", dark: "#0B1F3A" } as const;

// Local image paths - all images downloaded and stored locally
const IMGS = {
  hero: "/images/cars/venue-all-new/venuefirstbigimage1.jpg",
  highlight_sunroof: "/images/cars/venue-all-new/bridge-type-roof-rails.jpg",
  highlight_drivemodes: "/images/cars/venue-all-new/indicatorvenue1.jpg",
  highlight_ambient: "/images/cars/venue-all-new/dual-tone-interior-theme.jpg",
  highlight_purifier: "/images/cars/venue-all-new/flat-centre-console.jpg",
  exterior_front: "/images/cars/venue-all-new/venueextfront1.jpg",
  exterior_headlamps: "/images/cars/venue-all-new/venuefirstbigimage1.jpg",
  exterior_tail_lamps: "/images/cars/venue-all-new/rear-horizon-led-tail-lamps.jpg",
  exterior_alloys: "/images/cars/venue-all-new/alloy-wheel.jpg",
  exterior_side: "/images/cars/venue-all-new/venueextside1.jpg",
  exterior_rear: "/images/cars/venue-all-new/venueextrear1.jpg",
  interior_dashboard: "/images/cars/venue-all-new/venueintbigimg-1.jpg",
  interior_seats: "/images/cars/venue-all-new/venue_2nd-row-spacious-cabin.jpg",
  interior_digital: "/images/cars/venue-all-new/d-cut-steering-wheel.jpg",
  interior_ambient: "/images/cars/venue-all-new/dual-tone-interior-theme.jpg",
  interior_purifier: "/images/cars/venue-all-new/venueintsmallimg-3.jpg",
  interior_air_vents: "/images/cars/venue-all-new/terrazzo-textured-crash-pad-finish.jpg",
  perf_engine: "/images/cars/venue-all-new/u2engperformimg1.jpg",
  perf_turbo: "/images/cars/venue-all-new/kappagdiengperformimg2.jpg",
  perf_petrol: "/images/cars/venue-all-new/kappaengperformimg3.jpg",
  perf_modes: "/images/cars/venue-all-new/indicatorvenue1.jpg",
  safety_airbags: "/images/cars/venue-all-new/venue_safety_image.jpg",
  safety_esc: "/images/cars/venue-all-new/venue_safety_image-2.jpg",
  safety_hac: "/images/cars/venue-all-new/venue_safety_image-3.jpg",
  safety_camera: "/images/cars/venue-all-new/venue_safety_image-4.jpg",
  safety_tpms: "/images/cars/venue-all-new/venue_safety_image-5.jpg",
  safety_ahss: "/images/cars/venue-all-new/venue_safety_image-6.jpg",
  safety_fca_ped: "/images/cars/venue-all-new/venuesafetysmallimg-8.jpg",
  safety_fca_cycle: "/images/cars/venue-all-new/venuesafetysmallimg-3.jpg",
  safety_lka: "/images/cars/venue-all-new/venuesafetysmallimg-4.jpg",
  safety_ldw: "/images/cars/venue-all-new/venuesafetysmallimg-5.jpg",
  safety_scc_sg: "/images/cars/venue-all-new/venuesafetysmallimg-6.jpg",
  safety_hba: "/images/cars/venue-all-new/venuesafetysmallimg-7.jpg",
  safety_tab1: "/images/cars/venue-all-new/venuetabimg1.jpg",
  safety_tab2: "/images/cars/venue-all-new/venuetabimg2.jpg",
  conv_bluelink: "/images/cars/venue-all-new/venueconvimg-1.jpg",
  conv_alexa: "/images/cars/venue-all-new/venueconvimgsmall-1.jpg",
  conv_screen: "/images/cars/venue-all-new/venueconvimgsmall-2.jpg",
  conv_wireless: "/images/cars/venue-all-new/venueconvimgsmall-3.jpg",
} as const;

const Section: React.FC<React.PropsWithChildren<{ id: string; title: string; subtitle?: string; icon?: React.ReactNode }>> = ({ id, title, subtitle, icon, children }) => (
  <section id={id} className="scroll-mt-24 py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
        {icon && <div className="p-2 rounded-xl bg-[#0057B8]/30 text-white border border-[#0057B8]/50">{icon}</div>}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white drop-shadow-lg">{title}</h2>
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
      width="800"
      height="600"
      onError={() => setErr(true)}
    />
  );
};

const Card: React.FC<React.PropsWithChildren<{ img?: string; title: string; k?: string; }>> = ({ img, title, k, children }) => (
  <motion.article {...fadeUp} className="group rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden hover:border-[#0057B8]/50 transition shadow-lg shadow-black/20">
    {img && (
      <div className="relative aspect-[16/9] overflow-hidden">
        <SafeImg src={img} alt={title} fallback={IMGS.hero} />
        {k && (
          <span className="absolute bottom-2 right-2 text-[10px] font-mono uppercase tracking-wider bg-black/60 px-1.5 py-0.5 rounded text-white">{k}</span>
        )}
      </div>
    )}
    <div className="p-4 md:p-5">
      <h3 className="text-base md:text-lg font-semibold text-white drop-shadow-md">{title}</h3>
      {children && <p className="text-sm/6 text-white/90 mt-2 drop-shadow-sm">{children}</p>}
    </div>
  </motion.article>
);

const SpecRow: React.FC<{ k: string; v: string }> = ({ k, v }) => (
  <div className="grid grid-cols-[1fr_auto] md:grid-cols-[240px_1fr] gap-3 py-2 border-b border-white/20 text-sm">
    <span className="text-white/80">{k}</span>
    <span className="font-medium text-white">{v}</span>
  </div>
);

const ColorCard: React.FC<{ name: string; swatch: string; tone: 'Dual tone' | 'Mono tone' }> = ({ name, swatch, tone }) => (
  <motion.article {...fadeUp} className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden shadow-lg shadow-black/20">
    <div className="relative aspect-[16/9]">
      <div className="absolute inset-0" style={{ background: swatch }} />
      <span className="absolute bottom-2 right-2 text-[10px] font-mono uppercase tracking-wider bg-black/60 px-1.5 py-0.5 rounded text-white">
        {tone}
      </span>
    </div>
    <div className="p-4 md:p-5">
      <h3 className="text-base md:text-lg font-semibold text-white">{name}</h3>
    </div>
  </motion.article>
);

const variants = [
  { name: "E 1.2 Petrol MT", trans: "MT", tone: "Mono", price: "₹7.94 Lakh*" },
  { name: "S 1.2 Petrol MT", trans: "MT", tone: "Mono", price: "₹8.99 Lakh*" },
  { name: "SX 1.2 Petrol MT", trans: "MT", tone: "Mono", price: "₹10.25 Lakh*" },
  { name: "SX(O) 1.2 Petrol MT", trans: "MT", tone: "Mono", price: "₹11.45 Lakh*" },
  { name: "SX 1.0 Turbo MT", trans: "MT", tone: "Mono", price: "₹11.99 Lakh*" },
  { name: "SX(O) 1.0 Turbo MT", trans: "MT", tone: "Mono", price: "₹13.19 Lakh*" },
  { name: "SX 1.0 Turbo DCT", trans: "DCT", tone: "Mono", price: "₹13.48 Lakh*" },
  { name: "SX(O) 1.0 Turbo DCT", trans: "DCT", tone: "Mono", price: "₹14.68 Lakh*" },
];

const colours = [
  { name: "Atlas White with Abyss Black roof", tone: "Dual tone" as const, swatch: "linear-gradient(135deg,#0B0B0C 50%, #F5F6F7 50%)" },
  { name: "Thunder Blue with Abyss Black roof", tone: "Dual tone" as const, swatch: "linear-gradient(135deg,#0B0B0C 50%, #274394 50%)" },
  { name: "Atlas White", tone: "Mono tone" as const, swatch: "#F5F6F7" },
  { name: "Abyss Black", tone: "Mono tone" as const, swatch: "#0B0B0C" },
  { name: "Thunder Blue", tone: "Mono tone" as const, swatch: "#274394" },
  { name: "Starry Night", tone: "Mono tone" as const, swatch: "#253A58" },
  { name: "Titan Grey", tone: "Mono tone" as const, swatch: "#8A8E93" },
];

const highlights = [
  {
    title: "All New Venue",
    text: "The All New Hyundai Venue - Your perfect companion for every adventure. Experience premium features, advanced technology, and powerful performance.",
    img: IMGS.hero,
    k: "Highlights"
  },
  { title: "Diamond Cut Alloy Wheels", text: "Premium R16 (D= 405.6 mm) diamond-cut alloy wheels for enhanced style and road presence.", img: IMGS.exterior_alloys, k: "Highlights" },
  { title: "Dual Tone Interior Theme", text: "Sophisticated dual-tone interior with Dark Navy & Dove Grey theme for a premium feel.", img: IMGS.highlight_ambient, k: "Highlights" },
  { title: "Flat Centre Console", text: "Modern flat centre console design with ambient lighting for a contemporary cabin experience.", img: IMGS.highlight_purifier, k: "Highlights" },
];

const exterior = [
  { title: "Bold Front Design", text: "Commanding presence with signature cascading grille and LED headlamps.", img: IMGS.exterior_front },
  { title: "Bridge Type Roof Rails", text: "Stylish bridge-type roof rails that enhance the SUV's rugged appeal and functionality.", img: IMGS.highlight_sunroof },
  { title: "Rear Horizon LED Tail Lamps", text: "Distinctive rear horizon LED tail lamps for a modern and premium look.", img: IMGS.exterior_tail_lamps },
  { title: "Diamond-cut Alloy Wheels", text: "Premium R16 (D= 405.6 mm) diamond-cut alloy wheels for enhanced style.", img: IMGS.exterior_alloys },
  { title: "Muscular Side Profile", text: "Bold character lines and sporty design elements with commanding road presence.", img: IMGS.exterior_side },
  { title: "Rear Design", text: "Sleek rear design with chrome accents and sporty elements.", img: IMGS.exterior_rear },
];

const interior = [
  { title: "Premium Dashboard", text: "Sophisticated dashboard with premium materials and advanced controls featuring dual 12.3\" curved panoramic displays.", img: IMGS.interior_dashboard },
  { title: "Spacious 2nd Row Cabin", text: "Comfortable and spacious second-row seating with premium upholstery for enhanced passenger comfort.", img: IMGS.interior_seats },
  { title: "D-Cut Steering Wheel", text: "Sporty D-cut steering wheel with premium finish for enhanced driving experience.", img: IMGS.interior_digital },
  { title: "Dual Tone Interior Theme", text: "Sophisticated dual-tone interior with Dark Navy & Dove Grey theme creating a premium ambiance.", img: IMGS.interior_ambient },
  { title: "Terrazzo Textured Crash Pad", text: "Premium terrazzo-textured crash pad finish adding elegance to the cabin.", img: IMGS.interior_air_vents },
  { title: "Coffee Table Centre Console", text: "Modern coffee table centre console with surrounding ambient lighting for a contemporary feel.", img: IMGS.interior_purifier },
];

const performance = [
  { title: "1.5 l Diesel Engine", text: "Powerful 1.5-litre diesel engine delivering impressive performance and efficiency (115 PS).", img: IMGS.perf_engine },
  { title: "1.0 Turbo GDi", text: "Punchy 1.0-litre turbo petrol engine for spirited driving (120 PS).", img: IMGS.perf_turbo },
  { title: "1.2 Kappa Petrol", text: "Efficient 1.2-litre Kappa petrol engine for everyday driving (83 PS).", img: IMGS.perf_petrol },
  { title: "Drive Modes", text: "Eco, Normal, and Sport modes to adapt to your driving needs.", img: IMGS.perf_modes },
];

const safety = [
  { title: "ESC & VSM", text: "Electronic Stability Control and Vehicle Stability Management for enhanced safety.", img: IMGS.safety_fca_ped },
  { title: "Front Parking Sensors", text: "Front parking sensors for safer parking and maneuvering.", img: IMGS.safety_fca_cycle },
  { title: "All 4 Disc Brakes", text: "All four disc brakes for enhanced braking performance and safety.", img: IMGS.safety_lka },
  { title: "Auto Hold Function with One Touch Electronic Parking Brake", text: "Auto Hold function with one touch electronic parking brake for convenience and safety.", img: IMGS.safety_ldw },
  { title: "Tyre Pressure Monitoring", text: "TPMS alerts you about tyre pressure for optimal safety.", img: IMGS.safety_scc_sg },
  { title: "Hill-start Assist", text: "HAC prevents rollback on inclines for smooth getaways.", img: IMGS.safety_hba },
  { title: "Advanced High Strength Steel", text: "AHSS body structure for enhanced crash protection.", img: IMGS.safety_tab1 },
  { title: "6 Airbags", text: "Comprehensive protection with 6 airbags across variants.", img: IMGS.safety_tab2 },
];

const adasLevel2 = [
  { title: "FCA Ped", text: "Forward Collision Avoidance Assist for pedestrian detection and protection.", img: IMGS.safety_airbags },
  { title: "FCA - Cycle", text: "Forward Collision Avoidance Assist for cycle detection and protection.", img: IMGS.safety_esc },
  { title: "LKA", text: "Lane Keeping Assist helps keep you in your lane for enhanced safety.", img: IMGS.safety_hac },
  { title: "LDW", text: "Lane Departure Warning alerts you when you unintentionally drift from your lane.", img: IMGS.safety_camera },
  { title: "SCC with S&G", text: "Smart Cruise Control with Stop & Go for comfortable long-distance driving.", img: IMGS.safety_tpms },
  { title: "HBA", text: "High Beam Assist for optimal visibility without disturbing other drivers.", img: IMGS.safety_ahss },
];

const convenience = [
  { title: "Bose Premium Speakers", text: "Stay connected with Hyundai Bluelink services and remote features.", img: IMGS.conv_bluelink },
  { title: "Home-to-Car with Alexa", text: "Control your car from home using Amazon Alexa voice commands.", img: IMGS.conv_alexa },
  { title: "Touchscreen Infotainment", text: "8-inch touchscreen infotainment system with smartphone connectivity.", img: IMGS.conv_screen },
  { title: "Navigation", text: "Convenient wireless charging pad for compatible smartphones.", img: IMGS.conv_wireless },
];

const specs = [
  { k: "Category", v: "SUV" },
  { k: "Seating Capacity", v: "5" },
  { k: "Engine Options", v: "Kappa 1.2L MPi Petrol / Kappa 1.0L Turbo GDi Petrol / U2 1.5L CRDi Diesel" },
  { k: "Displacement", v: "1197 cc / 998 cc / 1493 cc" },
  { k: "Max Power", v: "61 kW (83 PS) @ 6000 r/min / 88.3 kW (120 PS) @ 6000 r/min / 85 kW (116 PS) @ 4000 r/min" },
  { k: "Max Torque", v: "114.7 Nm @ 4200 r/min / 172 Nm @ 1500-4000 r/min / 250 Nm @ 1500-2750 r/min" },
  { k: "Transmission", v: "5-Speed MT / 6-Speed MT, 7-Speed DCT / 6-Speed MT, 6-Speed AT" },
  { k: "Suspension Front", v: "McPherson strut with coil spring" },
  { k: "Suspension Rear", v: "Coupled torsion beam axle with coil spring" },
  { k: "Brake Front", v: "Disc" },
  { k: "Brake Rear", v: "Drum / Disc" },
  { k: "Fuel Type", v: "Petrol / Petrol / Diesel" },
  { k: "Fuel Tank Capacity", v: "45 L" },
  { k: "Dimensions (L×W×H)", v: "3995 × 1800 × 1665 mm (with R16) / 3995 × 1800 × 1650 mm (with R15)" },
  { k: "Wheelbase", v: "2520 mm" },
  { k: "Drive Modes", v: "Eco, Normal, Sport (1.0 Turbo & 1.5 Diesel only)" },
  { k: "Traction Control Modes", v: "Sand, Mud, Snow (1.0 Turbo & 1.5 Diesel only)" },
];

const featureMatrix = [
  { feature: "LED Headlamps", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Panoramic Sunroof", e: "-", s: "-", sx: "-", sxo: "S" },
  { feature: "Dual 12.3\" Curved Panoramic Displays", e: "-", s: "-", sx: "-", sxo: "S" },
  { feature: "Touchscreen Infotainment (8-inch)", e: "-", s: "S", sx: "S", sxo: "S" },
  { feature: "Bluelink Connected Car", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Home-to-Car with Alexa", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Wireless Android Auto/Apple CarPlay", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Wireless Charging", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Air Purifier with PM2.5 Filter", e: "-", s: "-", sx: "-", sxo: "S" },
  { feature: "Ambient Lighting", e: "-", s: "-", sx: "-", sxo: "S" },
  { feature: "Dual Tone Interior (Dark Navy & Dove Grey)", e: "-", s: "-", sx: "-", sxo: "S" },
  { feature: "Coffee Table Centre Console", e: "-", s: "-", sx: "-", sxo: "S" },
  { feature: "6 Airbags", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "ESC & VSM", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Hill-start Assist Control (HAC)", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Tyre Pressure Monitoring System (TPMS)", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Rear Camera with Dynamic Guidelines", e: "-", s: "S", sx: "S", sxo: "S" },
  { feature: "Drive Modes (Eco/Normal/Sport)*", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Traction Control Modes (Sand/Mud/Snow)*", e: "-", s: "-", sx: "S", sxo: "S" },
  { feature: "Bose Premium Sound 8 Speaker System", e: "-", s: "-", sx: "-", sxo: "S" },
];

const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a href={href} className="px-3 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-[#0057B8]/20 text-white text-sm whitespace-nowrap backdrop-blur-sm">
    {label}
  </a>
);

export default function VenueAllNewPage() {
  const [manifest, setManifest] = React.useState<null | { categories: Record<string, { src: string; title?: string }[]> }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const CAPTION_MAP: Record<string, string> = {
    // This will be populated when images are provided
  };

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/images/cars/venue-all-new/manifest.json', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setManifest(json);
      } catch {}
    }
    load();
    return () => { cancelled = true; };
  }, []);


  React.useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', brand.primary);
    document.documentElement.style.setProperty('--brand-accent', brand.accent);
    document.documentElement.style.setProperty('--brand-dark', brand.dark);
  }, []);

  const mapFromManifest = (key: string, fallback: Array<{ title: string; img: string; text?: string }>) => {
    const arr = manifest?.categories?.[key] as { src: string; title?: string }[] | undefined;
    if (!arr || arr.length === 0) return fallback;
    return arr.map((it, idx) => {
      const file = (it.src || '').split('/').pop() || '';
      const title = CAPTION_MAP[file.toLowerCase()] || it.title || file;
      const fallbackItem = fallback[idx];
      return { title, img: it.src, text: fallbackItem?.text };
    });
  };

  const mappedHighlights = mapFromManifest('highlights', highlights.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedExterior = mapFromManifest('exterior', exterior.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedInterior = mapFromManifest('interior', interior.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedPerformance = mapFromManifest('performance', performance.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedSafety = mapFromManifest('safety', safety.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedAdasLevel2 = mapFromManifest('adas-level2', adasLevel2.map(h => ({ title: h.title, img: h.img, text: h.text })));
  const mappedConvenience = mapFromManifest('convenience', convenience.map(h => ({ title: h.title, img: h.img, text: h.text })));

  const allImages = Array.from(new Set([
    ...mappedHighlights, ...mappedExterior, ...mappedInterior, ...mappedPerformance, ...mappedSafety, ...mappedAdasLevel2, ...mappedConvenience,
  ].map(i => i.img).filter(Boolean))) as string[];

  return (
    <main className="min-h-screen bg-transparent text-zinc-100">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/venue-all-new-video.mp4"
      />
      {/* Premium Light Black Overlay */}
      <div className="fixed inset-0 bg-black/40 -z-10" />
      <div className="sticky top-0 z-40 border-b border-white/20 bg-gradient-to-b from-[#0B1F3A]/70 via-[#002C5F]/55 to-[#0B1F3A]/70 backdrop-blur-2xl shadow-xl shadow-[#0B1F3A]/40 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:via-transparent before:to-transparent before:pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 h-14">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-3 font-bold text-white group transition-transform hover:scale-105 flex-shrink-0 min-w-0"
          >
            <div className="relative flex-shrink-0">
              <span
                aria-hidden
                className="inline-block h-8 w-8 sm:h-9 sm:h-9 md:h-10 md:w-10 rounded-lg bg-gradient-to-br from-[#002C5F] to-[#0057B8] shadow-lg shadow-[#002C5F]/40 group-hover:shadow-[#0057B8]/50 transition-all"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">H</span>
            </div>
            <div className="flex flex-col min-w-0 hidden sm:flex">
              <span className="text-sm sm:text-base md:text-lg leading-tight tracking-tight truncate">Bharat Hyundai</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/60 uppercase tracking-wider truncate">Authorized Dealer</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-2 overflow-x-auto flex-1 justify-end">
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
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[color:var(--brand-primary)] to-transparent" />
      </div>

      <header className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_20%,rgba(100,200,255,0.12),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]"/>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-28 lg:py-32 relative">
          <motion.div {...fadeUp} className="text-white">
            <div className="text-2xl md:text-3xl font-light mb-2 drop-shadow-lg">
              The all-new
            </div>
            <motion.h1 {...fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg">
              Hyundai <span className="text-[#00A9E0]">VENUE.</span>
            </motion.h1>
            <div className="text-xl md:text-2xl font-medium text-white/95 drop-shadow-md">
              Tech up. Go beyond.
            </div>
          </motion.div>
          <motion.p {...fadeUp} className="max-w-3xl text-white/90 mt-5 md:text-lg drop-shadow-md">
            The All New Hyundai Venue combines bold design, advanced technology, and powerful performance to deliver an unparalleled driving experience.
          </motion.p>
          <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
            <a href="#specs" className="px-4 py-2 rounded-xl bg-[#0057B8] text-white font-semibold hover:bg-[#00458A] shadow-lg shadow-[#0057B8]/40">View Specs</a>
            <a href="#features" className="px-4 py-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur text-white hover:bg-white/20">Trim matrix</a>
          </div>
        </div>
      </header>

      <Section id="highlights" title="Highlights" icon={<Sparkles className="w-5 h-5" />}>
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            All New Venue — Designed for Adventure
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            The All New Hyundai Venue is your perfect companion for every journey. With its bold design, premium features, and advanced technology, it's built to take on any adventure while keeping you comfortable and connected.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              All New Venue is designed for your everyday adventures.
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              Experience the perfect blend of style, performance, and technology.
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            All New Venue Exterior: Bold & Dynamic
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            The All New Venue commands attention with its bold front design, signature cascading grille, and crystal-cut LED headlamps. Every detail is crafted to make a statement.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              Experience the All New Venue exterior with bold and dynamic design.
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              Explore stunning Venue images that redefine compact SUV aesthetics!
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
        <p className="text-xs text-white/80 mt-3 drop-shadow-sm">* Dual tone = body colour with Abyss Black roof. Colours and availability may vary by trim/production month.</p>
      </Section>

      <Section id="interior" title="Interior" icon={<ImageIcon className="w-5 h-5" />}>
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            All New Venue Interior: Premium Comfort
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            Step inside the All New Venue and experience premium comfort with sophisticated design, advanced technology, and thoughtful features that make every journey enjoyable.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              Explore All New Venue interior images and experience comfort like never before
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              —where comfort meets advanced technology!
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            All New Venue Performance: Power & Efficiency
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            Choose from multiple engine options - powerful diesel, turbo petrol, or efficient Kappa petrol. Each engine is tuned to deliver the perfect balance of power and efficiency.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              The All New Venue offers powerful performance with excellent fuel efficiency.
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              With impressive fuel economy, it lets you drive longer with fewer fuel stops.
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            All New Venue Safety: Always Protected
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            Packed with Hyundai's most advanced safety systems, the All New Venue is built to keep you and your loved ones safe on every journey.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              The All New Venue Safety Features ensure ultimate protection with 6 airbags, ESC, VSM, and more.
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              Drive confidently with the All New Venue Safety Features, designed for your peace of mind.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mappedSafety.map((h, i) => (
            <Card key={i} img={h.img} title={h.title}>{h.text}</Card>
          ))}
        </div>

        {/* ADAS Level 2 Subsection */}
        <div className="mt-12">
          <div className="mb-6 text-center">
            <h4 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">
              ADAS Level 2
            </h4>
            <p className="text-base text-white/80 drop-shadow-sm">
              Advanced Driver Assistance Systems for enhanced safety and driving comfort.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mappedAdasLevel2.map((h, i) => (
              <Card key={i} img={h.img} title={h.title}>{h.text}</Card>
            ))}
          </div>
        </div>
      </Section>

      <Section id="convenience" title="Convenience & Connectivity" icon={<Settings className="w-5 h-5" />}>
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            All New Venue Convenience: Stay Connected
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            Stay connected and in control with Hyundai Bluelink, Home-to-Car with Alexa, advanced infotainment, and wireless charging. The All New Venue keeps you connected to what matters most.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              The All New Venue convenience features redefine every drive with smart connectivity and advanced technology.
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
        <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg shadow-black/20">
          <table className="min-w-[720px] w-full text-sm">
            <thead className="bg-[#0057B8]/30 backdrop-blur-md">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold text-white">Variant</th>
                <th className="px-4 py-3 font-semibold text-white">Transmission</th>
                <th className="px-4 py-3 font-semibold text-white">Tone</th>
                <th className="px-4 py-3 font-semibold text-right text-white">Ex‑showroom</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v, i) => (
                <tr key={i} className="border-t border-white/20">
                  <td className="px-4 py-3 text-white">{v.name}</td>
                  <td className="px-4 py-3 text-white/90">{v.trans}</td>
                  <td className="px-4 py-3 text-white/90">{v.tone}</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#00A9E0]">{v.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/80 mt-3 drop-shadow-sm">* Sources: Public price listings; confirm with Hyundai dealer for your city. Prices on this page reflect averages as of Jan 13, 2025.</p>
      </Section>

      <Section id="specs" title="Specifications" icon={<Activity className="w-5 h-5" />}>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/20 p-4 md:p-6 bg-white/10 backdrop-blur-md shadow-lg shadow-black/20">
            {specs.map((s, idx) => <SpecRow key={idx} k={s.k} v={s.v} />)}
            <p className="text-xs text-white/80 mt-3 drop-shadow-sm">* Figures are indicative and may vary by variant; please verify with the official brochure/dealer.</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden shadow-lg shadow-black/20">
            <img src={IMGS.interior_dashboard} alt="Cabin" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </Section>

      <Section id="features" title="Features by Trim" icon={<ListChecks className="w-5 h-5" />}>
        <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg shadow-black/20">
          <table className="min-w-[720px] w-full text-sm">
            <thead className="bg-[#0057B8]/30 backdrop-blur-md">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold text-white">Feature</th>
                <th className="px-4 py-3 font-semibold text-center text-white">E</th>
                <th className="px-4 py-3 font-semibold text-center text-white">S</th>
                <th className="px-4 py-3 font-semibold text-center text-white">SX</th>
                <th className="px-4 py-3 font-semibold text-center text-white">SX(O)</th>
              </tr>
            </thead>
            <tbody>
              {featureMatrix.map((r, i) => (
                <tr key={i} className="border-t border-white/20">
                  <td className="px-4 py-3 text-white">{r.feature}</td>
                  <td className="px-4 py-3 text-center font-medium text-white/90">{r.e}</td>
                  <td className="px-4 py-3 text-center font-medium text-white/90">{r.s}</td>
                  <td className="px-4 py-3 text-center font-medium text-white/90">{r.sx}</td>
                  <td className="px-4 py-3 text-center font-medium text-white/90">{r.sxo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/80 mt-3 drop-shadow-sm">Feature availability can vary by production month and region; please verify on the official Features page and brochure.</p>
      </Section>

      {/* Hero image at the bottom */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img src={IMGS.hero} alt="All New Venue hero" className="h-[60vh] w-full object-cover object-center" loading="lazy" width="1200" height="600"/>
        </div>
      </div>

      {/* All images slow slider */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="relative">
            <div className="flex gap-4 animate-scroll-slow">
              {allImages.map((src, i) => (
                <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                  <img src={src} alt={`All New Venue ${i + 1}`} className="h-full w-full object-cover" loading="lazy" width="288" height="176"/>
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
        <div className="max-w-7xl mx-auto px-4 py-10 text-xs text-white/70">
          <p className="mb-2 font-medium text-white/90">Image & Info Sources</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Hyundai India — All New Venue pages: Highlights, Exterior, Interior, Performance, Safety, Convenience, Specification, Features.</li>
            <li>Editorial/press imagery where noted; replace with official assets for production use.</li>
          </ul>
        </div>
      </footer>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a 
          href="/test-drive"
          className="flex items-center gap-2 rounded-full bg-[#0057B8] hover:bg-[#00458A] text-white px-6 py-3 shadow-lg shadow-[#0057B8]/40 font-medium text-base min-h-[44px]"
          aria-label="Book test drive for All New Venue"
        >
          <TestTube className="h-5 w-5" />
          Test Drive
        </a>
        <a 
          href="tel:+917733888999"
          className="flex items-center gap-2 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 px-6 py-3 shadow-lg font-medium text-base backdrop-blur-sm min-h-[44px]"
          aria-label="Call us about All New Venue"
        >
          <Phone className="h-5 w-5" />
          Call Now
        </a>
      </div>
    </main>
  );
}


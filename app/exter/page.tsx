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
  ChevronRight,
  Phone,
  TestTube,
} from "lucide-react";

const brand = { primary: "#dc2626" } as const;
const cn = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

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
            src={img}
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
  { title: "Tailgate garnish", img: "/images/cars/exter/smallimageexter2_4.jpg" },
  { title: "Black interiors with red accents & stitching", img: "/images/cars/exter/800x530.jpg" },
  { title: "Gear console — Knight treatment", img: "/images/cars/exter/smallimageexter2_5.jpg" },
  { title: "Black door handle with satin finish", img: "/images/cars/exter/externewimage4.jpg" },
  { title: "Hy‑CNG Duo (dual cylinder)", desc: "Dual‑cylinder CNG layout to free up boot space with a leak‑proof design, 60L (water equivalent) capacity and a fire extinguisher under the seat.", img: "/images/cars/exter/extercngpc.jpg" },
  { title: "Parametric front grille", img: "/images/cars/exter/exterfront_pc_1.jpg" },
];

const EX = [
  { title: "Striking looks", img: "/images/cars/exter/exterfront_pc_1.jpg" },
  { title: "Signature H‑LED DRLs & positioning lamps", img: "/images/cars/exter/exterrear_pc_1.jpg" },
  { title: "Youthful and modern stance", img: "/images/cars/exter/exterrear_3.jpg" },
  { title: "Painted black rear spoiler & roof rails", img: "/images/cars/exter/exterroof-rails.jpg" },
  { title: "R15 (380.2 mm) diamond‑cut alloy wheels", img: "/images/cars/exter/exterrear_pc_2.jpg" },
];

const IN = [
  { title: "Footwell lighting", img: "/images/cars/exter/footwelllighting.jpg" },
  { title: "Voice‑enabled smart electric sunroof", img: "/images/cars/exter/Interior_sunroof.jpg" },
  { title: "FATC with digital display", img: "/images/cars/exter/exter_Interior_small_2.jpg" },
  { title: "Sporty semi‑leatherette upholstery", img: "/images/cars/exter/exter_interior_big6.jpg" },
  { title: "Premium interior themes (Cosmic Blue / Light Sage / Silver accents)*", desc: "Theme availability may vary by trim.", img: "/images/cars/exter/exter_interior_big4.jpg" },
];

const PF = [
  { title: "E20 fuel‑ready powertrain", img: "/images/cars/exter/exterper_big03.jpg" },
  { title: "1.2L Kappa Petrol — 61 kW (83 PS) @ 6,000 rpm; 113.8 Nm @ 4,000 rpm", img: "/images/cars/exter/exterper_big02.jpg" },
  { title: "Manual transmission (5MT)", img: "/images/cars/exter/exterper_small1.jpg" },
  { title: "Automated Manual Transmission (AMT)", img: "/images/cars/exter/exterper_small3.jpg" },
  { title: "Paddle shifters", img: "/images/cars/exter/exterpaddleshifters.jpg" },
];

const SF = [
  { title: "6 airbags (driver, passenger, side & curtain) — standard", img: "/images/cars/exter/airbagsexterwithoutsticker.jpg" },
  { title: "Electronic Stability Control (ESC)", img: "/images/cars/exter/extersafety_01.jpg" },
  { title: "Hill‑start Assist Control (HAC)", img: "/images/cars/exter/externewconv2.jpg" },
  { title: "Vehicle Stability Management (VSM)", img: "/images/cars/exter/externewconve2.jpg" },
  { title: "Tyre Pressure Monitoring System — Highline", img: "/images/cars/exter/extertpms.jpg" },
  { title: "ISOFIX", img: "/images/cars/exter/exter_safety_small2.jpg" },
  { title: "Rear view camera with dynamic guidelines", img: "/images/cars/exter/exter_safety_small4.jpg" },
  { title: "3‑point seatbelts & seatbelt reminder for all seats (segment‑best)", desc: "As called out on the safety page.*", img: "/images/cars/exter/externewsafety.jpg" },
];

const CON = [
  { title: "Voice enabled smart electric sunroof", desc: "Inspired by Motorsports — soak in the sights while driving", img: "/images/cars/exter/Highlights_sunroof.jpg" },
  { title: "Dashcam with dual camera", desc: "Front & rear camera, 5.84 cm (2.31\") LCD Display, Smartphone app connectivity, Full HD Video Resolution. Multiple recording modes: Driving (Normal), Event (Safety), Vacation (Time lapse)", img: "/images/cars/exter/exterhighlightsdual-camera.jpg" },
  { title: "Connected type 20.32 cm (8\") HD infotainment with digital cluster", img: "/images/cars/exter/extermultiUI.jpg" },
  { title: "Ambient sounds of nature", desc: "7 acoustic profiles to enrich user experience", img: "/images/cars/exter/exterambientsoundnat.jpg" },
  { title: "Advanced digital cluster with 10.67 cm (4.2\") coloured TFT MID", img: "/images/cars/exter/exter_Interior_small_2.jpg" },
  { title: "Cruise control", img: "/images/cars/exter/conv_exter_small1.jpg" },
  { title: "10 Regional + 2 Global language support in cluster", desc: "Multi-language UI support for enhanced user experience", img: "/images/cars/exter/extermultiUI.jpg" },
  { title: "Onboard navigation in infotainment", img: "/images/cars/exter/extermultiUI.jpg" },
  { title: "Over-the-air (OTA) updates for infotainment and map", desc: "Keep your system updated with latest features", img: "/images/cars/exter/OTA-update-800x530_14.jpg" },
  { title: "Home‑to‑Car with Alexa (English & Hindi)", desc: "Control your car features remotely using Alexa voice commands", img: "/images/cars/exter/externewimage4.jpg" },
  { title: "Rear AC vents", img: "/images/cars/exter/exterrearac.jpg" },
];

const PRICING: Array<{ variant: string; powertrain: string; price: string }> = [
  { variant: 'EX', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 5.68 Lakh*' },
  { variant: 'EX', powertrain: '1.2L Kappa Petrol Smart Auto AMT', price: '₹ 6.18 Lakh*' },
  { variant: 'EX(O)', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 5.98 Lakh*' },
  { variant: 'EX(O)', powertrain: '1.2L Kappa Petrol Smart Auto AMT', price: '₹ 6.48 Lakh*' },
  { variant: 'S', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 6.98 Lakh*' },
  { variant: 'S', powertrain: '1.2L Kappa Petrol Smart Auto AMT', price: '₹ 7.48 Lakh*' },
  { variant: 'S', powertrain: '1.2L Bi-fuel Kappa Petrol with CNG 5MT', price: '₹ 7.58 Lakh*' },
  { variant: 'SX', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 8.18 Lakh*' },
  { variant: 'SX', powertrain: '1.2L Kappa Petrol Smart Auto AMT', price: '₹ 8.68 Lakh*' },
  { variant: 'SX', powertrain: '1.2L Bi-fuel Kappa Petrol with CNG 5MT', price: '₹ 8.78 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 8.68 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.2L Kappa Petrol Smart Auto AMT', price: '₹ 9.18 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.2L Bi-fuel Kappa Petrol with CNG 5MT', price: '₹ 9.28 Lakh*' },
  { variant: 'SX Connect', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 9.08 Lakh*' },
  { variant: 'SX Connect', powertrain: '1.2L Kappa Petrol Smart Auto AMT', price: '₹ 9.58 Lakh*' },
  { variant: 'SX(O) Connect', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 9.58 Lakh*' },
  { variant: 'SX(O) Connect', powertrain: '1.2L Kappa Petrol Smart Auto AMT', price: '₹ 10.08 Lakh*' },
  { variant: 'Knight', powertrain: '1.2L Kappa Petrol 5MT', price: '₹ 10.28 Lakh*' },
  { variant: 'Knight', powertrain: '1.2L Kappa Petrol Smart Auto AMT', price: '₹ 10.78 Lakh*' },
];

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
      
      <div className="mt-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-sm text-gray-600 dark:text-gray-400 text-center">
        *Ex-showroom prices. May vary by city. Please contact your nearest dealer for accurate pricing and availability.
      </div>
    </div>
  );
}

export default function ExterFullImageSync() {
  const [activeTab, setActiveTab] = useState('highlights');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', brand.primary);
  }, []);

  useEffect(() => {
    const handler = () => {
      const ids = ['highlights', 'exterior', 'interior', 'performance', 'safety', 'convenience', 'pricing', 'specs'];
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

  // Video playback control - skip last 4 seconds
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
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
    { id: 'highlights', label: 'Highlights', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'exterior', label: 'Exterior', icon: <Car className="w-4 h-4" /> },
    { id: 'interior', label: 'Interior', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Gauge className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" /> },
    { id: 'convenience', label: 'Convenience', icon: <Settings className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <Shield className="w-4 h-4" /> },
    { id: 'specs', label: 'Specs', icon: <Settings className="w-4 h-4" /> },
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
          src="/exter.mp4"
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
          <div className="relative py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-2xl text-white">
                <div className="text-xs uppercase tracking-widest mb-3 opacity-90">Think SUV. Think EXTER</div>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Hyundai EXTER</h1>
                <p className="mt-3 text-base md:text-lg text-white/90">Compact SUV with 6 airbags standard, Hy-CNG Duo, Smart Auto AMT and connected features.</p>
                <div className="mt-3 flex flex-wrap gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 inline-flex">
                  <Chip>Knight</Chip>
                  <Chip>SX(O) Connect</Chip>
                  <Chip>1.2L Petrol</Chip>
                  <Chip>AMT</Chip>
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
            {/* Description Text */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai EXTER Knight - Think SUV. Think EXTER.
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Hyundai EXTER symbolizes outdoor, travel and leisure. This all-new SUV draws inspiration from the natural world around it and reflects an identity that is external and focused on the outside. Hyundai EXTER has been designed to present a modern take on the Hyundai SUV life.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  Hyundai EXTER is designed for your adventures.
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  Experience the perfect blend of style, comfort, and technology at competitive prices.
                </p>
              </div>
            </div>

            {/* Combined Highlights Gallery */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {HL.map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} desc={c.desc} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="exterior" title="Exterior" icon={<Car className="w-5 h-5" />}>
            {/* Exterior Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai EXTER Car Exteriors - Looks that Delight, Just Like Outside
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                The striking looks of the new Hyundai EXTER are a true delight to the eyes. Be it the signature H-LED DRLs, Hyundai EXTER branding on the front bumper, sporty bridge type painted black roof rails, dynamic painted black rear spoiler, everything makes this new SUV look spectacular and ready for outside.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  Experience the Hyundai EXTER exterior with bold and dynamic design.
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  Explore stunning EXTER images that redefine compact SUV aesthetics!
                </p>
              </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {EX.map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="interior" title="Interior" icon={<ImageIcon className="w-5 h-5" />}>
            {/* Interior Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai EXTER Car Interior: Revel in comfort as you gear up for outside.
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                When you get inside Hyundai EXTER, you know there is room for you as well as everything you love. Its spacious interiors have been crafted to offer utmost comfort, so every moment of your journey is exhilarating, and you are all set for outside.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  Explore Hyundai EXTER interior images and experience comfort like never before
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  —where comfort meets adventure!
                </p>
              </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {IN.map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} desc={c.desc} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="performance" title="Performance" icon={<Gauge className="w-5 h-5" />}>
            {/* Performance Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai EXTER Car Performance that is out of this world.
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Hyundai EXTER that comes in three powertrain options - 1.2 l Kappa Petrol engine (E20 Fuel Ready) available with 5-speed manual transmission (5MT) and Smart Auto AMT (Automated Manual Transmission) and 1.2 l Bi-fuel Kappa petrol with CNG engine equipped with 5-speed Manual transmission.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  The Hyundai EXTER offers smooth performance with power and efficiency.
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  With impressive fuel economy, it lets you drive longer with fewer fuel stops.
                </p>
              </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {PF.map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-white/70">Transmission options: 5MT · Smart Auto AMT. Hy-CNG Duo variant available.</p>
          </Section>

          <Section id="safety" title="Safety" icon={<Shield className="w-5 h-5" />}>
            {/* Safety Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai EXTER Car Safety: Built to Keep You Safe Out There
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Hyundai EXTER is all about making every drive exciting and keeping you safe. It comes with 6 airbags as standard. This SUV offers over 40 advanced safety features and 26 safety features available across all trims, so the only thing on your mind is making the most of your drive.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  The Hyundai EXTER car Safety Features ensure ultimate protection with 6 airbags, ESC, VSM, and more.
                </p>
                <p className="text-base text-red-800 dark:text-red-200 mt-2">
                  Drive confidently with the Hyundai EXTER car Safety Features, designed for your peace of mind.
                </p>
              </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {SF.map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} desc={c.desc} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-white/70">*Deployment of airbags and feature availability depend on multiple factors and variant.</p>
          </Section>

          <Section id="convenience" title="Convenience" icon={<Settings className="w-5 h-5" />}>
            {/* Convenience Description */}
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hyundai EXTER Car Convenience Features
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Hyundai EXTER comes equipped with a host of high-tech features for your convenience, so you have absolute control over your many worlds even when on the go. From on-board navigation, smartphone connectivity to infotainment with multiple regional UI language support, the new SUV has everything to ensure you never miss anything when you are exploring outside.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <p className="text-xl font-semibold text-red-900 dark:text-red-100">
                  The Hyundai EXTER car comfort & convenience Features redefine every drive with smart connectivity, advanced infotainment, and thoughtful amenities.
                </p>
              </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {CON.map((c, i) => (
                <div key={i} className="mb-5 break-inside-avoid">
                  <Card title={c.title} img={c.img} desc={c.desc} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="specs" title="Specifications" icon={<Gauge className="w-5 h-5" />}>
            <div className="space-y-8">
              {/* Performance Specifications */}
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Performance</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Engine Options</div>
                    <div className="text-base font-medium">1.2L Kappa Petrol / 1.2L Bi-fuel CNG</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Transmission</div>
                    <div className="text-base font-medium">5MT / Smart Auto AMT</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Power Output</div>
                    <div className="text-base font-medium">61 kW (83 PS) @ 6,000 rpm</div>
                  </div>
                </div>
              </div>

              {/* Dimension Specifications */}
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Dimension</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Seating Capacity</div>
                    <div className="text-base font-medium">5 Seats</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Engine Type</div>
                    <div className="text-base font-medium">4 Cylinder</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Fuel Type</div>
                    <div className="text-base font-medium">Petrol (E20 Ready) / CNG</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Torque</div>
                    <div className="text-base font-medium">113.8 Nm @ 4,000 rpm</div>
                  </div>
                </div>
              </div>

              {/* Wheels Specifications */}
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Wheels</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Tyres/Wheels</div>
                    <div className="text-base font-medium">R15 diamond-cut alloys</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Wheel Size</div>
                    <div className="text-base font-medium">380.2 mm</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
                    <div className="text-sm opacity-80 mb-1">Safety Rating</div>
                    <div className="text-base font-medium">4 Star GNCAP</div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="pricing" title="Variants & Pricing" icon={<Shield className="w-5 h-5" />}>
            <VariantsPricingSection />
          </Section>

          
        </main>

        {/* Front view image above strip */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src={EX[0].img} alt="Exter front view" className="h-[50vh] w-full object-cover" />
          </div>
        </div>

        {/* Bottom slow-scrolling strip */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-24">
            <div className="relative">
              <div className="flex gap-4 animate-scroll-slow">
                {[...HL, ...EX, ...IN, ...PF, ...SF, ...CON, ...HL, ...EX].map((c, i) => (
                  <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                    <img src={c.img} alt={`Exter ${i + 1}`} className="h-full w-full object-cover" />
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

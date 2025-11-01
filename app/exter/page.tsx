"use client"

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Sparkles, ArrowUp, Link as LinkIcon, ChevronRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

type Item = { title: string; blurb?: string; img?: string; tag?: string };

type Section = {
  key: string;
  title: string;
  intro?: string;
  items?: Item[];
  footerNote?: string;
  cta?: { label: string; href: string }[];
};

// Curated captions keyed by filename to show precise names on cards
const EXTER_CAPTION_MAP: Record<string, string> = {
  // Highlights / Knight
  "knightexterhighfeature1.jpg": "Knight — hero view",
  "airbagsexterwithoutsticker.jpg": "6 airbags (image)",
  "knightexterhighfeature3.jpg": "Red front brake calipers",
  "knightexterhighfeature4.jpg": "Knight detail — feature 4",
  "knightexterhighfeature5.jpg": "Knight detail — feature 5",
  "extercngpc.jpg": "Hy‑CNG Duo (dual cylinder)",
  "smallimageexter2_5.jpg": "Gear console — Knight treatment",
  "smallimageexter2_4.jpg": "Tailgate garnish",
  "800x530.jpg": "EXTER highlight",
  "800x530_1.jpg": "EXTER highlight",
  "800x530_4.jpg": "EXTER highlight",
  "800x530_5.jpg": "EXTER highlight",
  "Highlights_sunroof.jpg": "Electric sunroof",
  "exterhighlightsdual-camera.jpg": "Dashcam with dual camera",
  "800x530_3.jpg": "EXTER highlight",
  "last-small-section.jpg": "EXTER highlight",
  "new-small-image1.jpg": "EXTER highlight",
  "new-small-image-2.jpg": "EXTER highlight",
  "small-image-new-3.jpg": "EXTER highlight",
  "last-small-section-new.jpg": "EXTER highlight",
  "OTA-update-800x530_14.jpg": "OTA update",

  // Exterior
  "externewimage2.jpg": "EXTER exterior",
  "exterfront_pc_1.jpg": "Parametric front grille",
  "exterside_pc_1.jpg": "Side profile",
  "exterroof-rails.jpg": "Bridge‑type roof rails",
  "exterrear_3.jpg": "Youthful and modern stance",
  "exterrear_pc_1.jpg": "Signature H‑LED DRLs & positioning lamps",
  "exterrear_pc_2.jpg": "Rear view",

  // Interior
  "exter_Interior_top_pc.jpg": "Interior — hero",
  "footwelllighting.jpg": "Footwell lighting",
  "Interior_sunroof.jpg": "Smart electric sunroof",
  "exter_Interior_small_2.jpg": "FATC with digital display",
  "exter_Interior_small_3.jpg": "Interior detail",
  "exter_interior_big6.jpg": "Sporty semi‑leatherette upholstery",
  "exter_interior_big4.jpg": "Premium interior themes",
  "exter_interior_big1.jpg": "Interior detail",
  "exter_interior_big2.jpg": "Interior detail",
  "exter_interior_big3.jpg": "Interior detail",
  "exter_interior_big5.jpg": "Interior detail",

  // Performance
  "exterper_big03.jpg": "E20 fuel‑ready powertrain",
  "exterper_big02.jpg": "1.2L Kappa Petrol",
  "exterper_small1.jpg": "Manual transmission (5MT)",
  "exterper_small3.jpg": "Automated Manual Transmission (AMT)",
  "exterpaddleshifters.jpg": "Paddle shifters",

  // Safety / Convenience
  "externewsafety.jpg": "EXTER safety overview",
  "extersafety_01.jpg": "Electronic Stability Control (ESC)",
  "externewconv2.jpg": "Hill‑start Assist Control (HAC)",
  "externewconve2.jpg": "Vehicle Stability Management (VSM)",
  "extertpms.jpg": "Tyre Pressure Monitoring System — Highline",
  "exter_safety_small2.jpg": "ISOFIX",
  "exter_safety_small4.jpg": "Rear view camera with dynamic guidelines",
  "extermultiUI.jpg": "Multi‑language UI support (12)",
  "exterambientsoundnat.jpg": "Ambient sounds of nature (7)",
  "exterrearac.jpg": "Rear AC vents",
  "conv_exter_small1.jpg": "Cruise control",
};

const sections: Section[] = [
  {
    key: "highlights",
    title: "Highlights",
    intro:
      "EXTER Knight & Hy‑CNG Duo headline the range. Modern SUV stance outside, clever space and connected tech inside.",
    items: [
      { title: "Tailgate garnish", img: "/images/cars/unknown/smallimageexter2_4.jpg" },
      { title: "Black interiors with red accents & stitching", img: "/images/cars/unknown/800x530.jpg" },
      { title: "Gear console — Knight treatment", img: "/images/cars/unknown/smallimageexter2_5.jpg" },
      { title: "Black door handle with satin finish", img: "/images/cars/exter/externewimage4.jpg" },
      {
        title: "Hy‑CNG Duo (dual cylinder)",
        blurb:
          "Dual‑cylinder CNG layout to free up boot space with a leak‑proof design, 60L (water equivalent) capacity and a fire extinguisher under the seat.",
        img: "/images/cars/exter/extercngpc.jpg",
      },
      { title: "Parametric front grille", img: "/images/cars/exter/exterfront_pc_1.jpg" },
      { title: "Solid & wide front skid plate", img: "/images/cars/exter/exterfront_pc_3.jpg" },
    ],
    cta: [
      { label: "Official Highlights", href: "https://www.hyundai.com/in/en/find-a-car/exter/highlights" },
      { label: "EXTER Brochure (PDF)", href: "https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/exter-brochure.pdf" },
      { label: "Knight Brochure (PDF)", href: "https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/ExterKnightBrochure.pdf" },
    ],
  },
  {
    key: "knight",
    title: "Knight Edition",
    intro: "All‑black theme with red accents, special emblems and sporty details inside-out.",
    items: [
      { title: "Knight — hero view", img: "/images/cars/unknown/knightexterhighfeature1.jpg" },
      { title: "6 airbags (image)", img: "/images/cars/unknown/airbagsexterwithoutsticker.jpg" },
      { title: "Red front brake calipers", img: "/images/cars/unknown/knightexterhighfeature3.jpg" },
      { title: "Knight detail — feature 4", img: "/images/cars/unknown/knightexterhighfeature4.jpg" },
      { title: "Knight detail — feature 5", img: "/images/cars/unknown/knightexterhighfeature5.jpg" },
      { title: "Knight detail — feature 5 (alt)", img: "/images/cars/unknown/knightexterhighfeature5.jpg" },
      { title: "Knight detail — feature 6", img: "/images/cars/unknown/knightexterhighfeature6.jpg" }
    ],
    cta: [
      { label: "Knight Brochure (PDF)", href: "https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/ExterKnightBrochure.pdf" },
      { label: "Official Highlights — Knight", href: "https://www.hyundai.com/in/en/find-a-car/exter/highlights" },
    ],
  },
  {
    key: "cng",
    title: "Hy‑CNG Duo",
    intro: "Dual‑cylinder layout increases boot space with leak‑proof design and 60L (water equivalent) capacity.",
    items: [
      { title: "Hy‑CNG Duo — hero view", img: "/images/cars/exter/extercngpc.jpg" },
      { title: "Parametric front grille", img: "/images/cars/exter/exterfront_pc_1.jpg" },
      { title: "Sporty skid plate", img: "/images/cars/exter/exterfront_pc_3.jpg" },
      { title: "More legroom (rear)", img: "/images/cars/exter/exter_interior_big4.jpg" },
      { title: "Sporty semi‑leatherette upholstery", img: "/images/cars/exter/exter_interior_big6.jpg" },
      { title: "Spacious interior", img: "/images/cars/unknown/Interior_sunroof.jpg" },
    ],
    cta: [
      { label: "Official Highlights — Hy‑CNG Duo", href: "https://www.hyundai.com/in/en/find-a-car/exter/highlights" },
      { label: "Hy‑CNG Duo Story", href: "https://www.hyundai.com/in/en/hyundai-story/hy-cng-duo" },
    ],
  },
  {
    key: "exterior",
    title: "Exterior",
    intro:
      "Looks that delight — Signature H‑LED DRLs, EXTER branding on bumper, bridge‑type roof rails, dynamic black rear spoiler.",
    items: [
      { title: "Striking looks", img: "/images/cars/exter/exterfront_pc_1.jpg" },
      { title: "Parametric front grille & solid skid plate", img: "/images/cars/exter/exterfront_pc_3.jpg" },
      { title: "Projector bi‑function headlamps", img: "/images/cars/exter/exterfront_pc_4.jpg" },
      { title: "Signature H‑LED DRLs & positioning lamps", img: "/images/cars/exter/exterrear_pc_1.jpg" },
      { title: "Youthful and modern stance", img: "/images/cars/exter/exterrear_3.jpg" },
      { title: "Painted black rear spoiler & roof rails", img: "/images/cars/exter/exterroof rails.jpg" },
      { title: "R15 (380.2 mm) diamond‑cut alloy wheels", img: "/images/cars/exter/exterrear_pc_2.jpg" },
    ],
    cta: [{ label: "Official Exterior", href: "https://www.hyundai.com/in/en/find-a-car/exter/exterior" }],
  },
  {
    key: "interior",
    title: "Interior",
    intro:
      "Youthful styling, ample space and thoughtful storage. Feature highlights include footwell lighting and smart sunroof.",
    items: [
      { title: "Footwell lighting", img: "/images/cars/unknown/footwelllighting.jpg" },
      { title: "Voice‑enabled smart electric sunroof", img: "/images/cars/unknown/Interior_sunroof.jpg" },
      { title: "FATC with digital display", img: "/images/cars/exter/exter_Interior_small_2.jpg" },
      { title: "Sporty semi‑leatherette upholstery", img: "/images/cars/exter/exter_interior_big6.jpg" },
      { title: "Premium interior themes (Cosmic Blue / Light Sage / Silver accents)*", blurb: "Theme availability may vary by trim.", img: "/images/cars/exter/exter_interior_big4.jpg" },
    ],
    cta: [{ label: "Official Interior", href: "https://www.hyundai.com/in/en/find-a-car/exter/interior" }],
  },
  {
    key: "performance",
    title: "Performance",
    intro:
      "E20‑ready powertrains: 1.2L Kappa petrol (5MT or Smart Auto AMT) and 1.2L Bi‑fuel Kappa petrol with CNG (5MT).",
    items: [
      { title: "E20 fuel‑ready powertrain", img: "/images/cars/exter/exterper_big03.jpg" },
      { title: "1.2L Kappa Petrol — 61 kW (83 PS) @ 6,000 rpm; 113.8 Nm @ 4,000 rpm", img: "/images/cars/exter/exterper_big02.jpg" },
      { title: "Manual transmission (5MT)", img: "/images/cars/exter/exterper_small1.jpg" },
      { title: "Automated Manual Transmission (AMT)", img: "/images/cars/exter/exterper_small3.jpg" },
      { title: "Paddle shifters", img: "/images/cars/exter/exterpaddleshifters.jpg" },
    ],
    cta: [{ label: "Official Performance", href: "https://www.hyundai.com/in/en/find-a-car/exter/performance" }],
  },
  {
    key: "safety",
    title: "Safety",
    intro:
      "6 airbags standard across the range, plus 40+ advanced safety features and 26 features offered across trims.",
    items: [
      { title: "6 airbags (driver, passenger, side & curtain) — standard", img: "/images/cars/unknown/airbagsexterwithoutsticker.jpg" },
      { title: "Electronic Stability Control (ESC)", img: "/images/cars/exter/extersafety_01.jpg" },
      { title: "Hill‑start Assist Control (HAC)", img: "/images/cars/exter/externewconv2.jpg" },
      { title: "Vehicle Stability Management (VSM)", img: "/images/cars/exter/externewconve2.jpg" },
      { title: "Tyre Pressure Monitoring System — Highline", img: "/images/cars/exter/extertpms.jpg" },
      { title: "ISOFIX", img: "/images/cars/exter/exter_safety_small2.jpg" },
      { title: "Rear view camera with dynamic guidelines", img: "/images/cars/exter/exter_safety_small4.jpg" },
      { title: "3‑point seatbelts & seatbelt reminder for all seats (segment‑best)", blurb: "As called out on the safety page.*", img: "/images/cars/exter/externewsafety.jpg" },
      { title: "IRVM with telematics switches (SOS, RSA, Bluelink)", img: "/images/cars/exter/exterbluelinkcctech.jpg" },
    ],
    footerNote:
      "* Deployment of airbags and feature availability depend on multiple factors and variant. Refer to owner’s manual and official pages.",
    cta: [{ label: "Official Safety", href: "https://www.hyundai.com/in/en/find-a-car/exter/safety" }],
  },
  {
    key: "convenience",
    title: "Convenience",
    intro:
      "Host of high tech features including voice-enabled Smart Electric Sunroof, Dashcam with Dual Camera, connected infotainment with multi-language support, and thoughtful convenience features for everyday ease.",
    items: [
      {
        title: "Voice enabled smart electric sunroof",
        blurb: "Inspired by Motorsports — soak in the sights while driving",
        img: "/images/cars/exter/Highlights_sunroof.jpg",
      },
      {
        title: "Dashcam with dual camera",
        blurb: "Front & rear camera, 5.84 cm (2.31\") LCD Display, Smartphone app connectivity, Full HD Video Resolution. Multiple recording modes: Driving (Normal), Event (Safety), Vacation (Time lapse)",
        img: "/images/cars/exter/exterhighlightsdual-camera.jpg",
      },
      {
        title: "Connected type 20.32 cm (8\") HD infotainment with digital cluster",
        img: "/images/cars/exter/extermultiUI.jpg",
      },
      {
        title: "Ambient sounds of nature",
        blurb: "7 acoustic profiles to enrich user experience",
        img: "/images/cars/exter/exterambientsoundnat.jpg",
      },
      {
        title: "Advanced digital cluster with 10.67 cm (4.2\") coloured TFT MID",
        img: "/images/cars/exter/exter_Interior_small_2.jpg",
      },
      {
        title: "Cruise control",
        img: "/images/cars/exter/conv_exter_small1.jpg",
      },
      {
        title: "10 Regional + 2 Global language support in cluster",
        blurb: "Multi-language UI support for enhanced user experience",
        img: "/images/cars/exter/extermultiUI.jpg",
      },
      {
        title: "Onboard navigation in infotainment",
        img: "/images/cars/exter/extermultiUI.jpg",
      },
      {
        title: "Over-the-air (OTA) updates for infotainment and map",
        blurb: "Keep your system updated with latest features",
        img: "/images/cars/exter/OTA-update-800x530_14.jpg",
      },
      {
        title: "Home‑to‑Car with Alexa (English & Hindi)",
        blurb: "Control your car features remotely using Alexa voice commands",
        img: "/images/cars/exter/externewimage4.jpg",
      },
      {
        title: "Bluelink connected car technology",
        blurb: "60+ connected features for seamless integration",
        img: "/images/cars/exter/exterbluelinkcctech.jpg",
      },
      {
        title: "Wireless phone charger",
        img: "/images/cars/exter/exterphonecharger.jpg",
      },
      {
        title: "Rear AC vents",
        img: "/images/cars/exter/exterrearac.jpg",
      },
    ],
    footerNote:
      "Alexa device and Bluelink functionality have regional, device and connectivity dependencies. Some features may vary by variant. See official disclaimers.",
    cta: [{ label: "Official Convenience", href: "https://www.hyundai.com/in/en/find-a-car/exter/convenience" }],
  },
  {
    key: "specs",
    title: "Specification",
    intro:
      "Explore comprehensive specifications of Hyundai EXTER including engine options, dimensions, wheels, seating capacity, and performance details.",
    items: [
      {
        title: "Seating Capacity",
        blurb: "5 seats",
        img: "/images/cars/exter/exter_interior_big4.jpg",
      },
      {
        title: "Engine Options",
        blurb: "1.2L Kappa Petrol (E20 Fuel Ready) / 1.2L Bi-fuel Kappa Petrol with CNG",
        img: "/images/cars/exter/exterper_big02.jpg",
      },
      {
        title: "Transmission Options",
        blurb: "5-speed Manual Transmission (5MT) / Smart Auto AMT (Automated Manual Transmission)",
        img: "/images/cars/exter/exterper_small1.jpg",
      },
      {
        title: "Engine Type",
        blurb: "4 Cylinder engine",
        img: "/images/cars/exter/exterper_big03.jpg",
      },
      {
        title: "Fuel Options",
        blurb: "Petrol (E20 ready) / CNG (Hy-CNG Duo with dual cylinder system, 60L capacity)",
        img: "/images/cars/exter/extercngpc.jpg",
      },
      {
        title: "Performance",
        blurb: "1.2L Kappa Petrol: 61 kW (83 PS) @ 6,000 rpm; 113.8 Nm @ 4,000 rpm",
        img: "/images/cars/exter/exterper_big02.jpg",
      },
      {
        title: "Wheels",
        blurb: "R15 (380.2 mm) diamond-cut alloy wheels",
        img: "/images/cars/exter/exterrear_pc_2.jpg",
      },
    ],
    footerNote:
      "Specifications may vary by variant. Some equipment illustrated may not be supplied as standard and may be available at extra cost. Please consult your dealer for full information.",
    cta: [
      { label: "Open Official Spec Table", href: "https://www.hyundai.com/in/en/find-a-car/exter/specification" },
      { label: "Download Brochure (PDF)", href: "https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/exter-brochure.pdf" },
    ],
  },
  {
    key: "pricing",
    title: "Variants & Pricing",
    intro: "Explore all Hyundai EXTER variants with their powertrain options and ex-showroom prices.",
  },
  {
    key: "features",
    title: "Features (Matrix)",
    intro:
      "Feature availability varies by trim (EX → SX(O) Connect Knight). Use the official matrix for exact mapping.",
    items: [
      { title: "Engine & Trim Plan: Petrol MT / Petrol AMT / Hy‑CNG Duo MT (selected trims)", img: "/images/cars/exter/exterfront_pc_1.jpg" },
      { title: "Safety: 6 airbags standard; ESC/HAC/VSM across trims as per matrix", img: "/images/cars/exter/extersafety_01.jpg" },
      { title: "Cameras & TPMS: Dashcam (selected), TPMS Highline", img: "/images/cars/exter/extertpms.jpg" },
      { title: "Convenience: Smart key, auto headlamps, defogger, cruise (trim‑wise)", img: "/images/cars/unknown/conv_exter_small1.jpg" },
    ],
    cta: [{ label: "Open Features Matrix", href: "https://www.hyundai.com/in/en/find-a-car/exter/features" }],
  },
];

// Exter Variants & Pricing Data
const EXTER_PRICING: Array<{ variant: string; powertrain: string; price: string }> = [
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

  const groupedPricing = EXTER_PRICING.reduce((acc, item) => {
    if (!acc[item.variant]) {
      acc[item.variant] = [];
    }
    acc[item.variant].push(item);
    return acc;
  }, {} as Record<string, typeof EXTER_PRICING>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedPricing).map(([variant, items]) => (
        <div
          key={variant}
          className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggleVariant(variant)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/10 transition-colors text-white"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">{variant}</h3>
              <p className="text-sm text-white/70 mt-1">
                {items.length} powertrain option{items.length > 1 ? 's' : ''}
              </p>
            </div>
            <motion.div
              animate={{ rotate: expandedVariants.has(variant) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-white/70"
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
            <div className="px-6 pb-6 pt-0 space-y-3 border-t border-white/10">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <div>
                    <div className="text-sm font-medium text-white">{item.powertrain}</div>
                    <div className="text-xs text-white/70 mt-1">Powertrain</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{item.price}</div>
                    <div className="text-xs text-white/70 mt-1">Ex-showroom*</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
      
      <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/80 text-center">
        *Ex-showroom prices. May vary by city. Please contact your nearest dealer for accurate pricing and availability.
      </div>
    </div>
  );
}

function SectionHeader({ id, title, intro, cta }: { id?: string; title: string; intro?: string; cta?: { label: string; href: string }[] }) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="mb-6 bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
            {intro && <p className="text-white/80 max-w-3xl mt-2">{intro}</p>}
          </div>
          {/* Official links removed as requested */}
        </div>
      </div>
    </div>
  );
}

function ImageSlot({ title, url }: { title: string; url?: string }) {
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="flex flex-col items-center gap-2 text-white/80">
            <ImageIcon className="h-7 w-7" />
            <div className="text-sm">No image set yet</div>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ item }: { item: Item }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md text-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg leading-tight text-white">{item.title}</CardTitle>
        {item.blurb && <p className="text-white/80 text-sm">{item.blurb}</p>}
      </CardHeader>
      <CardContent>
        <ImageSlot title={item.title} url={item.img} />
      </CardContent>
    </Card>
  );
}

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds]);
  return active;
}

export default function ExterShowcaseSinglePage() {
  const [data, setData] = useState<Section[]>(sections);
  const [loadedFromManifest, setLoadedFromManifest] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadManifest() {
      try {
        const res = await fetch('/images/cars/exter/manifest.json', { cache: 'no-store' });
        if (!res.ok) return;
        const manifest = await res.json();
        if (cancelled) return;
        const cat = manifest.categories || {};
        const mapItems = (arr: any[]) =>
          (arr || []).map((it) => {
            const src: string = it.src || '';
            const file = src.split('/').pop() || '';
            const titleFromMap = EXTER_CAPTION_MAP[file];
            const title = titleFromMap || it.title || 'Image';
            return { title, img: src } as Item;
          });
        
        // Update only the sections that exist in manifest, preserve all other sections
        // Note: 'convenience', 'specs', and 'pricing' use enhanced static data, so we preserve them
        const next: Section[] = sections.map((existingSection) => {
          // Don't override convenience, specs, or pricing - they use enhanced static data
          if (existingSection.key === 'convenience' || existingSection.key === 'specs' || existingSection.key === 'pricing') {
            return existingSection;
          }
          // If this section exists in manifest, merge with manifest data
          if (['highlights', 'exterior', 'interior', 'performance', 'safety'].includes(existingSection.key)) {
            const manifestItems = mapItems(cat[existingSection.key] || []);
            if (manifestItems.length > 0) {
              return { ...existingSection, items: manifestItems } as Section;
            }
          }
          // Otherwise keep the existing section as-is (features, knight, cng, etc.)
          return existingSection;
        });
        setData(next);
        setLoadedFromManifest(true);
      } catch {
        // ignore, keep fallback static data
      }
    }
    loadManifest();
    return () => {
      cancelled = true;
    };
  }, []);

  const heroItems = useMemo(() => {
    const hl = data.find((s) => s.key === "highlights");
    return (hl?.items?.slice(0, 2) || []) as Item[];
  }, [data]);

  const sectionIds = data.map((s) => s.key);
  const active = useActiveSection(sectionIds);
  const topRef = useRef<HTMLDivElement>(null);

  // image editing removed

  return (
    <div ref={topRef} className="min-h-screen w-full">
      {/* Sticky background video */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/exter.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-6 pt-12 pb-6">
          <div className="flex flex-col gap-8">
            <div className="max-w-3xl">
              <div className="bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-white">
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
                  Hyundai <span className="inline-flex items-center gap-2">EXTER <Sparkles className="h-6 w-6" /></span>
                </h1>
                <p className="mt-4 text-white/80 text-base md:text-lg">
                  A designer‑grade, consolidated view of <em>all</em> EXTER pages — Highlights, Exterior, Interior, Performance,
                  Safety, Convenience, Specification and Features — in a single, elegant scroll.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="border-white/40 text-white" variant="outline">6 Airbags Std</Badge>
                  <Badge className="border-white/40 text-white" variant="outline">E20 Ready</Badge>
                  <Badge className="border-white/40 text-white" variant="outline">AMT w/ Paddle Shifters</Badge>
                  <Badge className="border-white/40 text-white" variant="outline">Hy‑CNG Duo</Badge>
                  <Badge className="border-white/40 text-white" variant="outline">H2C w/ Alexa</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Top Nav: On this page */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-black/30 text-white backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              <span className="text-xs uppercase tracking-wider text-white/70 mr-1 flex items-center gap-1"><LinkIcon className="h-4 w-4"/>On this page</span>
              {data.map((s) => (
                <a
                  key={s.key}
                  href={`#${s.key}`}
                  className={`px-3 py-1.5 rounded-full text-sm border transition whitespace-nowrap ${
                    active === s.key ? "bg-white text-slate-900 border-white" : "border-white/20 hover:bg-white/10"
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Spacer for fixed nav height */}
        <div className="h-10" />

        {/* All sections in one continuous page */}
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {data.map((section) => (
            <section key={section.key} id={section.key} className="py-10 border-t first:border-t-0">
              <SectionHeader id={section.key} title={section.title} intro={section.intro} cta={section.cta} />

              {/* Special handling for pricing section */}
              {section.key === 'pricing' ? (
                <VariantsPricingSection />
              ) : (
                <>
                  {/* Cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {(section.items || [])
                      .filter((item) => typeof item.img === "string" && item.img.trim().length > 0)
                      .map((item, idx) => (
                      <FeatureCard key={`${section.key}-${idx}`} item={item} />
                      ))}
                  </div>

                  {section.footerNote && (
                    <p className="text-xs text-muted-foreground mt-6">{section.footerNote}</p>
                  )}
                </>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Back to top */}
      <div className="fixed bottom-6 right-6">
        <Button onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })} className="rounded-full shadow-lg" size="icon" aria-label="Back to top">
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        <div className="text-sm text-muted-foreground">
          Built for rapid visual QA and content parity with official Hyundai pages. {loadedFromManifest ? "Images served locally." : "Images currently pre‑filled from Hyundai’s CDN (will switch to local after running downloader)."}
        </div>
      </footer>
    </div>
  );
}



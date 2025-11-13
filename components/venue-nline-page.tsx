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
  hero: "/images/cars/venue-nline/venue-n-line-inner-kv-desk-banner.jpg",
  highlight_led_drl: "/images/cars/venue-nline/led-drl.jpg",
  highlight_alloys: "/images/cars/venue-nline/diamond-cut-alloy-wheel.jpg",
  highlight_steering: "/images/cars/venue-nline/steering-wheel.jpg",
  highlight_gear: "/images/cars/venue-nline/gear-shift-knob.jpg",
  highlight_exterior: "/images/cars/venue-nline/exterior-banner.jpg",
  highlight_turn_indicators: "/images/cars/venue-nline/led-sequential-turn-indicators.jpg",
  highlight_exhaust: "/images/cars/venue-nline/twin-tip-exhaust.jpg",
  highlight_stop_lamp: "/images/cars/venue-nline/high-mounted-stop-lap.jpg",
  highlight_interior: "/images/cars/venue-nline/interior-banner.jpg",
  highlight_drive_mode: "/images/cars/venue-nline/drive-mode-select.jpg",
  highlight_interior_gear: "/images/cars/venue-nline/interior-gear-hift-knob.jpg",
  highlight_paddles: "/images/cars/venue-nline/paddle-shifters.jpg",
  highlight_smartsense: "/images/cars/venue-nline/smartsense-banner.jpg",
  exterior_quad_led: "/images/cars/venue-nline/quad-beam-led.jpg",
  exterior_alloys: "/images/cars/venue-nline/diamond-cut-alloy-wheel.jpg",
  exterior_stop_lamp: "/images/cars/venue-nline/high-mounted-stop-lamp.jpg",
  exterior_sequential: "/images/cars/venue-nline/LED_sequential_lights.jpg",
  exterior_roof_rails: "/images/cars/venue-nline/bridge-type-roof-rails.jpg",
  exterior_grille: "/images/cars/venue-nline/dark-chrome-radiator-grille-with-N-Line-emblem.jpg",
  exterior_front: "/images/cars/venue-nline/venuenlineextfront1.jpg",
  exterior_rear: "/images/cars/venue-nline/venuenlineextrear1.jpg",
  exterior_side: "/images/cars/venue-nline/venuenlineextside1.jpg",
  interior_banner: "/images/cars/venue-nline/interior-banner.jpg",
  interior_steering: "/images/cars/venue-nline/N-Line-exclusive-steering-wheel.jpg",
  interior_seats: "/images/cars/venue-nline/sporty-black-leather-seats-with-N-branding.jpg",
  interior_console: "/images/cars/venue-nline/coffee-table-centre-console-with-surround-ambient-lighting.jpg",
  interior_crashpad: "/images/cars/venue-nline/crashpad-with-VENUE-branding.jpg",
  interior_pedals: "/images/cars/venue-nline/sporty-metal-pedals.jpg",
  interior_spacious: "/images/cars/venue-nline/spacious-cabin-ample-head-room.jpg",
  perf_big: "/images/cars/venue-nline/venuenlinebigimg1.jpg",
  perf_engine: "/images/cars/venue-nline/venuenlineengbig1.jpg",
  perf_small1: "/images/cars/venue-nline/venuenlinesmallimg1.jpg",
  perf_small2: "/images/cars/venue-nline/venuenlinesmallimg2.jpg",
  perf_small3: "/images/cars/venue-nline/venuenlinesmallimg3.jpg",
  safety_smartsense: "/images/cars/venue-nline/smartsense-banner.jpg",
  safety_parking_sensors: "/images/cars/venue-nline/front-parking-sensors.jpg",
  safety_epb: "/images/cars/venue-nline/electronic-parking-brake-with-auto-hold.jpg",
  safety_hac: "/images/cars/venue-nline/hill-start-assist-control.jpg",
  safety_airbags: "/images/cars/venue-nline/6-airbags-standard.jpg",
  safety_disc_brake: "/images/cars/venue-nline/all_wheel_disc_brake.jpg",
  safety_child_seat: "/images/cars/venue-nline/child-seat-anchor.jpg",
  safety_connected: "/images/cars/venue-nline/designed-for-the-connected-era-banner.jpg",
  safety_rctca: "/images/cars/venue-nline/rear-cross-traffic-collision-avoidance-assist.jpg",
  safety_daw: "/images/cars/venue-nline/driver-attention-warning.jpg",
  safety_sew: "/images/cars/venue-nline/safe-exit-warning.jpg",
  safety_scc: "/images/cars/venue-nline/smart-cruise-control.jpg",
  safety_lfa: "/images/cars/venue-nline/lane-following-assist.jpg",
  safety_fca_car: "/images/cars/venue-nline/forward-collision-avoidance-assist-car-fca-car.jpg",
  safety_fca_ped: "/images/cars/venue-nline/forward-collision-avoidance-assist-pedestrian-FCA-Ped.jpg",
  safety_fca_cycle: "/images/cars/venue-nline/forward-collision-avoidance-assist-cycle.jpg",
  safety_fca_junction: "/images/cars/venue-nline/forward-collision-avoidance-assist-junction-turning.jpg",
  safety_bscw: "/images/cars/venue-nline/blind-spot-collision-warning.jpg",
  safety_ldw: "/images/cars/venue-nline/lane-departure-warning.jpg",
  safety_pca_rear: "/images/cars/venue-nline/parking-collision-avoidance-assist-rear.jpg",
  safety_hba: "/images/cars/venue-nline/high-beam-assist.jpg",
  safety_lvda: "/images/cars/venue-nline/leading-vehicle-departure-alert.jpg",
  conv_big: "/images/cars/venue-nline/venuenlinebigimg-2.jpg",
  conv_1: "/images/cars/venue-nline/venuenlineimg-1.jpg",
  conv_2: "/images/cars/venue-nline/venuenlineimg-2.jpg",
  conv_3: "/images/cars/venue-nline/venuenlineimg-3.jpg",
  conv_4: "/images/cars/venue-nline/venuenlineimg-4.jpg",
  conv_5: "/images/cars/venue-nline/venuenlineimg-5.jpg",
  conv_6: "/images/cars/venue-nline/venuenlineimg-6.jpg",
  conv_zm1: "/images/cars/venue-nline/venuenlineimgzm-1.jpg",
  conv_zm2: "/images/cars/venue-nline/venuenlineimgzm-2.jpg",
  conv_zm3: "/images/cars/venue-nline/venuenlineimgzm-3.jpg",
  conv_zm4: "/images/cars/venue-nline/venuenlineimgzm-4.jpg",
  conv_zm5: "/images/cars/venue-nline/venuenlineimgzm-5.jpg",
  conv_zm6: "/images/cars/venue-nline/venuenlineimgzm-6.jpg",
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
      <h3 className="text-base md:text-lg font-semibold text-white">{title}</h3>
      {children && <p className="text-sm/6 text-white/80 mt-2">{children}</p>}
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
  { name: "N6 1.0 Turbo MT", trans: "MT", tone: "Mono", price: "₹11.24 Lakh*" },
  { name: "N10 1.0 Turbo MT", trans: "MT", tone: "Mono", price: "₹12.45 Lakh*" },
  { name: "N10 1.0 Turbo DCT", trans: "DCT", tone: "Mono", price: "₹13.48 Lakh*" },
];

const colours = [
  { name: "Hazel Blue with Abyss Black roof", tone: "Dual tone" as const, swatch: "linear-gradient(135deg,#0B0B0C 50%, #4A90E2 50%)" },
  { name: "Dragon Red with Abyss Black roof", tone: "Dual tone" as const, swatch: "linear-gradient(135deg,#0B0B0C 50%, #C41E3A 50%)" },
  { name: "Atlas White with Abyss Black roof", tone: "Dual tone" as const, swatch: "linear-gradient(135deg,#0B0B0C 50%, #F5F6F7 50%)" },
  { name: "Hazel Blue", tone: "Mono tone" as const, swatch: "#4A90E2" },
  { name: "Dragon Red", tone: "Mono tone" as const, swatch: "#C41E3A" },
  { name: "Titan Grey", tone: "Mono tone" as const, swatch: "#8A8E93" },
  { name: "Atlas White", tone: "Mono tone" as const, swatch: "#F5F6F7" },
  { name: "Abyss Black", tone: "Mono tone" as const, swatch: "#0B0B0C" },
];

const highlights = [
  {
    title: "Venue N Line",
    text: "The Hyundai Venue N Line - Sporty performance meets bold design. Experience the thrill of driving with N Line exclusive features and dynamic styling.",
    img: IMGS.hero,
    k: "Highlights"
  },
  { title: "LED DRL", text: "Twin horn LED Daytime Running Lights for enhanced visibility and sporty appeal.", img: IMGS.highlight_led_drl, k: "Highlights" },
  { title: "Diamond Cut Alloy Wheels", text: "Premium R17 (D= 436.6 mm) diamond-cut alloy wheels with N emblem for a sporty and premium look.", img: IMGS.highlight_alloys, k: "Highlights" },
  { title: "N Line Steering Wheel", text: "N Line exclusive steering wheel with sporty design and premium finish for enhanced driving experience.", img: IMGS.highlight_steering, k: "Highlights" },
  { title: "N Line Gear Shift Knob", text: "Sporty N Line exclusive gear shift knob for a premium and dynamic feel.", img: IMGS.highlight_gear, k: "Highlights" },
  { title: "LED Sequential Turn Indicators", text: "Advanced LED sequential turn indicators for modern and dynamic signaling.", img: IMGS.highlight_turn_indicators, k: "Highlights" },
  { title: "Twin Tip Exhaust", text: "Sporty twin tip exhaust design that enhances the N Line's dynamic character.", img: IMGS.highlight_exhaust, k: "Highlights" },
  { title: "High Mounted Stop Lamp", text: "High mounted stop lamp for enhanced visibility and safety.", img: IMGS.highlight_stop_lamp, k: "Highlights" },
  { title: "Drive Mode Select", text: "Choose from Eco, Normal, and Sport modes to match your driving style and preferences.", img: IMGS.highlight_drive_mode, k: "Highlights" },
  { title: "Paddle Shifters", text: "Sporty paddle shifters for manual control and enhanced driving engagement.", img: IMGS.highlight_paddles, k: "Highlights" },
  { title: "SmartSense", text: "Advanced SmartSense safety suite with over 70 safety features including ADAS Level 2.", img: IMGS.highlight_smartsense, k: "Highlights" },
];

const exterior = [
  { title: "Quad Beam LED Headlamps", text: "Advanced quad beam LED headlamps for superior illumination and modern design.", img: IMGS.exterior_quad_led },
  { title: "Diamond Cut Alloy Wheels", text: "Premium R17 (D= 436.6 mm) diamond-cut alloy wheels with N emblem for sporty appeal.", img: IMGS.exterior_alloys },
  { title: "High Mounted Stop Lamp", text: "High mounted stop lamp for enhanced rear visibility and safety.", img: IMGS.exterior_stop_lamp },
  { title: "LED Sequential Turn Indicators", text: "Advanced LED sequential turn indicators for modern and dynamic signaling.", img: IMGS.exterior_sequential },
  { title: "Bridge Type Roof Rails", text: "Stylish bridge-type roof rails that enhance the SUV's rugged appeal and functionality.", img: IMGS.exterior_roof_rails },
  { title: "Dark Chrome Radiator Grille", text: "N Line exclusive dark chrome radiator grille with N Line emblem for a sporty and premium look.", img: IMGS.exterior_grille },
  { title: "Bold Front Design", text: "Commanding presence with N Line exclusive front bumper with red highlights and sporty design.", img: IMGS.exterior_front },
  { title: "Muscular Side Profile", text: "Bold character lines and sporty design elements with commanding road presence.", img: IMGS.exterior_side },
  { title: "Sporty Rear Design", text: "Sleek rear design with twin tip exhaust and sporty elements.", img: IMGS.exterior_rear },
];

const interior = [
  { title: "N Line Exclusive Interior", text: "Sporty black interior with red highlights creating a dynamic and premium ambiance.", img: IMGS.interior_banner },
  { title: "N Line Steering Wheel", text: "N Line exclusive steering wheel with sporty design and premium finish for enhanced driving experience.", img: IMGS.interior_steering },
  { title: "Sporty Black Leather Seats", text: "Sporty black leatherette seats with N branding for a premium and dynamic feel.", img: IMGS.interior_seats },
  { title: "Coffee Table Centre Console", text: "Modern coffee table centre console with surrounding ambient lighting (Sunrise Red) for a contemporary feel.", img: IMGS.interior_console },
  { title: "Crash Pad with VENUE Branding", text: "Premium crash pad with VENUE branding and ambient lighting adding elegance to the cabin.", img: IMGS.interior_crashpad },
  { title: "Sporty Metal Pedals", text: "Sporty metal pedals for enhanced driving engagement and premium feel.", img: IMGS.interior_pedals },
  { title: "Spacious Cabin", text: "Comfortable and spacious cabin with ample head room for enhanced passenger comfort.", img: IMGS.interior_spacious },
];

const performance = [
  { title: "1.0 Turbo GDi Engine", text: "Powerful 1.0-litre turbo GDi petrol engine delivering spirited performance (120 PS).", img: IMGS.perf_engine },
  { title: "Performance Tuning", text: "N Line exclusive performance tuning for enhanced driving dynamics and responsiveness.", img: IMGS.perf_big },
  { title: "Drive Modes", text: "Eco, Normal, and Sport modes to adapt to your driving needs and preferences.", img: IMGS.perf_small1 },
  { title: "Dual Clutch Transmission", text: "7-speed DCT for smooth and responsive gear shifts with paddle shifters.", img: IMGS.perf_small2 },
  { title: "Paddle Shifters", text: "Sporty paddle shifters for manual control and enhanced driving engagement.", img: IMGS.perf_small3 },
];

const safety = [
  { title: "SmartSense Safety Suite", text: "Advanced SmartSense with over 70 safety features including ADAS Level 2 for comprehensive protection.", img: IMGS.safety_smartsense },
  { title: "6 Airbags Standard", text: "Comprehensive protection with 6 airbags as standard across all variants.", img: IMGS.safety_airbags },
  { title: "All Wheel Disc Brake", text: "All 4-disc brakes for superior stopping power and enhanced safety.", img: IMGS.safety_disc_brake },
  { title: "Electronic Parking Brake", text: "Electronic parking brake (EPB) with auto hold for convenience and safety.", img: IMGS.safety_epb },
  { title: "Hill Start Assist Control", text: "HAC prevents rollback on inclines for smooth getaways.", img: IMGS.safety_hac },
  { title: "Front Parking Sensors", text: "Front parking sensors for safe and easy parking in tight spaces.", img: IMGS.safety_parking_sensors },
  { title: "Forward Collision Avoidance", text: "Forward Collision Avoidance Assist for car, pedestrian, cycle, and junction turning scenarios.", img: IMGS.safety_fca_car },
  { title: "Blind Spot Collision Warning", text: "Blind Spot Collision Warning for enhanced awareness and safety.", img: IMGS.safety_bscw },
  { title: "Lane Following Assist", text: "Lane Following Assist for enhanced driving comfort and safety on highways.", img: IMGS.safety_lfa },
  { title: "Smart Cruise Control", text: "Smart Cruise Control with Stop & Go for comfortable long-distance driving.", img: IMGS.safety_scc },
  { title: "Rear Cross Traffic Collision Avoidance", text: "Rear Cross Traffic Collision Avoidance Assist for safe reversing.", img: IMGS.safety_rctca },
  { title: "Driver Attention Warning", text: "Driver Attention Warning system to alert you when attention is needed.", img: IMGS.safety_daw },
  { title: "Safe Exit Warning", text: "Safe Exit Warning to prevent accidents when opening doors.", img: IMGS.safety_sew },
  { title: "Lane Departure Warning", text: "Lane Departure Warning to keep you in your lane.", img: IMGS.safety_ldw },
  { title: "Parking Collision Avoidance", text: "Parking Collision Avoidance Assist (Rear) for safe parking maneuvers.", img: IMGS.safety_pca_rear },
  { title: "High Beam Assist", text: "High Beam Assist for optimal visibility without disturbing other drivers.", img: IMGS.safety_hba },
  { title: "Leading Vehicle Departure Alert", text: "Leading Vehicle Departure Alert to notify you when the vehicle ahead starts moving.", img: IMGS.safety_lvda },
];

const convenience = [
  { title: "Front Row Ventilated Seats", text: "Front row ventilated seats keep you cool and comfortable during long drives.", img: IMGS.conv_1 },
  { title: "Split Screen", text: "Multi-tasking made easy with split screen functionality on the infotainment system.", img: IMGS.conv_2 },
  { title: "Split Screen", text: "Multi-tasking made easy with split screen functionality on the infotainment system.", img: IMGS.conv_3 },
  { title: "Bose Premium Sound 8 Speaker System", text: "Immersive 8-speaker Bose premium sound system for an exceptional audio experience.", img: IMGS.conv_4 },
  { title: "Wireless Charger", text: "Convenient wireless charging pad for compatible smartphones, keeping you powered on the go.", img: IMGS.conv_5 },
  { title: "Wireless Android Auto and Apple CarPlay", text: "Seamlessly connect your smartphone wirelessly for music, navigation, and calls without any cables.", img: IMGS.conv_6 },
  { title: "31.24 cm (12.3\") ccNC Navigation System", text: "The ccNC (Connected Car Navigation Cockpit) transforms this SUV into a seamlessly connected driving experience, putting smart convenience and control at your fingertips.", img: IMGS.conv_zm1 },
  { title: "31.24 cm (12.3\") Full Digital Display Cluster", text: "Advanced full digital display cluster providing comprehensive vehicle information and navigation at a glance.", img: IMGS.conv_zm2 },
  { title: "Wireless Android Auto and Apple CarPlay", text: "Seamlessly connect your smartphone wirelessly for music, navigation, and calls without any cables.", img: IMGS.conv_zm3 },
  { title: "Tyre Pressure Monitoring System (TPMS) – Highline", text: "Monitor your tyre pressure in real-time with the highline TPMS for optimal safety and fuel efficiency.", img: IMGS.conv_zm4 },
  { title: "Split Screen", text: "Multi-tasking made easy with split screen functionality on the infotainment system.", img: IMGS.conv_zm5 },
  { title: "Turn by Turn Navigation", text: "Advanced turn-by-turn navigation system for accurate and hassle-free route guidance.", img: IMGS.conv_zm6 },
  { title: "The Future is Curved Your Way", text: "The ccNC (Connected Car Navigation Cockpit) on board transforms this SUV into a seamlessly connected driving experience, putting smart convenience and control at your fingertips.", img: IMGS.conv_big },
];

const specs = [
  { k: "Category", v: "SUV" },
  { k: "Seating Capacity", v: "5" },
  { k: "Engine", v: "Kappa 1.0L Turbo GDi Petrol" },
  { k: "Displacement", v: "998 cc" },
  { k: "Max Power", v: "88.3 kW (120 PS) @ 6000 r/min" },
  { k: "Max Torque", v: "172 Nm @ 1500-4000 r/min" },
  { k: "Transmission", v: "6-Speed MT / 7-Speed DCT" },
  { k: "Suspension Front", v: "McPherson strut with coil spring" },
  { k: "Suspension Rear", v: "Coupled torsion beam axle with coil spring" },
  { k: "Brake Front", v: "Disc" },
  { k: "Brake Rear", v: "Disc" },
  { k: "Fuel Type", v: "Petrol" },
  { k: "Fuel Tank Capacity", v: "45 L" },
  { k: "Dimensions (L×W×H)", v: "3995 × 1800 × 1665 mm" },
  { k: "Wheelbase", v: "2520 mm" },
  { k: "Drive Modes", v: "Eco, Normal, Sport" },
  { k: "Wheel Size", v: "R17 (D= 436.6 mm)" },
];

const featureMatrix = [
  { feature: "Quad Beam LED Headlamps", n6: "S", n10: "S" },
  { feature: "Twin Horn LED DRL", n6: "S", n10: "S" },
  { feature: "Dark Chrome Radiator Grille with N Line Emblem", n6: "S", n10: "S" },
  { feature: "N Line Exclusive Bumper with Red Highlights", n6: "S", n10: "S" },
  { feature: "R17 Diamond Cut Alloy Wheels with N Emblem", n6: "S", n10: "S" },
  { feature: "LED Sequential Turn Indicators", n6: "S", n10: "S" },
  { feature: "Twin Tip Exhaust", n6: "S", n10: "S" },
  { feature: "High Mounted Stop Lamp", n6: "S", n10: "S" },
  { feature: "Bridge Type Roof Rails", n6: "S", n10: "S" },
  { feature: "N Line Exclusive Steering Wheel", n6: "S", n10: "S" },
  { feature: "N Line Gear Shift Knob", n6: "S", n10: "S" },
  { feature: "Sporty Black Leatherette Seats with N Branding", n6: "S", n10: "S" },
  { feature: "Sporty Metal Pedals", n6: "S", n10: "S" },
  { feature: "Coffee Table Centre Console", n6: "S", n10: "S" },
  { feature: "Ambient Lighting (Sunrise Red)", n6: "S", n10: "S" },
  { feature: "Crash Pad with VENUE Branding", n6: "S", n10: "S" },
  { feature: "Drive Modes (Eco/Normal/Sport)", n6: "S", n10: "S" },
  { feature: "Paddle Shifters (DCT only)", n6: "-", n10: "S" },
  { feature: "Touchscreen Infotainment", n6: "S", n10: "S" },
  { feature: "Bluelink Connected Car", n6: "S", n10: "S" },
  { feature: "Wireless Android Auto/Apple CarPlay", n6: "S", n10: "S" },
  { feature: "Wireless Charging", n6: "S", n10: "S" },
  { feature: "6 Airbags", n6: "S", n10: "S" },
  { feature: "All Wheel Disc Brake", n6: "S", n10: "S" },
  { feature: "Electronic Parking Brake with Auto Hold", n6: "S", n10: "S" },
  { feature: "Hill Start Assist Control", n6: "S", n10: "S" },
  { feature: "SmartSense (ADAS Level 2)", n6: "-", n10: "S" },
  { feature: "Front Parking Sensors", n6: "-", n10: "S" },
  { feature: "Surround View Monitor", n6: "-", n10: "S" },
];

const NavLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a href={href} className="px-3 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-[#0057B8]/20 text-white text-sm whitespace-nowrap backdrop-blur-sm">
    {label}
  </a>
);

export default function VenueNLinePage() {
  const [manifest, setManifest] = React.useState<null | { categories: Record<string, { src: string; title?: string }[]> }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const CAPTION_MAP: Record<string, string> = {
    // This will be populated when images are provided
  };

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/images/cars/venue-nline/manifest.json', { cache: 'no-store' });
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
              Hyundai <span className="text-[#00A9E0]">VENUE N LINE.</span>
            </motion.h1>
            <div className="text-xl md:text-2xl font-medium text-white/95 drop-shadow-md">
              Tech up. Go beyond.
            </div>
          </motion.div>
          <motion.p {...fadeUp} className="max-w-3xl text-white/90 mt-5 md:text-lg drop-shadow-md">
            The Venue N Line combines sporty design, powerful performance, and advanced technology to deliver an exhilarating driving experience.
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
            Venue N Line — Sporty Performance Redefined
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            The Hyundai Venue N Line is your perfect companion for every adventure. With its sporty design, N Line exclusive features, and powerful turbo engine, it's built to deliver an exhilarating driving experience.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              Venue N Line is designed for driving enthusiasts.
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              Experience the perfect blend of sporty design, powerful performance, and advanced technology.
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
            Venue N Line Exterior: Sporty & Dynamic
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            The Venue N Line commands attention with its N Line exclusive design elements, quad beam LED headlamps, and sporty styling. Every detail is crafted for performance and style.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              Experience the Venue N Line exterior with sporty and dynamic design.
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              Explore stunning N Line exclusive features that redefine compact SUV aesthetics!
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
            Venue N Line Interior: Sporty & Premium
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            Step inside the Venue N Line and experience sporty black interior with red highlights, N Line exclusive steering wheel, and premium features that make every journey exhilarating.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              Explore Venue N Line interior images and experience sporty comfort like never before
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              —where sporty design meets advanced technology!
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
            Venue N Line Performance: Power & Thrill
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            Powered by the 1.0-litre turbo GDi engine, the Venue N Line delivers spirited performance with 120 PS. Choose from 6-speed MT or 7-speed DCT with paddle shifters for complete control.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              The Venue N Line offers powerful performance with sporty tuning.
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              With drive modes and responsive transmission, experience the thrill of driving.
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
            Venue N Line Safety: Always Protected
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            Packed with Hyundai's most advanced safety systems, the Venue N Line features SmartSense with ADAS Level 2, 6 airbags, all-wheel disc brakes, and over 70 safety features.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              The Venue N Line Safety Features ensure ultimate protection with SmartSense and comprehensive safety systems.
            </p>
            <p className="text-base text-white/95 mt-2 drop-shadow-sm">
              Drive confidently with the Venue N Line Safety Features, designed for your peace of mind.
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Venue N Line Convenience: Stay Connected
          </h3>
          <p className="text-lg text-white/90 mb-4 drop-shadow-md">
            Stay connected and in control with Hyundai Bluelink, advanced infotainment, wireless charging, and smart connectivity features. The Venue N Line keeps you connected to what matters most.
          </p>
          <div className="bg-[#0057B8]/30 backdrop-blur-md rounded-lg p-6 border border-[#0057B8]/50 shadow-lg shadow-[#0057B8]/30">
            <p className="text-xl font-semibold text-white drop-shadow-md">
              The Venue N Line convenience features redefine every drive with smart connectivity and advanced technology.
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
            <img src={IMGS.perf_big} alt="Venue N Line Performance" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </Section>

      <Section id="features" title="Features by Trim" icon={<ListChecks className="w-5 h-5" />}>
        <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg shadow-black/20">
          <table className="min-w-[720px] w-full text-sm">
            <thead className="bg-[#0057B8]/30 backdrop-blur-md">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold text-white">Feature</th>
                <th className="px-4 py-3 font-semibold text-center text-white">N6</th>
                <th className="px-4 py-3 font-semibold text-center text-white">N10</th>
              </tr>
            </thead>
            <tbody>
              {featureMatrix.map((r, i) => (
                <tr key={i} className="border-t border-white/20">
                  <td className="px-4 py-3 text-white">{r.feature}</td>
                  <td className="px-4 py-3 text-center font-medium text-white/90">{r.n6}</td>
                  <td className="px-4 py-3 text-center font-medium text-white/90">{r.n10}</td>
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
          <img src={IMGS.hero} alt="Venue N Line hero" className="h-[60vh] w-full object-cover object-center" loading="lazy" width="1200" height="600"/>
        </div>
      </div>

      {/* All images slow slider */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="relative">
            <div className="flex gap-4 animate-scroll-slow">
              {allImages.map((src, i) => (
                <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                  <img src={src} alt={`Venue N Line ${i + 1}`} className="h-full w-full object-cover" loading="lazy" width="288" height="176"/>
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
            <li>Hyundai India — Venue N Line pages: Highlights, Exterior, Interior, Performance, Safety, Convenience, Specification, Features.</li>
            <li>Editorial/press imagery where noted; replace with official assets for production use.</li>
          </ul>
        </div>
      </footer>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a 
          href="/test-drive"
          className="flex items-center gap-2 rounded-full bg-[#0057B8] hover:bg-[#00458A] text-white px-6 py-3 shadow-lg shadow-[#0057B8]/40 font-medium text-base min-h-[44px]"
          aria-label="Book test drive for Venue N Line"
        >
          <TestTube className="h-5 w-5" />
          Test Drive
        </a>
        <a 
          href="tel:+917733888999"
          className="flex items-center gap-2 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 px-6 py-3 shadow-lg font-medium text-base backdrop-blur-sm min-h-[44px]"
          aria-label="Call us about Venue N Line"
        >
          <Phone className="h-5 w-5" />
          Call Now
        </a>
      </div>
    </main>
  );
}


"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Phone, TestTube, ChevronRight, Activity } from "lucide-react"
import { motion } from "framer-motion"

// Verna Variants & Pricing Data
const VERNA_PRICING: Array<{ variant: string; powertrain: string; price: string }> = [
  { variant: 'EX', powertrain: '1.5L MPi Petrol 6MT', price: '₹ 10.69 Lakh*' },
  { variant: 'S', powertrain: '1.5L MPi Petrol 6MT', price: '₹ 11.99 Lakh*' },
  { variant: 'S', powertrain: '1.5L MPi Petrol CVT', price: '₹ 12.99 Lakh*' },
  { variant: 'S', powertrain: '1.5L Turbo Petrol 6MT', price: '₹ 13.49 Lakh*' },
  { variant: 'S', powertrain: '1.5L Turbo Petrol 7DCT', price: '₹ 14.99 Lakh*' },
  { variant: 'SX', powertrain: '1.5L MPi Petrol 6MT', price: '₹ 13.49 Lakh*' },
  { variant: 'SX', powertrain: '1.5L MPi Petrol CVT', price: '₹ 14.49 Lakh*' },
  { variant: 'SX', powertrain: '1.5L Turbo Petrol 6MT', price: '₹ 14.99 Lakh*' },
  { variant: 'SX', powertrain: '1.5L Turbo Petrol 7DCT', price: '₹ 16.49 Lakh*' },
  { variant: 'SX', powertrain: '1.5L Diesel 6MT', price: '₹ 15.49 Lakh*' },
  { variant: 'SX', powertrain: '1.5L Diesel 6AT', price: '₹ 16.99 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.5L MPi Petrol 6MT', price: '₹ 14.49 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.5L MPi Petrol CVT', price: '₹ 15.49 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.5L Turbo Petrol 6MT', price: '₹ 15.99 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.5L Turbo Petrol 7DCT', price: '₹ 17.49 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.5L Diesel 6MT', price: '₹ 16.49 Lakh*' },
  { variant: 'SX(O)', powertrain: '1.5L Diesel 6AT', price: '₹ 17.99 Lakh*' },
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

  const groupedPricing = VERNA_PRICING.reduce((acc, item) => {
    if (!acc[item.variant]) {
      acc[item.variant] = [];
    }
    acc[item.variant].push(item);
    return acc;
  }, {} as Record<string, typeof VERNA_PRICING>);

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
                    <div className="text-xl font-bold text-red-500">{item.price}</div>
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

export default function VernaPage() {
  const VernaVideoSrc = "/assets1/The all-new Hyundai VERNA _ Futuristic. Ferocious. _ TVC.mp4"
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const handleLoadedMetadata = () => {
    const v = videoRef.current
    if (!v) return
    try {
      v.currentTime = 9
    } catch {}
    v.play?.().catch(() => {})
  }
  const handleEnded = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 9
    v.play?.().catch(() => {})
  }

  // Control video to skip last 2 seconds
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 2) {
        // Skip last 2 seconds by looping back to 9 seconds
        video.currentTime = 9
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const galleryImages: string[] = [
    // Hero
    "/images/cars/verna/highlights/verna-highlights-sporty.jpg",
    // Technology section
    "/images/cars/verna/e59a4fea-4dcf-e02b-1911-8bd6bacac8d1.jpg",
    "/images/cars/verna/ffd15bbb-a690-cb83-0bab-84780c1a2782.jpg",
    "/images/cars/verna/d309955f-5e4f-ce0b-0beb-adf3cb6b2634.jpg",
    "/images/cars/verna/756cbaaa-49b4-3609-9e15-6a2667110740.jpg",
    "/images/cars/verna/00844535-0967-cdd2-c033-93caf9f38a36.jpg",
    "/images/cars/verna/ledtaillamp_verna.jpg",
    // SmartSense ADAS section
    "/images/cars/verna/ADAS-lane-departure-warning.jpg",
    "/images/cars/verna/ADAS-FCA-JT.jpg",
    "/images/cars/verna/ADAS-forward-collision-warning-car.jpg",
    "/images/cars/verna/ADAS-FCA-Cyl.jpg",
    "/images/cars/verna/ADAS-FCA-Ped.jpg",
    "/images/cars/verna/ADAS-high-beam-assist.jpg",
    "/images/cars/verna/ADAS-lane-following-assist.jpg",
    "/images/cars/verna/ADAS-lane-keeping-assist.jpg",
    "/images/cars/verna/ADAS-safe-exit-warning.jpg",
    "/images/cars/verna/exterior/ADAS-RCCW.jpg",
    // Exterior section
    "/images/cars/verna/exterior/verna_ext_front.jpg",
    "/images/cars/verna/exterior/ex_2_1120x600_1.jpg",
    "/images/cars/verna/led-trail.jpg",
    "/images/cars/verna/exterior/exterior-vernaimage1.jpg",
    "/images/cars/verna/exterior/deadside_verna.jpg",
    "/images/cars/verna/ex_2_1120x600_5.jpg",
    "/images/cars/verna/exterior/ex_2_1120x600_6.jpg",
    "/images/cars/verna/ex_2_1120x600_7.jpg",
    "/images/cars/verna/exterior/vernarearside.jpg",
    "/images/cars/verna/exterior/ex_2_1120x600_9.jpg",
    "/images/cars/verna/taillampverna.jpg",
    // Interior section
    "/images/cars/verna/interior/verna_int_1.jpg",
    "/images/cars/verna/interior/800x530_2.jpg",
    "/images/cars/verna/vernasmallventipc.jpg",
    "/images/cars/verna/interior/vernasmallimage1.jpg",
    "/images/cars/verna/interior/interior-small-image-new-3.jpg",
    "/images/cars/verna/800x530_1.jpg",
    "/images/cars/verna/interior/vernainterior-small-image2.jpg",
    "/images/cars/verna/interior/800x530_5.jpg",
    "/images/cars/verna/interior/1120x600_1.jpg",
    "/images/cars/verna/verna_1120x600_2.jpg",
    // Performance section
    "/images/cars/verna/performance/per_Turbogdiengineverna1.jpg",
    "/images/cars/verna/performance/per_MPiengine.jpg",
    "/images/cars/verna/performance/performance_512x340_05.jpg",
    "/images/cars/verna/performance/performance_512x340_03.jpg",
    "/images/cars/verna/performance/performance_512x340_04.jpg",
    // Safety section
    "/images/cars/verna/safety/vernaairbags.jpg",
    "/images/cars/verna/vernaElectronicStabilityControl.jpg",
    "/images/cars/verna/vernaparkingassist.jpg",
    "/images/cars/verna/vernahsac.jpg",
    "/images/cars/verna/safety/safety_512x340_05.jpg",
    "/images/cars/verna/safety/safety_512x340_06.jpg",
    "/images/cars/verna/safety/safety_512x340_04.jpg",
    "/images/cars/verna/emergencystopverna.jpg",
    // Convenience section
    "/images/cars/verna/convenience/conv_1_1120x600.jpg",
    "/images/cars/verna/interior/ventilaterverna.jpg",
    "/images/cars/verna/Smarttrunkverna.jpg",
    "/images/cars/verna/touchscreenverna.jpg",
    "/images/cars/verna/Hometocar.jpg",
    "/images/cars/verna/vernawirelesscharger.jpg",
    "/images/cars/verna/convenience/conv_2_512x340_4.jpg",
    "/images/cars/verna/convenience/vernaconv_2.jpg",
    "/images/cars/verna/conv_2_512x340_3.jpg",
    // Space & Comfort section
    "/images/cars/verna/exterior/6e80e029-90c9-5136-82ab-64e96abca50d.jpg",
  ]

  const [images, setImages] = useState<string[]>(galleryImages)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/images/cars/verna/manifest.json', { cache: 'no-store' })
        if (!res.ok) return
        const m = await res.json()
        const cats = m?.categories || {}
        const list: string[] = []
        Object.keys(cats).forEach((k) => {
          const arr = Array.isArray(cats[k]) ? cats[k] : []
          arr.forEach((it: any) => list.push(it.src))
        })
        if (list.length) setImages(list)
      } catch {}
    }
    load()
  }, [])
  return (
    <div className="min-h-screen bg-transparent text-neutral-100 antialiased">
      {/* Sticky Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
        src={VernaVideoSrc}
      />
      {/* Header + Section Tabs (Tucson-style) */}
      <header className="relative">
        <div className="fixed top-0 left-0 right-0 z-40 border-b border-white/30 bg-gradient-to-b from-black/20 via-black/15 to-black/20 supports-[backdrop-filter]:bg-black/10 backdrop-blur-3xl shadow-2xl shadow-black/40 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/15 before:via-white/5 before:to-transparent before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:via-transparent after:to-transparent after:pointer-events-none">
          <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-semibold tracking-wide text-white">VERNA</a>
            <div className="hidden md:flex gap-2">
              <Button size="sm" className="bg-red-600 hover:bg-red-500 text-white">
                <TestTube className="h-4 w-4 mr-2" /> Test Drive
              </Button>
            </div>
          </div>
          <nav className="max-w-7xl mx-auto px-4 overflow-x-auto flex gap-2 py-2 no-scrollbar">
            {[
              { id: 'tech', label: 'Technology' },
              { id: 'smartsense', label: 'SmartSense' },
              { id: 'exterior', label: 'Exterior' },
              { id: 'interior', label: 'Interior' },
              { id: 'performance', label: 'Performance' },
              { id: 'safety', label: 'Safety' },
              { id: 'convenience', label: 'Convenience' },
              { id: 'space', label: 'Space' },
              { id: 'pricing', label: 'Pricing' },
            ].map(t => (
              <a key={t.id} href={`#${t.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border text-white/80 hover:text-white border-white/20 hover:bg-white/10">
                <span>{t.label}</span>
              </a>
            ))}
          </nav>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </div>
        <div className="h-[60px]"></div>
      </header>

      {/* Hero (Tucson-style) */}
      <section className="relative overflow-hidden">
        <div className="relative aspect-[21/9]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.6),rgba(0,0,0,.15)_60%,transparent)]" />
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white max-w-2xl">
            <div>
              <div className="text-xs uppercase tracking-widest mb-3 opacity-90">Futuristic & Ferocious</div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Hyundai VERNA</h1>
              <p className="mt-3 text-base md:text-lg text-white/90">A chiselled, aerodynamic silhouette with a tech‑rich, premium cabin.</p>
              {/* Pickup lines */}
              <ul className="mt-3 space-y-1 text-white/90 text-sm md:text-base">
                <li>— Styled to turn every drive into a head‑turner.</li>
                <li>— Makes hearts race before the engine does.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 inline-flex">
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-white/15 bg-white/10">Sedan</span>
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-white/15 bg-white/10">Turbo GDi</span>
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-white/15 bg-white/10">SmartSense ADAS</span>
              </div>
              <div className="mt-6 flex gap-2">
                <a href="#tech" className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-red-600/30">Explore</a>
                <a href="#space" className="inline-flex items-center gap-2 rounded-2xl border px-5 py-2 text-sm font-medium bg-white/10 backdrop-blur">Space</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="tech" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
            <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">
              <Activity className="w-5 h-5" />
          </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Experience Advanced Technology</h2>
          </div>
          <div className="mb-8 text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              The Hyundai VERNA.
            </h3>
              <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Futuristic. Ferocious.
            </h3>
              <p className="text-lg text-red-800 dark:text-red-200 mb-4">
              Hyundai VERNA has mesmerising mystical magnetism and sensuous sportiness in its futuristic design that is truly tantalising. Complimented with a chiselled aerodynamic frame that gives it a furiously fast look. It can best be described in two words.
            </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/e59a4fea-4dcf-e02b-1911-8bd6bacac8d1.jpg" 
                  alt="Horizon LED positioning lamps and DRLs" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Horizon LED positioning Lamps & DRLs</h3>
                <p className="text-white/70 text-sm mt-1">
                  A bold, ultramodern light bar running across the width for unmistakable road presence.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ffd15bbb-a690-cb83-0bab-84780c1a2782.jpg" 
                  alt="26.03 cm AVN and Digital Cluster" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">26.03 cm (10.25") AVN + Digital Cluster</h3>
                <p className="text-white/70 text-sm mt-1">
                  Seamlessly integrated for an immersive cockpit and intuitive navigation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/d309955f-5e4f-ce0b-0beb-adf3cb6b2634.jpg" 
                  alt="Bose Premium Sound 8 Speaker system" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Bose Premium Sound — 8 Speakers</h3>
                <p className="text-white/70 text-sm mt-1">
                  Best‑in‑segment acoustic experience tuned for a rich, balanced soundstage.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/756cbaaa-49b4-3609-9e15-6a2667110740.jpg" 
                  alt="Ambient sounds of nature on the infotainment" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Ambient Sounds of Nature</h3>
                <p className="text-white/70 text-sm mt-1">
                  Curated soundscapes to relax and focus on every drive.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/00844535-0967-cdd2-c033-93caf9f38a36.jpg" 
                  alt="Switchable type infotainment and climate controller" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Switchable Infotainment & Climate Controller</h3>
                <p className="text-white/70 text-sm mt-1">
                  A sleek interface that smartly toggles between media and HVAC controls.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ledtaillamp_verna.jpg" 
                  alt="Parametric Connected LED tail lamps" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Parametric Connected LED Tail Lamps</h3>
                <p className="text-white/70 text-sm mt-1">
                  A dazzling rear signature that completes the hi‑tech design.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SmartSense ADAS */}
      <section id="smartsense" className="py-14 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
            <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Hyundai SmartSense — Level 2 ADAS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ADAS-lane-departure-warning.jpg" 
                  alt="LDW Lane Departure Warning" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">LDW</h3>
                <p className="text-white/70 text-sm mt-1">
                  Lane Departure Warning
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ADAS-FCA-JT.jpg" 
                  alt="FCA JT Forward Collision Avoidance Assist Junction Turning" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">FCA‑JT</h3>
                <p className="text-white/70 text-sm mt-1">
                  Forward Collision‑Avoidance Assist — Junction Turning
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ADAS-forward-collision-warning-car.jpg" 
                  alt="FCA Car and FCW Forward Collision Avoidance Car and Forward Collision Warning" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">FCA‑Car & FCW</h3>
                <p className="text-white/70 text-sm mt-1">
                  Forward Collision‑Avoidance Assist (Car) & Forward Collision Warning
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ADAS-FCA-Cyl.jpg" 
                  alt="FCA Cyl Forward Collision Avoidance Assist Cycle" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">FCA‑Cyl</h3>
                <p className="text-white/70 text-sm mt-1">
                  Forward Collision‑Avoidance Assist — Cycle
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ADAS-FCA-Ped.jpg" 
                  alt="FCA Ped Forward Collision Avoidance Assist Pedestrian" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">FCA‑Ped</h3>
                <p className="text-white/70 text-sm mt-1">
                  Forward Collision‑Avoidance Assist — Pedestrian
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ADAS-high-beam-assist.jpg" 
                  alt="HBA High Beam Assist" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">HBA</h3>
                <p className="text-white/70 text-sm mt-1">
                  High Beam Assist
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ADAS-lane-following-assist.jpg" 
                  alt="LFA Lane Following Assist" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">LFA</h3>
                <p className="text-white/70 text-sm mt-1">
                  Lane Following Assist
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ADAS-lane-keeping-assist.jpg" 
                  alt="LKA Lane Keeping Assist" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">LKA</h3>
                <p className="text-white/70 text-sm mt-1">
                  Lane Keeping Assist
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ADAS-safe-exit-warning.jpg" 
                  alt="SEW Safe Exit Warning" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">SEW</h3>
                <p className="text-white/70 text-sm mt-1">
                  Safe Exit Warning
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/exterior/ADAS-RCCW.jpg" 
                  alt="RCCA and RCCW Rear Cross Traffic Collision Avoidance Warning" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">RCCA & RCCW</h3>
                <p className="text-white/70 text-sm mt-1">
                  Rear Cross‑Traffic Collision‑Avoidance/Warning
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section id="performance" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
            <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Ferocious Performance</h2>
          </div>
          <div className="mb-8 text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Impeccable Performance of the Hyundai VERNA Car
            </h3>
              <p className="text-lg text-red-800 dark:text-red-200 mb-4">
              The 1.5 l Turbo under the hood is a finely tuned beast waiting to be unleashed at the push of a pedal. The responsiveness and the aerodynamic styling combine to deliver a truly thrilling drive. The Hyundai VERNA not only looks fast, it drives even faster.
            </p>
          </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/performance/per_Turbogdiengineverna1.jpg" 
                  alt="Turbo GDi Engine" 
                  className="rounded-xl mb-4 aspect-video object-cover"
                />
                <h3 className="font-semibold">Turbo GDi Engine</h3>
                <p className="text-white/70 text-sm mt-1">
                  High-performance turbocharged engine
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/performance/per_MPiengine.jpg" 
                  alt="MPi Engine" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">MPi Engine</h3>
                <p className="text-white/70 text-sm mt-1">
                  Efficient multi-point injection engine
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/performance/performance_512x340_05.jpg" 
                  alt="Performance Feature" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Performance Feature</h3>
                <p className="text-white/70 text-sm mt-1">
                  Advanced performance technology
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/performance/performance_512x340_03.jpg" 
                  alt="Engine Technology" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Engine Technology</h3>
                <p className="text-white/70 text-sm mt-1">
                  Cutting-edge engine technology
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/performance/performance_512x340_04.jpg" 
                  alt="Powertrain" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Powertrain</h3>
                <p className="text-white/70 text-sm mt-1">
                  Optimized powertrain system
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="py-14 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
            <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Safety Features</h2>
          </div>
          <div className="mb-8 text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Hyundai VERNA Car : Safety at Its Core
            </h3>
              <p className="text-lg text-red-800 dark:text-red-200 mb-4">
              The Hyundai VERNA packs in more than futuristic looks and power. With 65+ advanced safety features including 30 standard safety features, rest assured as you'll be safely transported in the lap of luxury.
            </p>
          </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/safety/vernaairbags.jpg" 
                  alt="Airbags" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Airbags</h3>
                  <p className="text-white/70 text-sm mt-1">
                  Multiple airbag protection system
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/vernaElectronicStabilityControl.jpg" 
                  alt="Electronic Stability Control" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Electronic Stability Control</h3>
                <p className="text-white/70 text-sm mt-1">
                  Advanced stability control system
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/vernaparkingassist.jpg" 
                  alt="Parking Assist" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Parking Assist</h3>
                <p className="text-white/70 text-sm mt-1">
                  Intelligent parking assistance system
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/vernahsac.jpg" 
                  alt="Hill Start Assist Control" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Hill Start Assist Control</h3>
                <p className="text-white/70 text-sm mt-1">
                  Prevents rollback on inclines
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/safety/safety_512x340_05.jpg" 
                  alt="Safety System" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Safety System</h3>
                <p className="text-white/70 text-sm mt-1">
                  Advanced safety technology
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/safety/safety_512x340_06.jpg" 
                  alt="Safety Feature" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Safety Feature</h3>
                <p className="text-white/70 text-sm mt-1">
                  Comprehensive safety features
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/safety/safety_512x340_04.jpg" 
                  alt="Safety Technology" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Safety Technology</h3>
                <p className="text-white/70 text-sm mt-1">
                  Latest safety innovations
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/emergencystopverna.jpg" 
                  alt="Emergency Stop" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Emergency Stop</h3>
                <p className="text-white/70 text-sm mt-1">
                  Emergency braking system
                </p>
              </CardContent>
            </Card>
                </div>
        </div>
      </section>

      {/* Convenience */}
      <section id="convenience" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
            <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Convenience Features</h2>
          </div>
          <div className="mb-8 text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Hyundai VERNA Car Convenience: At the Edge of Tech Connectivity
            </h3>
              <p className="text-lg text-red-800 dark:text-red-200 mb-4">
              The Hyundai VERNA roars to life with our voice using Home to car with Alexa . Once you step inside, everything is ergonomically arranged to provide a haven of tranquillity and order with an advanced seamlessly integrated 26.03 cm (10.25") HD audio video navigation system & digital cluster with color TFT MID. Add switchable type infotainment & climate controller and 65+ Bluelink connected features to that, and you get a sedan that is designed for an efficient drive.
            </p>
          </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/convenience/conv_1_1120x600.jpg" 
                  alt="Convenience Feature" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Convenience Feature</h3>
                <p className="text-white/70 text-sm mt-1">
                  Advanced convenience technology
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/interior/ventilaterverna.jpg" 
                  alt="Ventilated Seats" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Ventilated Seats</h3>
                  <p className="text-white/70 text-sm mt-1">
                  Climate-controlled seating comfort
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/Smarttrunkverna.jpg" 
                  alt="Smart Trunk" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Smart Trunk</h3>
                <p className="text-white/70 text-sm mt-1">
                  Hands-free trunk opening
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/touchscreenverna.jpg" 
                  alt="Touchscreen Display" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Touchscreen Display</h3>
                <p className="text-white/70 text-sm mt-1">
                  Large touchscreen infotainment
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/Hometocar.jpg" 
                  alt="Home to Car" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Home to Car</h3>
                <p className="text-white/70 text-sm mt-1">
                  Connected car technology
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/vernawirelesscharger.jpg" 
                  alt="Wireless Charger" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Wireless Charger</h3>
                <p className="text-white/70 text-sm mt-1">
                  Wireless phone charging
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/convenience/conv_2_512x340_4.jpg" 
                  alt="Convenience System" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Convenience System</h3>
                <p className="text-white/70 text-sm mt-1">
                  Smart convenience features
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/convenience/vernaconv_2.jpg" 
                  alt="Advanced Convenience" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Advanced Convenience</h3>
                <p className="text-white/70 text-sm mt-1">
                  Premium convenience features
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/conv_2_512x340_3.jpg" 
                  alt="Smart Features" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Smart Features</h3>
                <p className="text-white/70 text-sm mt-1">
                  Intelligent convenience systems
                </p>
              </CardContent>
            </Card>
                </div>
        </div>
      </section>

      {/* Exterior */}
      <section id="exterior" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
            <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">
              <Activity className="w-5 h-5" />
          </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Exterior Design</h2>
          </div>
          <div className="mb-8 text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Hyundai VERNA Car Exterior - Looks that Demand Your Attention
            </h3>
              <p className="text-lg text-red-800 dark:text-red-200 mb-4">
              The striking looks of the Hyundai VERNA are a true delight to the eyes. The front horizon LED positioning lamp doesn't just glow, it positively gleams. The Hyundai VERNA's fastback design gives visual expression to its exemplary aerodynamics like no other and it continues to impress till the last glance with its parametric connected LED tail lamps.
            </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/exterior/verna_ext_front.jpg" 
                  alt="Front Design" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Front Design</h3>
                <p className="text-white/70 text-sm mt-1">
                  Bold front fascia with distinctive grille and lighting
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/exterior/ex_2_1120x600_1.jpg" 
                  alt="Side Profile" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Side Profile</h3>
                <p className="text-white/70 text-sm mt-1">
                  Aerodynamic silhouette with flowing lines
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/led-trail.jpg" 
                  alt="LED Trail Lights" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">LED Trail Lights</h3>
                <p className="text-white/70 text-sm mt-1">
                  Advanced LED lighting technology
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/exterior/exterior-vernaimage1.jpg" 
                  alt="Exterior Detail" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Exterior Detail</h3>
                <p className="text-white/70 text-sm mt-1">
                  Premium exterior finishing and details
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/exterior/deadside_verna.jpg" 
                  alt="Side View" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Side View</h3>
                <p className="text-white/70 text-sm mt-1">
                  Clean side profile with modern styling
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ex_2_1120x600_5.jpg" 
                  alt="Wheel Design" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Wheel Design</h3>
                <p className="text-white/70 text-sm mt-1">
                  Stylish alloy wheels with premium finish
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/exterior/ex_2_1120x600_6.jpg" 
                  alt="Exterior Feature" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Exterior Feature</h3>
                <p className="text-white/70 text-sm mt-1">
                  Distinctive exterior design elements
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/ex_2_1120x600_7.jpg" 
                  alt="Design Detail" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Design Detail</h3>
                <p className="text-white/70 text-sm mt-1">
                  Attention to detail in exterior design
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/exterior/vernarearside.jpg" 
                  alt="Rear Side View" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Rear Side View</h3>
                <p className="text-white/70 text-sm mt-1">
                  Elegant rear side profile
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/exterior/ex_2_1120x600_9.jpg" 
                  alt="Rear Design" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Rear Design</h3>
                <p className="text-white/70 text-sm mt-1">
                  Bold rear design with LED tail lamps
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/taillampverna.jpg" 
                  alt="LED Tail Lamps" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">LED Tail Lamps</h3>
                <p className="text-white/70 text-sm mt-1">
                  Parametric connected LED tail lamps
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interior */}
      <section id="interior" className="py-14 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
            <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Interior Design</h2>
          </div>
          <div className="mb-8 text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
              Hyundai VERNA Car Interior: Make Room for More.
            </h3>
              <p className="text-lg text-red-800 dark:text-red-200 mb-4">
              The Hyundai VERNA impresses with design and comfort features rich in unconventional ideas and characterized by great attention to detail. It comes with sense of spaciousness with the best in segment wheelbase that allows for extra legroom and cabin space.
            </p>
          </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/interior/verna_int_1.jpg" 
                  alt="Dashboard Design" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Dashboard Design</h3>
                <p className="text-white/70 text-sm mt-1">
                  Modern dashboard with integrated displays
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/interior/800x530_2.jpg" 
                  alt="Interior Layout" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Interior Layout</h3>
                <p className="text-white/70 text-sm mt-1">
                  Spacious and well-organized cabin
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/vernasmallventipc.jpg" 
                  alt="Climate Control" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Climate Control</h3>
                <p className="text-white/70 text-sm mt-1">
                  Advanced climate control system
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/interior/vernasmallimage1.jpg" 
                  alt="Interior Detail" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Interior Detail</h3>
                <p className="text-white/70 text-sm mt-1">
                  Premium interior finishing
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/interior/interior-small-image-new-3.jpg" 
                  alt="Seat Design" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Seat Design</h3>
                <p className="text-white/70 text-sm mt-1">
                  Comfortable and supportive seating
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/800x530_1.jpg" 
                  alt="Cabin Space" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Cabin Space</h3>
                <p className="text-white/70 text-sm mt-1">
                  Generous cabin space and comfort
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/interior/vernainterior-small-image2.jpg" 
                  alt="Interior Feature" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Interior Feature</h3>
                <p className="text-white/70 text-sm mt-1">
                  Advanced interior features
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/interior/800x530_5.jpg" 
                  alt="Premium Interior" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Premium Interior</h3>
                <p className="text-white/70 text-sm mt-1">
                  Luxurious interior materials
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/interior/1120x600_1.jpg" 
                  alt="Interior Overview" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Interior Overview</h3>
                <p className="text-white/70 text-sm mt-1">
                  Complete interior view
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src="/images/cars/verna/verna_1120x600_2.jpg" 
                  alt="Cabin Design" 
                  className="rounded-xl mb-4 aspect-video object-cover" 
                />
                <h3 className="font-semibold">Cabin Design</h3>
                <p className="text-white/70 text-sm mt-1">
                  Modern and sophisticated cabin
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Space & Comfort */}
      <section id="space" className="py-14 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
            <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Space & Comfort</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
            <img 
              src="/images/cars/verna/exterior/6e80e029-90c9-5136-82ab-64e96abca50d.jpg" 
              alt="Premium cabin with lounge-like rear comfort" 
              className="rounded-2xl shadow-xl border border-white/10" 
            />
            <div>
              <p className="text-white/80 text-lg">
                Designed to exude a premium, luxurious appeal with superior legroom and knee room. 
                Focused on enhanced space for 2nd‑row passengers — lounge‑like comfort for every journey.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-white/5 border-white/20 text-white">
                  Premium Materials
                </Badge>
                <Badge variant="outline" className="bg-white/5 border-white/20 text-white">
                  Spacious 2nd Row
                </Badge>
                <Badge variant="outline" className="bg-white/5 border-white/20 text-white">
                  Intuitive Layout
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variants & Pricing Section */}
      <section id="pricing" className="py-14 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6 bg-gradient-to-b from-black/20 via-black/15 to-black/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-2 shadow-lg shadow-black/20">
            <div className="p-2 rounded-xl bg-black/20 text-red-600 border border-white/20">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Variants & Pricing</h2>
          </div>
          <VariantsPricingSection />
        </div>
      </section>

      {/* Front view above strip */}
      <section className="max-w-7xl mx-auto px-4 mb-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img src="/images/cars/verna/highlights/verna-highlights-sporty.jpg" alt="Verna front view" className="h-[50vh] w-full object-cover" />
          </div>
      </section>

      {/* Bottom slow-scrolling strip */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="relative">
              <div className="flex gap-4 animate-scroll-slow">
                {[...images, ...images].map((src, i) => (
                <div key={i} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                  <img src={src} alt={`Verna strip ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
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

      {/* CTA / Footer */}
      <section id="cta" className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Explore VERNA your way</h3>
            <p className="text-white/70">
              Get prices, request a test drive, download e‑brochure or try the 3D configurator.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
              <TestTube className="h-4 w-4 mr-2" />
              Request Test Drive
            </Button>
          </div>
        </div>
        <p className="text-center text-[11px] text-white/50 mt-6">
          *Specifications, features and prices are indicative and subject to change. Images are for representation only.
        </p>
      </section>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <Button 
          size="lg" 
          className="rounded-full bg-red-600 hover:bg-red-500 shadow-lg"
          asChild
        >
          <a href="/test-drive">
            <TestTube className="h-5 w-5 mr-2" />
            Test Drive
          </a>
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="rounded-full bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg"
          asChild
        >
          <a href="tel:+917733888999">
            <Phone className="h-5 w-5 mr-2" />
            Call Now
          </a>
        </Button>
      </div>
    </div>
  )
}

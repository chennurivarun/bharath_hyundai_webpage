"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

export default function CretaEVPage() {
  return (
    <div className="text-gray-200 relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-white/10 grid place-items-center text-xs font-bold">CE</div>
            <span className="text-sm text-gray-300">CRETA Electric — Exterior</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#overview" className="hover:text-white">Overview</a>
            <a href="#angles" className="hover:text-white">Angles</a>
            <a href="#highlights" className="hover:text-white">Highlights</a>
            <a href="#wheels-charging" className="hover:text-white">Wheels & Charging</a>
            <a href="#cta" className="hover:text-white">Enquire</a>
          </nav>
          <a href="#cta" className="px-3 py-2 text-sm rounded-lg bg-white text-black font-semibold">Book / Test Drive</a>
        </div>
      </header>

      {/* Hero / Overview with sticky video background */}
      <section id="overview" className="relative">
        <div className="fixed inset-0 -z-10">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/creta-ev.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border border-white/10 px-2 py-1 rounded-full text-xs text-gray-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Power pose on wheels
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Hyundai <span className="text-emerald-300">CRETA Electric</span></h1>
            <p className="text-gray-300 max-w-prose">Experience a futuristic, tech‑inspired design with pixelated graphic grille, distinctive pixelated front & rear bumpers, and a bold road presence. One look is never enough — undisputed, ultimate, now electric.</p>
            <div className="flex gap-3 flex-wrap text-sm">
              <div className="border border-white/10 px-3 py-2 rounded-xl">Pixelated graphic grille</div>
              <div className="border border-white/10 px-3 py-2 rounded-xl">Pixelated front & rear bumpers</div>
              <div className="border border-white/10 px-3 py-2 rounded-xl">AAF (Active Air Flaps)</div>
            </div>
            <div className="flex gap-3">
              <a href="#angles" className="px-4 py-2 rounded-lg bg-emerald-300/20 text-emerald-200 ring-1 ring-white/10">See Angles</a>
              <a href="#highlights" className="px-4 py-2 rounded-lg bg-white/10">View Highlights</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-white/10">
              <img alt="CRETA Electric front three-quarter" className="w-full h-full object-cover" src="/images/cars/creta-ev/creta-electric-front-1.jpg" />
            </div>
            <div className="absolute -bottom-6 right-4 bg-white/5 backdrop-blur-md rounded-xl px-4 py-3 grid gap-1">
              <div className="text-xs text-gray-400">Explore the exterior</div>
              <div className="text-xl font-bold">Undisputed. Ultimate. Now electric.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 360° viewer (removed as requested) */}

      {/* Angles gallery */}
      <section id="angles" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-12">Angles</h2>

          <AnglesOrchestrator />
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Exterior Highlights</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-36 object-cover rounded-xl" alt="Active air flaps" src="/images/cars/creta-ev/cretaevsmallpix.jpg" />
              <figcaption className="mt-3 text-sm font-semibold">Active air flaps (AAF)</figcaption>
              <p className="text-xs text-gray-400">Improves aero efficiency by regulating airflow.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-36 object-cover rounded-xl" alt="Pixelated graphic front grille" src="/images/cars/creta-ev/creta-electric-front-1.jpg" />
              <figcaption className="mt-3 text-sm font-semibold">Pixelated graphic front grille</figcaption>
              <p className="text-xs text-gray-400">Tech‑inspired signature face.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-36 object-cover rounded-xl" alt="R17 Aero alloy" src="/images/cars/creta-ev/cretaevsmall4.jpg" />
              <figcaption className="mt-3 text-sm font-semibold">R17 (D=436.6 mm) Aero alloys + LRR tyres</figcaption>
              <p className="text-xs text-gray-400">Low Rolling Resistance for efficiency.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-36 object-cover rounded-xl" alt="Charging port surround" src="/images/cars/creta-ev/cretaevsmall2.jpg" />
              <figcaption className="mt-3 text-sm font-semibold">Charging port surround light + SOC indicator</figcaption>
              <p className="text-xs text-gray-400">Multi‑colour surround shows charging state.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-36 object-cover rounded-xl" alt="Pixelated rear bumper" src="/images/cars/creta-ev/cretaevsmall3.jpg" />
              <figcaption className="mt-3 text-sm font-semibold">Pixelated graphic rear bumper</figcaption>
              <p className="text-xs text-gray-400">Distinctive tail graphic completes the look.</p>
            </figure>
          </div>
          <p className="text-xs text-gray-500 mt-3">Also shown: puddle lamps with H‑logo projection & welcome function (angle images), R17 aero alloys and LRR tyres.</p>
        </div>
      </section>

      {/* Wheels & Charging (callout) */}
      <section id="wheels-charging" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/10">
            <h3 className="text-xl font-semibold">R17 Aero Alloy Wheels + LRR Tyres</h3>
            <p className="text-sm text-gray-300 mt-2">Distinctive aero wheel design (D=436.6 mm) paired with Low Rolling Resistance tyres to enhance range and efficiency.</p>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/10">
            <h3 className="text-xl font-semibold">Charging Port with Surround</h3>
            <p className="text-sm text-gray-300 mt-2">Charging port features a multi‑colour surround light and state‑of‑charge (SOC) indicator for at‑a‑glance updates while charging.</p>
          </div>
        </div>
      </section>

      {/* Variants & Pricing */}
      <section id="variants" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Variants & Pricing</h2>
          <VariantsExplorer />
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 bg-black/40 backdrop-blur-md rounded-2xl ring-1 ring-white/10 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold">Book a Test Drive</h3>
            <p className="text-gray-300 mt-2">We’ll connect you to your nearest Hyundai dealer.</p>
          </div>
          <form className="grid gap-3 text-sm">
            <input placeholder="Full name" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
            <input placeholder="Email" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
            <input placeholder="Mobile" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
            <input placeholder="City" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
            <button type="button" className="px-4 py-2 rounded-lg bg-white text-black font-semibold">Submit</button>
            <p className="text-xs text-gray-500">By submitting, you accept the terms & conditions.</p>
          </form>
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>Images & features shown are from Hyundai India CRETA Electric exterior page. Visuals and availability may vary by variant and region. 360° viewer is hosted by Hyundai.</p>
          <p className="mt-2">© Hyundai — CRETA Electric (Redesigned showcase for demo)</p>
        </div>
      </footer>
    </div>
  )
}

function AnglesGroup({ title, images, active }: { title: string; images: string[]; active: boolean }) {
  const [index, setIndex] = useState(0)
  const [isAuto, setIsAuto] = useState(active)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const total = images.length
  const trackRef = useRef<HTMLDivElement | null>(null)

  const extended = useMemo(() => images.concat(images), [images])

  useEffect(() => {
    setIsAuto(active)
    if (!active) {
      setIndex(0)
    }
  }, [active])

  useEffect(() => {
    if (!isAuto || total <= 1) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % total)
    }, 2000)
    return () => clearInterval(id)
  }, [isAuto, total])

  const goPrev = () => {
    setIsAuto(false)
    setIndex((prev) => (prev - 1 + total) % total)
  }

  const goNext = () => {
    setIsAuto(false)
    setIndex((prev) => (prev + 1) % total)
  }

  return (
    <div className={`bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 ring-1 ring-white/10 transition-all duration-700 ${active ? 'opacity-100 scale-[1.01] shadow-[0_0_0_1px_rgba(255,255,255,0.12)]' : 'opacity-90'}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <button onClick={goPrev} className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/15">Prev</button>
          <button onClick={goNext} className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/15">Next</button>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-xl"
        onMouseEnter={() => setIsAuto(active ? false : false)}
        onMouseLeave={() => setIsAuto(active ? true : false)}
      >
        <div
          ref={trackRef}
          className={`flex gap-4 ${active ? 'transition-transform duration-900 ease-[cubic-bezier(0.22,0.61,0.36,1)]' : ''}`}
          style={{ transform: `translateX(-${index * (100 / 2)}%)` }}
        >
          {extended.map((src, i) => (
            <div key={`${src}-${i}`} className="flex-shrink-0 w-1/2">
              <img
                src={src}
                alt={`${title} view ${((i % total) + 1)}`}
                className="rounded-xl ring-1 ring-white/10 w-full h-72 md:h-80 lg:h-96 object-cover cursor-zoom-in"
                onClick={() => { setIsAuto(false); setLightboxSrc(src) }}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAuto(false); setIndex(i) }}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white/90" : "w-2.5 bg-white/40"}`}
              aria-label={`Go to ${title} image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  )
}

function AnglesOrchestrator() {
  const groups = useMemo(() => ([
    {
      title: "Front",
      images: [
        "/images/cars/creta-ev/creta-electric-front-1.jpg",
        "/images/cars/creta-ev/creta-electric-front-2.jpg",
        "/images/cars/creta-ev/creta-electric-front-3.jpg",
        "/images/cars/creta-ev/creta-electric-front-4.jpg",
      ],
    },
    {
      title: "Side",
      images: [
        "/images/cars/creta-ev/creta-electric-side1.jpg",
        "/images/cars/creta-ev/creta-electric-side2.jpg",
        "/images/cars/creta-ev/creta-electric-side3.jpg",
        "/images/cars/creta-ev/creta-electric-side4.jpg",
      ],
    },
    {
      title: "Rear",
      images: [
        "/images/cars/creta-ev/creta-electric-rear-1.jpg",
        "/images/cars/creta-ev/creta-electric-rear-2.jpg",
        "/images/cars/creta-ev/creta-electric-rear-3.jpg",
        "/images/cars/creta-ev/creta-electric-rear-4.jpg",
      ],
    },
  ]), [])

  const [activeIdx, setActiveIdx] = useState(0)

  const [fadeKey, setFadeKey] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setFadeKey((k) => k + 1)
      setActiveIdx((prev) => (prev + 1) % 3)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const active = groups[activeIdx]
  const others = groups.filter((_, i) => i !== activeIdx)

  return (
    <div className="space-y-8">
      {/* Row 1: Active group full width, smooth scale/opacity (no blink) */}
      <div className="relative">
        <div key={`${active.title}-${fadeKey}`} className="transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]">
          <AnglesGroup title={active.title} images={active.images} active={true} />
        </div>
      </div>

      {/* Row 2: Remaining two groups side by side, calm */}
      <div className="grid md:grid-cols-2 gap-8">
        {others.map((g, idx) => (
          <div key={`${g.title}-${fadeKey}-${idx}`} className="transition-opacity duration-700">
            <AnglesGroup title={g.title} images={g.images} active={false} />
          </div>
        ))}
      </div>
    </div>
  )
}

function VariantsExplorer() {
  const variants = [
    { id: 1, name: "Executive", battery: 42.0, range: 420, power: 133, price: 18.02, tags: [] },
    { id: 2, name: "Executive Tech", battery: 42.0, range: 420, power: 133, price: 19.0, tags: [] },
    { id: 3, name: "Smart", battery: 42.0, range: 390, power: 133, price: 19.0, tags: [] },
    { id: 4, name: "Smart (O)", battery: 42.0, range: 390, power: 133, price: 19.5, tags: [] },
    { id: 5, name: "Smart (O) DT", battery: 42.0, range: 390, power: 133, price: 19.65, tags: ["DT"] },
    { id: 6, name: "Executive (O)", battery: 51.4, range: 510, power: 169, price: 20.0, tags: ["LR"] },
    { id: 7, name: "Premium", battery: 42.0, range: 420, power: 133, price: 20.0, tags: [] },
    { id: 8, name: "Premium DT", battery: 42.0, range: 390, power: 133, price: 20.15, tags: ["DT"] },
    { id: 9, name: "Smart (O) HC", battery: 42.0, range: 390, power: 133, price: 20.23, tags: ["HC"] },
    { id: 10, name: "Smart (O) HC DT", battery: 42.0, range: 390, power: 133, price: 20.38, tags: ["HC","DT"] },
    { id: 11, name: "Premium HC", battery: 42.0, range: 420, power: 133, price: 20.73, tags: ["HC"] },
    { id: 12, name: "Premium HC DT", battery: 42.0, range: 390, power: 133, price: 20.88, tags: ["HC","DT"] },
    { id: 13, name: "Excellence", battery: 42.0, range: 420, power: 169, price: 21.3, tags: [] },
    { id: 14, name: "Excellence Knight", battery: 42.0, range: 420, power: 169, price: 21.45, tags: ["Knight"] },
    { id: 15, name: "Smart (O) LR", battery: 51.4, range: 510, power: 169, price: 21.53, tags: ["LR"] },
    { id: 16, name: "Smart (O) LR DT", battery: 51.4, range: 473, power: 169, price: 21.65, tags: ["LR","DT"] },
    { id: 17, name: "Excellence HC", battery: 42.0, range: 420, power: 169, price: 22.03, tags: ["HC"] },
    { id: 18, name: "Excellence HC Knight", battery: 42.0, range: 420, power: 169, price: 22.18, tags: ["HC","Knight"] },
    { id: 19, name: "Smart (O) LR HC", battery: 51.4, range: 510, power: 169, price: 22.26, tags: ["LR","HC"] },
    { id: 20, name: "Smart (O) LR HC DT", battery: 51.4, range: 473, power: 169, price: 22.38, tags: ["LR","HC","DT"] },
    { id: 21, name: "Excellence LR", battery: 51.4, range: 510, power: 169, price: 23.67, tags: ["LR"] },
    { id: 22, name: "Excellence LR Knight", battery: 51.4, range: 510, power: 169, price: 23.82, tags: ["LR","Knight"] },
    { id: 23, name: "Excellence LR DT", battery: 51.4, range: 473, power: 169, price: 23.82, tags: ["LR","DT"] },
    { id: 24, name: "Excellence LR HC", battery: 51.4, range: 510, power: 169, price: 24.40, tags: ["LR","HC"] },
    { id: 25, name: "Excellence LR HC Knight", battery: 51.4, range: 510, power: 169, price: 24.55, tags: ["LR","HC","Knight"] },
    // Skipped 26 (Top Model) to keep to 25 variants as requested
  ] as const

  const groups = React.useMemo(() => ([
    { title: '42.0 kWh — Standard Range', list: variants.filter(v=>v.battery===42.0) },
    { title: '51.4 kWh — Long Range', list: variants.filter(v=>v.battery===51.4) },
  ]), [variants])

  return (
    <div className="space-y-4">
      {groups.map((group, idx) => (
        <details key={group.title} className="rounded-2xl ring-1 ring-white/10 bg-black/20 overflow-hidden" open={idx===0}>
          <summary className="cursor-pointer select-none list-none">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="text-lg md:text-xl font-semibold">{group.title}</h3>
              <span className="text-sm text-white/70">{group.list.length} variants</span>
            </div>
          </summary>
          <ul className="space-y-2 px-4 pb-4">
            {group.list.map(v => (
              <li key={v.id} className="rounded-xl ring-1 ring-white/10 bg-black/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{v.id}. {v.name}</div>
                  <div className="font-semibold">₹{v.price.toFixed(2)} L</div>
                </div>
                <div className="mt-1 text-sm text-white/80">
                  {v.battery.toFixed(1)} kWh • {v.range} km • {v.power} bhp
                </div>
                {v.tags.length>0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {v.tags.map(t=> (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/10 text-[11px]">{t}</span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-12 right-0 px-3 py-1.5 rounded bg-white/10 text-white text-sm hover:bg-white/20"
        >
          Close
        </button>
        <div className="relative w-full h-[70vh] ring-1 ring-white/10 rounded-xl overflow-hidden bg-black/30">
          <img src={src} alt="Preview" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  )
}



"use client"

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Sparkles, ArrowUp, Link as LinkIcon } from "lucide-react";

type Item = { title: string; blurb?: string; img?: string; tag?: string };

type Section = {
  key: string;
  title: string;
  intro?: string;
  items?: Item[];
  footerNote?: string;
  cta?: { label: string; href: string }[];
};

const sections: Section[] = [
  {
    key: "highlights",
    title: "Highlights",
    intro:
      "EXTER Knight & Hy‑CNG Duo headline the range. Modern SUV stance outside, clever space and connected tech inside.",
    items: [
      { title: "Tailgate garnish", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/smallimageexter2_4.jpg" },
      { title: "Black interiors with red accents & stitching", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/800x530.jpg" },
      { title: "Gear console — Knight treatment", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/smallimageexter2_5.jpg" },
      { title: "Black door handle with satin finish", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/externewimage4.jpg" },
      {
        title: "Hy‑CNG Duo (dual cylinder)",
        blurb:
          "Dual‑cylinder CNG layout to free up boot space with a leak‑proof design, 60L (water equivalent) capacity and a fire extinguisher under the seat.",
        img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/extercngpc.jpg",
      },
      { title: "Parametric front grille", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_1.jpg" },
      { title: "Solid & wide front skid plate", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_3.jpg" },
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
      { title: "Knight — hero view", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature1.jpg" },
      { title: "6 airbags (image)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/airbagsexterwithoutsticker.jpg" },
      { title: "Red front brake calipers", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature3.jpg" },
      { title: "Knight detail — feature 4", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature4.jpg" },
      { title: "Knight detail — feature 5", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature5.jpg" },
      { title: "Knight detail — feature 5 (alt)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature5.jpg" },
      { title: "Knight detail — feature 6", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature6.jpg" }
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
      { title: "Hy‑CNG Duo — hero view", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/extercngpc.jpg" },
      { title: "Parametric front grille", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_1.jpg" },
      { title: "Sporty skid plate", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_3.jpg" },
      { title: "More legroom (rear)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big4.jpg" },
      { title: "Sporty semi‑leatherette upholstery", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big6.jpg" },
      { title: "Spacious interior", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/Interior_sunroof.jpg" },
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
      { title: "Striking looks", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_1.jpg" },
      { title: "Parametric front grille & solid skid plate", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_3.jpg" },
      { title: "Projector bi‑function headlamps", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_4.jpg" },
      { title: "Signature H‑LED DRLs & positioning lamps", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterrear_pc_1.jpg" },
      { title: "Youthful and modern stance", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterrear_3.jpg" },
      { title: "Painted black rear spoiler & roof rails", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterroof%20rails.jpg" },
      { title: "R15 (380.2 mm) diamond‑cut alloy wheels", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterrear_pc_2.jpg" },
    ],
    cta: [{ label: "Official Exterior", href: "https://www.hyundai.com/in/en/find-a-car/exter/exterior" }],
  },
  {
    key: "interior",
    title: "Interior",
    intro:
      "Youthful styling, ample space and thoughtful storage. Feature highlights include footwell lighting and smart sunroof.",
    items: [
      { title: "Footwell lighting", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/footwelllighting.jpg" },
      { title: "Voice‑enabled smart electric sunroof", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/Interior_sunroof.jpg" },
      { title: "FATC with digital display", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_Interior_small_2.jpg" },
      { title: "Sporty semi‑leatherette upholstery", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big6.jpg" },
      { title: "Premium interior themes (Cosmic Blue / Light Sage / Silver accents)*", blurb: "Theme availability may vary by trim.", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big4.jpg" },
    ],
    cta: [{ label: "Official Interior", href: "https://www.hyundai.com/in/en/find-a-car/exter/interior" }],
  },
  {
    key: "performance",
    title: "Performance",
    intro:
      "E20‑ready powertrains: 1.2L Kappa petrol (5MT or Smart Auto AMT) and 1.2L Bi‑fuel Kappa petrol with CNG (5MT).",
    items: [
      { title: "E20 fuel‑ready powertrain", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_big03.jpg" },
      { title: "1.2L Kappa Petrol — 61 kW (83 PS) @ 6,000 rpm; 113.8 Nm @ 4,000 rpm", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_big02.jpg" },
      { title: "Manual transmission (5MT)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_small1.jpg" },
      { title: "Automated Manual Transmission (AMT)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_small3.jpg" },
      { title: "Paddle shifters", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterpaddleshifters.jpg" },
    ],
    cta: [{ label: "Official Performance", href: "https://www.hyundai.com/in/en/find-a-car/exter/performance" }],
  },
  {
    key: "safety",
    title: "Safety",
    intro:
      "6 airbags standard across the range, plus 40+ advanced safety features and 26 features offered across trims.",
    items: [
      { title: "6 airbags (driver, passenger, side & curtain) — standard", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/airbagsexterwithoutsticker.jpg" },
      { title: "Electronic Stability Control (ESC)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/safety/extersafety_01.jpg" },
      { title: "Hill‑start Assist Control (HAC)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/externewconv2.jpg" },
      { title: "Vehicle Stability Management (VSM)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/externewconve2.jpg" },
      { title: "Tyre Pressure Monitoring System — Highline", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/extertpms.jpg" },
      { title: "ISOFIX", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/safety/exter_safety_small2.jpg" },
      { title: "Rear view camera with dynamic guidelines", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/safety/exter_safety_small4.jpg" },
      { title: "3‑point seatbelts & seatbelt reminder for all seats (segment‑best)", blurb: "As called out on the safety page.*", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/externewsafety.jpg" },
      { title: "IRVM with telematics switches (SOS, RSA, Bluelink)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterbluelinkcctech.jpg" },
    ],
    footerNote:
      "* Deployment of airbags and feature availability depend on multiple factors and variant. Refer to owner’s manual and official pages.",
    cta: [{ label: "Official Safety", href: "https://www.hyundai.com/in/en/find-a-car/exter/safety" }],
  },
  {
    key: "convenience",
    title: "Convenience",
    intro: "On‑board navigation, connected tech and thoughtful touches for everyday ease.",
    items: [
      { title: "Home‑to‑Car with Alexa (English & Hindi)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/externewimage4.jpg" },
      { title: "Wireless phone charger", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterphonecharger.jpg" },
      { title: "Dashcam with dual camera", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterhighlightsdual%20camera.jpg" },
      { title: "Bluelink connected car technology", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterbluelinkcctech.jpg" },
      { title: "Multi‑language UI support (12 nos.)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/extermultiUI.jpg" },
      { title: "Ambient sounds of nature (7 nos.)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterambientsoundnat.jpg" },
      { title: "Rear AC vents", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterrearac.jpg" },
      { title: "Cruise control", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/conv_exter_small1.jpg" },
    ],
    footerNote:
      "Alexa device and Bluelink functionality have regional, device and connectivity dependencies. See official disclaimers.",
    cta: [{ label: "Official Convenience", href: "https://www.hyundai.com/in/en/find-a-car/exter/convenience" }],
  },
  {
    key: "specs",
    title: "Specification",
    intro: "Explore detailed engine, dimensions, wheels and more per variant on the official spec table.",
    items: [
      { title: "Seating: 5", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterrear_pc_2.jpg" },
      { title: "Engine: 1.2L Kappa Petrol / 1.2L Bi‑fuel Kappa (Hy‑CNG)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_big02.jpg" },
      { title: "Transmissions: 5MT / Smart Auto AMT", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_small1.jpg" },
      { title: "Key categories: Performance, Dimension, Wheels (per variant)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_3.jpg" },
    ],
    cta: [
      { label: "Open Official Spec Table", href: "https://www.hyundai.com/in/en/find-a-car/exter/specification" },
      { label: "Download Brochure (PDF)", href: "https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/exter-brochure.pdf" },
    ],
  },
  {
    key: "features",
    title: "Features (Matrix)",
    intro:
      "Feature availability varies by trim (EX → SX(O) Connect Knight). Use the official matrix for exact mapping.",
    items: [
      { title: "Engine & Trim Plan: Petrol MT / Petrol AMT / Hy‑CNG Duo MT (selected trims)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_1.jpg" },
      { title: "Safety: 6 airbags standard; ESC/HAC/VSM across trims as per matrix", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/safety/extersafety_01.jpg" },
      { title: "Cameras & TPMS: Dashcam (selected), TPMS Highline", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/extertpms.jpg" },
      { title: "Convenience: Smart key, auto headlamps, defogger, cruise (trim‑wise)", img: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/conv_exter_small1.jpg" },
    ],
    cta: [{ label: "Open Features Matrix", href: "https://www.hyundai.com/in/en/find-a-car/exter/features" }],
  },
];

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

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(section.items || []).filter((item) => typeof item.img === "string" && item.img.trim().length > 0).map((item, idx) => (
                  <FeatureCard key={`${section.key}-${idx}`} item={item} />
                ))}
              </div>

              {section.footerNote && (
                <p className="text-xs text-muted-foreground mt-6">{section.footerNote}</p>
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
          Built for rapid visual QA and content parity with official Hyundai pages. Images pre‑filled from Hyundai’s CDN. You can still paste a URL on any card (✎) to swap images instantly.
        </div>
      </footer>
    </div>
  );
}



"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Phone, TestTube } from "lucide-react"
import { BatteryAnimationWithControls } from "@/components/battery-animation"

export default function Ioniq5Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Control video to skip last 3 seconds
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 3) {
        // Skip last 3 seconds by looping back to start
        video.currentTime = 0;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="text-gray-200 relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-gradient-to-b from-black/30 via-black/20 to-black/30 backdrop-blur-2xl shadow-xl shadow-black/30 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:via-transparent before:to-transparent before:pointer-events-none">
        <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-white/10 grid place-items-center text-xs font-bold">I5</div>
            <span className="text-sm text-gray-300">IONIQ 5 — Exterior</span>
          </div>
          <nav className="hidden md:flex items-center gap-3 text-sm text-gray-300 overflow-x-auto">
            <a href="#overview" className="hover:text-white whitespace-nowrap">Overview</a>
            <a href="#angles" className="hover:text-white whitespace-nowrap">Angles</a>
            <a href="#highlights" className="hover:text-white whitespace-nowrap">Highlights</a>
            <a href="#egmp" className="hover:text-white whitespace-nowrap">E-GMP</a>
            <a href="#exterior" className="hover:text-white whitespace-nowrap">Exterior</a>
            <a href="#interior" className="hover:text-white whitespace-nowrap">Interior</a>
            <a href="#v2l" className="hover:text-white whitespace-nowrap">V2L</a>
            <a href="#charging" className="hover:text-white whitespace-nowrap">Charging</a>
            <a href="#technology" className="hover:text-white whitespace-nowrap">Technology</a>
            <a href="#smartsense" className="hover:text-white whitespace-nowrap">SmartSense</a>
            <a href="#connected" className="hover:text-white whitespace-nowrap">Connected</a>
            <a href="#variants" className="hover:text-white whitespace-nowrap">Pricing</a>
            <a href="#cta" className="hover:text-white whitespace-nowrap">Enquire</a>
          </nav>
          <a href="#cta" className="px-3 py-2 text-sm rounded-lg bg-white text-black font-semibold">Book / Test Drive</a>
        </div>
      </header>

      {/* Hero / Overview with sticky video background */}
      <section id="overview" className="relative pt-[60px]">
        <div className="fixed inset-0 -z-10">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source src="/ioniq5.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border border-white/10 px-2 py-1 rounded-full text-xs text-gray-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Future-forward design
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Hyundai <span className="text-emerald-300">IONIQ 5</span></h1>
            <p className="text-gray-300 max-w-prose">Born Electric. The IONIQ 5 revolutionizes EV design with its pixel-inspired lighting, parametric-pixel cladding, and V2L technology. A futuristic SUV that's ready to lead tomorrow.</p>
            <div className="flex gap-3 flex-wrap text-sm">
              <div className="border border-white/10 px-3 py-2 rounded-xl">Up to 631 km Range</div>
              <div className="border border-white/10 px-3 py-2 rounded-xl">0-100 km/h in 5.2s</div>
              <div className="border border-white/10 px-3 py-2 rounded-xl">185 km/h Top Speed</div>
              <div className="border border-white/10 px-3 py-2 rounded-xl">V2L (Vehicle-to-Load)</div>
            </div>
            <div className="flex gap-3">
              <a href="#angles" className="px-4 py-2 rounded-lg bg-emerald-300/20 text-emerald-200 ring-1 ring-white/10">See Angles</a>
              <a href="#highlights" className="px-4 py-2 rounded-lg bg-white/10">View Highlights</a>
            </div>
          </div>
          <div className="relative">
            <BatteryAnimationWithControls className="w-full" />
          </div>
        </div>
      </section>

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
              <img className="w-full h-36 object-cover rounded-xl" alt="Pixel-inspired lights" src="/images/cars/ioniq5/rear/Accordion-1-kolom-Parametric-Pixel-Rear-Lamp_1120x600.avif" />
              <figcaption className="mt-3 text-sm font-semibold">Pixel-inspired lights</figcaption>
              <p className="text-xs text-gray-400">Distinctive LED signature front and rear.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-36 object-cover rounded-xl" alt="Parametric-pixel cladding" src="/images/cars/ioniq5/front/ioniq5-front-1.avif" />
              <figcaption className="mt-3 text-sm font-semibold">Parametric-pixel cladding</figcaption>
              <p className="text-xs text-gray-400">Futuristic geometric design elements.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-36 object-cover rounded-xl" alt="20-inch alloy wheels" src="/images/cars/ioniq5/side/ioniq5-side-1.avif" />
              <figcaption className="mt-3 text-sm font-semibold">20-inch alloy wheels</figcaption>
              <p className="text-xs text-gray-400">Aerodynamically optimized design.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-36 object-cover rounded-xl" alt="V2L port" src="/images/cars/ioniq5/v2l.webp" />
              <figcaption className="mt-3 text-sm font-semibold">V2L (Vehicle-to-Load) port</figcaption>
              <p className="text-xs text-gray-400">Power your devices from your car.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-36 object-cover rounded-xl" alt="Spoiler" src="/images/cars/ioniq5/rear/ioniq5-rear-1.avif" />
              <figcaption className="mt-3 text-sm font-semibold">Integrated spoiler</figcaption>
              <p className="text-xs text-gray-400">Sleek aero-efficient rear design.</p>
            </figure>
          </div>
          <p className="text-xs text-gray-500 mt-3">Also shown: Parametric-pixel geometric patterns throughout, panoramic sunroof, flush door handles, and advanced charging system.</p>
        </div>
      </section>

      {/* E-GMP Platform */}
      <section id="egmp" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">E-GMP Platform</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="E-GMP Architecture" src="/images/cars/ioniq5/clf7rex2djvw3zrmesfywtkc2-clb3lmjw500ua5qsdtw141clz-egmp1.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Electric-Global Modular Platform</figcaption>
              <p className="text-xs text-gray-400">Purpose-built EV platform for maximum efficiency.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Battery Technology" src="/images/cars/ioniq5/clf7rf9ryjvwnzrmeufsonn50-clb3lnngi00uw5qsdf7orsekp-egmp2.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Advanced Battery Systems</figcaption>
              <p className="text-xs text-gray-400">Cutting-edge battery technology for range and safety.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Charging Technology" src="/images/cars/ioniq5/clf7rfp6rjvxazrmea7r0dv1t-clb3lnwo500vg5qsd7eib04q6-egmp3.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Ultra-Fast Charging</figcaption>
              <p className="text-xs text-gray-400">Industry-leading charging speeds up to 350kW.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Platform Design" src="/images/cars/ioniq5/clf7rg2j4jvxrzrme68qey54n-clb3lo6y200vz5qsdg2vv7wmt-egmp4.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Platform Innovation</figcaption>
              <p className="text-xs text-gray-400">Revolutionary platform design for EVs.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="E-GMP Features" src="/images/cars/ioniq5/clf7rglapjvyvzrmejb5xz8eg-clb3loi4a00wk5qsds1haomm7-egmp5.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Advanced Platform Features</figcaption>
              <p className="text-xs text-gray-400">Next-generation EV platform capabilities.</p>
            </figure>
          </div>
        </div>
      </section>

      {/* Exterior Gallery */}
      <section id="exterior" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Exterior</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="EPIQ Exterior Front" src="/images/cars/ioniq5/exterior/Hyundai_IONIQ5-EPIQ_Exterior_Front_830x400.avif" />
              <figcaption className="mt-3 text-sm font-semibold">EPIQ Exterior Design</figcaption>
              <p className="text-xs text-gray-400">Premium variant with distinctive styling.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Exterior Feature" src="/images/cars/ioniq5/exterior/Alexa copy.jpg" />
              <figcaption className="mt-3 text-sm font-semibold">Exterior Features</figcaption>
              <p className="text-xs text-gray-400">Premium exterior styling details.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Front Three-Quarter" src="/images/cars/ioniq5/front/ioniq5-front-2.avif" />
              <figcaption className="mt-3 text-sm font-semibold">Parametric Pixel Front Design</figcaption>
              <p className="text-xs text-gray-400">Distinctive LED headlamps and grille.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Front View 3" src="/images/cars/ioniq5/front/ioniq5-front-3.avif" />
              <figcaption className="mt-3 text-sm font-semibold">Front Angle View</figcaption>
              <p className="text-xs text-gray-400">Striking angular design elements.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Rear View" src="/images/cars/ioniq5/rear/ioniq5-rear-2.avif" />
              <figcaption className="mt-3 text-sm font-semibold">Pixel Rear Lighting</figcaption>
              <p className="text-xs text-gray-400">Parametric pixel tail lamps.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Rear View 3" src="/images/cars/ioniq5/rear/ioniq5-rear-3.avif" />
              <figcaption className="mt-3 text-sm font-semibold">Rear Profile</figcaption>
              <p className="text-xs text-gray-400">Clean rear design with pixel elements.</p>
            </figure>
          </div>
        </div>
      </section>

      {/* Interior Gallery */}
      <section id="interior" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Interior</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Interior Overview" src="/images/cars/ioniq5/clf7tjwr5jxoszrmemu0tmeqt-interior-2192-1232.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Spacious Interior</figcaption>
              <p className="text-xs text-gray-400">Premium cabin with modern design.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Dashboard" src="/images/cars/ioniq5/clf7tiqawjxmkzrme9b0sqnly-interior-2192-1232-1.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Minimalist Dashboard</figcaption>
              <p className="text-xs text-gray-400">Clean, uncluttered design.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Seats" src="/images/cars/ioniq5/clf7tja07jxnnzrmeuptsb9jv-interior-2192-1232-2.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Premium Seating</figcaption>
              <p className="text-xs text-gray-400">Comfortable and spacious.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Digital Cluster" src="/images/cars/ioniq5/clf7tkfe9jxq6zrme8wqcyeci-interior-2192-1232-3.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Digital Cluster</figcaption>
              <p className="text-xs text-gray-400">12.3-inch dual screens.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Interior Details" src="/images/cars/ioniq5/clf7tl07qjxrszrmeodraelvb-interior-2192-1232-4.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Interior Details</figcaption>
              <p className="text-xs text-gray-400">Thoughtfully designed elements.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Cabin Layout" src="/images/cars/ioniq5/clf7tn4zsjxvgzrmedt1orrqt-interior-2192-1232-6.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Smart Storage Solutions</figcaption>
              <p className="text-xs text-gray-400">Ample storage space throughout.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Interior Feature" src="/images/cars/ioniq5/cluqkc3es4hybtasakbaedo85-interior-2.jpg" />
              <figcaption className="mt-3 text-sm font-semibold">Premium Interior</figcaption>
              <p className="text-xs text-gray-400">Luxurious cabin experience.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Interior Column" src="/images/cars/ioniq5/Fitur-Interior-1-Kolom_1120x600.avif" />
              <figcaption className="mt-3 text-sm font-semibold">Interior Features</figcaption>
              <p className="text-xs text-gray-400">Advanced interior technology.</p>
            </figure>
          </div>
        </div>
      </section>

      {/* V2L Section */}
      <section id="v2l" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">V2L (Vehicle-to-Load)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="V2L Port" src="/images/cars/ioniq5/v2l.webp" />
              <figcaption className="mt-3 text-sm font-semibold">V2L Port</figcaption>
              <p className="text-xs text-gray-400">Power your devices on the go.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Outdoor Power" src="/images/cars/ioniq5/clf7u2i2tjyi3zrmeahtu16yb-v2l-1064-832.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Outdoor Power Solutions</figcaption>
              <p className="text-xs text-gray-400">Run outdoor equipment and appliances.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Emergency Power" src="/images/cars/ioniq5/cluqmkcfn4iobtasakc66dbms-inside-v2l-1.jpg" />
              <figcaption className="mt-3 text-sm font-semibold">Emergency Backup Power</figcaption>
              <p className="text-xs text-gray-400">Use your car as a power bank.</p>
            </figure>
          </div>
        </div>
      </section>

      {/* Charging Section */}
      <section id="charging" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Charging</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Fast Charging" src="/images/cars/ioniq5/charging.webp" />
              <figcaption className="mt-3 text-sm font-semibold">350kW Ultra-Fast Charging</figcaption>
              <p className="text-xs text-gray-400">18 minutes to 80% charge.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Charging Port" src="/images/cars/ioniq5/charging-port.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Charging Port</figcaption>
              <p className="text-xs text-gray-400">Advanced charging interface.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Charging Technology" src="/images/cars/ioniq5/charaging 1.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Charging Technology</figcaption>
              <p className="text-xs text-gray-400">State-of-the-art charging solutions.</p>
            </figure>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Technology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Infotainment" src="/images/cars/ioniq5/clf7udwtqjz0dzrmek4tj0xa0-technology-1024-708.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Advanced Infotainment</figcaption>
              <p className="text-xs text-gray-400">12.3-inch touchscreen with Android Auto & Apple CarPlay.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Digital Key" src="/images/cars/ioniq5/clf7udjj0jyzczrme7ryrw8x5-technology-1024-708-2.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Digital Key Technology</figcaption>
              <p className="text-xs text-gray-400">Unlock and start with your smartphone.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Technology Features" src="/images/cars/ioniq5/clf7ue9czjz1czrme61rcvgq6-technology-1024-708-3.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Smart Technology</figcaption>
              <p className="text-xs text-gray-400">Advanced connectivity features.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Wireless Charging" src="/images/cars/ioniq5/clf7uf0j4jz3fzrmei25grfy4-technology-1024-708-4.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Wireless Phone Charging</figcaption>
              <p className="text-xs text-gray-400">Charge your phone wirelessly.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Tech Interface" src="/images/cars/ioniq5/clf7ugkc2jz64zrmewggl6qnf-technology-1024-708-5.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Intuitive Interface</figcaption>
              <p className="text-xs text-gray-400">User-friendly technology controls.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Technology Overview" src="/images/cars/ioniq5/technology.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Technology Overview</figcaption>
              <p className="text-xs text-gray-400">Cutting-edge technology suite.</p>
            </figure>
          </div>
        </div>
      </section>

      {/* Hyundai SmartSense Section */}
      <section id="smartsense" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Hyundai SmartSense</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="ADAS" src="/images/cars/ioniq5/adas.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Advanced Driver Assistance</figcaption>
              <p className="text-xs text-gray-400">Comprehensive safety suite.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="SmartSense Features" src="/images/cars/ioniq5/clf8asc52kaxnzrmett5qo50s-smartsense-2192-1232-2.webp" />
              <figcaption className="mt-3 text-sm font-semibold">SmartSense Technology</figcaption>
              <p className="text-xs text-gray-400">Advanced safety features.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Blind Spot" src="/images/cars/ioniq5/clf7uy6ipjzkxzrmeygel6f6t-smartsense-2192-1232-4.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Blind Spot Collision Warning</figcaption>
              <p className="text-xs text-gray-400">Stay aware of surrounding traffic.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Forward Collision" src="/images/cars/ioniq5/clf7ux8mnjzjbzrmebvk079xq-smartsense-2192-1232-5.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Forward Collision Avoidance</figcaption>
              <p className="text-xs text-gray-400">Automatic emergency braking.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Safety Systems" src="/images/cars/ioniq5/clf7uykqnjzltzrme0h51csc7-smartsense-2192-1232-6.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Safety Systems</figcaption>
              <p className="text-xs text-gray-400">Multi-layered protection.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Driver Assistance" src="/images/cars/ioniq5/clf7v04g4jzp0zrmeup0242jb-smartsense-2192-1232-7.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Driver Assistance</figcaption>
              <p className="text-xs text-gray-400">Enhanced driving confidence.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="SmartSense Advanced" src="/images/cars/ioniq5/clf7uz5dujzmzzrmej5ilg960-smartsense-2192-1232-8.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Advanced Safety Features</figcaption>
              <p className="text-xs text-gray-400">Next-generation safety technology.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Collision Avoidance" src="/images/cars/ioniq5/clf7uxqmbjzk8zrme1ahezt71-smartsense-2192-1232-9.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Collision Avoidance</figcaption>
              <p className="text-xs text-gray-400">Proactive safety measures.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="SmartSense Suite" src="/images/cars/ioniq5/clf7v0ky4jzpzzrme49alti47-smartsense-2192-1232-10.webp" />
              <figcaption className="mt-3 text-sm font-semibold">SmartSense Suite</figcaption>
              <p className="text-xs text-gray-400">Complete safety package.</p>
            </figure>
          </div>
        </div>
      </section>

      {/* Connected Services Section */}
      <section id="connected" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Connected Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Connected Car" src="/images/cars/ioniq5/clf7v6c7qjzyfzrmej2mpj7fr-connected-car-1064-1232.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Bluelink Connected Services</figcaption>
              <p className="text-xs text-gray-400">Remote control and monitoring.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Connected Technology" src="/images/cars/ioniq5/clf7v0yvijzqszrme247tivxb-smartsense-2192-1232-11.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Over-The-Air Updates</figcaption>
              <p className="text-xs text-gray-400">Always stay up to date.</p>
            </figure>
            <figure className="bg-black/40 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/10">
              <img className="w-full h-48 object-cover rounded-xl" alt="Smart Connectivity" src="/images/cars/ioniq5/clf7v1ctqjzrlzrme29zirkn3-smartsense-2192-1232-12.webp" />
              <figcaption className="mt-3 text-sm font-semibold">Smart Connectivity</figcaption>
              <p className="text-xs text-gray-400">Seamless integration with your devices.</p>
            </figure>
          </div>
        </div>
      </section>

      {/* Wheels & Charging (callout) */}
      <section id="wheels-charging" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/10">
            <h3 className="text-xl font-semibold">20-inch Alloy Wheels</h3>
            <p className="text-sm text-gray-300 mt-2">Aerodynamic wheel design optimized for efficiency and range, perfectly complementing the IONIQ 5's futuristic aesthetic.</p>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/10">
            <h3 className="text-xl font-semibold">Ultra-Fast Charging</h3>
            <p className="text-sm text-gray-300 mt-2">Support for up to 350kW DC fast charging, get up to 80% charge in just 18 minutes. V2L technology lets you power external devices.</p>
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
            <p className="text-gray-300 mt-2">We'll connect you to your nearest Hyundai dealer.</p>
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
          <p>Images & features shown are from Hyundai India IONIQ 5 exterior page. Visuals and availability may vary by variant and region.</p>
          <p className="mt-2">© Hyundai — IONIQ 5 (Redesigned showcase for demo)</p>
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
      title: "Interior",
      images: [
        "/images/cars/ioniq5/clf7tjwr5jxoszrmemu0tmeqt-interior-2192-1232.webp",
        "/images/cars/ioniq5/clf7tiqawjxmkzrme9b0sqnly-interior-2192-1232-1.webp",
        "/images/cars/ioniq5/clf7tja07jxnnzrmeuptsb9jv-interior-2192-1232-2.webp",
        "/images/cars/ioniq5/clf7tkfe9jxq6zrme8wqcyeci-interior-2192-1232-3.webp",
        "/images/cars/ioniq5/clf7tl07qjxrszrmeodraelvb-interior-2192-1232-4.webp",
        "/images/cars/ioniq5/clf7tn4zsjxvgzrmedt1orrqt-interior-2192-1232-6.webp",
        "/images/cars/ioniq5/cluqkc3es4hybtasakbaedo85-interior-2.jpg",
        "/images/cars/ioniq5/Fitur-Interior-1-Kolom_1120x600.avif",
      ],
    },
    {
      title: "Exterior",
      images: [
        "/images/cars/ioniq5/exterior/Hyundai_IONIQ5-EPIQ_Exterior_Front_830x400.avif",
        "/images/cars/ioniq5/front/ioniq5-front-2.avif",
        "/images/cars/ioniq5/front/ioniq5-front-3.avif",
        "/images/cars/ioniq5/rear/ioniq5-rear-2.avif",
        "/images/cars/ioniq5/rear/ioniq5-rear-3.avif",
      ],
    },
    {
      title: "SmartSense",
      images: [
        "/images/cars/ioniq5/adas.webp",
        "/images/cars/ioniq5/clf8asc52kaxnzrmett5qo50s-smartsense-2192-1232-2.webp",
        "/images/cars/ioniq5/clf7uy6ipjzkxzrmeygel6f6t-smartsense-2192-1232-4.webp",
        "/images/cars/ioniq5/clf7ux8mnjzjbzrmebvk079xq-smartsense-2192-1232-5.webp",
        "/images/cars/ioniq5/clf7uykqnjzltzrme0h51csc7-smartsense-2192-1232-6.webp",
        "/images/cars/ioniq5/clf7v04g4jzp0zrmeup0242jb-smartsense-2192-1232-7.webp",
        "/images/cars/ioniq5/clf7uz5dujzmzzrmej5ilg960-smartsense-2192-1232-8.webp",
        "/images/cars/ioniq5/clf7uxqmbjzk8zrme1ahezt71-smartsense-2192-1232-9.webp",
        "/images/cars/ioniq5/clf7v0ky4jzpzzrme49alti47-smartsense-2192-1232-10.webp",
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
    { id: 1, name: "Excite", battery: 58.0, range: 550, power: 165, price: 45.95, tags: [] },
    { id: 2, name: "Excite (O)", battery: 72.6, range: 631, power: 214, price: 46.95, tags: ["LR"] },
    { id: 3, name: "Excite DT", battery: 58.0, range: 550, power: 165, price: 47.45, tags: ["DT"] },
    { id: 4, name: "Excite (O) DT", battery: 72.6, range: 631, power: 214, price: 48.45, tags: ["LR","DT"] },
    { id: 5, name: "Excite Knight", battery: 58.0, range: 550, power: 165, price: 47.95, tags: ["Knight"] },
    { id: 6, name: "Excite (O) Knight", battery: 72.6, range: 631, power: 214, price: 48.95, tags: ["LR","Knight"] },
    { id: 7, name: "Luxe", battery: 58.0, range: 550, power: 165, price: 48.45, tags: [] },
    { id: 8, name: "Luxe (O)", battery: 72.6, range: 631, power: 214, price: 49.45, tags: ["LR"] },
    { id: 9, name: "Luxe DT", battery: 58.0, range: 550, power: 165, price: 49.45, tags: ["DT"] },
    { id: 10, name: "Luxe (O) DT", battery: 72.6, range: 631, power: 214, price: 50.45, tags: ["LR","DT"] },
    { id: 11, name: "Luxe Knight", battery: 58.0, range: 550, power: 165, price: 49.95, tags: ["Knight"] },
    { id: 12, name: "Luxe (O) Knight", battery: 72.6, range: 631, power: 214, price: 50.95, tags: ["LR","Knight"] },
  ] as const

  const groups = React.useMemo(() => ([
    { title: '58.0 kWh — Standard Range', list: variants.filter(v=>v.battery===58.0) },
    { title: '72.6 kWh — Long Range', list: variants.filter(v=>v.battery===72.6) },
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

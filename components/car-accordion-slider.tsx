"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import Slider from "react-slick"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MODELS } from "@/lib/models"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Custom Arrow Components
function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Previous car"
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-8 md:-translate-x-12 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-transparent hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full cursor-pointer"
    >
      <ChevronLeft className="h-8 w-8 md:h-10 md:w-10 text-gray-900" strokeWidth={2.5} />
    </button>
  )
}

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Next car"
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-8 md:translate-x-12 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-transparent hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full cursor-pointer"
    >
      <ChevronRight className="h-8 w-8 md:h-10 md:w-10 text-gray-900" strokeWidth={2.5} />
    </button>
  )
}

export default function CarAccordionSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  }

  return (
    <section
      aria-labelledby="models-heading"
      className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-white overflow-hidden"
    >
      {/* Title - Large, bold, black, centered */}
      <h2 id="models-heading" className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
        Models
      </h2>

      <div className="relative min-h-[400px] md:min-h-[450px] lg:min-h-[500px] overflow-hidden">
        <style jsx global>{`
          /* Hide scrollbars */
          .slick-slider {
            position: relative;
            overflow: hidden;
          }
          .slick-list {
            overflow: hidden !important;
            padding: 0 20px !important;
            -ms-overflow-style: none;
            scrollbar-width: none;
            margin: 0 auto;
          }
          .slick-list::-webkit-scrollbar {
            display: none;
          }
          .slick-slide > div {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .slick-track {
            display: flex;
            align-items: center;
            margin: 0 auto;
          }
          .slick-slide {
            transition: transform 0.5s ease, opacity 0.5s ease;
          }
          .slick-slide:not(.slick-center) {
            opacity: 0.7;
            pointer-events: none;
          }
          .slick-slide.slick-center {
            opacity: 1;
            pointer-events: auto;
          }
          .slick-slide:not(.slick-center) a {
            pointer-events: none;
            cursor: default;
          }
          .slick-slide.slick-center a {
            pointer-events: auto;
            cursor: pointer;
          }
          .car-slide-wrapper {
            position: relative;
          }
          /* Hide page scrollbar if present */
          body {
            overflow-x: hidden;
          }
          html {
            overflow-x: hidden;
          }
          /* Center slide styling */
          .car-image-container {
            min-height: 180px;
          }
          @media (min-width: 768px) {
            .car-image-container {
              min-height: 200px;
            }
          }
          @media (min-width: 1024px) {
            .car-image-container {
              min-height: 220px;
            }
          }
          .slick-slide.slick-center .car-image-container {
            min-height: 240px !important;
          }
          @media (min-width: 768px) {
            .slick-slide.slick-center .car-image-container {
              min-height: 300px !important;
            }
          }
          @media (min-width: 1024px) {
            .slick-slide.slick-center .car-image-container {
              min-height: 380px !important;
            }
          }
          .slick-slide.slick-center .car-image-container {
            transform: scale(1.3);
          }
          .slick-slide:not(.slick-center) .car-image-container {
            transform: scale(0.9);
          }
          .slick-slide:not(.slick-center) .car-image {
            filter: grayscale(100%) brightness(1.2) contrast(0.9);
          }
          .slick-slide.slick-center .car-image {
            filter: drop-shadow(0 30px 60px rgba(0,0,0,0.2)) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) !important;
            transform: scale(1.1);
          }
          .slick-slide.slick-center .car-overlay {
            display: none;
          }
          .slick-slide.slick-center .car-name {
            font-size: 1.125rem !important;
          }
          @media (min-width: 768px) {
            .slick-slide.slick-center .car-name {
              font-size: 1.25rem !important;
            }
          }
          @media (min-width: 1024px) {
            .slick-slide.slick-center .car-name {
              font-size: 1.5rem !important;
            }
          }
          .slick-slide.slick-center .car-name {
            opacity: 1 !important;
          }
          .slick-slide.slick-center .car-name-container {
            transform: scale(1.05);
          }
        `}</style>
        
        <Slider {...settings}>
          {MODELS.map((model, index) => (
            <div key={model.id} className="px-2 md:px-4 car-slide-wrapper">
              <Link
                href={
                  model.id === 'alcazar' ? '/alcazar' :
                  model.id === 'exter' ? '/exter' :
                  model.id === 'cretan' ? '/creta-nline' :
                  model.id === 'venuen' ? '/model/venue-nline' :
                  model.id === 'venue-all-new' ? '/model/venue-all-new' :
                  model.id === 'tucson' ? '/tucson' :
                  model.brochureHref || `/model/${model.id}`
                }
                className="group flex flex-col items-center text-center focus:outline-none car-slide"
                onClick={(e) => {
                  const slideElement = e.currentTarget.closest('.slick-slide')
                  if (slideElement && !slideElement.classList.contains('slick-center')) {
                    e.preventDefault()
                    e.stopPropagation()
                    return false
                  }
                }}
              >
                {/* Car Image Container */}
                <div className="relative w-full mb-4 transition-all duration-500 car-image-container flex items-center justify-center" style={{ height: '180px' }}>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={model.imageSrc || "/placeholder.svg"}
                      alt={model.imageAlt}
                      className="object-contain p-2 md:p-3 transition-all duration-500 car-image max-h-full max-w-full"
                      loading="lazy"
                    />
                    {/* White overlay for non-center images */}
                    <div className="absolute inset-0 bg-white/40 pointer-events-none car-overlay" />
                  </div>
                </div>
                
                {/* Car Name */}
                <div className="transition-all duration-500 mt-3 min-h-[60px] md:min-h-[70px] lg:min-h-[80px] flex items-center justify-center car-name-container">
                  <h3 className="font-semibold text-gray-900 transition-all duration-500 text-center leading-tight px-2 text-base md:text-lg opacity-70 car-name">
                    {model.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

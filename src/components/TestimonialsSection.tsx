"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedPillBadge from "./AnimatedPillBadge";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  projectCapacity: string;
  projectType: string;
  highlightMetric: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Sarhat's integrated execution on our 20 MW solar park in Rajasthan was flawless. Their team handled everything from land title verification to 33kV substation bay commissioning 3 weeks ahead of schedule.",
    author: "Rajesh V. Sharma",
    role: "Director of Infrastructure",
    company: "SunVision Power Corp",
    location: "Rajasthan",
    rating: 5,
    projectCapacity: "20 MW",
    projectType: "Utility Solar & BESS",
    highlightMetric: "Commissioned 21 Days Early",
  },
  {
    id: "2",
    quote:
      "Transitioning our industrial manufacturing facilities in Thane & Surat to group captive solar reduced our peak power tariff by 32%. Sarhat's transparency during GETCO grid wheeling clearances was exemplary.",
    author: "Ananya Deshmukh",
    role: "Head of Energy Procurement",
    company: "MahaIndustries Group",
    location: "Gujarat & Maharashtra",
    rating: 5,
    projectCapacity: "12.5 MW",
    projectType: "C&I Group Captive Solar",
    highlightMetric: "32% Tariff Reduction",
  },
  {
    id: "3",
    quote:
      "Extremely reliable EPC partner for agricultural feeder solarization in Purvanchal. Their high-temperature resilient mounting structures and UPNEDA DISCOM clearances exceeded our quality standards.",
    author: "Vikramaditya Singh",
    role: "Chief Project Lead",
    company: "Purvanchal Solar Feeder Initiative",
    location: "Uttar Pradesh",
    rating: 5,
    projectCapacity: "32.7 MW",
    projectType: "PM-KUSUM Feeder & 132kV Substation",
    highlightMetric: "100% DISCOM Uptime",
  },
  {
    id: "4",
    quote:
      "Containerized BESS energy storage integration with solar arrays requires high-precision protection relay engineering. Sarhat's electrical SLD team delivered seamless grid frequency stabilization.",
    author: "Dr. K. N. Swamy",
    role: "VP Systems Engineering",
    company: "Deccan Clean Energy Storage",
    location: "Karnataka & Telangana",
    rating: 5,
    projectCapacity: "14.2 MW",
    projectType: "Solar + BESS Grid Evacuation",
    highlightMetric: "Zero Frequency Drift",
  },
  {
    id: "5",
    quote:
      "From topographic survey to final CEIG safety certificate, Sarhat's single-window execution eliminated multi-vendor chaos for our industrial rooftop solar microgrid.",
    author: "Meera Nair",
    role: "VP Operations",
    company: "Apex Agro Manufacturing",
    location: "Haryana & Punjab",
    rating: 5,
    projectCapacity: "8.4 MW",
    projectType: "Rooftop Solar & Microgrid",
    highlightMetric: "Zero Operational Lag",
  },
  {
    id: "6",
    quote:
      "Their in-house SCADA telemetry and substation automation ensure real-time generation visibility. Sarhat built our 15 MW solar feeder in Datia with unprecedented civil build speed.",
    author: "Harish Chandra Choudhary",
    role: "Managing Director",
    company: "Thar Solar Infra Projects",
    location: "Madhya Pradesh",
    rating: 5,
    projectCapacity: "15 MW",
    projectType: "Utility Ground Mounted EPC",
    highlightMetric: "100% On-Time Energisation",
  },
  {
    id: "7",
    quote:
      "Navigating DISCOM bay approvals and high-voltage transmission right-of-way can stall projects for months. Sarhat completed our 33kV corridor with zero compliance roadblocks.",
    author: "Sunita Reddy",
    role: "Executive Director",
    company: "Coromandel Renewable Feeder Corp",
    location: "Andhra Pradesh",
    rating: 5,
    projectCapacity: "18.5 MW",
    projectType: "Transmission & Substation EPC",
    highlightMetric: "Zero Grid Non-Compliance",
  },
];

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Dynamic step size calculation based on actual card width + gap
  const getScrollStep = useCallback(() => {
    if (!scrollContainerRef.current) return 440;
    const firstCard = scrollContainerRef.current.querySelector<HTMLElement>(".testimonial-card");
    return firstCard ? firstCard.offsetWidth + 24 : 440;
  }, []);

  const handlePrev = useCallback(() => {
    if (scrollContainerRef.current) {
      const step = getScrollStep();
      scrollContainerRef.current.scrollBy({ left: -step, behavior: "smooth" });
    }
  }, [getScrollStep]);

  const handleNext = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const step = getScrollStep();
      if (scrollLeft + clientWidth >= scrollWidth - 40) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({ left: step, behavior: "smooth" });
      }
    }
  }, [getScrollStep]);

  // Automatic Smooth Left-to-Right Carousel with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section
      id="testimonials"
      className="py-12 sm:py-16 lg:py-20 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6DAD45]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <AnimatedPillBadge className="mb-6">
              CLIENT &amp; PARTNER ENDORSEMENTS
            </AnimatedPillBadge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
              Trusted by India&apos;s <br />
              <span className="text-[#6DAD45] italic relative inline-block">
                Clean Energy Leaders.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M0 15 Q 50 0 100 15"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                </svg>
              </span>
            </h2>
          </div>
        </ScrollReveal>
      </div>

      {/* Full-Length Edge-to-Edge Cards Carousel with Side Floating Arrows */}
      <div className="relative w-full overflow-hidden my-2">
        {/* Subtle Edge Gradient Fades for Infinite Feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-[#F8FAF8] via-[#F8FAF8]/80 to-transparent z-10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-[#F8FAF8] via-[#F8FAF8]/80 to-transparent z-10"
        />

        {/* Floating Left Navigation Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Testimonial"
          className="absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-slate-900 border-2 border-slate-200/90 hover:border-[#6DAD45] text-slate-800 hover:text-[#D4E012] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md group"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        {/* Floating Right Navigation Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Testimonial"
          className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-slate-900 border-2 border-slate-200/90 hover:border-[#6DAD45] text-slate-800 hover:text-[#D4E012] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md group"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        {/* Full-Width Scrollable Cards Track */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-5 sm:gap-6 md:gap-7 overflow-x-auto scroll-smooth py-6 px-8 sm:px-16 md:px-24 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="testimonial-card snap-start w-[310px] sm:w-[380px] md:w-[420px] lg:w-[440px] xl:w-[460px] shrink-0 bg-white rounded-[28px] p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-[#6DAD45]/15 hover:border-[#6DAD45] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-center relative group"
            >
              <div>
                {/* Rating & Location Tag */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
                    ))}
                  </div>
                  <span className="px-3 py-1 bg-slate-100 border border-slate-200/90 text-slate-600 font-mono text-[10px] font-bold rounded-full tracking-wider uppercase">
                    {item.location}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base font-serif-display font-medium text-slate-800 leading-relaxed mb-6 line-clamp-4 text-center">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-col items-center justify-center text-center gap-2">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 font-serif-display group-hover:text-[#6DAD45] transition-colors">
                    {item.author}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-mono mt-0.5">
                    {item.role} •{" "}
                    <span className="font-bold text-[#6DAD45]">{item.company}</span>
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D4E012]/20 border border-[#D4E012]/50 text-[#556000] font-mono text-[10px] sm:text-[11px] font-bold rounded-xl mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>{item.highlightMetric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section CTA Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" distance={30} delay={0.25}>
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group cursor-pointer"
            >
              <span>Read More Insights &amp; Stories</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

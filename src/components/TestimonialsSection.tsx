"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

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
];

export default function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Repeat items for seamless infinite continuous scroll loop
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 sm:py-28 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6DAD45]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-2.5 rounded-full bg-white border border-[#707B00]/40 text-[#707B00] font-mono font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-sm mb-6">
              CLIENT & PARTNER ENDORSEMENTS
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
              Trusted by India&apos;s <br />
              <span className="text-[#6DAD45] italic relative inline-block">
                Clean Energy Leaders.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#6DAD45]"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
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
            <p className="text-slate-600 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Read how our turnkey EPC execution, substation engineering, and grid connectivity deliver measurable performance across India.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal Cards Slider Track (Moving Left to Right continuously) */}
      <div
        className="relative w-full overflow-hidden mt-4 py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Side Gradient Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8FAF8] via-[#F8FAF8]/90 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8FAF8] via-[#F8FAF8]/90 to-transparent z-20 pointer-events-none"></div>

        {/* Continuous Motion Track (Moving Left to Right) */}
        <motion.div
          animate={{ x: isPaused ? undefined : ["-50%", "0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
          className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[340px] sm:w-[420px] shrink-0 bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xl shadow-slate-200/50 hover:border-[#D4E012] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Rating & Location Tag */}
                <div className="flex items-center justify-between gap-2 mb-5">
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
                <p className="text-sm sm:text-base font-serif-display font-medium text-slate-800 leading-relaxed mb-6 line-clamp-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif-display group-hover:text-[#707B00] transition-colors">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {item.role} • <span className="font-bold text-[#707B00]">{item.company}</span>
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#D4E012]/20 border border-[#D4E012]/50 text-[#707B00] font-mono text-[10px] font-bold rounded-xl shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>{item.highlightMetric}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Section CTA Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" distance={30} delay={0.25}>
          <div className="mt-14 text-center">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
            >
              <span>Read More Insights & Stories</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

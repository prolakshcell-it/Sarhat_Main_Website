"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Building2, MapPin, CheckCircle2 } from "lucide-react";
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
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 sm:py-28 bg-[#F8FAF8] relative z-10 border-b border-slate-200/80 font-sans-ui overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4E012]/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6DAD45]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="right" distance={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs font-mono font-extrabold text-[#707B00] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8A9600] animate-ping"></span>
                CLIENT & PARTNER ENDORSEMENTS
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight">
                Trusted by India&apos;s <br />
                <span className="text-[#6DAD45] italic">Clean Energy Leaders.</span>
              </h2>
            </div>
            <p className="text-slate-600 font-normal text-base max-w-md leading-relaxed">
              Read how our turnkey EPC execution, substation engineering, and grid connectivity deliver measurable performance across India.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Testimonial Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Card */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="right" distance={70}>
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]">
                <Quote className="w-16 h-16 text-[#D4E012]/40 absolute top-6 right-8 pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Rating Stars & Capacity Tag */}
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-1">
                          {[...Array(current.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
                          ))}
                        </div>
                        <span className="px-3 py-1 bg-slate-900 text-white font-mono text-xs font-bold rounded-full">
                          {current.projectCapacity} • {current.projectType}
                        </span>
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-lg sm:text-2xl font-serif-display font-medium text-slate-800 leading-relaxed mb-8">
                        &ldquo;{current.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author & Highlight Footer */}
                    <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 font-serif-display">
                          {current.author}
                        </h4>
                        <div className="text-xs text-slate-600 font-mono flex items-center gap-2 mt-0.5">
                          <span>{current.role}</span>
                          <span>•</span>
                          <span className="font-bold text-[#707B00]">{current.company}</span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4E012]/20 border border-[#D4E012]/50 text-[#707B00] font-mono text-xs font-bold rounded-xl shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                        <span>{current.highlightMetric}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-100">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#707B00] bg-slate-50 hover:bg-white flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-slate-300 hover:border-[#707B00] bg-slate-50 hover:bg-white flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono text-slate-500 font-bold ml-2">
                    0{currentIndex + 1} / 0{testimonials.length}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Testimonial List Grid (Right Column) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            {testimonials.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <motion.div
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ x: -4 }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                      : "bg-white text-slate-800 border-slate-200 hover:border-[#D4E012]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isSelected ? "text-[#D4E012]" : "text-[#707B00]"
                      }`}
                    >
                      {item.company}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isSelected ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.location}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold line-clamp-1 mb-1">{item.author}</h5>
                  <p
                    className={`text-[11px] line-clamp-2 leading-relaxed ${
                      isSelected ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {item.quote}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

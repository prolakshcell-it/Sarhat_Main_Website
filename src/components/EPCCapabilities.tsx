"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

import AnimatedPillBadge from "./AnimatedPillBadge";

export default function EPCCapabilities() {
  return (
    <section id="about" className="py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative z-10 overflow-hidden font-sans-ui">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Centered Section Header */}
        <ScrollReveal direction="up" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <AnimatedPillBadge className="mb-6">
              ABOUT US
            </AnimatedPillBadge>

            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-serif-display font-medium text-slate-900 tracking-tight leading-none">
              YOUR TRUSTED <br />
              <span className="text-[#6DAD45]">ENERGY PARTNER</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left" distance={40}>

              {/* Long Editorial Paragraph */}
              <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed text-justify mb-8">
                Sarhat Infra is an integrated clean energy infrastructure company delivering end-to-end solutions across Engineering, Procurement &amp; Construction (EPC), Project Management Consultancy (PMC), and Operations &amp; Maintenance (O&amp;M). Our expertise spans Solar Power, Battery Energy Storage Systems (BESS), Wind Energy, and Agrivoltaics Projects, supporting projects from concept and engineering through commissioning and long-term asset management. Driven by innovation and execution excellence, Sarhat Infra is expanding into Green Hydrogen and next-generation energy technologies to accelerate the transition towards a sustainable, resilient, and low-carbon energy future.
              </p>

              {/* CTA Action Button */}
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4E012] to-[#5EE72D] hover:from-[#c2ce0d] hover:to-[#4ed423] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-[#D4E012]/20 group"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Overlapping Dual Image Showcase Frame */}
          <div className="lg:col-span-6 relative pb-8 pr-4 sm:pb-10 sm:pr-8">
            <ScrollReveal direction="right" distance={40}>
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <Image
                  src="/images/hero-solar.jpg"
                  alt="Sarhat Solar Farm Aerial View"
                  fill
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Overlapping Bottom-Right Foreground Substation Image Frame */}
              <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 w-2/3 aspect-[16/10] rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-20">
                <Image
                  src="/images/bess-substation.jpg"
                  alt="Sarhat Substation & BESS Infrastructure"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

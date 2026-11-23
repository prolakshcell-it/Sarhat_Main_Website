"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import KeyMomentsChapters, { type KeyMoment } from "@/components/KeyMomentsChapters";
import StoryHero from "@/components/our-story/StoryHero";
import WhoWeAre from "@/components/our-story/WhoWeAre";
import StoryValues, { type StoryValue } from "@/components/our-story/StoryValues";
import VisionMoment from "@/components/our-story/VisionMoment";
import MithilaFoundation, { type Pillar } from "@/components/our-story/MithilaFoundation";
import EnergyTomorrow from "@/components/our-story/EnergyTomorrow";
import FootprintMap from "@/components/FootprintMap";
import { Leaf, ShieldCheck, Zap } from "lucide-react";

/* Values: from the About page */
const values: StoryValue[] = [
  {
    title: "Integrity",
    icon: ShieldCheck,
    description: "Open to risks, honour our commitments and take responsibility for outcomes.",
  },
  {
    title: "Execution Excellence",
    icon: Zap,
    description:
      "Agile team, bring engineering and site teams together to deliver safely, solve problems and improve with every project.",
  },
  {
    title: "Sustainable Progress",
    icon: Leaf,
    description: "Deliver cleaner energy while caring for the land, resources and communities each project touches.",
  },
];

const keyMoments: KeyMoment[] = [
  {
    year: "2024",
    yearDisplay: "2024",
    stage: "FOUNDATION",
    headline: "Sarhat Begins",
    description:
      "After more than a decade in the energy industry, two engineers and friends founded Sarhat with a shared belief: give people room to grow and the responsibility to deliver.",
    image: "/images/story-2024.jpg",
    imageCaption: "Illustrative image",
  },
  {
    year: "2025",
    yearDisplay: "2025",
    stage: "GROWTH",
    headline: "Our Footprint Grows",
    description:
      "Sarhat installed solar projects across three states, turning its early ambition into work delivered on the ground.",
    image: "/images/story-2025.jpg",
    imageCaption: "Illustrative image",
  },
  {
    year: "2026",
    yearDisplay: "2026",
    stage: "WIDER REACH",
    headline: "New Capabilities, Wider Reach",
    description:
      "Sarhat expanded into energy and civil infrastructure, began developing projects, and extended its work across nine states.",
    image: "/images/story-2026.jpg",
    imageCaption: "Illustrative image",
  },
  {
    year: "2027",
    yearDisplay: "2027 onward",
    stage: "WHAT'S NEXT",
    headline: "Agrivoltaics & Green Hydrogen",
    description:
      "Sarhat plans to advance projects that combine farming and solar generation, and explore green hydrogen infrastructure.",
    image: "/images/story-2027.jpg",
    imageCaption: "Concept illustration",
  },
];

const pillars: Pillar[] = [
  {
    title: "Rooted in India",
    description:
      "Deeply connected to India's clean energy goals, building local infrastructure resilience with world-class engineering standards.",
  },
  {
    title: "Execution Discipline",
    description:
      "Hands-on delivery, zero-compromise safety protocols, and rigorous quality control from site survey to commissioning.",
  },
  {
    title: "Global Ambition",
    description:
      "Earning trust globally through scalable renewable energy designs, storage integration, and sustainable infrastructure.",
  },
];

/**
 * Our Story, told in one arc:
 * Rooted in India → Who We Are (+ film) → Values → Vision → Key Moments → Foundation & Pillars → Energy Today.
 */
export default function OurStoryPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen overflow-x-clip bg-[#F8FAF8] font-sans-ui text-[#0F172A] selection:bg-[#D4E012] selection:text-black">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* 01 — Rooted in India (fixed; the story slides up over it) */}
        <StoryHero />

        {/* Scroll Spacer (Matches Hero height to establish scroll track) */}
        <div className="relative z-0 h-screen w-full pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 bg-[#F8FAF8] border-t border-slate-200/60 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* 02 + 03 — Who We Are, and the film */}
          <WhoWeAre />

          {/* 04 — Our Values */}
          <StoryValues values={values} />

          {/* 05 — Vision */}
          <VisionMoment />

          {/* 06 — Key Moments from Our Story */}
          <section className="relative overflow-clip border-t border-slate-200/80 bg-[#F8FAF8] py-16 sm:py-24">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
                  {/* Half Sun motif */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="h-px w-16 bg-slate-200" />
                    <svg viewBox="0 0 48 24" className="w-12 h-6" fill="none">
                      <path d="M 6 24 A 18 18 0 0 1 42 24" stroke="#E07A4F" strokeWidth="1.8" />
                      <path d="M 12 24 A 12 12 0 0 1 36 24" stroke="#E9C46A" strokeWidth="1.5" />
                      {/* Sun rays */}
                      <path d="M 24 5 L 24 1 M 14 8 L 10 4 M 34 8 L 38 4 M 7 15 L 2 13 M 41 15 L 46 13" stroke="#E07A4F" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <div className="h-px w-16 bg-slate-200" />
                  </div>
                  <AnimatedPillBadge className="mb-6">OUR JOURNEY</AnimatedPillBadge>
                  <h2 className="mb-4 font-serif-display text-3xl font-medium leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                    Key moments in{" "}
                    <span className="italic text-[#6DAD45] relative inline-block">
                      our story.
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-2.5 text-[#6DAD45]"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        aria-hidden="true">
                        <path
                          d="M0 15 Q 50 0 100 15"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          fill="transparent" />
                      </svg>
                    </span>
                  </h2>
                  <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                    From our solar EPC beginnings to delivering projects across states.
                  </p>
                </div>
              </ScrollReveal>

              <KeyMomentsChapters moments={keyMoments} />
            </div>
          </section>

          {/* 07 — What Guides Us / Our Foundation & Pillars */}
          <MithilaFoundation pillars={pillars} />

          {/* 08 — Built across India. Core Operating Footprint. */}
          <FootprintMap />

          {/* 09 — Energy today. More possibilities tomorrow. */}
          <EnergyTomorrow onOpenQuote={() => setQuoteModalOpen(true)} />

          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}

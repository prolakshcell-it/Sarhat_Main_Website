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
    stage: "Foundation",
    headline: "Sarhat Begins",
    tag: "FOUNDATION & OWNERSHIP",
    subtitle: "ESTABLISHED BY INDUSTRY ENGINEERS",
    description:
      "After more than a decade in the energy industry, two engineers and friends founded Sarhat with a shared belief: when people are trusted to grow and take ownership, they can build projects that make a lasting difference.",
    metrics: ["2 Founder Engineers", "Solar EPC Focus", "Zero Safety Incidents"],
    achievements: [
      "Founded with engineering discipline & execution-first culture",
      "Delivered initial commercial rooftop & ground-mount solar installations",
      "Established standardized site safety & quality assurance frameworks",
    ],
    image: "/images/timeline-2024.jpg",
    imageCaption: "Initial Rooftop Solar & Site Quality Standards",
  },
  {
    year: "2025",
    stage: "Early Work",
    headline: "Solar & EV Infrastructure",
    tag: "EV MOBILITY & FAST CHARGING",
    subtitle: "SOLAR + EV CHARGING HUBS",
    description:
      "Pioneered integrated solar-assisted EV fast-charging stations and corporate fleet charging hubs, seamlessly connecting solar power generation with electric mobility infrastructure.",
    metrics: ["Solar EV Hubs", "DC Fast Chargers", "Smart Fleet Power"],
    achievements: [
      "Deployed solar-assisted EV fast-charging stations for industrial & commercial fleets",
      "Integrated smart load management & grid balancing for electric vehicle hubs",
      "Established automated remote telemetry & real-time charging network O&M",
    ],
    image: "/images/timeline-ev-charging.jpg",
    imageCaption: "Solar-Powered EV Fast Charging Infrastructure",
  },
  {
    year: "2025+",
    stage: "Growth",
    headline: "Our Footprint Grows",
    tag: "3 STATES DELIVERED",
    subtitle: "REGIONAL SCALE & MULTI-SITE EXECUTION",
    description:
      "Sarhat installed solar projects across three major industrial states, turning early vision into high-yielding operational clean energy assets on the ground.",
    metrics: ["3 States Active", "15+ Project Sites", "100% On-Time COD"],
    achievements: [
      "Executed commercial, industrial (C&I) & utility solar parks across 3 states",
      "Built dedicated in-house Operations & Maintenance (O&M) service capabilities",
      "Expanded site engineering, procurement & land clearance teams",
    ],
    image: "/images/timeline-2025.jpg",
    imageCaption: "Multi-State Commercial & Industrial Solar Parks",
  },
  {
    year: "2026",
    stage: "Today",
    headline: "New Capabilities, Wider Reach",
    tag: "7 STATES & MULTI-INFRASTRUCTURE",
    subtitle: "GRID SUBSTATIONS & BESS INTEGRATION",
    description:
      "Sarhat expanded into battery storage (BESS), 33kV/132kV/220kV grid substations, and civil infrastructure, extending delivery across seven states.",
    metrics: ["7 States Presence", "220kV Grid Substations", "Containerized BESS"],
    achievements: [
      "Constructed 33kV / 132kV / 220kV grid substations and SCADA systems",
      "Integrated utility-scale containerized BESS & solar-storage hybrids",
      "Delivered site access roads, piling foundations & drainage infrastructure",
    ],
    image: "/images/timeline-2026.jpg",
    imageCaption: "220kV High-Voltage Substation & BESS Storage",
  },
  {
    year: "2027+",
    stage: "What Comes Next",
    headline: "Next-Gen Energy & Global Horizon",
    tag: "FUTURE INFRASTRUCTURE",
    subtitle: "AGROVOLTAICS & GREEN HYDROGEN",
    description:
      "Pioneering agrovoltaics, green hydrogen infrastructure, and smart microgrids, carrying Sarhat's trusted execution model to national and global markets.",
    metrics: ["Agrovoltaics", "Green Hydrogen", "Global Expansion"],
    achievements: [
      "Developing dual-use agrovoltaic solar projects combining farming & power",
      "Pioneering green hydrogen generation & storage infrastructure",
      "Forging global strategic alliances for large-scale energy transition",
    ],
    image: "/images/timeline-2027.jpg",
    imageCaption: "Agrovoltaics & Green Hydrogen Infrastructure",
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

        {/* 01 — Rooted in India (sticky; the story slides up over it) */}
        <StoryHero />

        <div className="relative z-10 shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
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
                  <AnimatedPillBadge className="mb-6">Our Journey</AnimatedPillBadge>
                  <h2 className="mb-4 font-serif-display text-3xl font-medium leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                    Key Moments <span className="italic text-[#707B00]">from Our Story</span>
                  </h2>
                  <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                    The growth trajectory of Sarhat Energy & Infrastructure — from solar EPC and clean EV mobility to multi-state execution.
                  </p>
                </div>
              </ScrollReveal>

              <KeyMomentsChapters moments={keyMoments} />
            </div>
          </section>

          {/* 07 — What Guides Us / Our Foundation & Pillars */}
          <MithilaFoundation pillars={pillars} />

          {/* 08 — Energy today. More possibilities tomorrow. */}
          <EnergyTomorrow onOpenQuote={() => setQuoteModalOpen(true)} />

          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}

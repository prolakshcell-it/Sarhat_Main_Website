"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedPillBadge from "@/components/AnimatedPillBadge";
import FinalCTA from "@/components/FinalCTA";
import RelatedSolutionsSection from "@/components/solutions/RelatedSolutionsSection";
import InnovationLenses, { type LensBlock } from "@/components/solutions/InnovationLenses";
import {
  ArrowRight,
  Eye,
  Users,
  ShieldCheck,
  PencilRuler,
  Sprout,
  type LucideIcon,
} from "lucide-react";

/* ---------- Content ---------- */


const blocks: LensBlock[] = [
  {
    step: "01",
    tag: "DRONE MAPPING",
    title: "See the whole site from the air",
    body: "Walking a boundary tells you a lot, but not everything. Our drones fly the plot and capture imagery and ground levels across the entire site, so the design starts from what is really there.",
    points: [
      "Accurate boundary and ground levels",
      "Trees, poles, water channels and structures spotted early",
      "A dated record to compare against as work progresses",
    ],
  },
  {
    step: "02",
    tag: "3D TERRAIN MODEL",
    title: "Turn survey data into a model of the real ground",
    body: "The survey becomes a 3D model of the land. We place the layout on it, so structures follow the slope instead of fighting it, and low spots and drainage paths are visible before anyone digs.",
    points: [
      "Slopes and low-lying patches visible at a glance",
      "Layout fits the ground rather than flattening it",
      "Shade from nearby trees and buildings checked on the model",
    ],
  },
  {
    step: "03",
    tag: "VR WALKTHROUGH",
    title: "Walk through the plant before it is built",
    body: "In virtual reality, you stand between the rows of your own plant. Owners, landowners and DISCOM staff can see the same thing the engineers see, without needing to read a drawing. No headset? The same model opens in 3D on a screen.",
    points: [
      "Check gates, access paths and clearances on a virtual site",
      "Catch clashes between cables, structures and civil work early",
      "Explain the plan to people who are not engineers",
    ],
  },
  {
    step: "04",
    tag: "LIVE MONITORING",
    title: "Keep watching after the plant is energised",
    body: "Once the plant runs, its data feeds a model of what each section should be producing. When actual output drifts from expected, the section is flagged early and a crew goes to the right place first time.",
    points: [
      "Actual output compared with expected, section by section",
      "Early alerts instead of surprises at month end",
      "Thermal drone inspections where a closer look is needed",
    ],
    link: { href: "/solutions/solar-plant-health-checkup", label: "See the plant health check-up" },
  },
];

const benefits: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Eye,
    title: "Decide before you spend",
    body: "Problems found on a screen cost a few hours. The same problems found on site cost weeks.",
  },
  {
    icon: Users,
    title: "One shared picture",
    body: "Clients, landowners, DISCOM staff and our crews all look at the same model, so there is less to misunderstand.",
  },
  {
    icon: ShieldCheck,
    title: "Fewer surprises on site",
    body: "What the drawings show is what the ground allows, because the drawings started from the ground.",
  },
];

/* ---------- Page ---------- */

export default function EngineeringInnovationPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Transform + opacity only, so scrolling stays on the compositor
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1.03, 1.12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], ["0px", "-48px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#F8FAF8] text-[#0F172A] selection:bg-[#D4E012] selection:text-black relative overflow-x-clip font-sans-ui">
        <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

        {/* 01 / HERO */}
        <div className="sticky top-0 z-0 w-full h-screen">
          <section
            ref={heroRef}
            className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-black select-none"
          >
            <motion.div
              style={{ scale: bgScale, opacity: bgOpacity }}
              className="absolute inset-0 z-0 h-full w-full will-change-transform"
            >
              <Image
                src="/images/agrivoltaics-project.jpg"
                alt="Aerial view of a Sarhat solar site"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95 pointer-events-none" />
            </motion.div>

            <motion.div
              style={{ y: contentY, opacity: contentOpacity }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto pt-24 flex flex-col items-center text-center will-change-transform"
            >
              <div className="max-w-4xl flex flex-col items-center text-center">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-medium tracking-tight text-white mb-6 leading-[1.08] drop-shadow-lg">
                  See the plant <br />
                  <span className="text-[#D4E012] italic font-normal">before it exists</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-md">
                  Drones, 3D models and virtual reality help us understand the land, show you the plan and catch problems while they are still cheap to fix.
                </p>
              </div>
            </motion.div>

            <ScrollIndicator opacity={contentOpacity} />
          </section>
        </div>

        {/* 02 / CONTENT SHEET */}
        <div className="relative z-10 border-t border-slate-200/60 bg-[#F8FAF8] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]">
          {/* Intro */}
          <section className="pt-16 sm:pt-24 pb-4 bg-[#F8FAF8]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
                  <AnimatedPillBadge className="mb-6">INNOVATION</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Technology that makes the site</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      easier to understand
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
                    We use new tools for one reason: to remove guesswork between the land, the drawing and the finished plant. Here is how it works, from the first flight to the first year of operation.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* The four innovations, each with an animated scene */}
          <section className="py-12 sm:py-20 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <InnovationLenses blocks={blocks} />
            </div>
          </section>

          {/* Why it matters */}
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto mb-12">
                  <AnimatedPillBadge className="mb-6">WHY IT MATTERS</AnimatedPillBadge>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                    <span className="inline-block">Value Delivered.</span> <br />
                    <span className="text-[#6DAD45] italic relative inline-block">
                      What this changes for you
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
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <ScrollReveal key={b.title}>
                      <div className="h-full rounded-2xl border border-slate-200 bg-[#F8FAF8] p-7 text-center">
                        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-[#D4E012]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-5 font-serif-display text-xl font-medium text-slate-900">{b.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{b.body}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Related reading */}
          <section className="py-16 sm:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    href: "/solutions/engineering/system-design",
                    icon: PencilRuler,
                    tag: "System Design",
                    title: "From the model to the drawing package",
                    body: "See the electrical and structural design that comes out of this work.",
                  },
                  {
                    href: "/about/initiatives/agrovoltaics",
                    icon: Sprout,
                    tag: "Agrivoltaics",
                    title: "Land that does two jobs",
                    body: "How solar plants and farming can share the same ground.",
                  },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <ScrollReveal key={c.href}>
                      <Link
                        href={c.href}
                        className="group flex h-full flex-col rounded-3xl bg-slate-900 p-8 sm:p-10 text-white transition-transform duration-200 hover:-translate-y-1"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#D4E012]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="mt-6 font-mono text-xs uppercase tracking-wider text-[#D4E012]">{c.tag}</div>
                        <h3 className="mt-2 font-serif-display text-2xl sm:text-3xl font-medium">{c.title}</h3>
                        <p className="mt-3 flex-1 text-sm sm:text-base text-slate-300 font-light leading-relaxed">{c.body}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                          Learn more
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RELATED SOLUTIONS */}
          <RelatedSolutionsSection currentHref="/solutions/engineering/innovation" />

          {/* Final CTA */}
          <FinalCTA onOpenQuote={() => setQuoteModalOpen(true)} />
          <Footer />
        </div>

        <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      </main>
    </SmoothScroll>
  );
}

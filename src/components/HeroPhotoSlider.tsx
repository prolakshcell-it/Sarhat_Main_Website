"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const DEFAULT_SLIDES = [
  {
    src: "/images/ground-mounted-hero.jpg",
    alt: "Utility-scale ground-mounted solar plant",
    pan: -1,
  },
  {
    src: "/images/agrivoltaics-project.jpg",
    alt: "Agrivoltaics solar project",
    pan: 1,
  },
  {
    src: "/images/commercial-industrial-rooftop-solar.jpg",
    alt: "Commercial and industrial rooftop solar",
    pan: 1,
  },
  { src: "/images/Commission.png", alt: "Solar plant commissioning", pan: -1 },
  {
    src: "/images/open-access-solar.jpg",
    alt: "Open access solar project",
    pan: 1,
  },
  {
    src: "/images/ground-mounted-hero.jpg",
    alt: "Ground Mount Solar",
    pan: -1,
  },
  { src: "/images/Build.png", alt: "Solar plant under construction", pan: -1 },
  {
    src: "/images/surya-sarovar.jpg",
    alt: "Floating solar on a reservoir",
    pan: 1,
  },
];

interface Props {
  slides?: { src: string; alt: string; pan?: number }[];
  /** ms each photo stays on screen */
  interval?: number;
  className?: string;
}

/**
 * Full-bleed photo slideshow that behaves like a looping video:
 * cross-fades + slow Ken Burns zoom/pan. No arrows, dots or controls.
 */
export default function HeroPhotoSlider({
  slides = DEFAULT_SLIDES,
  interval = 5500,
  className = "",
}: Props) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (slides.length < 2) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      id = setInterval(
        () => setActive((i) => (i + 1) % slides.length),
        interval,
      );
    };
    const onVis = () => {
      if (id) clearInterval(id);
      if (!document.hidden) start();
    };
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      if (id) clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [slides.length, interval]);

  const fade = 1.4;
  const drift = interval / 1000 + fade + 1;

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-slate-950 ${className}`}
      aria-hidden="true"
    >
      {slides.map((s, i) => {
        const isActive = i === active;
        const dir = s.pan ?? (i % 2 ? 1 : -1);
        return (
          <motion.div
            key={`${s.src}-${i}`}
            className="absolute inset-0 will-change-transform"
            initial={false}
            animate={
              isActive
                ? {
                    opacity: 1,
                    scale: reduce ? 1.04 : 1.2,
                    x: reduce ? 0 : `${dir * 2.5}%`,
                    transition: {
                      opacity: { duration: fade, ease: "easeInOut" },
                      scale: { duration: drift, ease: "linear" },
                      x: { duration: drift, ease: "linear" },
                    },
                  }
                : {
                    opacity: 0,
                    scale: 1.06,
                    x: `${dir * -2.5}%`,
                    transition: {
                      opacity: { duration: fade, ease: "easeInOut" },
                      scale: { duration: 0, delay: fade },
                      x: { duration: 0, delay: fade },
                    },
                  }
            }
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              quality={80}
              priority={i < 2}
              className="object-cover object-center"
            />
          </motion.div>
        );
      })}
      {/* cinematic light sweep */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(212,224,18,0.14),transparent_55%)] mix-blend-screen" />
    </div>
  );
}

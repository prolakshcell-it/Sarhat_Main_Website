"use client";

import { useState, useEffect } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export interface HeroScrollValues {
  isPastHero: boolean;
  scrollY: MotionValue<number>;
  bgScale: MotionValue<number>;
  bgDim: MotionValue<number>;
  contentY: MotionValue<number>;
  contentScale: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  indicatorOpacity: MotionValue<number>;
}

/**
 * Standardized, GPU-optimized hook for full-page Curtain Reveal / Overlap Scroll.
 * Provides synchronized parallax zoom, scrim dimming, content float, and
 * viewport compositor offloading across all pages of the site.
 */
export function useHeroScroll(): HeroScrollValues {
  const { scrollY } = useScroll();
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Offload fixed hero layer from compositor once scrolled past 1.05x viewport height
      setIsPastHero(window.scrollY > window.innerHeight * 1.05);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Background slow cinematic zoom & subtle darkening scrim
  const bgScale = useTransform(scrollY, [0, 900], [1.02, 1.08]);
  const bgDim = useTransform(scrollY, [0, 800], [0.15, 0.55]);

  // Subtle upward parallax float for Hero Content while keeping it crisp and visible
  const contentY = useTransform(scrollY, [0, 800], [0, -50]);
  const contentScale = useTransform(scrollY, [0, 800], [1, 0.96]);
  const contentOpacity = useTransform(scrollY, [0, 650], [1, 0.65]);

  // Scroll indicator fades out early as soon as the user starts scrolling down
  const indicatorOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  return {
    isPastHero,
    scrollY,
    bgScale,
    bgDim,
    contentY,
    contentScale,
    contentOpacity,
    indicatorOpacity,
  };
}

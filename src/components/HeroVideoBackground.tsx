"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

interface Props {
  desktopSrc: string;
  mobileSrc?: string;
  poster: string;
  alt: string;
  className?: string;
}

/**
 * Premium looping hero video: poster paints instantly, video fades in once it can play,
 * smaller file on phones, still poster for reduced-motion, cinematic grade + vignette overlays.
 */
export default function HeroVideoBackground({ desktopSrc, mobileSrc, poster, alt, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    v.muted = true;
    const play = () => v.play().catch(() => {});
    play();
    // pause when tab hidden / hero off-screen to save battery
    const onVis = () => (document.hidden ? v.pause() : play());
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: 0.05 });
    io.observe(v);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, [reduce]);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-slate-950 ${className}`}>
      <Image src={poster} alt={alt} fill priority sizes="100vw" quality={80} className="object-cover object-center" />

      {!reduce && (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          disablePictureInPicture
          aria-hidden="true"
          onCanPlay={() => setReady(true)}>
          {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />}
          <source src={desktopSrc} type="video/mp4" />
        </video>
      )}

      {/* Cinematic grade: cool shadows + warm lime highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(212,224,18,0.18),transparent_55%)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#04121a]/50 via-transparent to-transparent" />
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)]" />
      {/* Letterbox-style bottom fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      {/* Fine scanline texture for premium feel */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.6)_0,rgba(255,255,255,0.6)_1px,transparent_1px,transparent_3px)]" />
    </div>
  );
}

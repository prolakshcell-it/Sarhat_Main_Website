"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Function to safely resolve target element with legacy aliases
    const resolveTarget = (hash: string): HTMLElement | null => {
      if (!hash || !hash.startsWith("#")) return null;
      let el = document.querySelector(hash) as HTMLElement | null;
      if (!el) {
        if (hash === "#renewable-energy") el = document.querySelector("#solar-energy");
        else if (hash === "#bess-storage") el = document.querySelector("#bess-hybrid");
        else if (hash === "#energy-infrastructure" || hash === "#civil-infrastructure") el = document.querySelector("#infrastructure");
      }
      return el;
    };

    const scrollToHash = (hash: string) => {
      const targetElement = resolveTarget(hash);
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: -100,
          duration: 1.2,
        });
      }
    };

    // Scroll to initial hash on mount
    if (typeof window !== "undefined" && window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 350);
      setTimeout(() => scrollToHash(window.location.hash), 750);
    }

    const handleHashChange = () => {
      scrollToHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);

    // Handle anchor link clicks smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
          const url = new URL(anchor.href, window.location.href);
          if (url.pathname === window.location.pathname) {
            const targetElement = resolveTarget(anchor.hash);
            if (targetElement) {
              e.preventDefault();
              lenis.scrollTo(targetElement, {
                offset: -100,
                duration: 1.2,
              });
              window.history.pushState(null, "", anchor.hash);
            }
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      return () => {
        document.removeEventListener("click", handleAnchorClick);
        window.removeEventListener("hashchange", handleHashChange);
        lenis.destroy();
      };
    }, []);

  return <>{children}</>;
}

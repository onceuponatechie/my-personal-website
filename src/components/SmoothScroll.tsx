"use client";

import { ReactLenis } from "lenis/react";

/**
 * Site-wide smooth scrolling. Wraps the app at the root so every native scroll
 * (and framer-motion useScroll/whileInView) rides the same eased momentum.
 * Tuned gentle — premium glide, not a slow-motion gimmick.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}

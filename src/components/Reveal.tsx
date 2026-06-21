"use client";

import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";

const DIR = {
  up: { y: 26 },
  down: { y: -26 },
  left: { x: -48 },
  right: { x: 48 },
  none: {},
} as const;

/**
 * A light, premium scroll reveal used across the site. Elements fade and drift
 * into frame — up by default, or in from the left/right for cards — on the
 * shared editorial easing. Optionally de-blurs for a softer text reveal.
 */
export function Reveal({
  children,
  dir = "up",
  blur = false,
  delay = 0,
  duration = 0.7,
  className,
}: {
  children: React.ReactNode;
  dir?: keyof typeof DIR;
  blur?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, ...DIR[dir], ...(blur ? { filter: "blur(8px)" } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={viewportOnce}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

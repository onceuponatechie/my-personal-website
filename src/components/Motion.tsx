"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

type Dir = "up" | "down" | "left" | "right" | "none";

const dirMap: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: -56 },
  right: { x: 56 },
  none: {},
};

/**
 * Bidirectional reveal — fades/slides in from a direction every time it enters
 * the viewport, and resets when it leaves. The shared editorial easing keeps it
 * in the same hand as the rest of the site.
 */
export function Reveal({
  children,
  dir = "up",
  delay = 0,
  duration = 0.7,
  once = false,
  amount = 0.3,
  className,
}: {
  children: React.ReactNode;
  dir?: Dir;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, ...dirMap[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word line-mask reveal for plain-text headings. Each word rises out of
 * a clipped line, staggered — the premium "type sets itself" effect.
 */
export function RevealText({
  text,
  className,
  once = false,
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
              show: { y: 0, transition: { duration: 0.65, ease: EASE } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Subtle scroll parallax. Translates its child as the element travels through
 * the viewport — keep `distance` small so it elevates rather than distracts.
 */
export function Parallax({
  children,
  distance = 40,
  className,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

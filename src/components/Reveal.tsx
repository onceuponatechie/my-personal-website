"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
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

const wordContainer = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

/**
 * Word-by-word text reveal on scroll — each word rises and de-blurs in
 * sequence. Drop it inside any heading or paragraph; it inherits the type.
 */
export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={wordContainer(delay, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={className}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block whitespace-pre">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Scroll parallax — translates its children on the Y axis as the element
 * passes through the viewport, slower than the page, for a sense of depth.
 */
export function Parallax({
  children,
  from = 40,
  to = -40,
  className,
}: {
  children: React.ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

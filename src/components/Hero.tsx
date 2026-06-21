"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SmileyMark } from "@/components/SmileyMark";
import { PillBadge, ArrowRight } from "@/components/SiteChrome";

const inline1 = "/assets/inline-1.jpg";
const inline2 = "/assets/inline-2.jpg";
const inline3 = "/assets/inline-3.jpg";
const inline4 = "/assets/inline-4.jpg";

/** One shared easing for the whole entrance cascade. */
const HERO_EASE = [0.25, 0.1, 0.25, 1] as const;

const SET_A = [inline1, inline2, inline3, inline4];
const SET_B = [inline3, inline4, inline1, inline2];

/**
 * A 72×44 rounded thumbnail embedded inline in the headline. It crossfades
 * through four images on a 3s interval (opacity over 0.8s). Pass different
 * `start` offsets to two instances so they drift out of sync.
 */
function MediaBox({
  images,
  start = 0,
  delay,
}: {
  images: string[];
  start?: number;
  delay: number;
}) {
  const [i, setI] = useState(start % images.length);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: HERO_EASE, delay }}
      className="relative mx-1.5 inline-block h-[44px] w-[72px] -translate-y-1.5 overflow-hidden rounded-2xl align-middle shadow-[0_12px_28px_-14px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
    >
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[800ms] ease-out"
          style={{ opacity: idx === i ? 1 : 0 }}
        />
      ))}
    </motion.span>
  );
}

/** Headline line: de-blurs in from opacity 0 + blur(6px). */
function Line({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: HERO_EASE, delay }}
      className="inline"
    >
      {children}
    </motion.span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Scroll parallax: as the hero scrolls away, the inner content drifts down
  // 150px — slower than the page — for a felt sense of depth.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
      style={{
        background:
          "radial-gradient(130% 120% at 50% -10%, oklch(0.95 0.035 92 / 0.55), transparent 55%), radial-gradient(110% 120% at 80% 110%, oklch(0.93 0.05 320 / 0.35), transparent 55%)",
      }}
    >
      {/* Big blurred white glow blob behind the content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-70 blur-[120px]"
      />

      <motion.div
        style={{ y }}
        className="relative mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        {/* Graphics snap in first, small → full. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: HERO_EASE, delay: 0 }}
        >
          <SmileyMark />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: HERO_EASE, delay: 0.08 }}
          className="mt-5"
        >
          <PillBadge>Open to Collaborations</PillBadge>
        </motion.div>

        {/* Then the text de-blurs, top line to bottom. The two MediaBoxes pop
            in earlier (they're siblings, not children, so their entrance is
            independent of the lines' opacity). */}
        <h1 className="mt-8 font-display text-[clamp(2.6rem,6vw,4.75rem)] leading-[1.18] tracking-[-0.01em] text-foreground">
          <Line delay={0.4}>
            <span className="italic">Products</span>, <span className="italic">people</span>,
          </Line>
          <br />
          <Line delay={0.62}>and the</Line>
          <MediaBox images={SET_A} start={0} delay={0.14} />
          <Line delay={0.62}>
            <span className="italic">stories</span>
          </Line>
          <br />
          <Line delay={0.84}>that connect</Line>
          <MediaBox images={SET_B} start={2} delay={0.18} />
          <Line delay={0.84}>them.</Line>
        </h1>

        {/* Tail: subheadline, then the CTA row, settle last. */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: HERO_EASE, delay: 1.06 }}
          className="mt-7 text-[15px] text-muted-foreground"
        >
          Researcher <span className="mx-2 opacity-50">·</span> Builder
          <span className="mx-2 opacity-50">·</span> Storyteller
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: HERO_EASE, delay: 1.24 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_10px_24px_-12px_oklch(0.72_0.07_145/0.7)] transition hover:brightness-105"
          >
            Explore My Work
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#resources"
            className="group inline-flex items-center gap-1.5 text-[14px] text-foreground underline underline-offset-4 hover:opacity-70"
          >
            Or grab a freebie
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { TypeWord } from "@/components/TypeOn";

const WORDS = [
  "Around",
  "here,",
  "ideas",
  "turn",
  "into",
  "websites,",
  "apps,",
  "decks,",
  "stories,",
  "&",
  "digital",
  "experiences",
  "built",
  "with",
  "the",
  "user",
  "in",
  "mind.",
];

/* ---------- 3D tooltip tags ---------- */

type Tag = {
  label: string;
  /** Glossy 3D face — gradient top-light, colored drop shadow. */
  face: string;
  /** Solid fill for the tail, matching the gradient edge it grows from. */
  tailBg: string;
  /** Where the bubble sits around the text block. */
  pos: string;
  /** Tail points toward the text: down for top bubbles, up for the bottom one. */
  tail: "down" | "up";
  rotate: number;
  /** Idle float timing offset so the three never bob in sync. */
  delay: number;
};

const TAGS: Tag[] = [
  {
    label: "@creator",
    face: "bg-gradient-to-b from-[#4a4a55] to-[#1c1c22] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_26px_-10px_rgba(28,28,34,0.6)]",
    tailBg: "bg-[#1c1c22]",
    pos: "left-[6%] -top-5 sm:left-[12%] sm:-top-7",
    tail: "down",
    rotate: -7,
    delay: 0,
  },
  {
    label: "@storyteller",
    face: "bg-gradient-to-b from-[oklch(0.8_0.07_145)] to-[oklch(0.62_0.08_145)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_26px_-10px_oklch(0.62_0.08_145/0.65)]",
    tailBg: "bg-[oklch(0.62_0.08_145)]",
    pos: "right-[5%] -top-6 sm:right-[10%] sm:-top-8",
    tail: "down",
    rotate: 6,
    delay: 0.8,
  },
  {
    label: "@builder",
    face: "bg-gradient-to-b from-[oklch(0.95_0.06_93)] to-[oklch(0.87_0.13_93)] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_14px_26px_-10px_oklch(0.87_0.13_93/0.65)]",
    tailBg: "bg-[oklch(0.95_0.06_93)]",
    pos: "-bottom-2 right-[20%] sm:-bottom-4 sm:right-[33%]",
    tail: "up",
    rotate: 5,
    delay: 1.6,
  },
];

/** A glossy speech-bubble tag floating around the manifesto — pops in with a
 * spring (and back out when scrolled away), then bobs gently in place. */
function ToolTag({ tag }: { tag: Tag }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.4, y: tag.tail === "down" ? 14 : -14, rotate: tag.rotate * 3 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: tag.rotate }}
      viewport={{ margin: "-10% 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 240, damping: 17 }}
      className={`absolute z-10 ${tag.pos}`}
      aria-hidden
    >
      <motion.span
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.6, ease: "easeInOut", repeat: Infinity, delay: tag.delay }}
        className="relative inline-block"
      >
        <span
          className={`relative inline-block rounded-[14px] px-3.5 py-1.5 text-[14px] font-medium tracking-tight sm:px-4 sm:py-2 ${tag.face}`}
        >
          {tag.label}
          {/* Bubble tail — a rotated rounded square peeking out of the face. */}
          <span
            className={`absolute left-1/2 size-2.5 -translate-x-1/2 rotate-45 rounded-[3px] ${
              tag.tail === "down" ? "-bottom-1" : "-top-1"
            } ${tag.tailBg}`}
          />
        </span>
      </motion.span>
    </motion.span>
  );
}

// Pre-compute each word's start index so characters type out in one
// continuous left-to-right sweep.
let cursor = 0;
const TIMED = WORDS.map((word) => {
  const start = cursor;
  cursor += word.length + 1;
  return { word, start };
});
const TOTAL = cursor;

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Calmer, balanced sweep across a longer scroll distance.
    offset: ["start 0.88", "center 0.24"],
  });

  return (
    <section ref={ref} className="px-4 pt-16 pb-32 sm:pt-20 sm:pb-44">
      <div className="relative mx-auto max-w-4xl">
        {/* Three glossy tooltip tags — two above, one at bottom right. */}
        {TAGS.map((t) => (
          <ToolTag key={t.label} tag={t} />
        ))}

        <p className="text-center font-display text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.3] tracking-tight text-ink">
          {TIMED.map(({ word, start }, i) => (
            <TypeWord key={i} progress={scrollYProgress} word={word} startIndex={start} total={TOTAL} />
          ))}
        </p>
      </div>
    </section>
  );
}

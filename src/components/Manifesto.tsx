"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { InlineMedia } from "@/components/InlineMedia";
import { TypeUnit, TypeWord } from "@/components/TypeOn";

const inline1 = "/assets/inline-1.jpg";
const inline2 = "/assets/inline-2.jpg";
const inline3 = "/assets/inline-3.jpg";
const inline4 = "/assets/inline-4.jpg";

type Segment =
  | { type: "w"; t: string }
  | { type: "m"; kind: "phone" | "user" };

const SEGMENTS: Segment[] = [
  { type: "w", t: "Around" },
  { type: "w", t: "here," },
  { type: "w", t: "ideas" },
  { type: "w", t: "turn" },
  { type: "w", t: "into" },
  { type: "w", t: "websites," },
  { type: "w", t: "apps," },
  { type: "m", kind: "phone" },
  { type: "w", t: "decks," },
  { type: "w", t: "stories," },
  { type: "w", t: "&" },
  { type: "w", t: "digital" },
  { type: "w", t: "experiences" },
  { type: "w", t: "built" },
  { type: "w", t: "with" },
  { type: "w", t: "the" },
  { type: "w", t: "user" },
  { type: "m", kind: "user" },
  { type: "w", t: "in" },
  { type: "w", t: "mind." },
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
    pos: "-bottom-8 right-[8%] sm:-bottom-10 sm:right-[14%]",
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
          className={`relative inline-block rounded-[14px] px-3.5 py-1.5 text-[12px] font-medium tracking-tight sm:px-4 sm:py-2 sm:text-[13px] ${tag.face}`}
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

/** How many character-steps an inline media chip occupies in the sequence. */
const MEDIA_SPAN = 3;

// Pre-compute each segment's start index so characters type out in one
// continuous left-to-right sweep across words and media alike.
let cursor = 0;
const TIMED = SEGMENTS.map((seg) => {
  const start = cursor;
  cursor += seg.type === "w" ? seg.t.length + 1 : MEDIA_SPAN;
  return { seg, start };
});
const TOTAL = cursor;

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Calmer, balanced sweep across a longer scroll distance.
    offset: ["start 0.88", "center 0.34"],
  });

  return (
    <section ref={ref} className="px-4 pt-16 pb-32 sm:pt-20 sm:pb-44">
      <div className="relative mx-auto max-w-4xl">
        {/* Three glossy tooltip tags — two above, one at bottom right. */}
        {TAGS.map((t) => (
          <ToolTag key={t.label} tag={t} />
        ))}

        <p className="text-center font-display text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.3] tracking-tight text-ink">
          {TIMED.map(({ seg, start }, i) =>
            seg.type === "w" ? (
              <TypeWord key={i} progress={scrollYProgress} word={seg.t} startIndex={start} total={TOTAL} />
            ) : (
              <TypeUnit key={i} progress={scrollYProgress} index={start} total={TOTAL} className="mx-1 align-middle">
                {seg.kind === "phone" ? (
                  <InlineMedia
                    images={[inline2, inline4]}
                    shape="pill"
                    className="h-[0.85em] w-[0.55em] -translate-y-0.5"
                    alt="phone"
                  />
                ) : (
                  <InlineMedia
                    images={[inline1, inline3]}
                    className="h-[0.85em] w-[0.85em] -translate-y-0.5 rounded-full"
                    alt="user"
                  />
                )}{" "}
              </TypeUnit>
            )
          )}
        </p>
      </div>
    </section>
  );
}

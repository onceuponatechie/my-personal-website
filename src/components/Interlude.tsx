"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { wordRevealRange } from "@/lib/motion";

/* A second one-line manifesto — same scroll-driven word sweep as the one
 * before Projects, but leaning on italic sage accents instead of inline
 * media, so the two read as siblings rather than twins. */

type Segment = { t: string; accent?: boolean };

const SEGMENTS: Segment[] = [
  { t: "Nothing" },
  { t: "here" },
  { t: "is" },
  { t: "just" },
  { t: "for" },
  { t: "show" },
  { t: "—" },
  { t: "every" },
  { t: "template," },
  { t: "tool," },
  { t: "&" },
  { t: "lesson" },
  { t: "is" },
  { t: "yours", accent: true },
  { t: "to" },
  { t: "take,", accent: true },
  { t: "remix," },
  { t: "and" },
  { t: "build" },
  { t: "with." },
];

function Reveal({
  progress,
  index,
  total,
  accent,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  accent?: boolean;
  children: React.ReactNode;
}) {
  const [start, end] = wordRevealRange(index, total, { spread: 3.5 });
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "italic text-sage" : "text-ink"}>
      {children}
    </motion.span>
  );
}

export function Interlude() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.4"],
  });

  return (
    <section ref={ref} className="px-4 pt-8 pb-20 sm:pt-12 sm:pb-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-center font-display text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.3] tracking-tight">
          {SEGMENTS.map((s, i) => (
            <Reveal key={i} progress={scrollYProgress} index={i} total={SEGMENTS.length} accent={s.accent}>
              {s.t}{" "}
            </Reveal>
          ))}
        </p>
      </div>
    </section>
  );
}

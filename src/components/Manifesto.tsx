"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { InlineMedia } from "@/components/InlineMedia";

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

function Reveal({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const start = index / total;
  const end = Math.min(1, (index + 2.5) / total);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="text-ink">
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });

  return (
    <section ref={ref} className="px-4 py-40 sm:py-52">
      <div className="mx-auto max-w-4xl">
        <p className="text-center font-display text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.3] tracking-tight">
          {SEGMENTS.map((p, i) => (
            <Reveal key={i} progress={scrollYProgress} index={i} total={SEGMENTS.length}>
              {p.type === "w" ? (
                <>{p.t} </>
              ) : (
                <span className="mx-1 inline-block align-middle">
                  {p.kind === "phone" ? (
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
                </span>
              )}
            </Reveal>
          ))}
        </p>
      </div>
    </section>
  );
}

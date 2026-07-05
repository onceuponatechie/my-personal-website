"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
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
    offset: ["start 0.85", "center 0.4"],
  });

  return (
    <section ref={ref} className="px-4 pt-12 pb-28 sm:pt-16 sm:pb-40">
      <div className="mx-auto max-w-4xl">
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

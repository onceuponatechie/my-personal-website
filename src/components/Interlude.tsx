"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { InlineMedia } from "@/components/InlineMedia";
import { TypeUnit, TypeWord } from "@/components/TypeOn";

const inline1 = "/assets/inline-1.jpg";
const inline2 = "/assets/inline-2.jpg";
const inline3 = "/assets/inline-3.jpg";
const inline4 = "/assets/inline-4.jpg";

/* A second one-line manifesto — same scroll-scrubbed typewriter and blob
 * inline media as the one before Projects, told as a story that hands you
 * the goods: build in the open, keep what falls out of it. */

type Segment =
  | { type: "w"; t: string; accent?: boolean }
  | { type: "m"; images: string[] };

const SEGMENTS: Segment[] = [
  { type: "w", t: "I" },
  { type: "w", t: "build" },
  { type: "w", t: "in" },
  { type: "w", t: "the" },
  { type: "w", t: "open" },
  { type: "w", t: "—" },
  { type: "w", t: "so" },
  { type: "w", t: "the" },
  { type: "w", t: "templates" },
  { type: "m", images: [inline4, inline1] },
  { type: "w", t: "I" },
  { type: "w", t: "plan" },
  { type: "w", t: "with," },
  { type: "w", t: "the" },
  { type: "w", t: "tools" },
  { type: "w", t: "I" },
  { type: "w", t: "swear" },
  { type: "w", t: "by," },
  { type: "w", t: "&" },
  { type: "w", t: "the" },
  { type: "w", t: "lessons" },
  { type: "m", images: [inline3, inline2] },
  { type: "w", t: "I" },
  { type: "w", t: "learn" },
  { type: "w", t: "are" },
  { type: "w", t: "yours", accent: true },
  { type: "w", t: "to" },
  { type: "w", t: "keep.", accent: true },
];

/** How many character-steps an inline media chip occupies in the sequence. */
const MEDIA_SPAN = 3;

// Continuous character indices across words and media, so the line types out
// in one left-to-right sweep.
let cursor = 0;
const TIMED = SEGMENTS.map((seg) => {
  const start = cursor;
  cursor += seg.type === "w" ? seg.t.length + 1 : MEDIA_SPAN;
  return { seg, start };
});
const TOTAL = cursor;

export function Interlude() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.4"],
  });

  return (
    <section ref={ref} className="px-4 pt-8 pb-20 sm:pt-12 sm:pb-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-center font-display text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.3] tracking-tight text-ink">
          {TIMED.map(({ seg, start }, i) =>
            seg.type === "w" ? (
              <TypeWord
                key={i}
                progress={scrollYProgress}
                word={seg.t}
                startIndex={start}
                total={TOTAL}
                className={seg.accent ? "italic text-sage" : ""}
              />
            ) : (
              <TypeUnit key={i} progress={scrollYProgress} index={start} total={TOTAL} className="mx-1 align-middle">
                <InlineMedia
                  images={seg.images}
                  className="h-[0.85em] w-[0.95em] -translate-y-0.5"
                  alt=""
                />{" "}
              </TypeUnit>
            )
          )}
        </p>
      </div>
    </section>
  );
}

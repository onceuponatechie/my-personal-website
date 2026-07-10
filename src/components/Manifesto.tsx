"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Frame, LayoutGrid, MousePointerClick, PenLine, Search, Spline } from "lucide-react";
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

/* ---------- Skill pills ---------- */

type Skill = {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Colored disc behind the icon. */
  disc: string;
  /** Resting tilt — pills settle slightly askew, like they were tossed there. */
  rotate: number;
  /** Nudge toward/away from the text so the stack reads clustered, not listed. */
  shift: string;
};

const LEFT_SKILLS: Skill[] = [
  { label: "Product Design", icon: Frame, disc: "bg-sage text-white", rotate: -8, shift: "xl:ml-0" },
  { label: "UX Research", icon: Search, disc: "bg-lavender text-ink", rotate: 5, shift: "xl:ml-10" },
  { label: "Prototyping", icon: MousePointerClick, disc: "bg-butter text-ink", rotate: -4, shift: "xl:ml-3" },
];

const RIGHT_SKILLS: Skill[] = [
  { label: "Design Systems", icon: LayoutGrid, disc: "bg-ink text-white", rotate: 7, shift: "xl:mr-1" },
  { label: "Storytelling", icon: PenLine, disc: "bg-sage text-white", rotate: -5, shift: "xl:mr-9" },
  { label: "Animation", icon: Spline, disc: "bg-lavender text-ink", rotate: 4, shift: "xl:mr-2" },
];

/** One pill — white, softly shadowed, icon on a colored disc. Slides in from
 * its side of the text with an exaggerated tilt that springs to rest, and
 * plays in reverse when scrolled back out. */
function SkillPill({ skill, side, index }: { skill: Skill; side: "left" | "right"; index: number }) {
  const Icon = skill.icon;
  return (
    <motion.li
      initial={{ opacity: 0, x: side === "left" ? -56 : 56, rotate: skill.rotate * 3, scale: 0.7 }}
      whileInView={{ opacity: 1, x: 0, rotate: skill.rotate, scale: 1 }}
      // Vertical-only margin: a horizontal one (e.g. "-12%") shrinks the
      // trigger zone from the sides too, and these pills hug the viewport
      // edges — at laptop widths their observers never fired.
      viewport={{ margin: "-10% 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 220, damping: 20, delay: index * 0.09 }}
      className={`flex w-fit items-center gap-2.5 rounded-full bg-card py-1.5 pl-2 pr-4 shadow-[0_16px_34px_-14px_rgba(0,0,0,0.22)] ring-1 ring-black/5 ${skill.shift}`}
    >
      <span className={`grid size-7 place-items-center rounded-full ${skill.disc}`}>
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      <span className="text-[13px] font-medium text-ink">{skill.label}</span>
    </motion.li>
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
    <section ref={ref} className="px-4 pt-12 pb-28 sm:pt-16 sm:pb-40">
      <div className="relative mx-auto max-w-6xl">
        {/* Skill clusters flanking the manifesto on wide desktops (xl+) —
            below that the gutters are too narrow and the pills would sit on
            the headline itself, so they fold under the text instead. */}
        <ul className="absolute left-0 top-1/2 hidden -translate-y-1/2 flex-col items-start gap-3 xl:flex" aria-label="Skills">
          {LEFT_SKILLS.map((s, i) => (
            <SkillPill key={s.label} skill={s} side="left" index={i} />
          ))}
        </ul>
        <ul className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex" aria-label="Skills">
          {RIGHT_SKILLS.map((s, i) => (
            <SkillPill key={s.label} skill={s} side="right" index={i} />
          ))}
        </ul>

        <div className="mx-auto max-w-4xl xl:max-w-3xl">
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

        {/* Below xl the clusters fold into one loose pile under the text. */}
        <ul className="mt-9 flex flex-wrap items-center justify-center gap-2.5 xl:hidden" aria-label="Skills">
          {[...LEFT_SKILLS, ...RIGHT_SKILLS].map((s, i) => (
            <SkillPill key={s.label} skill={s} side={i % 2 ? "right" : "left"} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/site-data";
import { CurvedUnderline } from "@/components/CurvedUnderline";
import { EASE } from "@/lib/motion";

/* Soft brand tints the cards rotate through as they stack. */
const CARD_TINTS = ["bg-butter-soft", "bg-sage-soft", "bg-lavender-soft", "bg-card"];

/* Split the lead outcome ("38% faster decision loop") into a big value and a
   small caption for the floating stat chip. */
function statParts(outcome: string): [string, string] {
  const m = outcome.match(/^(\$?[\d.,]+\s?[%★xM+]?)\s*(.*)$/);
  return m ? [m[1].trim(), m[2]] : [outcome, ""];
}

/* Card body — compact on mobile so it fits the screen; on desktop it runs
   nearly full-viewport tall so each card reads like its own scene before the
   next one stacks over it. Styled as a soft-tinted editorial slab: pill tag,
   display heading, and copy on the left; image with a floating stat chip and
   round action marks on the right. */
function ProjectArticle({ p, index }: { p: Project; index: number }) {
  const tint = CARD_TINTS[index % CARD_TINTS.length];
  const [statValue, statCaption] = statParts(p.outcomes[0]);
  const darkChip = index % 2 === 0;

  return (
    <article
      className={`group relative grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[32px] ${tint} shadow-[0_1px_2px_rgba(0,0,0,0.03),0_24px_44px_-32px_rgba(0,0,0,0.14)] ring-1 ring-black/5 md:min-h-[72vh] md:grid-cols-2 md:rounded-[44px] lg:min-h-[78vh]`}
    >
      {/* Whole-card link — lets you click anywhere on the active card. */}
      <Link
        href={`/projects/${p.slug}`}
        aria-label={`View ${p.title} case study`}
        className="absolute inset-0 z-10"
      />

      <div className="order-2 flex flex-col justify-center gap-3.5 p-6 pt-2 md:order-1 md:gap-5 md:p-12">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-3.5 py-1.5 text-[12px] font-medium text-ink/70">
          <span className="size-1.5 rounded-full bg-sage" aria-hidden />
          {p.tags[0]}
        </span>
        <h3 className="font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.1] text-ink">
          {p.title}
        </h3>
        <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink/45">
          <span>{p.year}</span>
          <span className="size-1 rounded-full bg-ink/30" />
          <span>{p.role}</span>
        </div>
        <p className="line-clamp-3 max-w-[44ch] text-[14px] leading-[1.6] text-ink/65 md:line-clamp-none md:text-[15px]">{p.description}</p>
        <div className="relative z-20 mt-1 flex w-fit items-center gap-5 md:mt-3">
          <Link
            href={`/projects/${p.slug}`}
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-white shadow-sm transition hover:bg-ink"
          >
            View Case Study
            <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" strokeWidth={2.2} />
          </Link>
          <a
            href={p.liveHref}
            target="_blank"
            rel="noreferrer"
            className="group/live inline-flex items-center gap-1 text-[14px] text-ink underline-offset-4 hover:underline"
          >
            Go live
            <ArrowUpRight className="size-3.5 transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" strokeWidth={2.2} />
          </a>
        </div>
      </div>

      <div className="order-1 p-3 md:order-2 md:p-4">
        <div className="relative md:h-full">
          <div className="overflow-hidden rounded-[24px] md:h-full md:rounded-[32px]">
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-active:scale-[1.04] md:aspect-auto"
            />
          </div>

          {/* Floating stat chip — the project's lead outcome, dropped onto the
              photo like a sticker when the card scrolls into view. */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.75, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: darkChip ? -3 : 2 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 20 }}
            className={`absolute left-4 top-4 flex max-w-[60%] items-center gap-3 rounded-2xl p-3.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)] md:left-6 md:top-6 md:p-4 ${
              darkChip ? "bg-ink text-white" : "bg-card text-ink"
            }`}
          >
            <div>
              <div className="text-[20px] font-semibold leading-none md:text-[24px]">{statValue}</div>
              {statCaption && (
                <div className={`mt-1.5 max-w-[14ch] text-[10px] leading-[1.35] md:text-[11px] ${darkChip ? "text-white/65" : "text-ink/55"}`}>
                  {statCaption}
                </div>
              )}
            </div>
            <div className="flex items-end gap-[3px]" aria-hidden>
              {[5, 9, 13, 17].map((h) => (
                <span key={h} className="w-1 rounded-full bg-current opacity-50" style={{ height: h }} />
              ))}
            </div>
          </motion.div>

          {/* Round action marks in the photo's corner, echoing the whole-card
              link (decorative — the real link covers the card). */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 md:bottom-6 md:right-6" aria-hidden>
            <span className="grid size-9 place-items-center rounded-full bg-card/85 text-ink shadow-sm backdrop-blur-sm transition-colors duration-300 group-hover:bg-card">
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </span>
            <span className="grid size-9 place-items-center rounded-full bg-ink text-white shadow-sm">
              <span className="text-[11px] font-medium">0{index + 1}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* Sticky card that scales/lifts as the next one stacks over it. */
function ProjectCardSticky({
  p,
  index,
  total,
  progress,
}: {
  p: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slot = 1 / total;
  const start = index * slot;
  const end = start + slot;
  const isLast = index === total - 1;

  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.94]);
  const y = useTransform(progress, [start, end], [0, isLast ? 0 : -24]);

  return (
    // Each card gets a full viewport of scroll and is pinned near the top, so
    // it reads completely before the next stacks on top. The "explore all"
    // CTA lives inside the LAST slot, pinned just under the final card — so it
    // hugs the stack instead of floating a viewport away near the next section.
    <div className="sticky top-20 flex min-h-screen flex-col items-center justify-start pt-2 md:top-24">
      <motion.div style={{ scale, y, zIndex: index + 1 }} className="w-full max-w-6xl">
        <ProjectArticle p={p} index={index} />
      </motion.div>
      {isLast && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-8 md:mt-10"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-[14px] font-medium text-ink transition hover:bg-ink hover:text-white"
          >
            Explore all projects
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="px-4 pb-32 sm:px-6 md:pb-20">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-[clamp(2.75rem,6vw,4.75rem)] italic leading-none tracking-tight text-ink"
        >
          <CurvedUnderline>projects</CurvedUnderline>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
          className="mx-auto mt-5 max-w-[44ch] text-[14px] leading-[1.65] text-ink/65"
        >
          A small set of products built with care — calm interfaces, careful copy, and a quiet bias for shipping.
        </motion.p>
      </div>

      {/* Sticky scroll-stack — same behaviour on mobile and desktop. The CTA
          rides inside the final card's slot (see ProjectCardSticky). */}
      <div ref={ref} className="relative" style={{ height: `${PROJECTS.length * 100}vh` }}>
        {PROJECTS.map((p, i) => (
          <ProjectCardSticky key={p.slug} p={p} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

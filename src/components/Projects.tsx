"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

const contentStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const contentRise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * One full-viewport project panel: full-bleed cover under an ink scrim,
 * oversized display title, hairline-separated tags, and the case-study CTA.
 * Each panel pins while it reads, then the next slides up and stacks over it
 * while this one recedes — scaling down and dimming underneath.
 */
function ProjectPanel({
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

  // Recede under the incoming card: shrink slightly and fall into shadow.
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.94]);
  const dim = useTransform(progress, [start, end], [0, isLast ? 0 : 0.55]);
  // The cover settles from a gentle zoom as the panel takes the stage.
  const imgScale = useTransform(progress, [Math.max(0, start - slot * 0.8), start + slot * 0.45], [1.14, 1]);

  return (
    <div className="sticky top-20 flex min-h-screen flex-col items-center justify-start pt-2 md:top-24">
      <motion.div style={{ scale, zIndex: index + 1 }} className="relative w-full max-w-6xl">
        <article className="group relative flex h-[calc(100svh-7rem)] max-h-[860px] min-h-[540px] w-full flex-col justify-end overflow-hidden rounded-[32px] bg-ink text-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] ring-1 ring-black/10 md:rounded-[44px]">
          {/* Whole-panel link — click anywhere to open the case study. */}
          <Link href={`/projects/${p.slug}`} aria-label={`View ${p.title} case study`} className="absolute inset-0 z-10" />

          <motion.img
            src={p.image}
            alt={p.title}
            loading={index === 0 ? "eager" : "lazy"}
            style={{ scale: imgScale }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Ink scrim so the type stays legible over any cover. */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/15" />

          {/* Top meta rail */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 text-[11px] uppercase tracking-[0.22em] text-white/60 sm:px-10 sm:pt-8 sm:text-[12px]">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span>{p.year}</span>
          </div>

          {/* Bottom editorial block */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={contentStagger}
            className="relative p-6 sm:p-10 md:p-12"
          >
            <motion.p variants={contentRise} className="text-[11px] uppercase tracking-[0.24em] text-white/55 sm:text-[12px]">
              {p.role}
            </motion.p>
            <motion.h3
              variants={contentRise}
              className="mt-3 font-display text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.98] tracking-tight"
            >
              {p.title}
            </motion.h3>
            <motion.p variants={contentRise} className="mt-4 max-w-[52ch] text-[14px] leading-[1.65] text-white/75 sm:text-[15px]">
              {p.description}
            </motion.p>
            <motion.div
              variants={contentRise}
              className="mt-5 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-white/60 sm:text-[12px]"
            >
              {p.tags.map((t, j) => (
                <span key={t} className="flex items-center gap-3.5">
                  {j > 0 && <span aria-hidden className="h-3 w-px bg-white/25" />}
                  {t}
                </span>
              ))}
            </motion.div>
            <motion.div variants={contentRise} className="relative z-20 mt-8 flex w-fit flex-wrap items-center gap-6">
              <Link
                href={`/projects/${p.slug}`}
                className="group/btn inline-flex items-center gap-1.5 rounded-full bg-sage px-6 py-3 text-[13px] font-medium text-white shadow-sm transition hover:bg-lavender hover:text-ink"
              >
                View Case Study
                <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" strokeWidth={2.2} />
              </Link>
              <a
                href={p.liveHref}
                target="_blank"
                rel="noreferrer"
                className="group/live inline-flex items-center gap-1 text-[13px] text-white underline underline-offset-4 transition hover:opacity-70"
              >
                Go live
                <ArrowUpRight className="size-3.5 transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" strokeWidth={2.2} />
              </a>
            </motion.div>
          </motion.div>

          {/* Falls into shadow as the next panel stacks over it. */}
          <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-20 bg-ink" />
        </article>
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
      {/* Oversized wordmark — sharpens out of a blur, then the first panel
          rises to cover it, echoing the stacked-takeover rhythm. */}
      <div className="mx-auto mb-10 max-w-6xl text-center md:mb-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-2 text-[12px] uppercase tracking-[0.22em] text-ink/50"
        >
          The work · Built &amp; shipped
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1, ease: EASE }}
          className="font-display text-[clamp(3.5rem,13vw,10.5rem)] italic leading-[0.9] tracking-tight text-ink"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
          className="mx-auto mt-4 max-w-[44ch] text-[14px] leading-[1.65] text-ink/65"
        >
          A small set of products built with care — calm interfaces, careful copy, and a quiet bias for shipping.
        </motion.p>
      </div>

      {/* Sticky scroll-stack — each panel gets a full viewport of scroll, pins
          while it reads, and the next slides up over it. */}
      <div ref={ref} className="relative" style={{ height: `${PROJECTS.length * 100}vh` }}>
        {PROJECTS.map((p, i) => (
          <ProjectPanel key={p.slug} p={p} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

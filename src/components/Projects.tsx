"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/site-data";
import { CurvedUnderline } from "@/components/CurvedUnderline";
import { EASE } from "@/lib/motion";

/* Card body — compact on mobile so it fits the screen, full on desktop. */
function ProjectArticle({ p }: { p: Project }) {
  return (
    <article className="group relative grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[32px] bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] ring-1 ring-black/5 md:grid-cols-2 md:rounded-[44px]">
      {/* Whole-card link — lets you click anywhere on the active card. */}
      <Link
        href={`/projects/${p.slug}`}
        aria-label={`View ${p.title} case study`}
        className="absolute inset-0 z-10"
      />
      <div className="p-3 md:p-4">
        <div className="overflow-hidden rounded-[24px] md:rounded-[32px]">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            width={1280}
            height={960}
            className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-active:scale-[1.04] md:aspect-[4/3]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-3.5 p-6 md:gap-5 md:p-12">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ink/45 md:text-[12px]">
          <span>{p.year}</span>
          <span className="size-1 rounded-full bg-ink/30" />
          <span>{p.role}</span>
        </div>
        <h3 className="font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.04] tracking-tight text-ink">
          {p.title}
        </h3>
        <p className="line-clamp-3 max-w-[44ch] text-[14px] leading-[1.6] text-ink/65">{p.description}</p>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-foreground/5 px-3 py-1 text-[12px] text-ink/70">
              {t}
            </span>
          ))}
        </div>
        <div className="relative z-20 mt-1 flex w-fit items-center gap-5 md:mt-3">
          <Link
            href={`/projects/${p.slug}`}
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition hover:brightness-105"
          >
            View Case Study
            <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" strokeWidth={2.2} />
          </Link>
          <a
            href={p.liveHref}
            target="_blank"
            rel="noreferrer"
            className="group/live inline-flex items-center gap-1 text-[13px] text-ink underline-offset-4 hover:underline"
          >
            Go live
            <ArrowUpRight className="size-3.5 transition-transform group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" strokeWidth={2.2} />
          </a>
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
        <ProjectArticle p={p} />
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
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3 text-[14px] font-medium text-ink shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] transition hover:bg-ink hover:text-white"
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
    <section id="projects" className="px-4 pb-32 sm:px-6">
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

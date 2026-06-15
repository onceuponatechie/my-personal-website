"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/site-data";

function ProjectCard({
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
  const opacity = useTransform(progress, [start, end], [1, 1]);

  return (
    <div className="sticky top-24 flex h-screen items-start justify-center">
      <motion.article
        style={{ scale, y, opacity, zIndex: index + 1 }}
        className="group relative grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[44px] bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] ring-1 ring-black/5 md:grid-cols-2"
      >
        <div className="p-3 md:p-4">
          <div className="overflow-hidden rounded-[32px]">
            <motion.img
              src={p.image}
              alt={p.title}
              loading="lazy"
              width={1280}
              height={960}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink/45">
            <span>{p.year}</span>
            <span className="size-1 rounded-full bg-ink/30" />
            <span>{p.role}</span>
          </div>
          <h3 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.02] tracking-tight text-ink">
            {p.title}
          </h3>
          <p className="max-w-[44ch] text-[14px] leading-[1.65] text-ink/65">{p.description}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full bg-foreground/5 px-3 py-1 text-[12px] text-ink/70">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-5">
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
      </motion.article>
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
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display text-[clamp(2.75rem,6vw,4.75rem)] italic leading-none tracking-tight text-ink"
        >
          projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mt-5 max-w-[44ch] text-[14px] leading-[1.65] text-ink/65"
        >
          A small set of products built with care — calm interfaces, careful copy, and a quiet bias for shipping.
        </motion.p>
      </div>

      <div ref={ref} className="relative" style={{ height: `${PROJECTS.length * 100}vh` }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

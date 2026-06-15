"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PROJECTS } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ProjectsView() {
  return (
    <PageShell
      eyebrow="The work"
      title={<>Projects, <span className="italic">expanded</span></>}
      intro="Case studies of products I've designed, built, and shipped. Each one taught me something I now refuse to unlearn."
    >
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
      >
        {PROJECTS.map((p) => (
          <motion.article key={p.slug} variants={fadeUp} className="group overflow-hidden rounded-[36px] bg-card ring-1 ring-black/5">
            <Link href={`/projects/${p.slug}`} className="block">
              <div className="overflow-hidden p-3">
                <div className="overflow-hidden rounded-[28px]">
                  <motion.img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
              <div className="p-6 pt-2">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ink/45">
                  <span>{p.year}</span>
                  <span className="size-1 rounded-full bg-ink/30" />
                  <span>{p.role}</span>
                </div>
                <h3 className="mt-3 font-display text-[28px] leading-[1.05] tracking-tight text-ink">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-ink/65">{p.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  Read case study
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </PageShell>
  );
}

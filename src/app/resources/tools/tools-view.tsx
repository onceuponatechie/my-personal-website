"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { TOOLS } from "@/lib/site-data";

export function ToolsView() {
  return (
    <PageShell
      eyebrow="Resources · Free"
      title={<>Tools & <span className="italic">Templates</span></>}
      intro="A growing shelf of files I actually use. Free to download, free to remix — just don't resell them as-is."
    >
      <motion.div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      >
        {TOOLS.map((t) => (
          <motion.article
            key={t.slug}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }}
            className="group overflow-hidden rounded-[32px] bg-card p-3 ring-1 ring-black/5 transition hover:-translate-y-1"
          >
            <div className="overflow-hidden rounded-[24px]">
              <img src={t.cover} alt={t.name} className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex items-end justify-between p-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45">{t.kind}</p>
                <h3 className="mt-2 font-display text-[22px] leading-tight text-ink">{t.name}</h3>
                <p className="mt-2 max-w-[36ch] text-[13px] leading-[1.55] text-ink/60">{t.blurb}</p>
              </div>
              <span className="grid size-10 place-items-center rounded-full bg-ink text-white">
                <ArrowUpRight className="size-4" strokeWidth={2.2} />
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </PageShell>
  );
}

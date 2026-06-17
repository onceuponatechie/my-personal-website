"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { toolsByCategory, type Tool } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

function ToolCard({ t }: { t: Tool }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-card p-3 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:ring-black/10"
    >
      <div className="overflow-hidden rounded-[20px]">
        <img
          src={t.cover}
          alt={t.name}
          loading="lazy"
          className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45">{t.kind}</p>
        <h3 className="mt-2 font-display text-[22px] leading-tight text-ink">{t.name}</h3>
        <p className="mt-2 text-[13px] leading-[1.55] text-ink/60">{t.blurb}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
            <Download className="size-3.5" strokeWidth={2} /> Free download
          </span>
          <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition group-hover:scale-105">
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function ToolsView() {
  const groups = toolsByCategory();

  return (
    <PageShell
      eyebrow="Resources · Free"
      title={<>tools & <span className="italic">templates</span></>}
      intro="A growing shelf of files I actually use, grouped by how you'd use them. Free to download, free to remix — just don't resell them as-is."
    >
      <div className="mx-auto max-w-5xl space-y-16">
        {groups.map((g) => (
          <section key={g.category}>
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-display text-[24px] italic leading-none text-ink">{g.category}</h2>
              <span className="h-px flex-1 bg-ink/10" />
              <span className="text-[12px] text-ink/45">{g.tools.length} files</span>
            </div>
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8%" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {g.tools.map((t) => (
                <ToolCard key={t.slug} t={t} />
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

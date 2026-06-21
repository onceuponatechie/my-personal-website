"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const SECTIONS = [
  {
    href: "/resources/books",
    eyebrow: "New",
    title: "Book Hub",
    blurb: "Notes from the books shaping how I research, build, and tell stories.",
    bg: "bg-ink text-white",
    count: "12",
    accent: "text-white",
  },
  {
    href: "/resources/tools",
    eyebrow: "Free",
    title: "Tools & Templates",
    blurb: "Notion systems, Figma files, and ready-to-use checklists.",
    bg: "bg-card",
    count: "20+",
    accent: "text-ink",
  },
  {
    href: "/resources/vault",
    eyebrow: "Members",
    title: "Research Vault",
    blurb: "Deep dives into human behaviour, patterns, and product research.",
    bg: "bg-sage-soft",
    count: "12",
    accent: "text-ink",
  },
];

export function ResourcesView() {
  return (
    <PageShell
      eyebrow="Take what helps"
      title={<><span className="italic">resources</span> & rituals</>}
      intro="Free things first. The kind of files I wish I had when I started — none of them are perfect, all of them are useful."
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.href}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Link
              href={s.href}
              className={`group flex h-full flex-col justify-between rounded-[36px] p-8 ring-1 ring-black/5 transition hover:-translate-y-1 ${s.bg}`}
            >
              <div>
                <p className={`text-[11px] uppercase tracking-[0.22em] ${s.accent} opacity-60`}>{s.eyebrow}</p>
                <h3 className={`mt-4 font-display text-[32px] leading-[1.02] tracking-tight ${s.accent}`}>{s.title}</h3>
                <p className={`mt-3 max-w-[34ch] text-[14px] leading-[1.6] ${s.accent} opacity-70`}>{s.blurb}</p>
              </div>
              <div className="mt-12 flex items-end justify-between">
                <span className={`font-display text-[56px] leading-none ${s.accent} opacity-90`}>{s.count}</span>
                <span className={`grid size-12 place-items-center rounded-full transition group-hover:scale-105 ${s.accent === "text-white" ? "bg-white text-ink" : "bg-ink text-white"}`}>
                  <ArrowUpRight className="size-5" strokeWidth={2.2} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}

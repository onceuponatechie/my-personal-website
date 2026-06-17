"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { EASE } from "@/lib/motion";

const DESTINATIONS = [
  {
    href: "/resources/books",
    eyebrow: "Notes",
    title: "Book Hub",
    blurb: "Honest highlights from the books shaping how I research, build, and tell stories.",
    image: "/assets/book-notes.jpg",
    bg: "bg-ink",
    fg: "text-white",
    sub: "text-white/65",
    chip: "bg-sage-soft text-ink",
  },
  {
    href: "/resources/tools",
    eyebrow: "Free",
    title: "Tools & Templates",
    blurb: "Notion systems, Figma files, and ready-to-use checklists I actually reach for.",
    image: "/assets/project-1.jpg",
    bg: "bg-sage-soft",
    fg: "text-ink",
    sub: "text-ink/65",
    chip: "bg-ink text-white",
  },
  {
    href: "/resources/vault",
    eyebrow: "Research",
    title: "Research Vault",
    blurb: "Reports, teardowns, and trend watches — data-backed and made to think with.",
    image: "/assets/research-vault.jpg",
    bg: "bg-card",
    fg: "text-ink",
    sub: "text-ink/65",
    chip: "bg-ink text-white",
  },
];

export function ResourcesView() {
  return (
    <PageShell
      eyebrow="Take what helps"
      title={<><span className="italic">resources</span> & rituals</>}
      intro="Free things first. The kind of files and notes I wish I had when I started — none of them perfect, all of them useful."
    >
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        {DESTINATIONS.map((d) => (
          <motion.div
            key={d.href}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            <Link href={d.href} className="group block h-full">
              <article
                className={`flex h-full flex-col overflow-hidden rounded-[36px] p-3 ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:ring-black/10 ${d.bg}`}
              >
                <div className="overflow-hidden rounded-[28px]">
                  <img
                    src={d.image}
                    alt={d.title}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className={`text-[11px] uppercase tracking-[0.22em] ${d.sub}`}>{d.eyebrow}</p>
                  <h3 className={`mt-3 font-display text-[28px] leading-[1.02] tracking-tight ${d.fg}`}>
                    {d.title}
                  </h3>
                  <p className={`mt-3 text-[14px] leading-[1.6] ${d.sub}`}>{d.blurb}</p>
                  <span
                    className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium ${d.chip}`}
                  >
                    Explore
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
                  </span>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </PageShell>
  );
}

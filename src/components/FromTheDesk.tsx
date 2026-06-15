"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { STORIES } from "@/lib/site-data";

const inline4 = "/assets/inline-4.jpg";

const TAG_COLORS: Record<string, string> = {
  Design: "text-[oklch(0.55_0.16_300)]",
  Building: "text-[oklch(0.62_0.18_45)]",
  Story: "text-sage",
  Notes: "text-[oklch(0.55_0.16_240)]",
};

// Build 4 desk entries from STORIES + one synthetic if needed
const DESK = [
  { ...STORIES[0], tag: "Notes" },
  { ...STORIES[1], tag: "Design" },
  { ...STORIES[2], tag: "Building" },
  {
    slug: STORIES[0].slug,
    title: "Stories that get shared at dinner",
    excerpt: "Why the best product stories don't sound like product stories at all.",
    body: "",
    date: "Mar 12, 2026",
    read: "5 min",
    cover: inline4,
    tag: "Story",
  },
];

function Card({ s }: { s: (typeof DESK)[number] }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={`/stories/${s.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block w-full shrink-0"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-card p-3 ring-1 ring-black/5 transition hover:ring-black/10">
        <div className="relative overflow-hidden rounded-[20px]">
          <motion.img
            src={s.cover}
            alt={s.title}
            loading="lazy"
            className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute inset-x-3 bottom-3 rounded-2xl bg-ink/85 px-4 py-3 text-[13px] leading-[1.5] text-white backdrop-blur"
              >
                {s.excerpt}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-start justify-between gap-4 p-4 pt-5">
          <div>
            <h3 className="font-display text-[20px] leading-[1.15] tracking-tight text-ink">{s.title}</h3>
            <div className="mt-3 flex items-center gap-3 text-[12px] text-ink/55">
              <span className={`font-medium ${TAG_COLORS[s.tag] ?? "text-ink/70"}`}>{s.tag}</span>
              <span className="size-1 rounded-full bg-ink/30" />
              <span>{s.date}</span>
              <span className="size-1 rounded-full bg-ink/30" />
              <span>{s.read}</span>
            </div>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-white transition group-hover:scale-105">
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FromTheDesk() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="desk" className="px-4 pb-32 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="font-display text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] tracking-tight text-ink"
            >
              From the <span className="italic">Desk</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="mt-4 max-w-[46ch] text-[14px] leading-[1.65] text-ink/65"
            >
              Half essays, half field notes — written between builds, shipped when the thought feels finished.
            </motion.p>
          </div>

          {/* Mobile arrows */}
          <div className="flex items-center gap-3 sm:hidden">
            <button
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              className="grid size-11 place-items-center rounded-full bg-butter text-ink ring-1 ring-ink/10 transition hover:brightness-95"
            >
              <ArrowLeft className="size-4" strokeWidth={2.2} />
            </button>
            <button
              aria-label="Next"
              onClick={() => scrollBy(1)}
              className="grid size-11 place-items-center rounded-full bg-[oklch(0.82_0.1_220)] text-ink ring-1 ring-ink/10 transition hover:brightness-95"
            >
              <ArrowRight className="size-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4"
        >
          {DESK.map((s, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
              }}
            >
              <Card s={s} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile horizontal scroller */}
        <div
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {DESK.map((s, i) => (
            <div key={i} data-card className="w-[82%] shrink-0 snap-center">
              <Card s={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

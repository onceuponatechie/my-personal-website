"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { STORIES } from "@/lib/site-data";
import { CurvedUnderline } from "@/components/CurvedUnderline";
import { useIsMobile } from "@/hooks/use-mobile";
import { EASE } from "@/lib/motion";

const inline4 = "/assets/inline-4.jpg";

const TAG_COLORS: Record<string, string> = {
  Design: "text-[oklch(0.55_0.16_300)]",
  Building: "text-[oklch(0.62_0.18_45)]",
  Story: "text-sage",
  Notes: "text-[oklch(0.55_0.16_240)]",
};

// Build desk entries from STORIES + one synthetic.
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

function DeskCard({ s }: { s: (typeof DESK)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const inView = useInView(ref, { amount: 0.7 });
  const [hover, setHover] = useState(false);
  // Editorial reveal: pointer hover on desktop, in-view on touch devices.
  const active = isMobile ? inView : hover;

  return (
    <Link
      href={`/stories/${s.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block h-full"
    >
      <div
        ref={ref}
        className={`flex h-full flex-col overflow-hidden rounded-[28px] bg-card p-3 ring-1 transition duration-500 ${
          active ? "-translate-y-1 ring-black/10 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.35)]" : "ring-black/5"
        }`}
      >
        <div className="relative overflow-hidden rounded-[20px]">
          <img
            src={s.cover}
            alt={s.title}
            loading="lazy"
            className={`aspect-[5/4] w-full object-cover transition-transform duration-700 ${active ? "scale-[1.06]" : "scale-100"}`}
          />
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-x-3 bottom-3 rounded-2xl bg-ink/85 px-4 py-3 text-[13px] leading-[1.5] text-white backdrop-blur"
              >
                {s.excerpt}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-1 flex-col p-4 pt-5">
          <span className={`text-[12px] font-medium ${TAG_COLORS[s.tag] ?? "text-ink/70"}`}>{s.tag}</span>
          <h3 className="mt-2 line-clamp-2 font-display text-[20px] leading-[1.15] tracking-tight text-ink">
            {s.title}
          </h3>
          <div className="mt-auto flex items-center justify-between pt-5">
            <div className="flex items-center gap-2 whitespace-nowrap text-[12px] text-ink/55">
              <span>{s.date}</span>
              <span className="size-1 rounded-full bg-ink/30" />
              <span>{s.read}</span>
            </div>
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-full bg-ink text-white transition duration-500 ${
                active ? "scale-105 rotate-45" : ""
              }`}
            >
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FromTheDesk() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.85;
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
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] tracking-tight text-ink"
            >
              From the <CurvedUnderline className="italic">Desk</CurvedUnderline>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
              className="mt-4 max-w-[46ch] text-[14px] leading-[1.65] text-ink/65"
            >
              Half essays, half field notes — written between builds, shipped when the thought feels finished.
            </motion.p>
          </div>

          {/* Read all + horizontal-scroll arrows */}
          <div className="flex items-center gap-4">
            <Link
              href="/stories"
              className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink transition hover:bg-ink hover:text-white"
            >
              Read all
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
            </Link>
            <div className="flex items-center gap-2.5">
              <button
                aria-label="Previous posts"
                onClick={() => scrollByDir(-1)}
                className="grid size-11 place-items-center rounded-full bg-butter-soft text-ink ring-1 ring-ink/10 transition hover:brightness-95 active:scale-95"
              >
                <ArrowLeft className="size-4" strokeWidth={2.2} />
              </button>
              <button
                aria-label="Next posts"
                onClick={() => scrollByDir(1)}
                className="grid size-11 place-items-center rounded-full bg-lavender-soft text-ink ring-1 ring-ink/10 transition hover:brightness-95 active:scale-95"
              >
                <ArrowRight className="size-4" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroller — equal-height cards on every viewport */}
        <div
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-4 pb-4 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {DESK.map((s, i) => (
            <div key={i} data-card className="w-[300px] shrink-0 snap-start sm:w-[340px]">
              <DeskCard s={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

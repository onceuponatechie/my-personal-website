"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CurvedUnderline } from "@/components/CurvedUnderline";
import { TOOLS, STORIES, RESEARCH } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

/* Five picks from across the site — templates, tools, pieces, research —
 * flowing past in a continuous marquee (Avenora-style): upward on mobile,
 * sideways on desktop. */

type Pick = {
  label: string;
  labelBg: string;
  title: string;
  blurb: string;
  cover: string;
  href: string;
};

const template = TOOLS.find((t) => t.slug === "founder-os") ?? TOOLS[0];
const tool = TOOLS.find((t) => t.slug === "user-interview-script") ?? TOOLS[1];
const checklist = TOOLS.find((t) => t.slug === "launch-checklist") ?? TOOLS[2];
const piece = STORIES.find((s) => s.slug === "designing-quiet-software") ?? STORIES[0];
const report = RESEARCH[0];

const PICKS: Pick[] = [
  {
    label: "Template",
    labelBg: "bg-sage-soft",
    title: template.name,
    blurb: template.blurb,
    cover: template.cover,
    href: "/resources/tools",
  },
  {
    label: "Tool",
    labelBg: "bg-lavender-soft",
    title: tool.name,
    blurb: tool.blurb,
    cover: tool.cover,
    href: "/resources/tools",
  },
  {
    label: "Piece",
    labelBg: "bg-butter-soft",
    title: piece.title,
    blurb: piece.excerpt,
    cover: piece.cover,
    href: `/stories/${piece.slug}`,
  },
  {
    label: "Research",
    labelBg: "bg-white/85",
    title: report.title,
    blurb: report.summary,
    cover: report.cover,
    href: "/resources/vault",
  },
  {
    label: "Checklist",
    labelBg: "bg-sage-soft",
    title: checklist.name,
    blurb: checklist.blurb,
    cover: checklist.cover,
    href: "/resources/tools",
  },
];

/* One pick — image and text living in a single card, same language as the
 * project cards: soft card surface, inset rounded cover, arrow chip. */
function PickCard({ pick }: { pick: Pick }) {
  return (
    <Link href={pick.href} className="group block h-full w-full">
      <article className="flex h-full flex-col rounded-[28px] bg-card p-3 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.3)] ring-1 ring-black/5 transition duration-300 group-hover:ring-black/10">
        <div className="relative overflow-hidden rounded-[20px]">
          <img
            src={pick.cover}
            alt={pick.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <span
            className={`absolute left-3 top-3 rounded-full ${pick.labelBg} px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/80 backdrop-blur-sm`}
          >
            {pick.label}
          </span>
        </div>
        <div className="flex flex-1 items-start justify-between gap-3 px-2 pb-2 pt-3.5 text-left">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-[17px] font-semibold leading-[1.25] tracking-tight text-ink">
              {pick.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.5] text-ink/60">{pick.blurb}</p>
          </div>
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-sage-soft text-ink transition duration-300 group-hover:bg-sage group-hover:text-white">
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </span>
        </div>
      </article>
    </Link>
  );
}

/** The five picks rendered twice back-to-back — the second copy hidden from
 * assistive tech — so a -50% translate loops seamlessly. */
function MarqueeContent({ vertical }: { vertical: boolean }) {
  return (
    <>
      {[0, 1].map((copy) => (
        <div key={copy} aria-hidden={copy === 1} className={vertical ? "flex flex-col" : "flex"}>
          {PICKS.map((p) => (
            <div key={p.label} className={vertical ? "pb-5" : "w-[320px] shrink-0 pr-5"}>
              <PickCard pick={p} />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export function ChooseAdventure() {
  return (
    <section id="adventure" className="px-4 pb-24 pt-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Centered header, matching the rest of the homepage. */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-display text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] tracking-tight text-ink"
          >
            choose your <CurvedUnderline className="italic">adventure</CurvedUnderline>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
            className="mx-auto mt-4 max-w-[46ch] text-[14px] leading-[1.65] text-ink/65"
          >
            Templates, tools, pieces, research — drifting past. Catch one and take it with you, no
            digging required.
          </motion.p>
        </div>

        {/* Mobile: an endless upward drift of cards, Avenora-style. */}
        <div
          className="relative mx-auto h-[560px] max-w-md overflow-hidden md:hidden [mask-image:linear-gradient(to_bottom,transparent,black_7%,black_93%,transparent)]"
          aria-label="A rotating shelf of free picks"
        >
          <div className="flex flex-col [animation:adventure-marquee-y_28s_linear_infinite] motion-reduce:[animation:none]">
            <MarqueeContent vertical />
          </div>
        </div>

        {/* Desktop: the same cards glide sideways; hovering pauses the belt. */}
        <div className="relative hidden overflow-hidden md:block [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max [animation:adventure-marquee-x_36s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]">
            <MarqueeContent vertical={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

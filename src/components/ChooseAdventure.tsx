"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CurvedUnderline } from "@/components/CurvedUnderline";
import { TOOLS, STORIES, VAULT } from "@/lib/site-data";
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
const teardown = VAULT.find((v) => v.slug === "paystack-onboarding-teardown") ?? VAULT[0];

const PICKS: Pick[] = [
  {
    label: "Template",
    labelBg: "bg-sage-soft",
    title: template.name,
    blurb: template.blurb,
    cover: template.cover,
    href: `/resources/tools/${template.slug}`,
  },
  {
    label: "Tool",
    labelBg: "bg-lavender-soft",
    title: tool.name,
    blurb: tool.blurb,
    cover: tool.cover,
    href: `/resources/tools/${tool.slug}`,
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
    label: "Teardown",
    labelBg: "bg-white/85",
    title: teardown.title,
    blurb: teardown.summary,
    cover: "/assets/research-vault.jpg",
    href: `/resources/lab/${teardown.slug}`,
  },
  {
    label: "Checklist",
    labelBg: "bg-sage-soft",
    title: checklist.name,
    blurb: checklist.blurb,
    cover: checklist.cover,
    href: `/resources/tools/${checklist.slug}`,
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
            className={`absolute left-3 top-3 rounded-full ${pick.labelBg} px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/80 backdrop-blur-sm`}
          >
            {pick.label}
          </span>
        </div>
        <div className="flex flex-1 items-start justify-between gap-3 px-2 pb-2 pt-3.5 text-left">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-[17px] font-semibold leading-[1.25] tracking-tight text-ink">
              {pick.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-[14px] leading-[1.5] text-ink/60">{pick.blurb}</p>
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
function MarqueeContent() {
  return (
    <>
      {[0, 1].map((copy) => (
        <div key={copy} aria-hidden={copy === 1} className="flex">
          {PICKS.map((p) => (
            <div key={p.label} className="w-[260px] shrink-0 pr-4 sm:w-[320px] sm:pr-5">
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
            Templates, tools, pieces, teardowns — drifting past. Catch one and take it with you, no
            digging required.
          </motion.p>
        </div>

        {/* One sideways belt everywhere — a quicker glide on mobile, a touch
            calmer on desktop. Hovering pauses it. */}
        <div
          className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          aria-label="A rotating shelf of free picks"
        >
          <div className="flex w-max [animation:adventure-marquee-x_16s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none] md:[animation-duration:26s]">
            <MarqueeContent />
          </div>
        </div>
      </div>
    </section>
  );
}

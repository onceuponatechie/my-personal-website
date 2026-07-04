"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { CurvedUnderline } from "@/components/CurvedUnderline";
import { TOOLS, STORIES } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

/* One template, one tool, one piece — a direct grab from the homepage
 * without a detour through the section pages. */

type Pick = {
  label: string;
  labelBg: string;
  kind: string;
  title: string;
  blurb: string;
  cover: string;
  href: string;
  cta: string;
  download: boolean;
};

const template = TOOLS.find((t) => t.slug === "founder-os") ?? TOOLS[0];
const tool = TOOLS.find((t) => t.slug === "user-interview-script") ?? TOOLS[1];
const piece = STORIES.find((s) => s.slug === "designing-quiet-software") ?? STORIES[0];

const PICKS: Pick[] = [
  {
    label: "Template",
    labelBg: "bg-sage-soft",
    kind: template.kind,
    title: template.name,
    blurb: template.blurb,
    cover: template.cover,
    href: "/resources/tools",
    cta: "Grab it free",
    download: true,
  },
  {
    label: "Tool",
    labelBg: "bg-lavender-soft",
    kind: tool.kind,
    title: tool.name,
    blurb: tool.blurb,
    cover: tool.cover,
    href: "/resources/tools",
    cta: "Grab it free",
    download: true,
  },
  {
    label: "Piece",
    labelBg: "bg-butter-soft",
    kind: `${piece.category} · ${piece.read}`,
    title: piece.title,
    blurb: piece.excerpt,
    cover: piece.cover,
    href: `/stories/${piece.slug}`,
    cta: "Read the piece",
    download: false,
  },
];

function PickCard({ pick, index }: { pick: Pick; index: number }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay: index * 0.08 } },
      }}
      className="group flex h-full flex-col rounded-[28px] bg-card p-3 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:ring-black/10"
    >
      <Link href={pick.href} className="flex h-full flex-col">
        <div className="relative overflow-hidden rounded-[20px]">
          <img
            src={pick.cover}
            alt={pick.title}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span
            className={`absolute left-3 top-3 rounded-full ${pick.labelBg} px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/75`}
          >
            {pick.label}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-3 pb-3 pt-4 text-left">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45">{pick.kind}</p>
          <h3 className="mt-2 font-display text-[22px] leading-[1.15] tracking-tight text-ink">{pick.title}</h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-ink/60">{pick.blurb}</p>

          <div className="mt-auto pt-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ink py-2 pl-5 pr-2 text-[13px] font-medium text-white transition group-hover:brightness-110">
              {pick.cta}
              <span className="grid size-7 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                {pick.download ? (
                  <Download className="size-3.5" strokeWidth={2.2} />
                ) : (
                  <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
                )}
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function ChooseAdventure() {
  return (
    <section id="adventure" className="px-4 pb-24 pt-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Centered header, matching the rest of the homepage. */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[12px] uppercase tracking-[0.22em] text-ink/50"
          >
            Grab &amp; go · Free forever
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-4 font-display text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] tracking-tight text-ink"
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
            One template, one tool, one piece. Pick a lane and take something useful with you — no
            digging required.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, show: {} }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {PICKS.map((p, i) => (
            <PickCard key={p.label} pick={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

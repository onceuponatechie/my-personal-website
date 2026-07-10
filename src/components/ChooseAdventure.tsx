"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CurvedUnderline } from "@/components/CurvedUnderline";
import { TOOLS, STORIES } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

/* One template, one tool, one piece — a direct grab from the homepage
 * without a detour through the section pages. */

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
const piece = STORIES.find((s) => s.slug === "designing-quiet-software") ?? STORIES[0];

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
];

const SPOTLIGHT_MS = 2800;

/* Borderless card in the same language as the profile card up in the
 * resources bento: a rounded-[44px] photo, title and description beneath.
 * The roving spotlight (active) lifts the photo, zooms it, and deepens its
 * shadow — like a cursor hovering, deciding. */
function PickCard({
  pick,
  index,
  active,
  onHover,
}: {
  pick: Pick;
  index: number;
  active: boolean;
  onHover: (i: number) => void;
}) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay: index * 0.08 } },
      }}
      onMouseEnter={() => onHover(index)}
      className="group"
    >
      <Link href={pick.href} className="block">
        <motion.div
          animate={{ y: active ? -8 : 0, opacity: active ? 1 : 0.94 }}
          transition={{ duration: 0.55, ease: EASE }}
          className={`relative overflow-hidden rounded-[44px] transition-shadow duration-500 ${
            active ? "shadow-[0_30px_60px_-26px_rgba(0,0,0,0.38)]" : "shadow-none"
          }`}
        >
          <motion.img
            src={pick.cover}
            alt={pick.title}
            loading="lazy"
            animate={{ scale: active ? 1.07 : 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="aspect-square w-full object-cover md:aspect-[9/10]"
          />
          <span
            className={`absolute left-4 top-4 rounded-full ${pick.labelBg} px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/80 backdrop-blur-sm`}
          >
            {pick.label}
          </span>
        </motion.div>

        <div className="px-2 pt-4 text-left sm:px-3 sm:pt-5">
          <h3 className="line-clamp-2 text-[19px] font-semibold leading-[1.2] tracking-tight text-ink">
            {pick.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.55] text-ink/60">{pick.blurb}</p>
        </div>
      </Link>
    </motion.article>
  );
}

export function ChooseAdventure() {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* The roving spotlight — every few seconds the "cursor" moves to the next
     card, so the row always looks mid-decision. It never stops for good:
     interaction only pauses it briefly. */
  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % PICKS.length);
    }, SPOTLIGHT_MS);
    return () => clearInterval(t);
  }, []);

  /* The visitor's own hand wins: touching or hovering pauses the auto-cycle,
     and it quietly resumes a few seconds after they let go. */
  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => (pausedRef.current = false), 6000);
  };

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
            One template, one tool, one piece. Pick a lane and take something useful with you — no
            digging required.
          </motion.p>
        </div>

        <motion.div
          onMouseEnter={pause}
          onTouchStart={pause}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, show: {} }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10"
        >
          {PICKS.map((p, i) => (
            <PickCard
              key={p.label}
              pick={p}
              index={i}
              active={i === active}
              onHover={(idx) => {
                pause();
                setActive(idx);
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { CurvedUnderline } from "@/components/CurvedUnderline";
import { TOOLS, STORIES, RESEARCH } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

/* One template, one tool, one piece, one report — a direct grab from the
 * homepage without a detour through the section pages. */

type Pick = {
  label: string;
  labelBg: string;
  kind: string;
  title: string;
  cover: string;
  href: string;
  cta: string;
  download: boolean;
};

const template = TOOLS.find((t) => t.slug === "founder-os") ?? TOOLS[0];
const tool = TOOLS.find((t) => t.slug === "user-interview-script") ?? TOOLS[1];
const piece = STORIES.find((s) => s.slug === "designing-quiet-software") ?? STORIES[0];
const report = RESEARCH[0];

const PICKS: Pick[] = [
  {
    label: "Template",
    labelBg: "bg-sage-soft",
    kind: template.kind,
    title: template.name,
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
    cover: piece.cover,
    href: `/stories/${piece.slug}`,
    cta: "Read the piece",
    download: false,
  },
  {
    label: "Research",
    labelBg: "bg-white/85",
    kind: report.category,
    title: report.title,
    cover: report.cover,
    href: "/resources/vault",
    cta: "Open the vault",
    download: false,
  },
];

const SPOTLIGHT_MS = 2800;

/* Full-bleed photo card — text sits ON the image over a soft scrim, sized
 * like the bento cards up in the resources grid. The roving spotlight
 * (active) lifts it, zooms the cover, and flips the CTA to sage — like a
 * cursor hovering, deciding. */
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
      className="group w-[62%] shrink-0 snap-center sm:w-[40%] md:w-auto md:shrink"
    >
      {/* Inner wrapper carries the spotlight motion so it can't fight the
          entrance variants on the article above. */}
      <motion.div
        animate={{ y: active ? -8 : 0, scale: active ? 1.02 : 1, opacity: active ? 1 : 0.92 }}
        transition={{ duration: 0.55, ease: EASE }}
        className={`relative overflow-hidden rounded-[32px] ring-1 transition-shadow duration-500 ${
          active
            ? "shadow-[0_30px_60px_-26px_rgba(0,0,0,0.4)] ring-black/10"
            : "shadow-none ring-black/5"
        }`}
      >
        <Link href={pick.href} className="relative flex aspect-[4/5] flex-col justify-end">
          <motion.img
            src={pick.cover}
            alt={pick.title}
            loading="lazy"
            animate={{ scale: active ? 1.08 : 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Scrim keeps the copy readable on any photo. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" aria-hidden />

          <span
            className={`absolute left-4 top-4 rounded-full ${pick.labelBg} px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/80 backdrop-blur-sm`}
          >
            {pick.label}
          </span>

          <div className="relative p-5 text-left">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/60">{pick.kind}</p>
            <h3 className="mt-1.5 line-clamp-2 font-display text-[20px] leading-[1.12] tracking-tight text-white">
              {pick.title}
            </h3>
            <span
              className={`mt-3.5 inline-flex w-fit items-center gap-2 rounded-full py-1.5 pl-4 pr-1.5 text-[12px] font-medium text-white transition-colors duration-500 group-hover:bg-sage ${
                active ? "bg-sage" : "bg-white/15 backdrop-blur-sm"
              }`}
            >
              {pick.cta}
              <span className="grid size-6 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                {pick.download ? (
                  <Download className="size-3" strokeWidth={2.2} />
                ) : (
                  <ArrowUpRight className="size-3" strokeWidth={2.2} />
                )}
              </span>
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}

export function ChooseAdventure() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoScrolling = useRef(false);

  /* The roving spotlight — every few seconds the "cursor" moves to the next
     card, so the row always looks mid-decision. It never stops for good:
     interaction only pauses it briefly. */
  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % PICKS.length);
    }, SPOTLIGHT_MS);
    return () => clearInterval(t);
  }, []);

  /* On mobile the cards live in a snap carousel; keep the spotlighted card
     centred as the cycle advances. No-op on desktop where nothing overflows. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || el.scrollWidth <= el.clientWidth + 4 || pausedRef.current) return;
    const card = el.children[active] as HTMLElement | undefined;
    if (!card) return;
    autoScrolling.current = true;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
    const t = setTimeout(() => (autoScrolling.current = false), 700);
    return () => clearTimeout(t);
  }, [active]);

  /* The visitor's own hand wins: touching or hovering pauses the auto-cycle,
     and it quietly resumes a few seconds after they let go. */
  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => (pausedRef.current = false), 6000);
  };

  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el || autoScrolling.current || el.scrollWidth <= el.clientWidth + 4) return;
    pause();
    const mid = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const child = c as HTMLElement;
      const d = Math.abs(child.offsetLeft + child.clientWidth / 2 - mid);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  return (
    <section id="adventure" className="px-4 pb-24 pt-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Centered header, matching the rest of the homepage. */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
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
            One template, one tool, one piece, one report. Pick a lane and take something useful
            with you — no digging required.
          </motion.p>
        </div>

        <motion.div
          ref={trackRef}
          onScroll={onTrackScroll}
          onMouseEnter={pause}
          onTouchStart={pause}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, show: {} }}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0"
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

        {/* Carousel dots — mobile only, where the row scrolls. */}
        <div className="mt-5 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Adventure picks">
          {PICKS.map((p, i) => (
            <button
              key={p.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${p.label}`}
              onClick={() => {
                pause();
                setActive(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-sage" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

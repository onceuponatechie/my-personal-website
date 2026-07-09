"use client";

import { useEffect, useRef, useState } from "react";
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

const SPOTLIGHT_MS = 2800;

/* Compact pick card — sized like the Tools & Templates bento card on the
 * homepage. The roving spotlight (active) lifts it, warms its ring, zooms
 * the cover, and flips the CTA to sage — like a cursor hovering, deciding. */
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
      className="group w-[72%] shrink-0 snap-center sm:w-[46%] md:w-auto md:shrink"
    >
      {/* Inner wrapper carries the spotlight motion so it can't fight the
          entrance variants on the article above. */}
      <motion.div
        animate={{ y: active ? -8 : 0, scale: active ? 1.02 : 1, opacity: active ? 1 : 0.92 }}
        transition={{ duration: 0.55, ease: EASE }}
        className={`flex h-full flex-col rounded-[26px] bg-card p-2.5 ring-1 transition-shadow duration-500 ${
          active
            ? "shadow-[0_28px_55px_-26px_rgba(0,0,0,0.3)] ring-black/10"
            : "shadow-none ring-black/5"
        }`}
      >
        <Link href={pick.href} className="flex h-full flex-col">
          <div className="relative overflow-hidden rounded-[18px]">
            <motion.img
              src={pick.cover}
              alt={pick.title}
              loading="lazy"
              animate={{ scale: active ? 1.07 : 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="aspect-[16/10] w-full object-cover"
            />
            <span
              className={`absolute left-2.5 top-2.5 rounded-full ${pick.labelBg} px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/75`}
            >
              {pick.label}
            </span>
          </div>

          <div className="flex flex-1 flex-col px-2 pb-1.5 pt-3 text-left">
            <p className="text-[10px] uppercase tracking-[0.16em] text-ink/45">{pick.kind}</p>
            <h3 className="mt-1.5 font-display text-[19px] leading-[1.15] tracking-tight text-ink">{pick.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.5] text-ink/60">{pick.blurb}</p>

            <div className="mt-auto pt-4">
              <span
                className={`inline-flex w-fit items-center gap-2 rounded-full py-1.5 pl-4 pr-1.5 text-[12px] font-medium text-white transition-colors duration-500 group-hover:bg-sage ${
                  active ? "bg-sage" : "bg-ink"
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
     card, so the row always looks mid-decision. */
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
      <div className="mx-auto max-w-4xl">
        {/* Centered header, matching the rest of the homepage. */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
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
          ref={trackRef}
          onScroll={onTrackScroll}
          onMouseEnter={pause}
          onTouchStart={pause}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, show: {} }}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
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

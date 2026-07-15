"use client";

import { ArrowUpRight, ArrowRight, Globe, Rabbit } from "lucide-react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const devDiaryImg = "/assets/dev-diary.jpg";
const researchImg = "/assets/research-vault.jpg";
const profileImg = "/assets/profile.jpg";

/* One quiet surface for every bento cell — tighter radius, hairline ring,
   and a barely-there shadow instead of loud color blocks. */
const R = "rounded-[26px]";
const SURFACE = "ring-1 ring-black/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_24px_44px_-32px_rgba(0,0,0,0.14)]";

/* ---------- Custom icons ---------- */

function TemplateIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17" />
      <path d="M9 9.5v10" />
    </svg>
  );
}

/* ---------- Animated counter ---------- */

function AnimatedCount({ to = 20, suffix = "+" }: { to?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] as const });
    return () => controls.stop();
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/* ---------- Motion presets ---------- */

// Bento cards drift into frame from a direction that suits their place in the
// grid — outer-left cards from the left, outer-right from the right, the
// middle column simply rising up — all on the shared editorial easing.
type Dir = "left" | "right" | "up";
const DIR_OFFSET: Record<Dir, { x?: number; y?: number }> = {
  left: { x: -60 },
  right: { x: 60 },
  up: { y: 34 },
};

function dirCard(dir: Dir) {
  return {
    hidden: { opacity: 0, scale: 0.985, ...DIR_OFFSET[dir] },
    show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
  };
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const textChild = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ---------- Section ---------- */

export function Resources() {
  return (
    <section id="resources" className="px-4 pb-32 sm:px-6">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
          <RabbitHole dir="left" className="order-1 md:col-start-1 md:col-span-3 md:row-span-2" />
          <ToolsTemplates dir="up" className="order-3 md:col-start-4 md:col-span-3 md:row-start-1" />
          <ResearchVault dir="right" className="order-4 md:col-start-7 md:col-span-6 md:row-start-1" />
          <ResourcesHeadline dir="up" className="order-2 md:col-start-4 md:col-span-6 md:row-start-2" />
          <ProfileCard dir="right" className="order-5 md:col-start-10 md:col-span-3 md:row-start-2" />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Cards ---------- */

/** The Rabbit Hole — issues for curious people. The photo leads, framed
 * inside the card with the same inset as the other image cards, with a
 * quiet editorial block beneath it. */
function RabbitHole({ dir = "up", className = "" }: { dir?: Dir; className?: string }) {
  return (
    <motion.article
      variants={dirCard(dir)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`${R} ${SURFACE} ${className} group/card relative flex flex-col overflow-hidden bg-card`}
    >
      <Link href="/stories" aria-label="Open The Rabbit Hole" className="absolute inset-0 z-10" />

      {/* Photo first — same p-3 inset frame as the vault and project cards. */}
      <div className="p-3 pb-0">
        <div className="overflow-hidden rounded-[18px] ring-1 ring-black/[0.06]">
          <motion.img
            src={devDiaryImg}
            alt=""
            loading="lazy"
            width={768}
            height={960}
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.04] md:aspect-[4/5]"
          />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-1 flex-col p-6 sm:p-7"
      >
        <motion.div variants={textChild} className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-butter text-ink">
            <Rabbit className="size-3.5" strokeWidth={1.8} />
          </span>
          <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink/45">
            The Rabbit Hole
          </span>
        </motion.div>

        <motion.h3 variants={textChild} className="mt-4 text-[19px] font-semibold leading-[1.22] tracking-tight text-ink">
          Every issue starts with a product.
        </motion.h3>

        <motion.p variants={textChild} className="mt-2 text-[14px] leading-[1.6] text-ink/55">
          Where it ends is anyone&apos;s guess. Follow the trail into the stories hiding in
          plain sight.
        </motion.p>

        <motion.div variants={textChild} className="pointer-events-none relative z-20 mt-auto w-fit pt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2.5 text-[14px] font-medium text-white transition group-hover/card:gap-2.5 group-hover/card:bg-ink">
            Fall in
            <ArrowRight className="size-3.5" strokeWidth={2.2} />
          </span>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

function ToolsTemplates({ dir = "up", className = "" }: { dir?: Dir; className?: string }) {
  return (
    <motion.article
      variants={dirCard(dir)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`${R} ${SURFACE} ${className} group/card relative overflow-hidden bg-card p-6 sm:p-7`}
    >
      <Link href="/resources/tools" aria-label="Explore Tools & Templates" className="absolute inset-0 z-10" />

      {/* The floating mini-documents — a little life back on the clean card. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, y: 16, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute right-5 top-[38%] h-14 w-11 rounded-lg bg-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
        >
          <div className="mx-1.5 mt-1.5 h-1 rounded bg-ink/20" />
          <div className="mx-1.5 mt-1 h-1 w-6 rounded bg-ink/15" />
          <div className="mx-1.5 mt-2 h-4 rounded bg-sage/40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: -10 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute right-12 top-[56%] h-12 w-10 rounded-lg bg-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
        >
          <div className="mx-1.5 mt-1.5 h-1 rounded bg-ink/20" />
          <div className="mx-1.5 mt-1 h-1 w-5 rounded bg-ink/15" />
          <div className="mx-1.5 mt-2 h-3 rounded bg-butter/70" />
        </motion.div>
      </div>

      <div className="relative flex h-full flex-col">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-sage-soft">
          <TemplateIcon className="size-[18px] text-ink/80" />
        </div>
        <h3 className="mt-4 text-[16px] font-semibold leading-[1.25] tracking-tight text-ink">
          Tools &amp; Templates
        </h3>
        <p className="mt-2 max-w-[22ch] text-[14px] leading-[1.6] text-ink/55">
          Notion systems, Figma files, and checklists.
        </p>

        <div className="mt-auto flex items-end justify-between pt-8">
          <div>
            <div className="text-[28px] font-semibold leading-none tracking-tight text-ink">
              <AnimatedCount to={20} suffix="+" />
            </div>
            <div className="mt-1.5 text-[12px] text-ink/45">Ready to use</div>
          </div>
          <span className="pointer-events-none relative z-20 inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2.5 text-[14px] font-medium text-white transition group-hover/card:gap-2.5 group-hover/card:bg-ink">
            Explore
            <ArrowRight className="size-3.5" strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function ResearchVault({ dir = "up", className = "" }: { dir?: Dir; className?: string }) {
  return (
    <motion.article variants={dirCard(dir)} whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className={`${R} ${SURFACE} ${className} group/card relative overflow-hidden bg-card`}>
      <Link href="/resources/vault" aria-label="Explore the Research Vault" className="absolute inset-0 z-10" />
      <div className="flex h-full flex-col md:flex-row md:items-stretch">
        {/* p-3 top/left/right matches the project cards' mobile image inset;
            on md the right edge stays open so the text column sits close. */}
        <div className="p-3 pb-0 md:pb-3 md:pr-0 md:w-[44%] md:shrink-0">
          <motion.img
            src={researchImg}
            alt="Research"
            loading="lazy"
            width={1024}
            height={768}
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="aspect-[4/3] h-full w-full rounded-[18px] object-cover md:aspect-auto"
          />
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-1 flex-col justify-center p-6 sm:p-7"
        >
          <motion.h3 variants={textChild} className="text-[16px] font-semibold leading-[1.25] tracking-tight text-ink">
            Research Vault
          </motion.h3>
          <motion.p variants={textChild} className="mt-2 max-w-[32ch] text-[14px] leading-[1.6] text-ink/55">
            Deep dives into human behaviour — reports, patterns, and insights.
          </motion.p>
          <motion.span
            variants={textChild}
            className="pointer-events-none relative z-20 mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-sage px-5 py-2.5 text-[14px] font-medium text-white transition group-hover/card:gap-2.5 group-hover/card:bg-ink"
          >
            Explore
            <ArrowRight className="size-3.5" strokeWidth={2.2} />
          </motion.span>
        </motion.div>
      </div>
    </motion.article>
  );
}

function ResourcesHeadline({ dir = "up", className = "" }: { dir?: Dir; className?: string }) {
  return (
    <motion.article
      variants={dirCard(dir)}
      className={`${R} ${SURFACE} ${className} flex flex-col items-center justify-center bg-sage-soft px-6 py-14 text-center`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 24, letterSpacing: "0.04em" }}
        whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.01em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
        className="font-display text-[clamp(2.75rem,5vw,4.25rem)] italic leading-none tracking-tight text-ink"
      >
        resources
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="mt-3.5 max-w-[34ch] text-[14px] leading-[1.6] text-ink/60"
      >
        You'd want to know my product process, but I too wants to find out.
      </motion.p>
    </motion.article>
  );
}

function ProfileCard({ dir = "up", className = "" }: { dir?: Dir; className?: string }) {
  return (
    <motion.article
      variants={dirCard(dir)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`${R} ${SURFACE} ${className} group/card relative overflow-hidden bg-card`}
    >
      {/* The portrait is a doorway — the whole card routes to the About page. */}
      <Link href="/about" aria-label="More about me" className="absolute inset-0 z-10" />
      {/* Sage globe badge — the "this is clickable" wink. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute left-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-sage/90 text-white shadow-sm backdrop-blur-sm"
        aria-hidden
      >
        <Globe className="size-4" strokeWidth={1.8} />
      </motion.div>
      <motion.img
        src={profileImg}
        alt="Portrait — tap to read more about me"
        loading="lazy"
        width={768}
        height={1024}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
        className="h-full min-h-[260px] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.05]"
      />
    </motion.article>
  );
}

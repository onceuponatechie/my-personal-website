"use client";

import { ArrowUpRight, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const bookNotesImg = "/assets/book-notes.jpg";
const researchImg = "/assets/research-vault.jpg";
const profileImg = "/assets/profile.jpg";

const R = "rounded-[44px]";

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

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

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
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-2">
          <BookNotes className="order-1 md:col-start-1 md:col-span-3 md:row-span-2" />
          <ToolsTemplates className="order-3 md:col-start-4 md:col-span-3 md:row-start-1" />
          <ResearchVault className="order-4 md:col-start-7 md:col-span-6 md:row-start-1" />
          <ResourcesHeadline className="order-2 md:col-start-4 md:col-span-6 md:row-start-2" />
          <ProfileCard className="order-5 md:col-start-10 md:col-span-3 md:row-start-2" />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Cards ---------- */

function BookNotes({ className = "" }: { className?: string }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`${R} ${className} group/card relative flex flex-col overflow-hidden bg-ink text-white`}
    >
      <Link href="/resources/books" aria-label="Open Book Hub" className="absolute inset-0 z-10" />
      <div className="relative p-2 pb-0">
        <motion.img
          src={bookNotesImg}
          alt="Stack of books"
          loading="lazy"
          width={768}
          height={960}
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="aspect-[4/3] w-full rounded-[36px] object-cover md:aspect-[4/5]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-butter text-ink shadow-sm"
        >
          <BookOpen className="size-5" strokeWidth={1.8} />
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-1 flex-col p-6"
      >
        <motion.h3 variants={textChild} className="text-[22px] font-semibold leading-[1.15] tracking-tight text-white">
          The Builder&apos;s Book Club
        </motion.h3>

        <motion.div variants={textChild} className="mt-4 flex items-center gap-3 text-[12px] text-white/55">
          <span>Application over summary</span>
          <span className="size-1 rounded-full bg-white/40" />
          <span>12 books, applied</span>
        </motion.div>

        <motion.p variants={textChild} className="mt-3 text-[13px] leading-[1.55] text-white/65">
          Summaries are oversaturated and easy to AI-generate — the gap is application. So I pick one real book (business, law, communication, faith), build a mini-project with its framework, and document the friction honestly.
        </motion.p>

        <motion.div variants={textChild} className="relative z-20 mt-5 w-fit">
          <span className="pointer-events-none inline-flex items-center gap-2 rounded-full bg-sage-soft px-5 py-2.5 text-[13px] font-medium text-ink transition group-hover/card:gap-3">
            Join the Book Club
            <ArrowRight className="size-3.5" strokeWidth={2.2} />
          </span>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

function ToolsTemplates({ className = "" }: { className?: string }) {
  return (
    <motion.article variants={cardVariants} whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className={`${R} ${className} group/card relative overflow-hidden bg-card p-6`}>
      <Link href="/resources/tools" aria-label="Explore Tools & Templates" className="absolute inset-0 z-10" />
      <svg
        viewBox="0 0 320 260"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M-20 200 C 60 130, 170 100, 230 145 C 290 190, 330 230, 340 270 L -20 270 Z"
          fill="oklch(0.93 0.035 140)"
          opacity="0.55"
        />
      </svg>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, y: 16, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute right-5 top-[42%] h-14 w-11 rounded-lg bg-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
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
          className="absolute right-12 top-[58%] h-12 w-10 rounded-lg bg-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
        >
          <div className="mx-1.5 mt-1.5 h-1 rounded bg-ink/20" />
          <div className="mx-1.5 mt-1 h-1 w-5 rounded bg-ink/15" />
          <div className="mx-1.5 mt-2 h-3 rounded bg-butter/70" />
        </motion.div>
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex items-start gap-3">
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-sage-soft">
            <TemplateIcon className="size-[22px] text-ink" />
          </div>
          <h3 className="pt-1 text-[20px] font-semibold leading-[1.1] tracking-tight text-ink">
            Tools &amp;<br />Templates
          </h3>
        </div>

        <div className="mt-auto flex items-end justify-between pt-10">
          <div>
            <div className="text-[44px] font-bold leading-none tracking-[-0.02em] text-ink">
              <AnimatedCount to={20} suffix="+" />
            </div>
            <div className="mt-2 text-[12px] text-ink/65">Ready to use</div>
          </div>
          <span className="pointer-events-none relative z-20 inline-flex items-center gap-1.5 rounded-full bg-ink py-2 pl-4 pr-1.5 text-[13px] font-medium text-white transition group-hover/card:gap-2.5">
            Explore
            <span className="grid size-6 place-items-center rounded-full bg-white text-ink transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5">
              <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
            </span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function ResearchVault({ className = "" }: { className?: string }) {
  return (
    <motion.article variants={cardVariants} whileHover={{ y: -4 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className={`${R} ${className} group/card relative overflow-hidden bg-sage-soft`}>
      <Link href="/resources/vault" aria-label="Explore the Research Vault" className="absolute inset-0 z-10" />
      <div className="flex h-full flex-col md:flex-row md:items-stretch">
        <div className="p-2 pr-0 md:w-[44%] md:shrink-0">
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
            className="aspect-[4/3] h-full w-full rounded-[36px] object-cover md:aspect-auto"
          />
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-1 flex-col justify-center p-6 md:p-7"
        >
          <motion.h3 variants={textChild} className="text-[26px] font-semibold leading-[1.05] tracking-tight text-ink">
            Research <br /> Vault
          </motion.h3>
          <motion.p variants={textChild} className="mt-4 max-w-[30ch] text-[13px] leading-[1.55] text-ink/70">
            Discover deep dives into human behaviour and insights. Reports, patterns, and all that you need.
          </motion.p>
          <motion.span
            variants={textChild}
            className="pointer-events-none relative z-20 mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink py-2 pl-4 pr-1.5 text-[13px] font-medium text-white transition group-hover/card:gap-2.5"
          >
            Explore
            <span className="grid size-6 place-items-center rounded-full bg-white text-ink transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5">
              <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
            </span>
          </motion.span>
        </motion.div>
      </div>
    </motion.article>
  );
}

function ResourcesHeadline({ className = "" }: { className?: string }) {
  return (
    <motion.article
      variants={cardVariants}
      className={`${R} ${className} flex flex-col items-center justify-center bg-sage-soft px-6 py-16 text-center`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 24, letterSpacing: "0.04em" }}
        whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.01em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
        className="font-display text-[clamp(3.25rem,6vw,5.25rem)] italic leading-none tracking-tight text-ink"
      >
        resources
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="mt-4 max-w-[34ch] text-[13px] leading-[1.55] text-ink/70"
      >
        You'd want to know my product process, but I too wants to find out.
      </motion.p>
    </motion.article>
  );
}

function ProfileCard({ className = "" }: { className?: string }) {
  return (
    <motion.article variants={cardVariants} className={`${R} ${className} overflow-hidden bg-card`}>
      <motion.img
        src={profileImg}
        alt="Portrait"
        loading="lazy"
        width={768}
        height={1024}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
        className="h-full min-h-[260px] w-full object-cover"
      />
    </motion.article>
  );
}
